import { useState, useEffect, useRef } from 'react'
import type { CourseSummaryResponse } from '../../../../types/api/course.api'
import { useGetCourseDetailQuery, useUpdateCourseMutation, useGetAdminCoursesQuery } from '../../../../hooks/queries/useCourses'
import { RectDropzone, ModalHeader, mLabel, mInput } from './ModalHelpers'
import { validateImageFile } from '../../../../utils/fileUtils'
import { useNotification } from '../../../../components/common/NotificationProvider'
import {
  ConfirmUpdateSubjectModal,
  ConfirmDeleteSubjectModal,
  AddSubjectModal,
  ConfirmMiniModal
} from './ConfirmMiniModal'

// ─── Types ────────────────────────────────────────────────────────────────────

type SubjectRow = {
  id: string
  title: string
  durationHour: number
  /** true if user has modified either field since last load */
  isDirty: boolean
}

type SubjectMiniModalState =
  | { type: 'update'; subjectId: string; title: string; durationHour: number }
  | { type: 'delete'; subjectId: string; name: string }
  | { type: 'add' }
  | null

type CourseModalProps = {
  course: CourseSummaryResponse
  onClose: () => void
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-white inline-block"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// ─── Trash icon ───────────────────────────────────────────────────────────────

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="stroke-[var(--error-500)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
)

// ─── Check icon ──────────────────────────────────────────────────────────────

const CheckIcon = ({ active }: { active: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={active ? 'stroke-white' : 'stroke-[var(--brand-200)]'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ─── Main Component ───────────────────────────────────────────────────────────

export const CourseModal = ({ course, onClose }: CourseModalProps) => {
  // ── Course-level state
  const [title, setTitle] = useState(course.title)
  const [subtitle, setSubtitle] = useState(course.subTitle || '')
  const [badgeTitle, setBadgeTitle] = useState(course.badgeTitle || '')
  const [status, setStatus] = useState<'DRAFT' | 'DEVELOPING' | 'PUBLISH'>(course.status || 'DRAFT')
  const [description, setDescription] = useState(course.description || '')
  const [previewImage, setPreviewImage] = useState<string | undefined>(course.imageUrl)
  const [thumbnailImage, setThumbnailImage] = useState<File | undefined>()
  const [isSavingCourse, setIsSavingCourse] = useState(false)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false)

  const originalCourseRef = useRef({
    title: course.title,
    subtitle: course.subTitle || '',
    badgeTitle: course.badgeTitle || '',
    status: course.status || 'DRAFT',
    description: course.description || '',
  })

  const { showSuccess, showError } = useNotification()
  const updateCourse = useUpdateCourseMutation()
  const { data: coursesData } = useGetAdminCoursesQuery({ size: 100 })
  const existingCourses = coursesData?.data || []

  // ── Subject-level state
  const { data: courseDetail } = useGetCourseDetailQuery(course.id)
  const [subjectRows, setSubjectRows] = useState<SubjectRow[]>([])
  const [miniModal, setMiniModal] = useState<SubjectMiniModalState>(null)

  // Sync subject rows whenever courseDetail refreshes (after each mutation)
  useEffect(() => {
    if (courseDetail?.data?.subjects) {
      setSubjectRows(
        courseDetail.data.subjects.map((s) => ({
          id: s.id,
          title: s.name,
          durationHour: s.durationHours,
          isDirty: false,
        }))
      )
    }
  }, [courseDetail?.data?.subjects])

  // ── Derived: has course-level changes?
  const orig = originalCourseRef.current
  const hasCourseChanges =
    !!thumbnailImage ||
    title !== orig.title ||
    subtitle !== orig.subtitle ||
    badgeTitle !== orig.badgeTitle ||
    status !== orig.status ||
    description !== orig.description

  // ── Course image handler
  const handleImageChange = (url: string | undefined, file?: File) => {
    if (file) {
      try {
        validateImageFile(file)
        setThumbnailImage(file)
        setPreviewImage(url)
      } catch (err: any) {
        showError(err.message)
      }
    } else {
      setThumbnailImage(undefined)
      setPreviewImage(url)
    }
  }

  // ── Save course info
  const handleSaveCourse = async () => {
    if (!hasCourseChanges) return

    const isDuplicate = existingCourses.some(c => c.id !== course.id && c.title.toLowerCase() === title.trim().toLowerCase())
    if (isDuplicate) {
      setShowDuplicateAlert(true)
      return
    }

    setIsSavingCourse(true)
    const start = Date.now()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('badgeTitle', badgeTitle)
    formData.append('status', status)
    formData.append('description', description)
    if (thumbnailImage) formData.append('thumbnailImage', thumbnailImage)

    try {
      await updateCourse.mutateAsync({ id: course.id, data: formData })
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      // Update snapshot so button goes back to disabled
      originalCourseRef.current = { title, subtitle, badgeTitle, status, description }
      setThumbnailImage(undefined)
      showSuccess('Cập nhật thông tin khóa học thành công!')
    } catch (err: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showError(err?.response?.data?.message || 'Cập nhật khóa học thất bại!')
    } finally {
      setIsSavingCourse(false)
    }
  }

  // ── Subject row change handler
  const handleSubjectChange = (index: number, field: 'title' | 'durationHour', value: string | number) => {
    setSubjectRows((prev) => {
      const next = [...prev]
      const row = { ...next[index] }
      if (field === 'title') row.title = value as string
      else row.durationHour = value as number
      // Mark dirty if different from courseDetail snapshot
      const original = courseDetail?.data?.subjects?.[index]
      if (original) {
        row.isDirty = row.title !== original.name || row.durationHour !== original.durationHours
      }
      next[index] = row
      return next
    })
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Main popup ─────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-[var(--radius-xl)] w-full max-w-[960px] max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 pt-7 pb-3 border-b border-[var(--border-200)] shrink-0">
            <ModalHeader title="Sửa khóa học" onClose={onClose} />
          </div>

          {/* Body — 2 columns */}
          <div className="flex flex-1 overflow-hidden">
            {/* ── LEFT COL: Course info ──────────────────────────────────── */}
            <div className="w-[380px] shrink-0 border-r border-[var(--border-200)] overflow-y-auto px-8 py-6 flex flex-col">
              <p className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.6px] mb-4">
                Thông tin khóa học
              </p>

              <RectDropzone preview={previewImage} onChange={handleImageChange} id="course-img-input" />

              <div className="mb-3.5">
                <label className={mLabel}>Tiêu đề chính</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={mInput}
                  placeholder="VD: V-ACT"
                />
              </div>

              <div className="mb-3.5">
                <label className={mLabel}>Tiêu đề phụ</label>
                <input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className={mInput}
                  placeholder="VD: Luyện thi ACT theo chuẩn Mỹ"
                />
              </div>

              <div className="mb-3.5">
                <label className={mLabel}>Nhãn dán (Badge)</label>
                <input
                  value={badgeTitle}
                  onChange={(e) => setBadgeTitle(e.target.value)}
                  className={mInput}
                  placeholder="VD: Dành cho học sinh cấp 3"
                />
              </div>

              <div className="mb-3.5">
                <label className={mLabel}>Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'DEVELOPING' | 'PUBLISH')}
                  className={mInput}
                >
                  <option value="DRAFT">Bản nháp (DRAFT)</option>
                  <option value="DEVELOPING">Đang cập nhật (DEVELOPING)</option>
                  <option value="PUBLISH">Công khai (PUBLISH)</option>
                </select>
              </div>

              <div className="mb-5">
                <label className={mLabel}>Mô tả khóa học</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${mInput} resize-y min-h-[80px]`}
                  placeholder="Mô tả ngắn về khóa học..."
                />
              </div>

              {/* Save course button — pushed to bottom */}
              <div className="mt-auto pt-3">
                <button
                  type="button"
                  onClick={() => setShowSaveConfirm(true)}
                  disabled={!hasCourseChanges || isSavingCourse}
                  className={`
                    !w-full !py-[11px] !rounded-[var(--radius-md)] !border-none !font-bold !text-sm ![font-family:var(--font-heading)]
                    !flex !items-center !justify-center !gap-2 !transition-colors !duration-[var(--motion-fast)]
                    ${hasCourseChanges && !isSavingCourse
                      ? '!bg-[var(--brand-500)] !text-white !cursor-pointer !hover:bg-[var(--brand-600)]'
                      : '!bg-[var(--brand-100)] !text-[var(--brand-300)] !cursor-not-allowed'
                    }
                  `}
                >
                  {isSavingCourse && <Spinner />}
                  {isSavingCourse ? 'Đang lưu...' : 'Lưu thông tin'}
                </button>
              </div>
            </div>

            {/* ── RIGHT COL: Subjects ────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <p className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.6px]">
                  Danh sách môn học
                </p>
                <button
                  type="button"
                  onClick={() => setMiniModal({ type: 'add' })}
                  className="!flex !items-center !gap-1 !px-3 !py-1.5 !rounded-[var(--radius-sm)] !border !border-[var(--brand-500)] !bg-[var(--brand-50)] !text-[var(--brand-500)] ![font-family:var(--font-heading)] !font-bold !text-[12px] !cursor-pointer !hover:bg-[var(--brand-100)] !transition-colors !duration-[var(--motion-fast)]"
                >
                  + Thêm môn
                </button>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[1fr_100px_36px_36px] gap-2 mb-2 px-1">
                <span className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px]">Tên môn học</span>
                <span className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px]">Thời lượng (h)</span>
                <span />
                <span />
              </div>

              {/* Subject rows */}
              {subjectRows.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-500)] flex items-center justify-center mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-[var(--text-secondary-300)]" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <p className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                    Chưa có môn học nào.
                  </p>
                  <p className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-300)] mt-1">
                    Ấn "+ Thêm môn" để bắt đầu.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {subjectRows.map((row, index) => (
                  <div key={row.id} className="grid grid-cols-[1fr_100px_36px_36px] gap-2 items-center">
                    {/* Name input */}
                    <input
                      className={`${mInput} !py-2`}
                      value={row.title}
                      placeholder={`Môn học ${index + 1}`}
                      onChange={(e) => handleSubjectChange(index, 'title', e.target.value)}
                    />
                    {/* Duration input */}
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      className={`${mInput} !py-2`}
                      value={row.durationHour || ''}
                      placeholder="0"
                      onChange={(e) =>
                        handleSubjectChange(index, 'durationHour', parseFloat(e.target.value) || 0)
                      }
                    />
                    {/* Save button */}
                    <button
                      type="button"
                      title={row.isDirty ? 'Lưu thay đổi môn học này' : 'Chưa có thay đổi'}
                      onClick={() => {
                        if (!row.isDirty) return
                        setMiniModal({
                          type: 'update',
                          subjectId: row.id,
                          title: row.title,
                          durationHour: row.durationHour,
                        })
                      }}
                      className={`
                        w-9 h-9 rounded-[var(--radius-sm)] border flex items-center justify-center shrink-0 transition-colors duration-[var(--motion-fast)]
                        ${row.isDirty
                          ? 'border-[var(--brand-500)] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] cursor-pointer'
                          : 'border-[var(--brand-200)] bg-[var(--brand-50)] cursor-not-allowed'
                        }
                      `}
                    >
                      <CheckIcon active={row.isDirty} />
                    </button>
                    {/* Delete button */}
                    <button
                      type="button"
                      title="Xóa môn học này"
                      onClick={() =>
                        setMiniModal({ type: 'delete', subjectId: row.id, name: row.title })
                      }
                      className="w-9 h-9 rounded-[var(--radius-sm)] border border-[var(--error-200)] bg-white text-[var(--error-500)] hover:bg-[var(--error-50)] cursor-pointer flex items-center justify-center shrink-0 transition-colors duration-[var(--motion-fast)]"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-modals ─────────────────────────────────────────────────────── */}
      {miniModal?.type === 'update' && (
        <ConfirmUpdateSubjectModal
          courseId={course.id}
          subjectId={miniModal.subjectId}
          newTitle={miniModal.title}
          newDuration={miniModal.durationHour}
          onClose={() => setMiniModal(null)}
        />
      )}
      {miniModal?.type === 'delete' && (
        <ConfirmDeleteSubjectModal
          courseId={course.id}
          subjectId={miniModal.subjectId}
          subjectName={miniModal.name}
          onClose={() => setMiniModal(null)}
        />
      )}
      {miniModal?.type === 'add' && (
        <AddSubjectModal courseId={course.id} onClose={() => setMiniModal(null)} />
      )}
      {showSaveConfirm && (
        <ConfirmMiniModal
          title="Xác nhận lưu thay đổi"
          message={
            <span>
              Lưu thay đổi thông tin cho khóa học <strong>"{course.title}"</strong>?
            </span>
          }
          isSubmitting={isSavingCourse}
          onConfirm={async () => {
            await handleSaveCourse()
            setShowSaveConfirm(false)
          }}
          onClose={() => setShowSaveConfirm(false)}
        />
      )}
      {showDuplicateAlert && (
        <ConfirmMiniModal
          title="Tên khóa học đã tồn tại"
          message={<span>Khóa học <strong>"{title}"</strong> đã tồn tại. Vui lòng chọn tên khác.</span>}
          confirmText="Đóng"
          hideCancel
          onConfirm={() => setShowDuplicateAlert(false)}
          onClose={() => setShowDuplicateAlert(false)}
        />
      )}
    </>
  )
}
