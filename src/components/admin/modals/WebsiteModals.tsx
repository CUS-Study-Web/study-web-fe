import { useState } from 'react'
import type { Course, Instructor, Achievement, Review } from '../../../types/admin'

type CommonModalProps = {
  onClose: () => void
}

type CourseModalProps = CommonModalProps & {
  course?: Course
  onSave: (data: Partial<Course>) => void
}

type InstructorModalProps = CommonModalProps & {
  instructor?: Instructor
  onSave: (data: Partial<Instructor>) => void
}

type AchievementModalProps = CommonModalProps & {
  achievement?: Achievement
  onSave: (data: Partial<Achievement>) => void
}

type ReviewModalProps = CommonModalProps & {
  review?: Review
  onSave: (data: Partial<Review>) => void
}

const mLabel = "block [font-family:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)] mb-1.5"
const mInput = "w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)]"
const mSubmitBtnClass = "w-full py-3 rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer mt-1.5 hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"

// Dropzones
const CircularDropzone = ({ preview, onChange, id }: { preview: string | undefined; onChange: (url: string | undefined) => void; id: string }) => {
  return (
    <div className="flex justify-center mb-[22px]">
      <div
        className="w-24 h-24 rounded-full border-2 border-dashed border-[var(--border-600)] bg-[var(--surface-500)] cursor-pointer overflow-hidden flex items-center justify-center relative hover:bg-[var(--surface-600)] transition-colors duration-140"
        onClick={() => document.getElementById(id)?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-[var(--text-secondary-300)]" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onChange(URL.createObjectURL(f))
          }}
        />
      </div>
    </div>
  )
}

const RectDropzone = ({ preview, onChange, id }: { preview: string | undefined; onChange: (url: string | undefined) => void; id: string }) => {
  return (
    <div
      className="border-2 border-dashed border-[var(--border-600)] rounded-[var(--radius-md)] p-7 text-center mb-5 cursor-pointer bg-[var(--surface-500)] hover:bg-[var(--surface-600)] transition-colors duration-140"
      onClick={() => document.getElementById(id)?.click()}
    >
      {preview ? (
        <img src={preview} alt="preview" className="max-h-[120px] rounded-[var(--radius-sm)] mx-auto object-cover" />
      ) : (
        <>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2 stroke-[var(--text-secondary-300)]" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
            Kéo thả hoặc <span className="text-[var(--brand-500)] font-semibold">chọn ảnh đại diện</span>
          </div>
        </>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onChange(URL.createObjectURL(f))
        }}
      />
    </div>
  )
}

const ModalHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-[22px]">
      <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-[var(--text-primary)]">
        {title}
      </div>
      <button
        onClick={onClose}
        className="bg-transparent border-none cursor-pointer text-[22px] text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] outline-none"
      >
        ×
      </button>
    </div>
  )
}

const CourseModal = ({ course, onSave, onClose }: CourseModalProps) => {
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

const InstructorModal = ({ instructor, onSave, onClose }: InstructorModalProps) => {
  const [name, setName] = useState(instructor?.name || '')
  const [bio, setBio] = useState(instructor?.bio || '')
  const [image, setImage] = useState<string | undefined>(instructor?.image)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, bio, image })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={instructor ? "Sửa thông tin giảng viên" : "Thêm giảng viên"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={image} onChange={setImage} id="instr-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Tên giảng viên</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={mInput} placeholder="Ví dụ: Th.S Nguyễn Văn An" required />
          </div>

          <div className="mb-5">
            <label className={mLabel}>Mô tả</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className={`${mInput} resize-y min-h-[80px]`} placeholder="Giới thiệu ngắn về giảng viên..." required />
          </div>

          <button type="submit" className={mSubmitBtnClass}>
            {instructor ? "Lưu thay đổi" : "Thêm giảng viên"}
          </button>
        </form>
      </div>
    </div>
  )
}

const AchievementModal = ({ achievement, onSave, onClose }: AchievementModalProps) => {
  const [name, setName] = useState(achievement?.name || '')
  const [exam, setExam] = useState(achievement?.exam || 'V-ACT')
  const [totalScore, setTotalScore] = useState(achievement?.totalScore || '')
  const [image, setImage] = useState<string | undefined>(achievement?.image)
  
  // Parse existing subscores
  const initialSubScores = achievement?.subScores 
    ? achievement.subScores.split(' · ') 
    : ['']
  const [subScores, setSubScores] = useState<string[]>(initialSubScores)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name,
      exam,
      totalScore,
      image,
      subScores: subScores.filter(Boolean).join(' · ')
    })
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
                    placeholder="Ví dụ: Ngôn ngữ: 39"
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

          <button type="submit" className={mSubmitBtnClass}>
            {achievement ? "Lưu thay đổi" : "Thêm thành tích"}
          </button>
        </form>
      </div>
    </div>
  )
}

const ReviewModal = ({ review, onSave, onClose }: ReviewModalProps) => {
  const [name, setName] = useState(review?.name || '')
  const [time, setTime] = useState(review?.time || '')
  const [course, setCourse] = useState(review?.course || 'V-ACT')
  const [comment, setComment] = useState(review?.comment || '')
  const [image, setImage] = useState<string | undefined>(review?.image)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, time, course, comment, image })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={review ? "Sửa cảm nhận" : "Thêm cảm nhận"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={image} onChange={setImage} id="rev-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Họ và tên</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={mInput} placeholder="Tên học viên" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Thời gian</label>
            <input value={time} onChange={(e) => setTime(e.target.value)} className={mInput} placeholder="Ví dụ: Tháng 06/2025" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Khóa học</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)} className={mInput}>
              {["V-ACT", "V-SAT", "HSA", "HSCA", "THPT QG"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className={mLabel}>Bình luận</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className={`${mInput} resize-y min-h-[80px]`} placeholder="Cảm nhận của học viên..." required />
          </div>

          <button type="submit" className={mSubmitBtnClass}>
            {review ? "Lưu thay đổi" : "Thêm cảm nhận"}
          </button>
        </form>
      </div>
    </div>
  )
}

export { CourseModal, InstructorModal, AchievementModal, ReviewModal }
