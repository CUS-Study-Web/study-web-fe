import { useState } from 'react'
import type { LeaderboardResponse } from '@/types/api/leaderboard.api'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass, Spinner } from './ModalHelpers'
import {
  useCreateLeaderboardMutation,
  useUpdateLeaderboardMutation,
} from '@/hooks/queries/useLeaderboards'
import { useGetAdminCoursesQuery } from '@/hooks/queries/useCourses'
import { useNotification } from '@/components/common/NotificationProvider'

type AchievementModalProps = {
  achievement?: LeaderboardResponse
  onSave?: (data: any) => void
  onClose: () => void
}

export const AchievementModal = ({ achievement, onSave, onClose }: AchievementModalProps) => {
  const isEdit = !!achievement
  const [studentName, setStudentName] = useState(achievement?.studentName || '')
  const [courseId, setCourseId] = useState(achievement?.courseId || '')
  const [achievementTitle, setAchievementTitle] = useState(achievement?.achievement || '')
  const [sumScore, setSumScore] = useState<string>(achievement?.sumScore !== undefined ? String(achievement.sumScore) : '')
  const [preview, setPreview] = useState<string | undefined>(achievement?.avatarUrl)
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined)

  const { data: coursesData } = useGetAdminCoursesQuery({ size: 100 })
  const courses = coursesData?.data || []

  // Default course selection if not set
  const selectedCourseId = courseId || (courses.length > 0 ? courses[0].id : '')

  const createMutation = useCreateLeaderboardMutation()
  const updateMutation = useUpdateLeaderboardMutation()
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false)
  const isSubmitting = createMutation.isPending || updateMutation.isPending || isLocalSubmitting

  const { showSuccess, showError } = useNotification()

  const handleImageChange = (url: string | undefined, file?: File) => {
    setPreview(url)
    if (file) {
      setAvatarFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentName.trim()) {
      showError('Họ và tên học viên không được để trống')
      return
    }
    if (!selectedCourseId) {
      showError('Vui lòng chọn khóa học')
      return
    }
    if (sumScore === '' || isNaN(Number(sumScore))) {
      showError('Tổng điểm phải là một số hợp lệ')
      return
    }

    const start = Date.now()
    const formData = new FormData()
    formData.append('studentName', studentName.trim())
    formData.append('courseId', selectedCourseId)
    formData.append('sumScore', sumScore)
    if (achievementTitle.trim()) {
      formData.append('achievement', achievementTitle.trim())
    }
    if (avatarFile) {
      formData.append('avatarImage', avatarFile)
    }

    try {
      setIsLocalSubmitting(true)
      if (isEdit && achievement) {
        await updateMutation.mutateAsync({ id: achievement.id, data: formData })
      } else {
        await createMutation.mutateAsync(formData)
      }

      if (onSave) {
        onSave({
          studentName,
          courseId: selectedCourseId,
          sumScore: Number(sumScore),
          achievement: achievementTitle,
          avatarUrl: preview,
        })
      }

      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      showSuccess(isEdit ? 'Cập nhật thành tích thành công!' : 'Thêm thành tích thành công!')
      onClose()
    } catch (error: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      const errMsg = error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi!'
      showError(errMsg)
    } finally {
      setIsLocalSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={isEdit ? "Sửa thành tích" : "Thêm thành tích"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={preview} onChange={handleImageChange} id="ach-img-input" />

          <div className="mb-3.5">
            <label className={mLabel}>Họ và tên học viên</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={mInput}
              placeholder="Tên học viên"
              required
            />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Khóa học / Kì thi</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setCourseId(e.target.value)}
              className={mInput}
              required
            >
              <option value="" disabled>-- Chọn khóa học --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Tổng điểm</label>
            <input
              type="number"
              step="any"
              value={sumScore}
              onChange={(e) => setSumScore(e.target.value)}
              className={mInput}
              placeholder="Ví dụ: 112 hoặc 9.5"
              required
            />
          </div>

          <div className="mb-5">
            <label className={mLabel}>Danh hiệu / Thành tích (Tùy chọn)</label>
            <input
              value={achievementTitle}
              onChange={(e) => setAchievementTitle(e.target.value)}
              className={mInput}
              placeholder="Ví dụ: Thủ khoa V-ACT, Á khoa toàn quốc..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-[11px] rounded-[var(--radius-md)] font-bold text-sm bg-[var(--surface-500)] text-[var(--text-secondary-600)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${mSubmitBtnClass} flex-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting && <Spinner size="sm" color="white" />}
              {isEdit ? "Lưu thay đổi" : "Thêm thành tích"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
