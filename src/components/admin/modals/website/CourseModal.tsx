import { useState, useEffect, useRef } from 'react'
import type { CourseSummaryResponse } from '../../../../types/api/course.api'
import { useGetCourseDetailQuery } from '../../../../hooks/queries/useCourses'
import { RectDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'
import { validateImageFile } from '../../../../utils/fileUtils'

import { useNotification } from '../../../../components/common/NotificationProvider'

export type SubjectForm = {
  id?: string;
  title: string;
  durationHour: number;
}

type CourseModalProps = {
  course?: CourseSummaryResponse
  onSave: (data: FormData, newSubjects: SubjectForm[], updatedSubjects: SubjectForm[], deletedSubjectIds: string[], hasCourseChanges: boolean) => Promise<void>
  onClose: () => void
}

export const CourseModal = ({ course, onSave, onClose }: CourseModalProps) => {
  const [title, setTitle] = useState(course?.title || '')
  const [subtitle, setSubtitle] = useState(course?.subTitle || '')
  const [badgeTitle, setBadgeTitle] = useState(course?.badgeTitle || '')
  const [description, setDescription] = useState(course?.description || '')
  const [previewImage, setPreviewImage] = useState<string | undefined>(course?.imageUrl)
  const [thumbnailImage, setThumbnailImage] = useState<File | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subjects, setSubjects] = useState<SubjectForm[]>([{ title: '', durationHour: 0 }])
  const [deletedSubjectIds, setDeletedSubjectIds] = useState<string[]>([])
  const originalSubjectsRef = useRef<SubjectForm[]>([])
  const originalCourseRef = useRef({ title: course?.title || '', subtitle: course?.subTitle || '', badgeTitle: course?.badgeTitle || '', description: course?.description || '' })
  const { showSuccess, showError } = useNotification()

  const { data: courseDetail } = useGetCourseDetailQuery(course?.id || '')

  useEffect(() => {
    if (courseDetail?.data?.subjects) {
      const existing: SubjectForm[] = courseDetail.data.subjects.map(s => ({
        id: s.id,
        title: s.name,
        durationHour: s.durationHours
      }))
      const loaded = existing.length > 0 ? existing : [{ title: '', durationHour: 0 }]
      setSubjects(loaded)
      // Store snapshot of existing subjects (all have id)
      originalSubjectsRef.current = existing
    }
  }, [courseDetail?.data?.subjects])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    const startTime = Date.now()
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('badgeTitle', badgeTitle)
    formData.append('description', description)
    if (thumbnailImage) {
      formData.append('thumbnailImage', thumbnailImage)
    }
    
    try {
      const newSubjects = subjects.filter(s => !s.id && s.title.trim() !== '')
      // Only PATCH subjects whose title or durationHour actually changed
      const updatedSubjects = subjects.filter(s => {
        if (!s.id) return false
        const original = originalSubjectsRef.current.find(o => o.id === s.id)
        if (!original) return false
        return s.title !== original.title || s.durationHour !== original.durationHour
      })
      // Only PATCH course if course-level fields or thumbnail actually changed
      const orig = originalCourseRef.current
      const hasCourseChanges = !course || !!thumbnailImage
        || title !== orig.title
        || subtitle !== orig.subtitle
        || badgeTitle !== orig.badgeTitle
        || description !== orig.description
      await onSave(formData, newSubjects, updatedSubjects, deletedSubjectIds, hasCourseChanges)
      
      const elapsed = Date.now() - startTime
      if (elapsed < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - elapsed))
      }
      
      showSuccess(course ? "Cập nhật khóa học thành công!" : "Thêm khóa học thành công!")
      onClose()
    } catch (error: any) {
      const elapsed = Date.now() - startTime
      if (elapsed < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - elapsed))
      }
      console.error('[CourseModal] Save error:', error?.response?.data || error)
      showError(error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[560px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={course ? "Sửa khóa học" : "Thêm khóa học"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <RectDropzone preview={previewImage} onChange={handleImageChange} id="course-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Tiêu đề chính</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={mInput} placeholder="Ví dụ: V-ACT" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Tiêu đề phụ</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={mInput} placeholder="Ví dụ: Luyện thi ACT theo chuẩn Mỹ" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Nhãn dán (Badge)</label>
            <input value={badgeTitle} onChange={(e) => setBadgeTitle(e.target.value)} className={mInput} placeholder="Ví dụ: Dành cho học sinh cấp 3" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Mô tả khóa học</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${mInput} resize-y min-h-[72px]`} placeholder="Mô tả ngắn về khóa học..." required />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className={mLabel}>Danh sách môn học</label>
              <button
                type="button"
                onClick={() => setSubjects([...subjects, { title: '', durationHour: 0 }])}
                className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] border !border-[var(--brand-500)] bg-[var(--brand-50)] !text-[var(--brand-500)] ![font-family:var(--font-heading)] !font-bold !text-xs cursor-pointer hover:bg-[var(--brand-100)] transition-colors duration-[var(--motion-fast)]"
              >
                + Thêm môn
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    className={`${mInput} flex-[2]`}
                    placeholder={`Môn học ${index + 1} (VD: Toán)`}
                    value={subject.title}
                    onChange={(e) => {
                      const newSubjects = [...subjects];
                      newSubjects[index].title = e.target.value;
                      setSubjects(newSubjects);
                    }}
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className={`${mInput} flex-1`}
                    placeholder="Thời lượng (giờ)"
                    value={subject.durationHour || ''}
                    onChange={(e) => {
                      const newSubjects = [...subjects];
                      newSubjects[index].durationHour = parseFloat(e.target.value) || 0;
                      setSubjects(newSubjects);
                    }}
                  />
                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newSubjects = [...subjects];
                        const removed = newSubjects.splice(index, 1)[0];
                        setSubjects(newSubjects);
                        if (removed.id) {
                          setDeletedSubjectIds(prev => [...prev, removed.id!]);
                        }
                      }}
                      className="w-9 h-9 rounded-[var(--radius-sm)] border border-[var(--error-200)] bg-white text-[var(--error-500)] hover:bg-[var(--error-50)] cursor-pointer flex items-center justify-center shrink-0 transition-colors duration-[var(--motion-fast)]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-[var(--error-500)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-[11px] rounded-[var(--radius-md)] font-bold text-sm bg-[var(--surface-500)] text-[var(--text-secondary-600)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button type="submit" className={`${mSubmitBtnClass} flex-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`} disabled={isSubmitting}>
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {course ? "Lưu thay đổi" : "Thêm khóa học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
