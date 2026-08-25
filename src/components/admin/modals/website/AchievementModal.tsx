import { useState } from 'react'
import type { Achievement } from '../../../../types/admin'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'

import { useNotification } from '../../../../components/common/NotificationProvider'

type AchievementModalProps = {
  achievement?: Achievement
  onSave: (data: Partial<Achievement>) => void
  onClose: () => void
}

export const AchievementModal = ({ achievement, onSave, onClose }: AchievementModalProps) => {
  const [name, setName] = useState(achievement?.name || '')
  const [exam, setExam] = useState(achievement?.exam || 'V-ACT')
  const [totalScore, setTotalScore] = useState(achievement?.totalScore || '')
  const [image, setImage] = useState<string | undefined>(achievement?.image)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSuccess } = useNotification()
  
  const initialSubScores = achievement?.subScores 
    ? achievement.subScores.split(' · ') 
    : ['']
  const [subScores, setSubScores] = useState<string[]>(initialSubScores)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 500))
    onSave({
      name,
      exam,
      totalScore,
      image,
      subScores: subScores.filter(Boolean).join(' · ')
    })
    showSuccess(achievement ? "Cập nhật thành tích thành công!" : "Thêm thành tích thành công!")
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={achievement ? "Sửa thành tích" : "Thêm thành tích"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={image} onChange={setImage} id="ach-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Họ và tên</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={mInput} placeholder="Tên học viên" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Tổng điểm</label>
            <input value={totalScore} onChange={(e) => setTotalScore(e.target.value)} className={mInput} placeholder="Ví dụ: 112 / 120" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Kì thi</label>
            <select value={exam} onChange={(e) => setExam(e.target.value)} className={mInput}>
              {["V-ACT", "V-SAT", "HSA", "HSCA", "THPT QG"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <label className={mLabel}>Điểm thành phần</label>
              <button
                type="button"
                onClick={() => setSubScores((prev) => [...prev, ''])}
                className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] border !border-[var(--brand-500)] bg-[var(--brand-50)] !text-[var(--brand-500)] ![font-family:var(--font-heading)] !font-bold !text-xs cursor-pointer hover:bg-[var(--brand-100)] transition-colors duration-[var(--motion-fast)]"
              >
                + Thêm điểm
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {subScores.map((score, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className={`${mInput} flex-1`}
                    placeholder="Ví dụ: Ngôn ngữ — 39/40"
                    value={score}
                    onChange={(e) => setSubScores((prev) => prev.map((s, i) => i === idx ? e.target.value : s))}
                  />
                  {subScores.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSubScores((prev) => prev.filter((_, i) => i !== idx))}
                      className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer flex items-center justify-center shrink-0 transition-colors duration-[var(--motion-fast)]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="stroke-[var(--error-500)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className={`${mSubmitBtnClass} flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`} disabled={isSubmitting}>
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {achievement ? "Lưu thay đổi" : "Thêm thành tích"}
          </button>
        </form>
      </div>
    </div>
  )
}
