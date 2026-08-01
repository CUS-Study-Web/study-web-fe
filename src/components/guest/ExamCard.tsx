interface ExamCardProps {
  id: number;
  subject: string;
  difficulty: string;
  title: string;
  time: string;
  questions: string;
  attempts: string;
  isVip: boolean;
}

export default function ExamCard({ subject, difficulty, title, time, questions, attempts, isVip }: ExamCardProps) {
  return (
    <div className="relative bg-[var(--neutral-0)] rounded-[24px] p-6 shadow-md border border-[var(--border-300)] flex flex-col hover:shadow-lg transition-shadow">
      
      {/* Blur Overlay for VIP */}
      {isVip && (
        <div className="absolute inset-0 bg-[var(--surface-500)]/60 backdrop-blur-[2px] z-10 rounded-[24px] flex flex-col items-center justify-center border border-[var(--border-300)]">
          <div className="w-12 h-12 bg-[var(--text-primary-800)] rounded-full flex items-center justify-center mb-3 shadow-lg">
            <svg className="w-5 h-5 text-[var(--warning-400)] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <p className="text-[var(--text-primary-800)] font-bold text-sm mb-4">Chỉ dành cho VIP</p>
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[var(--text-primary-800)] text-[var(--warning-400)] text-sm font-bold rounded-full shadow-md hover:bg-[var(--text-primary-700)] transition">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
            </svg>
            Đăng ký VIP
          </button>
        </div>
      )}

      {/* Tags */}
      <div className="flex justify-between items-center mb-5">
        <span className="px-3 py-1 bg-[var(--success-50)] text-[var(--success-600)] text-[10px] font-extrabold uppercase rounded-full tracking-wider">
          {subject}
        </span>
        <span className="px-3 py-1 bg-[var(--error-50)] text-[var(--error-500)] text-[10px] font-extrabold rounded-full">
          {difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[var(--text-primary-500)] mb-8 line-clamp-2 min-h-[56px]" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h3>

      {/* Info Row */}
      <div className="flex items-center justify-between mt-auto pt-5 border-t border-[var(--border-200)]">
        <div className="flex flex-col items-center gap-1">
          <svg className="w-4 h-4 text-[var(--text-secondary-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[11px] font-semibold text-[var(--text-secondary-500)]">{time}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <svg className="w-4 h-4 text-[var(--error-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[11px] font-semibold text-[var(--text-secondary-500)]">{questions}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <svg className="w-4 h-4 text-[var(--info-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-[11px] font-semibold text-[var(--text-secondary-500)]">{attempts}</span>
        </div>
      </div>
      
      {/* Button */}
      {!isVip && (
          <button className="w-full mt-6 py-2.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] text-[var(--neutral-0)] font-bold rounded-xl transition text-sm">
            Xem đề thi
          </button>
      )}
    </div>
  );
}
