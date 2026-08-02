import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="about" className="bg-[var(--text-primary-800)] !text-white pt-16 pb-12 px-4 md:px-8 lg:px-12 xl:px-20 border-t border-[var(--border-900)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Company Info */}
          <div className="flex flex-col items-start gap-4">
            <Logo size="md" variant="light" />
            
            <p className="text-sm font-bold !text-white leading-snug mt-2">
              CÔNG TY TNHH ĐÀO TẠO PHÁT TRIỂN CUS
            </p>
            
            <p className="text-sm !text-white opacity-80 leading-relaxed max-w-xs font-medium">
              479 Mã Lò, phường Bình Hưng Hoà A, quận Bình Tân, TP. Hồ Chí Minh
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02C19.78 3.8 12 3.8 12 3.8s-7.78 0-9.478.343c-.98.272-1.748 1.04-2.02 2.02C0 7.832 0 12 0 12s0 4.168.502 5.837c.272.98 1.04 1.748 2.02 2.02C4.22 20.2 12 20.2 12 20.2s7.78 0 9.478-.343c.98-.272 1.748-1.04 2.02-2.02C24 16.168 24 12 24 12s0-4.168-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.65-2.13 2.06-5.02 3.23-7.98 3.23-2.91-.01-5.75-1.1-7.85-3.08-2.18-2.05-3.41-4.9-3.55-7.91-.03-1.69.21-3.37.76-4.97C5.55 9.77 7.02 8.35 8.73 7.55c1.4-.66 2.96-.94 4.51-.83v4.06c-1.39-.14-2.82.16-3.99.9-1.17.75-1.95 2.02-2.15 3.39-.23 1.5.06 3.08.83 4.38.77 1.3 2.1 2.22 3.57 2.44 1.48.22 3.03-.12 4.18-1.04 1.15-.92 1.83-2.33 1.93-3.83.05-1.32.02-2.65.02-3.97V.02h-5.11z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Programs */}
          <div className="flex flex-col gap-5 md:ml-4">
            <h4 className="text-xs font-extrabold !text-white uppercase tracking-widest">
              CHƯƠNG TRÌNH HỌC
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#courses" className="!text-white opacity-80 hover:!text-white transition">V-ACT</a>
              </li>
              <li>
                <a href="#courses" className="!text-white opacity-80 hover:!text-white transition">V-SAT</a>
              </li>
              <li>
                <a href="#courses" className="!text-white opacity-80 hover:!text-white transition">HSA</a>
              </li>
              <li>
                <a href="#courses" className="!text-white opacity-80 hover:!text-white transition">HSCA</a>
              </li>
              <li>
                <a href="#courses" className="!text-white opacity-80 hover:!text-white transition">THPT QG</a>
              </li>
            </ul>
          </div>

          {/* Column 3 - About CUS */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-extrabold !text-white uppercase tracking-widest">
              VỀ CUS
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#about" className="!text-white opacity-80 hover:!text-white transition">Giới thiệu</a>
              </li>
              <li>
                <a href="#" className="!text-white opacity-80 hover:!text-white transition">Đội ngũ giảng viên</a>
              </li>
              <li>
                <a href="#" className="!text-white opacity-80 hover:!text-white transition">Bảng vàng</a>
              </li>
              <li>
                <a href="#" className="!text-white opacity-80 hover:!text-white transition">Tài liệu</a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-extrabold !text-white uppercase tracking-widest">
              LIÊN HỆ
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3 !text-white opacity-80">
                {/* Phone icon SVG */}
                <svg className="w-[18px] h-[18px] text-[var(--error-400)] fill-current" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
                </svg>
                <span>036 217 4805</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Mail icon SVG */}
                <svg className="w-[18px] h-[18px] !text-white opacity-80 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:luyenthicungcus@gmail.com" className="!text-white opacity-80 hover:!text-white transition">
                  luyenthicungcus@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                {/* Globe/Website icon SVG */}
                <svg className="w-[18px] h-[18px] text-[var(--info-400)] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <a href="https://www.luyenthicungcus.com.vn" target="_blank" rel="noreferrer" className="!text-white opacity-80 hover:!text-white transition">
                  www.luyenthicungcus.com.vn
                </a>
              </li>
              <li className="flex items-center gap-3 !text-white opacity-80">
                {/* Clock icon SVG */}
                <svg className="w-[18px] h-[18px] text-[var(--error-400)] fill-current" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.51 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>T2–T7: 7:30–21:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-[var(--border-800)] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs !text-white opacity-70 gap-4">
          <p>© {new Date().getFullYear()} Công ty TNHH Đào Tạo Phát Triển CUS. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <a href="#" className="!text-white opacity-70 hover:!text-white transition">Điều khoản dịch vụ</a>
            <a href="#" className="!text-white opacity-70 hover:!text-white transition">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
