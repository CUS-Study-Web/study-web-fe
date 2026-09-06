interface TeacherCardProps {
  img: string;
  name: string;
  desc: string;
}

export default function TeacherCard({ img, name, desc }: TeacherCardProps) {
  return (
    <div className="bg-[var(--neutral-0)] rounded-[var(--radius-xl)] overflow-hidden shadow-sm border border-[var(--border-200)] flex flex-col group/card hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="w-full aspect-[3/4] relative bg-[var(--surface-500)] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="p-6 bg-[var(--surface-500)]/30 flex-grow flex flex-col">
        <div className="text-base md:text-xl font-bold text-[var(--text-primary-500)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          {name}
        </div>

        <div className="text-md text-[var(--text-secondary-400)] leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  );
}
