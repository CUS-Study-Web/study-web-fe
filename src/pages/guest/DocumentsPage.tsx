import { useState } from "react";
import GuestPageLayout from "../../components/guest/GuestPageLayout";
import DocumentCard from "../../components/guest/DocumentCard";

const docData = [
  { id: 1, category: "Lý thuyết", type: "TOÁN", tag: "CÔNG THỨC", title: "Tổng hợp công thức Toán THPT", desc: "Bộ tổng hợp toàn bộ công thức trọng tâm môn Toán dùng cho kỳ thi THPT Quốc Gia và ĐGNL.", iconBg: "bg-[#28522d]", icon: "D", isVip: false },
  { id: 2, category: "Lý thuyết", type: "VẬT LÝ", tag: "ĐỀ CƯƠNG", title: "Đề cương Vật lý lớp 12", desc: "Đề cương ôn tập đầy đủ các chương Vật lý lớp 12, bao gồm cơ học, điện từ...", iconBg: "bg-[#1d4ed8]", icon: "D", isVip: false },
  { id: 3, category: "Lý thuyết", type: "HÓA HỌC", tag: "BẢNG TRA", title: "Bảng phản ứng Hóa học vô cơ", desc: "Bảng tra phản ứng hóa học vô cơ đầy đủ nhất, phân loại theo nhóm nguyên tố...", iconBg: "bg-[#b45309]", icon: "D", isVip: false },
  { id: 4, category: "Lý thuyết", type: "SINH HỌC", tag: "SƠ ĐỒ", title: "Sơ đồ tư duy Sinh học 12", desc: "Hệ thống kiến thức Sinh học 12 dưới dạng sơ đồ tư duy sinh động, dễ nhớ...", iconBg: "bg-[#b91c1c]", icon: "D", isVip: true },
  { id: 5, category: "Bài tập", type: "TOÁN", tag: "BÀI TẬP", title: "Bộ 500 câu trắc nghiệm Toán ĐGNL", desc: "Tuyển tập 500 bài tập trắc nghiệm tư duy định lượng Toán học kèm lời giải chi tiết...", iconBg: "bg-[#28522d]", icon: "D", isVip: false },
  { id: 6, category: "Bài tập", type: "VẬT LÝ", tag: "BÀI TẬP", title: "Chuyên đề bài tập Điện xoay chiều", desc: "Phân dạng bài tập và phương pháp giải nhanh các bài toán Điện xoay chiều nâng cao...", iconBg: "bg-[#1d4ed8]", icon: "D", isVip: true },
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("Lý thuyết");

  const filteredDocs = docData.filter((doc) => doc.category === activeTab);

  return (
    <GuestPageLayout
      eyebrow="THƯ VIỆN HỌC LIỆU"
      title="Tài liệu"
      description="Tải về các tài liệu ôn tập chất lượng cao. Một số tài liệu yêu cầu tài khoản VIP."
    >
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-10">
        {/* Tabs: Lý thuyết / Bài tập */}
        <div className="flex items-center gap-3 mb-12">
          <div
            onClick={() => setActiveTab("Lý thuyết")}
            className={`px-8 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs ${activeTab === "Lý thuyết"
              ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
              : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
              }`}
          >
            Lý thuyết
          </div>
          <div
            onClick={() => setActiveTab("Bài tập")}
            className={`px-8 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs ${activeTab === "Bài tập"
              ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
              : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
              }`}
          >
            Bài tập
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 border-b border-[var(--border-300)] pb-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#1f1f1c]" style={{ fontFamily: "var(--font-heading)" }}>
            Tài liệu {activeTab.toLowerCase()}
          </h2>
          <span className="text-sm font-bold text-[#5c635e] mb-1">{filteredDocs.length} tài liệu</span>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredDocs.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))}
        </div>
      </section>
    </GuestPageLayout>
  );
}
