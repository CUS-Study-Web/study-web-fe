import { useState } from 'react'
import type { Course } from '../../../../types/admin'
import { RectDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'

type CourseModalProps = {
  course?: Course
  onSave: (data: Partial<Course>) => void
  onClose: () => void
}

export const CourseModal = ({ course, onSave, onClose }: CourseModalProps) => {
  const [title, setTitle] = useState(course?.title || '')
  const [subtitle, setSubtitle] = useState(course?.subtitle || '')
  const [desc, setDesc] = useState(course?.desc || '')
  const [image, setImage] = useState<string | undefined>(course?.image)
  const [subjects, setSubjects] = useState<string[]>(course?.subjects || [''])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, subtitle, desc, image, subjects: subjects.filter(Boolean) })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[560px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={course ? "Sửa khóa học" : "Thêm khóa học"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <RectDropzone preview={image} onChange={setImage} id="course-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Tiêu đề chính</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={mInput} placeholder="Ví dụ: V-ACT" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Tiêu đề phụ</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={mInput} placeholder="Ví dụ: Luyện thi ACT theo chuẩn Mỹ" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Mô tả khóa học</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={`${mInput} resize-y min-h-[72px]`} placeholder="Mô tả ngắn về khóa học..." required />
          </div>

          <div className="mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <label className={mLabel}>Danh sách môn học</label>
              <button
                type="button"
                onClick={() => setSubjects((prev) => [...prev, ''])}
                className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] border !border-[var(--brand-500)] bg-[var(--brand-50)] !text-[var(--brand-500)] ![font-family:var(--font-heading)] !font-bold !text-xs cursor-pointer hover:bg-[var(--brand-100)] transition-colors duration-[var(--motion-fast)]"
              >
                + Thêm môn
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {subjects.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className={`${mInput} flex-1`}
                    placeholder={`Môn học ${idx + 1} (VD: Toán)`}
                    value={sub}
                    onChange={(e) => setSubjects((prev) => prev.map((s, i) => i === idx ? e.target.value : s))}
                  />
                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSubjects((prev) => prev.filter((_, i) => i !== idx))}
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

          <button type="submit" className={mSubmitBtnClass}>
            {course ? "Lưu thay đổi" : "Thêm khóa học"}
          </button>
        </form>
      </div>
    </div>
  )
}
