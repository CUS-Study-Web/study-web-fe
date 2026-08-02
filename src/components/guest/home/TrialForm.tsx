export default function TrialForm() {
  return (
    <section id="trial" className="w-full bg-[#122615] text-white py-16 md:py-20 px-4 md:px-8 lg:px-12 xl:px-16 border-y border-[#1f4023] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h3
            className="text-3xl md:text-5xl font-black !text-[#FFC107] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Thi thử tại CUS
          </h3>
          <p
            className="text-sm md:text-base !text-[#beccbf] mt-3 max-w-xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Điền thông tin bên dưới để đăng ký thi thử miễn phí cùng CUS Education.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6 max-w-5xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          {/* Single row for 4 fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Họ tên */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 flex items-center gap-0.5 uppercase tracking-wider">
                Họ tên <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Họ và tên"
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>

            {/* Điện thoại */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 flex items-center gap-0.5 uppercase tracking-wider">
                Điện thoại <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0912 345 678"
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="@gmail.com"
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>

            {/* Môn thi */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 uppercase tracking-wider">
                Môn thi
              </label>
              <input
                type="text"
                placeholder="Nhập môn..."
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="flex flex-col">
            <label className="text-xs font-bold !text-[#e8f0e9] mb-2 uppercase tracking-wider">
              Bạn muốn thi thử môn gì?
            </label>
            <textarea
              rows={4}
              placeholder="Nhập thông tin bạn muốn thi thử..."
              className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition resize-none text-sm font-medium"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-12 py-3.5 bg-[#FFC107] hover:bg-[#ffcd38] active:scale-95 text-[#1f1f1c] font-extrabold rounded-[var(--radius-md)] shadow-lg shadow-[#FFC107]/20 hover:shadow-xl hover:shadow-[#FFC107]/30 transition-all duration-200 text-base cursor-pointer"
            >
              Đăng ký ngay!
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
