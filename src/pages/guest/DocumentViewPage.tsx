import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useEffect } from "react";

const PDFS = [
  { id: 1, title: "Tổng hợp công thức Toán THPT", pages: "42 trang", downloads: 12500, tags: ["TOÁN", "CÔNG THỨC"], color: "#28522d", colorSoft: "rgba(40,82,45,0.1)", desc: "Bộ tổng hợp toàn bộ công thức trọng tâm môn Toán dùng cho kỳ thi THPT Quốc Gia và ĐGNL." },
  { id: 2, title: "Đề cương Vật lý lớp 12", pages: "38 trang", downloads: 8200, tags: ["VẬT LÝ", "ĐỀ CƯƠNG"], color: "#1d4ed8", colorSoft: "rgba(29,78,216,0.1)", desc: "Đề cương ôn tập đầy đủ các chương Vật lý lớp 12, bao gồm cơ học, điện từ..." },
  { id: 3, title: "Bảng phản ứng Hóa học vô cơ", pages: "15 trang", downloads: 6400, tags: ["HÓA HỌC", "BẢNG TRA"], color: "#b45309", colorSoft: "rgba(180,83,9,0.1)", desc: "Bảng tra phản ứng hóa học vô cơ đầy đủ nhất, phân loại theo nhóm nguyên tố..." },
  { id: 4, title: "Sơ đồ tư duy Sinh học 12", pages: "25 trang", downloads: 4100, tags: ["SINH HỌC", "SƠ ĐỒ"], color: "#b91c1c", colorSoft: "rgba(185,28,28,0.1)", desc: "Hệ thống kiến thức Sinh học 12 dưới dạng sơ đồ tư duy sinh động, dễ nhớ..." },
  { id: 5, title: "Bộ 500 câu trắc nghiệm Toán ĐGNL", pages: "85 trang", downloads: 15300, tags: ["TOÁN", "BÀI TẬP"], color: "#28522d", colorSoft: "rgba(40,82,45,0.1)", desc: "Tuyển tập 500 bài tập trắc nghiệm tư duy định lượng Toán học kèm lời giải chi tiết..." },
  { id: 6, title: "Chuyên đề bài tập Điện xoay chiều", pages: "64 trang", downloads: 3800, tags: ["VẬT LÝ", "BÀI TẬP"], color: "#1d4ed8", colorSoft: "rgba(29,78,216,0.1)", desc: "Phân dạng bài tập và phương pháp giải nhanh các bài toán Điện xoay chiều nâng cao..." },
];

type DocumentContentItem = {
  section?: string;
  subheading?: string;
  text?: string;
  formula?: string;
  line?: string;
  gap?: boolean;
};

export default function DocumentViewPage() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const doc = PDFS.find((p) => String(p.id) === docId) ?? PDFS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contentItems: DocumentContentItem[] = [
    { section: "I. Giới thiệu tổng quan" },
    { text: "Tài liệu này tổng hợp toàn bộ kiến thức trọng tâm theo cấu trúc đề thi THPT Quốc Gia, được biên soạn bởi đội ngũ giảng viên chuyên nghiệp tại CUS Education." },
    { gap: true },
    { section: "II. Nội dung chính" },
    { subheading: "A. Phần lý thuyết cơ bản" },
    { line: "100%" }, { line: "100%" }, { line: "75%" }, { line: "100%" }, { line: "100%" }, { line: "60%" },
    { gap: true },
    { subheading: "B. Công thức và định lý trọng tâm" },
    { formula: "f(x) = ax² + bx + c  →  Δ = b² - 4ac" },
    { formula: "Nếu Δ > 0: phương trình có 2 nghiệm phân biệt" },
    { line: "100%" }, { line: "80%" }, { line: "100%" }, { line: "70%" },
  ];

  return (
    <div className="bg-[#F4F7F4] min-h-screen pb-20 pt-[72px]">
      <div className="bg-gradient-to-br from-[#2C5A31] to-[#1e4023] pt-10 pb-[60px] px-6">
        <div className="max-w-[1160px] mx-auto">
          <button 
            onClick={() => navigate(ROUTES.DOCUMENTS)} 
            className="flex items-center gap-2 bg-white/12 border-none rounded-[10px] px-3.5 py-2 cursor-pointer !text-[#DCE9DE] font-['Noto_Sans',sans-serif] text-[13px] mb-5 transition-colors hover:bg-white/20"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Quay lại tài liệu
          </button>
          
          <div className="flex gap-2.5 mb-3.5">
            {doc.tags.map((t) => (
              <span key={t} className="bg-white/15 rounded-full px-3 py-1 font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[11px] text-[#DCE9DE]">
                {t}
              </span>
            ))}
          </div>
          
          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[32px] text-white m-0 mb-2.5 tracking-[-0.6px] leading-[1.25]">
            {doc.title}
          </div>
          
          <div className="flex gap-5 flex-wrap">
            {[`📄 ${doc.pages}`, `↓ ${doc.downloads} lượt tải`, "✓ Miễn phí 100%"].map((item) => (
              <span key={item} className="font-['Noto_Sans',sans-serif] text-[13px] text-[#DCE9DE]/80">{item}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-[1160px] mx-auto -mt-7 px-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Left: Document Viewer Mockup */}
        <div>
          <div className="bg-[#3C3C3C] rounded-t-[16px] px-4.5 py-3 flex items-center justify-between shadow-[0_-4px_24px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-l from-white/25 to-transparent pointer-events-none" />
            <div className="flex gap-1.5 relative z-10">
              {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
            </div>
            <div className="bg-white/12 rounded-lg px-3.5 py-1.5 font-['Noto_Sans',sans-serif] text-[12px] !text-white/70 relative z-10">
              {doc.title}.pdf — Trang 1 / {doc.pages.split(" ")[0]}
            </div>
            <div className="w-16 relative z-10" />
          </div>
          <div className="bg-[#6B6B6B] p-6 rounded-b-[16px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] overflow-x-auto">
            <div className="bg-white rounded shadow-[0_4px_24px_rgba(0,0,0,0.3)] px-10 md:px-[52px] py-12 font-['Noto_Sans',sans-serif] min-h-[700px] min-w-[500px] relative">
              <div className="flex justify-between items-start mb-8 pb-5" style={{ borderBottom: `2px solid ${doc.color}` }}>
                <div>
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-extrabold text-[20px] mb-1" style={{ color: doc.color }}>CUS</div>
                  <div className="font-['Noto_Sans',sans-serif] text-[11px] text-[#6B746D]">Tài liệu học tập — Phiên bản 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[14px] text-[#1B1F1C]">{doc.title}</div>
                  <div className="font-['Noto_Sans',sans-serif] text-[11px] text-[#6B746D]">Trang 1 / {doc.pages.split(" ")[0]}</div>
                </div>
              </div>
              
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[22px] text-[#1B1F1C] m-0 mb-2 leading-[1.3]">{doc.title}</div>
              <div className="flex gap-2.5 mb-7">
                {doc.tags.map((t) => (
                  <span key={t} className="rounded-full px-2.5 py-1 font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[11px]" style={{ background: doc.colorSoft, color: doc.color }}>{t}</span>
                ))}
              </div>
              
              {contentItems.map((item, i) => {
                if (item.section) return <div key={i} className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[15px] my-5 mb-2.5" style={{ color: doc.color }}>{item.section}</div>
                if (item.subheading) return <div key={i} className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[13px] text-[#1B1F1C] my-3.5 mb-2">{item.subheading}</div>
                if (item.gap) return <div key={i} className="h-2" />
                if (item.text) return <div key={i} className="font-['Noto_Sans',sans-serif] text-[13px] leading-[1.75] text-[#3D4540] m-0 mb-2">{item.text}</div>
                if (item.formula) return <div key={i} className="font-['Noto_Sans',sans-serif] text-[13px] text-[#1B1F1C] px-3.5 py-2 rounded-r-lg my-1 italic" style={{ background: doc.colorSoft, borderLeft: `3px solid ${doc.color}` }}>{item.formula}</div>
                if (item.line) return <div key={i} className="h-[13px] bg-[#F4F7F4] rounded mb-2" style={{ width: item.line }} />
                return null
              })}
              
              <div className="absolute bottom-6 right-[52px] font-['Noto_Sans',sans-serif] text-[12px] text-[#D4DCD5]">— 1 —</div>
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-white/92 rounded-b flex items-end justify-center pb-4 pointer-events-none">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[13px] text-[#6B746D]">Tải xuống để xem toàn bộ nội dung →</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Sidebar */}
        <div className="sticky top-[84px]">
          <div className="bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-[#D4DCD5] overflow-hidden">
            <div className="px-5.5 py-5" style={{ background: `linear-gradient(135deg, ${doc.color} 0%, ${doc.color}cc 100%)` }}>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-extrabold text-[15px] text-white mb-1">{doc.title}</div>
              <div className="flex gap-2 mt-1.5">
                {doc.tags.map((t) => <span key={t} className="bg-white/20 text-white rounded-full px-2 py-0.5 font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[10px]">{t}</span>)}
              </div>
            </div>
            <div className="p-5.5">
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[14px] text-[#1B1F1C] mb-2">Tóm tắt nội dung</div>
              <div className="font-['Noto_Sans',sans-serif] text-[13px] leading-[1.7] text-[#6B746D] m-0 mb-5">{doc.desc}</div>
              
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[{ label: "Số trang", value: doc.pages }, { label: "Lượt tải", value: doc.downloads }, { label: "Định dạng", value: "PDF" }, { label: "Cập nhật", value: "2024" }].map(({ label, value }) => (
                  <div key={label} className="bg-[#F4F7F4] rounded-[10px] px-3.5 py-3">
                    <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[14px] text-[#1B1F1C]">{value}</div>
                    <div className="font-['Noto_Sans',sans-serif] text-[11px] text-[#6B746D] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              
              <div className="text-center py-4 pb-5">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-extrabold text-[20px] tracking-[-0.3px]" style={{ color: doc.color }}>Tải xuống hoàn toàn miễn phí!</div>
                <div className="font-['Noto_Sans',sans-serif] text-[13px] text-[#6B746D] mt-1">Không cần đăng ký · Không giới hạn</div>
              </div>
              
              <button 
                className="w-full flex items-center justify-center gap-2 py-4 rounded-[14px] border-none !text-white font-['Be_Vietnam_Pro',sans-serif] font-bold text-[16px] cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-transform duration-140 hover:-translate-y-[1px]"
                style={{ background: doc.color }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3V12M9 12L5.5 8.5M9 12L12.5 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 15H15" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                Tải xuống
              </button>
              
              <div className="font-['Noto_Sans',sans-serif] text-[12px] text-[#D4DCD5] text-center mt-3.5">
                Tài liệu chỉ dành cho mục đích học tập
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
