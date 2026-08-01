import PageHero from "../../components/guest/PageHero";
import ExamCard from "../../components/guest/ExamCard";

const categories = ["Tất cả", "Toán", "Vật lý", "Hóa học", "Tiếng Anh", "Ngữ văn", "Sinh học"];

const examData = [
  { id: 1, subject: "TOÁN", difficulty: "Nâng cao", title: "Đề thi thử Toán — Mã đề 001", time: "90 phút", questions: "50 câu", attempts: "2.841 lượt", isVip: false },
  { id: 2, subject: "VẬT LÝ", difficulty: "Trung bình", title: "Đề thi thử Vật lý — Mã đề 002", time: "50 phút", questions: "40 câu", attempts: "1.932 lượt", isVip: false },
  { id: 3, subject: "HÓA HỌC", difficulty: "Nâng cao", title: "Đề thi thử Hóa học — Mã đề 003", time: "50 phút", questions: "40 câu", attempts: "1.720 lượt", isVip: false },
  { id: 4, subject: "TIẾNG ANH", difficulty: "Cơ bản", title: "Đề thi thử Tiếng Anh — Mã đề 004", time: "60 phút", questions: "50 câu", attempts: "3.551 lượt", isVip: true },
  { id: 5, subject: "NGỮ VĂN", difficulty: "Nâng cao", title: "Đề thi thử Ngữ văn — Mã đề 005", time: "120 phút", questions: "120 câu", attempts: "1.450 lượt", isVip: true },
  { id: 6, subject: "SINH HỌC", difficulty: "Trung bình", title: "Đề thi thử Sinh học — Mã đề 006", time: "50 phút", questions: "40 câu", attempts: "1.280 lượt", isVip: true },
  { id: 7, subject: "TỔNG HỢP", difficulty: "Khó", title: "Đề ôn tổng hợp HSA — 2024", time: "195 phút", questions: "150 câu", attempts: "850 lượt", isVip: true },
  { id: 8, subject: "TỔNG HỢP", difficulty: "Cực khó", title: "Đề ôn tổng hợp V-SAT — 2024", time: "270 phút", questions: "180 câu", attempts: "1.050 lượt", isVip: true },
  { id: 9, subject: "THI THỬ", difficulty: "Nâng cao", title: "Đề thử nghiệm V-ACT chuyên đề sáng", time: "45 phút", questions: "30 câu", attempts: "765 lượt", isVip: true },
];

export default function TrialExamPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="LUYỆN TẬP THỰC CHIẾN"
        title="Thi thử"
        description="Hơn 200 đề thi thử được cập nhật liên tục. Một số đề thi yêu cầu tài khoản VIP."
      >
        <div className="max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[var(--brand-base-200)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm đề thi..."
            className="w-full bg-[var(--brand-base-600)] border border-[var(--brand-base-500)] rounded-xl py-3.5 pl-12 pr-4 text-[var(--neutral-0)] placeholder-[var(--brand-base-200)] focus:outline-none focus:border-[var(--brand-soft-400)] focus:ring-1 focus:ring-[var(--brand-soft-400)] transition"
          />
        </div>
      </PageHero>

      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20 mt-8">
        <div className="flex flex-wrap gap-3 mb-10 border-b border-[var(--border-300)] pb-6">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-xs ${
                idx === 0
                  ? "bg-[var(--brand-base-600)] text-[var(--neutral-0)] border border-[var(--brand-base-600)]"
                  : "bg-[var(--neutral-0)] text-[var(--text-secondary-500)] border border-[var(--border-300)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary-500)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examData.map((exam) => (
            <ExamCard key={exam.id} {...exam} />
          ))}
        </div>
      </section>
    </div>
  );
}
