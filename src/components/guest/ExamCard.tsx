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
    <div className="relative bg-white rounded-[24px] p-6 shadow-md border border-[#e2e8e3] flex flex-col justify-between h-full hover:shadow-lg transition-shadow overflow-hidden group">
      
      {/* Blur Overlay for VIP */}
      {isVip && (
        <div className="absolute inset-0 bg-[#f8faf8]/80 backdrop-blur-[3px] z-10 rounded-[24px] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 bg-[#1f1f1c] rounded-full flex items-center justify-center mb-3 shadow-lg">
            <svg className="w-5 h-5 text-[#FFC107] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <p className="text-[#1f1f1c] font-bold text-sm mb-4">Chỉ dành cho VIP</p>
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#FFC107] text-[#1f1f1c] text-sm font-extrabold rounded-full shadow-md hover:bg-[#ffcd38] transition cursor-pointer">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
            </svg>
            Đăng ký VIP
          </button>
        </div>
      )}

      {/* Main Card Contents */}
      <div>
        {/* Tags Row */}
        <div className="flex justify-between items-center mb-5">
          <span className="px-3 py-1 bg-[#edf4ee] !text-[#28522d] text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            {subject}
          </span>
          <span className="px-3 py-1 bg-[#fee2e2] !text-[#dc2626] text-[10px] font-extrabold rounded-full">
            {difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold !text-[#1f1f1c] mb-6 line-clamp-2 min-h-[56px] flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h3>
      </div>

      {/* Bottom Info & Button Section */}
      <div>
        <div className="flex items-center justify-between pt-4 border-t border-[#f0f4f1] mb-5">
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4 text-[#7d827f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-semibold text-[#5c635e]">{time}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-[11px] font-semibold text-[#5c635e]">{questions}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[11px] font-semibold text-[#5c635e]">{attempts}</span>
          </div>
        </div>
        
        <button className="w-full py-3 bg-[#28522d] hover:bg-[#1e4022] !text-white font-extrabold rounded-[14px] shadow-sm hover:shadow-md active:scale-95 transition-all text-sm cursor-pointer">
          Xem đề thi
        </button>
      </div>
    </div>
  );
}
