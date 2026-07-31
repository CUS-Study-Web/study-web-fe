export default function TrialForm() {
  return (
    <section id="trial" className="max-w-7xl mx-auto bg-[var(--info-900)] text-[var(--neutral-0)] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-[var(--info-800)]">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--warning-400)] tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Thi thử tại CUS
        </h3>
        <p className="text-sm md:text-base text-[var(--info-100)] mt-2 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Điền thông tin bên dưới để đăng ký thi thử miễn phí cùng CUS Education.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Single row for 4 fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Họ tên */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[var(--info-50)] mb-2 flex items-center gap-0.5">
              Họ tên <span className="text-[var(--error-400)]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Họ và tên"
              className="w-full bg-[var(--info-800)] border border-[var(--info-700)] rounded-xl px-4 py-3 text-[var(--neutral-0)] placeholder-[var(--info-300)] focus:outline-none focus:border-[var(--warning-400)] focus:ring-1 focus:ring-[var(--warning-400)] transition text-sm"
            />
          </div>

          {/* Điện thoại */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[var(--info-50)] mb-2 flex items-center gap-0.5">
              Điện thoại <span className="text-[var(--error-400)]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="0912 345 678"
              className="w-full bg-[var(--info-800)] border border-[var(--info-700)] rounded-xl px-4 py-3 text-[var(--neutral-0)] placeholder-[var(--info-300)] focus:outline-none focus:border-[var(--warning-400)] focus:ring-1 focus:ring-[var(--warning-400)] transition text-sm"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[var(--info-50)] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="@gmail.com"
              className="w-full bg-[var(--info-800)] border border-[var(--info-700)] rounded-xl px-4 py-3 text-[var(--neutral-0)] placeholder-[var(--info-300)] focus:outline-none focus:border-[var(--warning-400)] focus:ring-1 focus:ring-[var(--warning-400)] transition text-sm"
            />
          </div>

          {/* Môn thi */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[var(--info-50)] mb-2">
              Môn thi
            </label>
            <input
              type="text"
              placeholder="Nhập môn..."
              className="w-full bg-[var(--info-800)] border border-[var(--info-700)] rounded-xl px-4 py-3 text-[var(--neutral-0)] placeholder-[var(--info-300)] focus:outline-none focus:border-[var(--warning-400)] focus:ring-1 focus:ring-[var(--warning-400)] transition text-sm"
            />
          </div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[var(--info-50)] mb-2">
            Bạn muốn thi thử môn gì?
          </label>
          <textarea
            rows={4}
            placeholder="Nhập thông tin bạn muốn thi thử..."
            className="w-full bg-[var(--info-800)] border border-[var(--info-700)] rounded-xl px-4 py-3 text-[var(--neutral-0)] placeholder-[var(--info-300)] focus:outline-none focus:border-[var(--warning-400)] focus:ring-1 focus:ring-[var(--warning-400)] transition resize-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-10 py-3.5 bg-[var(--warning-400)] hover:bg-[var(--warning-500)] active:scale-95 text-[var(--text-primary-500)] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
          >
            Đăng ký ngay!
          </button>
        </div>
      </form>
    </section>
  );
}
