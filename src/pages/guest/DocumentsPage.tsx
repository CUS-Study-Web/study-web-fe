import PageHero from "../../components/guest/PageHero";
import DocumentCard from "../../components/guest/DocumentCard";

const docData = [
  { id: 1, type: "Toán", tag: "Công thức", title: "Tổng hợp công thức Toán THPT", desc: "Bộ tổng hợp toàn bộ công thức trọng tâm môn Toán dùng cho kỳ thi THPT...", iconBg: "bg-[var(--success-700)]", icon: "D", isVip: false },
  { id: 2, type: "Vật lý", tag: "Đề cương", title: "Đề cương Vật lý lớp 12", desc: "Đề cương ôn tập đầy đủ các chương Vật lý lớp 12, bao gồm cơ học, điện t...", iconBg: "bg-[var(--info-700)]", icon: "D", isVip: false },
  { id: 3, type: "Hóa học", tag: "Bảng tra", title: "Bảng phản ứng Hóa học vô cơ", desc: "Bảng tra phản ứng hóa học vô cơ đầy đủ nhất, phân loại theo nhóm nguyê...", iconBg: "bg-[var(--warning-600)]", icon: "D", isVip: false },
  { id: 4, type: "Sinh học", tag: "Sơ đồ", title: "Sơ đồ tư duy Sinh học 12", desc: "Hệ thống kiến thức Sinh học 12 dưới dạng sơ đồ tư duy sinh động, dễ nh...", iconBg: "bg-[var(--error-600)]", icon: "D", isVip: true },
];

export default function DocumentsPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="THƯ VIỆN HỌC LIỆU"
        title="Tài liệu"
        description="Tải về các tài liệu ôn tập chất lượng cao. Một số tài liệu yêu cầu tài khoản VIP."
      />

      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20 mt-10">
        <div className="flex items-center gap-2 mb-12">
          <button className="px-8 py-2.5 bg-[var(--brand-base-700)] text-[var(--neutral-0)] font-bold rounded-full shadow-md text-sm">
            Lý thuyết
          </button>
          <button className="px-8 py-2.5 bg-transparent border border-[var(--border-300)] text-[var(--text-secondary-500)] font-bold rounded-full hover:bg-[var(--surface-600)] transition text-sm">
            Bài tập
          </button>
        </div>

        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary-500)]" style={{ fontFamily: "var(--font-heading)" }}>
            Tài liệu lý thuyết
          </h2>
          <span className="text-sm font-medium text-[var(--text-secondary-400)] mb-1">7 tài liệu</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docData.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))}
        </div>
      </section>
    </div>
  );
}
