interface TestimonialCardProps {
  avatar: string;
  name: string;
  course: string;
  date: string;
  review: string;
}

export default function TestimonialCard({ avatar, name, course, date, review }: TestimonialCardProps) {
  return (
    <div className="bg-[var(--neutral-0)] rounded-[24px] p-8 shadow-sm border border-[var(--border-200)] flex flex-col hover:shadow-md transition-shadow h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--surface-500)] border-2 border-[var(--brand-soft-300)]">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--text-primary-500)] text-sm mb-0.5">{name}</h4>
            <p className="text-xs font-medium text-[var(--text-secondary-400)]">{course}</p>
          </div>
        </div>
        <span className="text-xs font-medium text-[var(--text-secondary-400)]">{date}</span>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className="w-4 h-4 text-[var(--brand-base-600)] fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>

      {/* Review */}
      <p className="text-sm text-[var(--text-secondary-500)] leading-relaxed italic mb-8 flex-grow">
        "{review}"
      </p>

      {/* Verification */}
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-5 h-5 rounded-full bg-[var(--success-50)] text-[var(--success-600)] flex items-center justify-center">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <span className="text-xs font-bold text-[var(--text-secondary-400)]">Học viên đã xác minh</span>
      </div>
    </div>
  );
}
