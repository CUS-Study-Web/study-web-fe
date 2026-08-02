import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = examData.filter((exam) => {
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      exam.subject.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Toán" && exam.subject === "TOÁN") ||
      (selectedCategory === "Vật lý" && exam.subject === "VẬT LÝ") ||
      (selectedCategory === "Hóa học" && exam.subject === "HÓA HỌC") ||
      (selectedCategory === "Tiếng Anh" && exam.subject === "TIẾNG ANH") ||
      (selectedCategory === "Ngữ văn" && exam.subject === "NGỮ VĂN") ||
      (selectedCategory === "Sinh học" && exam.subject === "SINH HỌC");

    const matchesSearch =
      searchQuery.trim() === "" ||
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20">
      <PageHero
        eyebrow="LUYỆN TẬP THỰC CHIẾN"
        title="Thi thử"
        description="Hơn 200 đề thi thử được cập nhật liên tục. Một số đề thi yêu cầu tài khoản VIP."
      >
        <div className="max-w-2xl relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[#a0b8a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đề thi..."
            className="w-full bg-[#28522d] border border-[#3c6d42] rounded-xl py-3.5 pl-12 pr-4 !text-white placeholder-[#beccbf] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
          />
        </div>
      </PageHero>

      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-8">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-[var(--border-300)] pb-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
                    : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Exams Grid */}
        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredExams.map((exam) => (
              <ExamCard key={exam.id} {...exam} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#5c635e]">
            <p className="text-lg font-bold">Không tìm thấy đề thi phù hợp.</p>
            <p className="text-sm mt-1">Vui lòng thử chọn môn học khác hoặc xóa từ khóa tìm kiếm.</p>
          </div>
        )}
      </section>
    </div>
  );
}
