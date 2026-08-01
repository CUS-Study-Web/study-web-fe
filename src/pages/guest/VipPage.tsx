import { useNavigate } from "react-router-dom";

export default function VipPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-24 bg-[#f8faf8] select-none">
      {/* Top Hero Section */}
      <section className="bg-[#18321b] pt-16 pb-28 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-[#28522d] relative overflow-hidden">
        {/* Subtle radial glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#28522d]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#254228] border border-[#3e6041] text-[#ffc107] font-extrabold text-xs px-4.5 py-1.5 rounded-full uppercase tracking-wider mb-5 shadow-xs">
            <span>✦</span> GÓI TÀI KHOẢN
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black !text-white mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Chọn gói phù hợp với bạn
          </h1>

          <p className="!text-[#beccbf] max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
            Nâng cấp lên VIP để trải nghiệm toàn bộ tính năng luyện thi của CUS — không giới hạn.
          </p>
        </div>
      </section>

      {/* Overlapping Pricing Cards Row */}
      <section className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 -mt-16 relative z-20">
        {/* Free Card */}
        <div className="bg-white rounded-[24px] p-8 shadow-xl border border-[#e2e8e3] flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
          <div>
            <span className="block text-xs font-black text-[#79807a] uppercase tracking-wider mb-2">
              TÀI KHOẢN THƯỜNG
            </span>
            <h2
              className="text-4xl font-black !text-[#1f1f1c] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Miễn phí
            </h2>
            <p className="text-sm text-[#5c635e] font-medium leading-relaxed mb-8 min-h-[42px]">
              Phù hợp để khám phá nền tảng CUS trước khi nâng cấp.
            </p>
          </div>

          <button
            disabled
            className="w-full py-3.5 bg-[#f4f7f4] border border-[#d2dcd4] text-[#79807a] font-extrabold text-sm rounded-[16px] text-center cursor-default"
          >
            Đang sử dụng
          </button>
        </div>

        {/* VIP Card - Highlighted Dark Card */}
        <div className="bg-[#1a231b] text-white rounded-[24px] p-8 shadow-2xl border border-[#2d422a] relative overflow-hidden flex flex-col justify-between ring-2 ring-[#ffc107]/40 hover:shadow-[0_20px_50px_rgba(255,193,7,0.15)] transition-all duration-300">
          {/* Top Right Popular Tag */}
          <div className="absolute top-6 right-6 bg-[#384236] border border-[#525f4f] text-[#ffc107] text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
            <span>✦</span> Phổ biến
          </div>

          <div>
            <span className="block text-xs font-black text-[#ffc107] uppercase tracking-wider mb-2">
              TÀI KHOẢN VIP
            </span>
            <div className="flex items-baseline gap-1 mb-3">
              <h2
                className="text-4xl font-black !text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                80.000 đ
              </h2>
              <span className="text-sm font-medium text-[#beccbf]">/tháng</span>
            </div>
            <p className="text-sm text-[#beccbf] font-medium leading-relaxed mb-8 min-h-[42px]">
              Đầy đủ tính năng, không giới hạn, hỗ trợ ưu tiên.
            </p>
          </div>

          <button
            onClick={() => navigate("/register")}
            className="w-full py-3.5 bg-gradient-to-b from-[#ffcf33] to-[#e6a800] hover:from-[#ffd54f] hover:to-[#ebaf0a] !text-[#1f1f1c] font-black text-base rounded-[16px] shadow-lg shadow-[#e6a800]/30 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
          >
            Nâng cấp ngay <span>✦</span>
          </button>
        </div>
      </section>

      {/* Section 2: Comparison Table */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <h2
          className="text-2xl md:text-3xl font-black !text-[#1f1f1c] mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          So sánh tính năng
        </h2>

        {/* Table Container */}
        <div className="bg-white rounded-[24px] border border-[#e2e8e3] overflow-hidden shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-[#f8faf8] border-b border-[#e2e8e3] text-xs font-extrabold tracking-wider uppercase">
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] border-r border-[#e2e8e3]">
              TÍNH NĂNG
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] border-r border-[#e2e8e3]">
              TÀI KHOẢN THƯỜNG
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#a8761c] bg-[#fffdf5]">
              ✦ TÀI KHOẢN VIP
            </div>
          </div>

          {/* Row 1: Làm đề thi */}
          <div className="grid grid-cols-12 border-b border-[#e2e8e3] text-xs md:text-sm">
            <div className="col-span-4 p-4 md:p-5 font-extrabold text-[#1f1f1c] border-r border-[#e2e8e3] flex items-center">
              Làm đề thi
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] font-medium border-r border-[#e2e8e3] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✕</span>
              <span>Giới hạn một số đề, không xem được đáp án chi tiết</span>
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#1f1f1c] font-bold bg-[#fffdf5] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>Không giới hạn, xem được đáp án và lời giải chi tiết</span>
            </div>
          </div>

          {/* Row 2: Làm bài tập */}
          <div className="grid grid-cols-12 border-b border-[#e2e8e3] text-xs md:text-sm">
            <div className="col-span-4 p-4 md:p-5 font-extrabold text-[#1f1f1c] border-r border-[#e2e8e3] flex items-center">
              Làm bài tập
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] font-medium border-r border-[#e2e8e3] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✕</span>
              <span>Giới hạn 3 bài tập, không xem lời giải chi tiết</span>
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#1f1f1c] font-bold bg-[#fffdf5] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>Không giới hạn, xem được đáp án và lời giải chi tiết</span>
            </div>
          </div>

          {/* Row 3: Phòng thi thực chiến */}
          <div className="grid grid-cols-12 border-b border-[#e2e8e3] text-xs md:text-sm">
            <div className="col-span-4 p-4 md:p-5 font-extrabold text-[#1f1f1c] border-r border-[#e2e8e3] flex items-center">
              Phòng thi thực chiến
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] font-medium border-r border-[#e2e8e3] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✕</span>
              <span>Không có</span>
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#1f1f1c] font-bold bg-[#fffdf5] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>Có — Giúp học sinh mô phỏng quá trình làm bài thi thật</span>
            </div>
          </div>

          {/* Row 4: Tài liệu thi thử (Đặc biệt) */}
          <div className="grid grid-cols-12 border-b border-[#e2e8e3] text-xs md:text-sm">
            <div className="col-span-4 p-4 md:p-5 font-extrabold text-[#1f1f1c] border-r border-[#e2e8e3] flex items-center">
              Tài liệu thi thử
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] font-medium border-r border-[#e2e8e3] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✕</span>
              <span>Không có</span>
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#1f1f1c] font-bold bg-[#fffdf5] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
              <div>
                <span className="inline-block bg-[#fef3c7] text-[#b45309] border border-[#fde68a] text-[10px] font-extrabold px-1.5 py-0.5 rounded mr-1.5 uppercase">
                  Đặc biệt
                </span>
                <span>Tài liệu thi thử được cập nhật theo thời gian học của khóa học chính thức tại CUS</span>
              </div>
            </div>
          </div>

          {/* Row 5: Buổi học GG Meet (Đặc biệt) */}
          <div className="grid grid-cols-12 text-xs md:text-sm">
            <div className="col-span-4 p-4 md:p-5 font-extrabold text-[#1f1f1c] border-r border-[#e2e8e3] flex items-center">
              Buổi học GG Meet
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#7d827f] font-medium border-r border-[#e2e8e3] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✕</span>
              <span>Không có</span>
            </div>
            <div className="col-span-4 p-4 md:p-5 text-[#1f1f1c] font-bold bg-[#fffdf5] flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
              <div>
                <span className="inline-block bg-[#fef3c7] text-[#b45309] border border-[#fde68a] text-[10px] font-extrabold px-1.5 py-0.5 rounded mr-1.5 uppercase">
                  Đặc biệt
                </span>
                <span>Tham gia trực tiếp một số buổi học chính thức qua GG Meet khi liên hệ hotline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Notice Alert & Bottom Call To Action */}
      <section className="max-w-4xl mx-auto px-4 mt-10">
        {/* Notice Alert Box */}
        <div className="bg-[#fffdf5] border border-[#fde68a] rounded-[20px] p-5 flex items-start gap-3.5 shadow-xs mb-12">
          <div className="w-6 h-6 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border border-[#fde68a]">
            !
          </div>
          <p className="text-sm text-[#78350f] font-medium leading-relaxed">
            <strong className="font-extrabold text-[#b45309]">Lưu ý:</strong> Tài khoản VIP được duy trì theo tháng. Bạn có thể hủy đăng ký bất kỳ lúc nào trước ngày gia hạn mà không mất thêm phí.
          </p>
        </div>

        {/* Bottom Large Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 bg-gradient-to-b from-[#ffcf33] to-[#e6a800] hover:from-[#ffd54f] hover:to-[#ebaf0a] !text-[#1f1f1c] font-black text-lg rounded-[16px] shadow-xl shadow-[#e6a800]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Bắt đầu dùng VIP ngay <span>✦</span>
          </button>
          <p className="text-xs font-semibold text-[#7d827f] mt-3">
            Hủy bất kỳ lúc nào · Hỗ trợ 24/7 · Thanh toán an toàn
          </p>
        </div>
      </section>
    </div>
  );
}
