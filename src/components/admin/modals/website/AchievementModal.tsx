import { useState, useEffect, useMemo } from 'react'
import type { LeaderboardResponse } from '@/types/api/leaderboard.api'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass, Spinner } from './ModalHelpers'
import {
  useCreateLeaderboardMutation,
  useUpdateLeaderboardMutation,
  useAddAchievementScoreMutation,
  useUpdateAchievementScoreMutation,
  useDeleteAchievementScoreMutation,
} from '@/hooks/queries/useLeaderboards'
import { useGetAdminCoursesQuery, useGetCourseDetailQuery } from '@/hooks/queries/useCourses'
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

  // Fetch course details to get list of subjects for this course
  const { data: courseDetailData, isLoading: isLoadingCourseDetail } = useGetCourseDetailQuery(selectedCourseId)
  const subjects = useMemo(() => courseDetailData?.data?.subjects || [], [courseDetailData?.data?.subjects])

  // Map of subjectId -> { scoreId?: string; score: string }
  const [scoresMap, setScoresMap] = useState<Record<string, { scoreId?: string; score: string }>>(() => {
    const initial: Record<string, { scoreId?: string; score: string }> = {}
    if (achievement?.scores) {
      for (const s of achievement.scores) {
        initial[s.subjectId] = {
          scoreId: s.id,
          score: String(s.score),
        }
      }
    }
    return initial
  })

  // Sync scores from achievement when subjects become available
  useEffect(() => {
    if (achievement?.scores && subjects.length > 0) {
      setScoresMap((prev) => {
        const next = { ...prev }
        let changed = false
        for (const s of achievement.scores) {
          if (!next[s.subjectId]) {
            next[s.subjectId] = { scoreId: s.id, score: String(s.score) }
            changed = true
          }
        }
        return changed ? next : prev
      })
    }
  }, [achievement, subjects])

  const createMutation = useCreateLeaderboardMutation()
  const updateMutation = useUpdateLeaderboardMutation()
  const addScoreMutation = useAddAchievementScoreMutation()
  const updateScoreMutation = useUpdateAchievementScoreMutation()
  const deleteScoreMutation = useDeleteAchievementScoreMutation()

  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false)
  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    addScoreMutation.isPending ||
    updateScoreMutation.isPending ||
    deleteScoreMutation.isPending ||
    isLocalSubmitting

  const { showSuccess, showError } = useNotification()

  const handleImageChange = (url: string | undefined, file?: File) => {
    setPreview(url)
    if (file) {
      setAvatarFile(file)
    }
  }

  const handleScoreChange = (subjectId: string, val: string) => {
    setScoresMap((prev) => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        score: val,
      },
    }))
  }

  const handleAutoSum = () => {
    const total = Object.values(scoresMap).reduce((sum, item) => {
      const num = parseFloat(item.score)
      return sum + (isNaN(num) ? 0 : num)
    }, 0)
    setSumScore(String(Math.round(total * 100) / 100))
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
      let leaderboardId: string

      if (isEdit && achievement) {
        leaderboardId = achievement.id
        await updateMutation.mutateAsync({ id: leaderboardId, data: formData })
      } else {
        const createRes = await createMutation.mutateAsync(formData)
        leaderboardId = createRes.data.id
      }

      // Sync individual subject scores
      const scorePromises: Promise<any>[] = []

      for (const subj of subjects) {
        const item = scoresMap[subj.id]
        const val = item?.score?.trim()
        const existingScoreId = item?.scoreId

        if (val !== undefined && val !== '' && !isNaN(Number(val))) {
          const numericScore = Math.round(Number(val))
          if (existingScoreId) {
            // Check if modified
            const orig = achievement?.scores?.find((s) => s.id === existingScoreId)
            if (!orig || orig.score !== numericScore) {
              scorePromises.push(
                updateScoreMutation.mutateAsync({
                  scoreId: existingScoreId,
                  data: { subjectId: subj.id, score: numericScore },
                })
              )
            }
          } else {
            // New score to add
            scorePromises.push(
              addScoreMutation.mutateAsync({
                leaderboardId,
                data: { subjectId: subj.id, score: numericScore },
              })
            )
          }
        } else if (existingScoreId) {
          // Cleared value
          scorePromises.push(deleteScoreMutation.mutateAsync(existingScoreId))
        }
      }

      // Delete any scores from previous courses if course was changed
      if (isEdit && achievement?.scores) {
        for (const oldScore of achievement.scores) {
          if (!subjects.some((s) => s.id === oldScore.subjectId)) {
            scorePromises.push(deleteScoreMutation.mutateAsync(oldScore.id))
          }
        }
      }

      if (scorePromises.length > 0) {
        await Promise.all(scorePromises)
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
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[500px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
              onChange={(e) => {
                setCourseId(e.target.value)
              }}
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

          {/* Component Scores for Subjects in Course */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className={mLabel} style={{ marginBottom: 0 }}>
                Điểm từng môn thi
              </label>
              {subjects.length > 0 && (
                <button
                  type="button"
                  onClick={handleAutoSum}
                  className="text-[11.5px] font-bold text-[var(--brand-600)] hover:text-[var(--brand-700)] hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
                  title="Cộng điểm các môn thành Tổng điểm"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v4H8v4h10v4H8v4h12" />
                  </svg>
                  Tự tính tổng điểm
                </button>
              )}
            </div>

            {isLoadingCourseDetail ? (
              <div className="p-3 bg-[var(--surface-500)] rounded-lg text-xs text-[var(--text-secondary-400)] text-center flex items-center justify-center gap-2">
                <Spinner size="sm" color="brand" />
                <span>Đang tải danh sách môn học...</span>
              </div>
            ) : subjects.length === 0 ? (
              <div className="p-3 bg-[var(--surface-500)] rounded-lg text-xs text-[var(--text-secondary-400)] text-center">
                Khóa học này chưa có danh sách môn học.
              </div>
            ) : (
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                {subjects.map((subj) => {
                  const currentVal = scoresMap[subj.id]?.score ?? ''
                  return (
                    <div
                      key={subj.id}
                      className="flex items-center justify-between gap-3 p-2.5 bg-[var(--surface-500)] rounded-lg border border-[var(--border-300)] hover:border-[var(--border-400)] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-[var(--brand-500)] shrink-0" />
                        <span className="text-xs font-semibold text-[var(--text-primary-500)] truncate">
                          {subj.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 w-24 shrink-0">
                        <input
                          type="number"
                          step="any"
                          min="0"
                          max="100"
                          value={currentVal}
                          onChange={(e) => handleScoreChange(subj.id, e.target.value)}
                          placeholder="0"
                          className="w-full text-right px-2.5 py-1 text-xs font-bold rounded-md border border-[var(--border-400)] bg-white focus:outline-none focus:border-[var(--brand-500)]"
                        />
                        <span className="text-xs text-[var(--text-secondary-400)] font-medium">đ</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
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
