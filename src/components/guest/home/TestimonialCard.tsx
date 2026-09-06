interface TestimonialCardProps {
  name: string;
  course: string;
  review: string;
  isParent?: boolean;
}

export default function TestimonialCard({ name, course, review, isParent }: TestimonialCardProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--neutral-0)] to-[#ebf5ed] rounded-[var(--radius-xl)] p-8 shadow-sm border border-[var(--border-200)] flex flex-col hover:shadow-md transition-shadow h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--brand-soft-300)] flex items-center justify-center text-[var(--brand-base-600)] shrink-0 border border-[var(--brand-soft-200)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-[var(--text-primary-500)] text-lg mb-0.5">{name}</div>
            <div className="text-xs font-medium text-[var(--text-secondary-400)]">{course}</div>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className="w-4 h-4 text-[var(--brand-base-600)] fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Review */}
      <div className="text-sm text-[var(--text-secondary-500)] leading-relaxed italic mb-8 flex-grow">
        "{review}"
      </div>

      {/* Verification */}
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-5 h-5 rounded-full bg-[var(--success-50)] text-[var(--success-600)] flex items-center justify-center">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-[var(--text-secondary-400)]">
          {isParent ? "Phụ huynh học viên" : "Học viên đã xác minh"}
        </span>
      </div>
    </div>
  );
}
