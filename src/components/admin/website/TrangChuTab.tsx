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

const SmallCircle = ({
  label,
  preview,
  setPreview,
  id,
}: {
  label: string
  preview: string | null
  setPreview: (v: string | null) => void
  id: string
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-[var(--border-600)] bg-[var(--surface-100)] cursor-pointer overflow-hidden flex items-center justify-center hover:bg-[var(--border-300)] transition-colors duration-140"
      onClick={() => document.getElementById(id)?.click()}
    >
      {preview ? (
        <img src={preview} alt={label} className="w-full h-full object-cover" />
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-[var(--text-secondary-300)]">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)) }}
      />
    </div>
    <span className="[font-family:var(--font-body)] text-xs text-[var(--text-secondary-300)]">{label}</span>
  </div>
)

const BigDropzone = ({
  preview,
  setPreview,
  id,
}: {
  preview: string | null
  setPreview: (v: string | null) => void
  id: string
}) => (
  <div
    className="border-2 border-dashed border-[var(--border-600)] rounded-[var(--radius-md)] p-9 text-center cursor-pointer bg-[var(--surface-100)] min-h-[160px] flex flex-col items-center justify-center gap-2.5 hover:bg-[var(--border-300)] transition-colors duration-140"
    onClick={() => document.getElementById(id)?.click()}
  >
    {preview ? (
      <img src={preview} alt="preview" className="max-h-[140px] rounded-[var(--radius-sm)] object-cover" />
    ) : (
      <>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-[var(--text-secondary-300)]">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <div className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
          Kéo thả hoặc <span className="text-[var(--brand-500)] font-semibold">chọn ảnh</span>
        </div>
        <div className="[font-family:var(--font-body)] text-[11px] text-[var(--text-secondary-300)]">
          PNG, JPG, WEBP · tối đa 5MB
        </div>
      </>
    )}
    <input
      id={id}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)) }}
    />
  </div>
)

const TrangChuTab = () => {
  const [heroPreview, setHeroPreview] = useState<string | null>(null)
  const [av1, setAv1] = useState<string | null>(null)
  const [av2, setAv2] = useState<string | null>(null)
  const [av3, setAv3] = useState<string | null>(null)

  return (
    <div>
      {/* Section 1 — Nội dung chính */}
      <SectionCard title="1. Nội dung chính">
        <Fld label="Badge tiêu đề">
          <Inp placeholder="Ví dụ: LUYỆN THI ĐGNL - CUS" defaultValue="Luyện thi ĐGNL - CUS" />
        </Fld>
        <Fld label="Tiêu đề dòng 1">
          <Inp placeholder="Ví dụ: Cơ hội do bạn quyết —" defaultValue="Cơ hội do bạn quyết —" />
        </Fld>
        <Fld label="Tiêu đề dòng 2 (In đậm)">
          <Inp placeholder="Ví dụ: Tương lai do bạn chọn!" defaultValue="Tương lai do bạn chọn!" />
        </Fld>
        <Fld label="Đoạn mô tả">
          <textarea
            placeholder="Nhập mô tả ngắn cho trang chủ..."
            defaultValue="Đội ngũ giảng viên chuyên gia, lộ trình cá nhân hóa và hơn 3.400 học viên đã đỗ vào các trường đại học hàng đầu Việt Nam."
            className={`${mInput} resize-y min-h-[90px] [font-family:var(--font-body)]`}
          />
        </Fld>
      </SectionCard>

      {/* Section 2 — CTA */}
      <SectionCard title="2. Nút điều hướng (CTA)">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Nút chính
            </div>
            <Fld label="Tên nút 1"><Inp placeholder="Ví dụ: Bắt đầu ngay" defaultValue="Bắt đầu ngay" /></Fld>
            <Fld label="Đường dẫn (URL) nút 1"><Inp placeholder="Ví dụ: /register" defaultValue="/register" /></Fld>
          </div>
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Nút phụ
            </div>
            <Fld label="Tên nút 2"><Inp placeholder="Ví dụ: Xem khóa học" defaultValue="Xem khóa học" /></Fld>
            <Fld label="Đường dẫn (URL) nút 2"><Inp placeholder="Ví dụ: /courses" defaultValue="/courses" /></Fld>
          </div>
        </div>
      </SectionCard>

      {/* Section 3 — Hero image & floating stats */}
      <SectionCard title="3. Hình ảnh & chỉ số nổi">
        <Fld label="Ảnh bìa chính (Main Image)">
          <BigDropzone preview={heroPreview} setPreview={setHeroPreview} id="cms-hero-img" />
        </Fld>
        <div className="grid grid-cols-2 gap-5 mt-1">
          {[
            { label: "Chỉ số nổi 1 (góc trên phải)", numPh: "29 / 30", numDef: "29 / 30", descPh: "Điểm thi cao nhất 2024", descDef: "Điểm thi cao nhất 2024" },
            { label: "Chỉ số nổi 2 (góc dưới trái)",  numPh: "96%",       numDef: "96%",       descPh: "đạt điểm mục tiêu",      descDef: "đạt điểm mục tiêu" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[var(--border-300)] p-4">
              <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3">
                {s.label}
              </div>
              <Fld label="Số"><Inp placeholder={`Ví dụ: ${s.numPh}`} defaultValue={s.numDef} /></Fld>
              <Fld label="Mô tả"><Inp placeholder={`Ví dụ: ${s.descPh}`} defaultValue={s.descDef} /></Fld>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Section 4 — Student stats */}
      <SectionCard title="4. Thống kê học viên">
        <div className="flex gap-8 justify-center mb-5 py-3">
          <SmallCircle label="Avatar 1" preview={av1} setPreview={setAv1} id="cms-av1" />
          <SmallCircle label="Avatar 2" preview={av2} setPreview={setAv2} id="cms-av2" />
          <SmallCircle label="Avatar 3" preview={av3} setPreview={setAv3} id="cms-av3" />
        </div>
        <Fld label="Mô tả thống kê học viên">
          <textarea
            placeholder="Ví dụ: 3.400+ học viên đã đỗ vào các trường đại học top đầu"
            defaultValue="3.400+ học viên đã đỗ vào các trường đại học hàng đầu Việt Nam"
            className={`${mInput} resize-y min-h-[72px] [font-family:var(--font-body)]`}
          />
        </Fld>
      </SectionCard>

      <div className="flex justify-end gap-2.5 pt-2">
        <button className="px-6 py-[11px] rounded-xl border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-300)] ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]">
          Hủy
        </button>
        <button className="px-6 py-[11px] rounded-xl !border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]">
          Lưu thay đổi
        </button>
      </div>
    </div>
  )
}

export default TrangChuTab
