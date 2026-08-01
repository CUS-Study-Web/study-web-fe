interface TeacherCardProps {
  img: string;
  subject: string;
  name: string;
  desc: string;
}

export default function TeacherCard({ img, subject, name, desc }: TeacherCardProps) {
  return (
    <div className="bg-[var(--neutral-0)] rounded-[24px] overflow-hidden shadow-sm border border-[var(--border-200)] flex flex-col group hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="w-full aspect-square relative bg-[var(--surface-500)] overflow-hidden">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Info Section */}
      <div className="p-6 bg-[var(--surface-500)]/30 flex-grow flex flex-col">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[var(--success-50)] text-[var(--success-600)] text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            {subject}
          </span>
        </div>
        
        <h3 className="text-[17px] md:text-lg font-bold text-[var(--text-primary-500)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          {name}
        </h3>
        
        <p className="text-xs text-[var(--text-secondary-400)] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
