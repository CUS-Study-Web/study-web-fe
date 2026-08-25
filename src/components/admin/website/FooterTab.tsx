import { useState } from 'react'
import { mLabel, mInput } from '../modals/website/ModalHelpers'

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[var(--surface-500)] rounded-2xl border border-[var(--border-300)] p-6 mb-4">
    <div className="flex items-center gap-2 mb-5">
      <div className="w-1 h-[18px] rounded-sm bg-[var(--brand-500)]" />
      <span className="[font-family:var(--font-heading)] font-extrabold text-[13px] text-[var(--brand-500)] uppercase tracking-[0.5px]">
        {title}
      </span>
    </div>
    {children}
  </div>
)

const Fld = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-3.5">
    <label className={mLabel}>{label}</label>
    {children}
  </div>
)

const Inp = ({ placeholder, defaultValue }: { placeholder: string; defaultValue?: string }) => (
  <input placeholder={placeholder} defaultValue={defaultValue ?? ''} className={mInput} />
)

const NavColRows = ({
  rows,
  setRows,
}: {
  rows: { name: string; url: string }[]
  setRows: React.Dispatch<React.SetStateAction<{ name: string; url: string }[]>>
}) => (
  <div>
    <div className="flex flex-col gap-2 mb-2.5">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            placeholder="Tên hiển thị"
            defaultValue={row.name}
            className={`!${mInput} flex-[0_0_130px] box-border`}
            onChange={(e) => setRows((r) => r.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
          />
          <input
            placeholder="URL"
            defaultValue={row.url}
            className={`${mInput} flex-1`}
            onChange={(e) => setRows((r) => r.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
          />
          <button
            type="button"
            onClick={() => setRows((r) => r.filter((_, j) => j !== i))}
            className="w-8 h-8 flex-shrink-0 rounded-lg border !border-[var(--border-500)] bg-white cursor-pointer flex items-center justify-center hover:bg-[var(--surface-600)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[var(--error-500)]">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      ))}
    </div>
    <button
      type="button"
      onClick={() => setRows((r) => [...r, { name: '', url: '' }])}
      className="flex items-center gap-1.5 px-3.5 py-[7px] !rounded-[var(--radius-sm)] !border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-600)] ![font-family:var(--font-heading)] !font-semibold !text-xs cursor-pointer hover:bg-[var(--surface-600)]"
    >
      + Thêm mục mới
    </button>
  </div>
)

const FooterForm = () => {
  const [col1, setCol1] = useState([
    { name: 'V-ACT', url: '/courses/v-act' },
    { name: 'V-SAT', url: '/courses/v-sat' },
    { name: 'HSA',   url: '/courses/hsa' },
  ])
  const [col2, setCol2] = useState([
    { name: 'Giới thiệu',         url: '/about' },
    { name: 'Đội ngũ giảng viên', url: '/instructors' },
    { name: 'Tuyển dụng',         url: '/careers' },
  ])
  const [policyRows, setPolicyRows] = useState([
    { name: 'Chính sách bảo mật', url: '/privacy' },
    { name: 'Điều khoản dịch vụ', url: '/terms' },
  ])

  return (
    <>
      {/* Section 1 — Company & Social */}
      <SectionCard title="1. Thông tin Công ty & Mạng xã hội">
        <Fld label="Tên công ty">
          <Inp placeholder="Ví dụ: CÔNG TY TNHH ĐÀO TẠO PHÁT TRIỂN CUS" defaultValue="CÔNG TY TNHH ĐÀO TẠO PHÁT TRIỂN CUS" />
        </Fld>
        <Fld label="Địa chỉ">
          <textarea
            placeholder="Ví dụ: 479 Mã Lò, phường Bình Hưng Hoà A..."
            defaultValue="479 Mã Lò, phường Bình Hưng Hoà A, quận Bình Tân, TP.HCM"
            className={`${mInput} resize-y min-h-[72px] [font-family:var(--font-body)]`}
          />
        </Fld>
        <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-2.5 mt-1">
          Mạng xã hội
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Fld label="Facebook URL"><Inp placeholder="https://facebook.com/..." defaultValue="https://facebook.com/luyenthicungcus" /></Fld>
          <Fld label="Instagram URL"><Inp placeholder="https://instagram.com/..." /></Fld>
          <Fld label="YouTube URL"><Inp placeholder="https://youtube.com/..." /></Fld>
          <Fld label="TikTok URL"><Inp placeholder="https://tiktok.com/..." /></Fld>
        </div>
      </SectionCard>

      {/* Section 2 — Nav columns */}
      <SectionCard title="2. Cột điều hướng (Links)">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Chương trình học
            </div>
            <NavColRows rows={col1} setRows={setCol1} />
          </div>
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Về CUS
            </div>
            <NavColRows rows={col2} setRows={setCol2} />
          </div>
        </div>
      </SectionCard>

      {/* Section 3 — Contact */}
      <SectionCard title="3. Thông tin Liên hệ">
        <div className="grid grid-cols-2 gap-3">
          <Fld label="Số điện thoại"><Inp placeholder="Ví dụ: 036 217 4805" defaultValue="036 217 4805" /></Fld>
          <Fld label="Email"><Inp placeholder="Ví dụ: luyenthicungcus@gmail.com" defaultValue="luyenthicungcus@gmail.com" /></Fld>
          <Fld label="Website"><Inp placeholder="Ví dụ: www.luyenthicungcus.com.vn" defaultValue="www.luyenthicungcus.com.vn" /></Fld>
          <Fld label="Giờ làm việc"><Inp placeholder="Ví dụ: T2–T7: 7:30–21:00" defaultValue="T2–T7: 7:30–21:00" /></Fld>
        </div>
      </SectionCard>

      {/* Section 4 — Copyright & policy */}
      <SectionCard title="4. Bản quyền & Dưới cùng (Bottom Bar)">
        <Fld label="Dòng bản quyền (Copyright)">
          <Inp
            placeholder="Ví dụ: © 2025 Công ty TNHH Đào Tạo Phát Triển CUS..."
            defaultValue="© 2025 Công ty TNHH Đào Tạo Phát Triển CUS. Bảo lưu mọi quyền."
          />
        </Fld>
        <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-2.5 mt-1">
          Policy Links
        </div>
        <div className="flex flex-col gap-2">
          {policyRows.map((row, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                placeholder="Tên hiển thị"
                defaultValue={row.name}
                className={`${mInput} flex-[0_0_200px] box-border`}
                onChange={(e) => setPolicyRows((r) => r.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
              />
              <input
                placeholder="URL"
                defaultValue={row.url}
                className={`${mInput} flex-1`}
                onChange={(e) => setPolicyRows((r) => r.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end gap-2.5 pt-2">
        <button className="px-6 py-[11px] rounded-xl border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-300)] ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]">
          Hủy
        </button>
        <button className="px-6 py-[11px] rounded-xl !border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]">
          Lưu thay đổi
        </button>
      </div>
    </>
  )
}

const FooterTab = () => <FooterForm />

export default FooterTab
