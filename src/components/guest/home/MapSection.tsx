export default function MapSection() {
  return (
    <section className="relative w-full h-[450px] overflow-hidden border-t border-[var(--border-300)] bg-[var(--surface-500)]">
      {/* Interactive Google Map Iframe */}
      <iframe
        title="CUS Education Map Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6738914605903!2d106.5947321!3d10.7595932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dd7fa689e47%3A0xeab50d750fb4e0af!2s479%20M%C3%A3%20L%C3%B2%2C%20B%C3%ACnh%20H%C6%B0ng%20Ho%C3%A0%20A%2C%20B%C3%ACnh%20T%C3%A2n%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1785505220000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full"
      ></iframe>

      {/* Floating Address Info Card */}
      <div className="absolute top-8 left-4 md:left-8 lg:left-16 z-10 w-full max-w-[340px] bg-[var(--surface-50)] rounded-3xl p-6 shadow-2xl border border-[var(--border-300)]">
        <div className="flex items-center gap-2.5 mb-5">
          {/* Green Pin Icon */}
          <div className="w-9 h-9 rounded-xl bg-[var(--brand-soft-300)] text-[var(--brand-base-600)] flex items-center justify-center shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[var(--text-primary-500)]" style={{ fontFamily: "var(--font-heading)" }}>
            CUS Education
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[10px] font-bold text-[var(--text-secondary-300)] uppercase tracking-widest mb-1">
              TỈNH, THÀNH PHỐ
            </div>
            <div className="text-sm font-bold text-[var(--text-primary-500)]">
              Thành phố Hồ Chí Minh, quận Bình Tân
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-[var(--text-secondary-300)] uppercase tracking-widest mb-1">
              ĐỊA CHỈ CHI TIẾT
            </div>
            <div className="text-sm font-bold text-[var(--text-primary-500)] leading-relaxed">
              479 Mã Lò, phường Bình Hưng Hoà A
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=479+Mã+Lò,+Bình+Hưng+Hoà+A,+Bình+Tân,+Thành+phố+Hồ+Chí+Minh"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-3.5 bg-[var(--warning-400)] hover:bg-[var(--warning-500)] active:scale-98 text-[var(--text-primary-500)] font-bold rounded-full shadow-md text-center transition-all text-sm"
          >
            Tìm kiếm
          </a>
        </div>
      </div>
    </section>
  );
}
