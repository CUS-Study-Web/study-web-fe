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

type FeatureRow = { id: number; name: string; normalIcon: string; normalDesc: string; vipIcon: string; vipDesc: string }

const ICON_OPTS = [
  { value: 'tick', label: '✅ Tick xanh' },
  { value: 'x',   label: '❌ X đỏ' },
  { value: 'none', label: '— Không có' },
]

const INIT_FEATURES: FeatureRow[] = [
  { id: 1, name: 'Làm đề thi',          normalIcon: 'tick', normalDesc: 'Giới hạn 3 đề mỗi ngày',  vipIcon: 'tick', vipDesc: 'Không giới hạn' },
  { id: 2, name: 'Xem video bài giảng', normalIcon: 'x',    normalDesc: 'Không khả dụng',           vipIcon: 'tick', vipDesc: 'Toàn bộ thư viện video' },
]

// --warning-500 = #b7791f (VIP amber); #F5C518 has no CSS var, kept hardcoded
const vipLabelCls = '![color:var(--warning-500)]'
const vipBorderCls = '![border-color:#F5C518]'

// ponytail: GoiCuocForm owns all feature-row state — must be a component for hooks
const GoiCuocForm = () => {
  const [features, setFeatures] = useState<FeatureRow[]>(INIT_FEATURES)

  const addFeature = () =>
    setFeatures((f) => [...f, { id: Date.now(), name: '', normalIcon: 'tick', normalDesc: '', vipIcon: 'tick', vipDesc: '' }])
  const removeFeature = (id: number) => setFeatures((f) => f.filter((r) => r.id !== id))
  const updateFeature = (id: number, field: keyof FeatureRow, val: string) =>
    setFeatures((f) => f.map((r) => (r.id === id ? { ...r, [field]: val } : r)))

  return (
    <>
      {/* Section 1 — Plan info */}
      <SectionCard title="1. Thông tin Gói cước">
        <div className="grid grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="bg-white border border-[var(--border-300)] rounded-[var(--radius-md)] p-5">
            <div className="[font-family:var(--font-heading)] font-extrabold text-[13px] text-[var(--text-secondary-600)] uppercase tracking-[0.5px] mb-4 pb-2.5 border-b border-[var(--surface-600)]">
              Tài khoản Thường
            </div>
            <Fld label="Tên gói">
              <input placeholder="Ví dụ: Tài khoản Thường" defaultValue="Tài khoản Thường" className={mInput} />
            </Fld>
            <Fld label="Giá">
              <input placeholder="Ví dụ: Miễn phí" defaultValue="Miễn phí" className={mInput} />
            </Fld>
            <Fld label="Mô tả">
              <textarea
                placeholder="Phù hợp để khám phá nền tảng CUS..."
                defaultValue="Phù hợp để khám phá nền tảng CUS với các tính năng cơ bản."
                className={`${mInput} resize-y min-h-[80px] [font-family:var(--font-body)]`}
              />
            </Fld>
            <Fld label="Chữ trên nút bấm">
              <input placeholder="Ví dụ: Đang sử dụng" defaultValue="Đang sử dụng" className={mInput} />
            </Fld>
          </div>

          {/* VIP tier */}
          <div className="bg-white border-2 rounded-[var(--radius-md)] p-5 relative" style={{ borderColor: '#F5C518' }}>
            <div className="absolute -top-3 left-4 rounded-full px-3 py-[3px] [font-family:var(--font-heading)] font-extrabold text-[11px] text-[var(--text-primary)]" style={{ background: '#F5C518' }}>
              ★ GÓI NỔI BẬT
            </div>
            <div className="[font-family:var(--font-heading)] font-extrabold text-[13px] text-[var(--warning-500)] uppercase tracking-[0.5px] mb-4 pb-2.5" style={{ borderBottom: '1px solid #FEF3C7' }}>
              Tài khoản VIP
            </div>
            <Fld label="Tag nổi bật">
              <input placeholder="Ví dụ: + Phổ biến" defaultValue="+ Phổ biến" className={mInput} />
            </Fld>
            <Fld label="Tên gói">
              <input placeholder="Ví dụ: Tài khoản VIP" defaultValue="Tài khoản VIP" className={mInput} />
            </Fld>
            <div className="mb-3.5">
              <label className={mLabel}>Giá &amp; Chu kỳ</label>
              <div className="flex gap-2">
                <input placeholder="199.000 đ" defaultValue="199.000 đ" className={`${mInput} flex-[2]`} />
                <input placeholder="/tháng"    defaultValue="/tháng"    className={`${mInput} flex-[1]`} />
              </div>
            </div>
            <Fld label="Mô tả">
              <textarea
                placeholder="Đầy đủ tính năng, không giới hạn..."
                defaultValue="Đầy đủ tính năng, không giới hạn truy cập toàn bộ nội dung và đề thi."
                className={`${mInput} resize-y min-h-[80px] [font-family:var(--font-body)]`}
              />
            </Fld>
            <Fld label="Chữ trên nút bấm">
              <input placeholder="Ví dụ: Nâng cấp ngay +" defaultValue="Nâng cấp ngay +" className={mInput} />
            </Fld>
          </div>
        </div>
      </SectionCard>

      {/* Section 2 — Feature comparison */}
      <SectionCard title="2. So sánh tính năng">
        {/* Column headers — 3-zone layout matching row grid */}
        <div className="grid grid-cols-[2fr_minmax(0,1.6fr)_minmax(0,1.6fr)_36px] gap-x-3 mb-2 pb-2 border-b border-[var(--border-300)]">
          <div className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px]">
            Tên tính năng
          </div>
          <div className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px]">
            Cột Thường
          </div>
          <div className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--warning-500)] uppercase tracking-[0.4px]">
            Cột VIP
          </div>
          <div />
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-3 mb-3.5">
          {features.map((row) => (
            <div
              key={row.id}
              className="bg-white border border-[var(--border-300)] rounded-xl p-4 grid grid-cols-[2fr_minmax(0,1.6fr)_minmax(0,1.6fr)_36px] gap-x-3 items-start"
            >
              {/* Feature name */}
              <div className="flex flex-col gap-1">
                <label className={`${mLabel} !mb-0`}>Tên tính năng</label>
                <input
                  defaultValue={row.name}
                  placeholder="Ví dụ: Làm đề thi"
                  onChange={(e) => updateFeature(row.id, 'name', e.target.value)}
                  className={`${mInput} !font-semibold !text-[13px]`}
                />
              </div>

              {/* Normal col */}
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-[110px] shrink-0">
                  <label className={`${mLabel} !mb-0`}>Icon</label>
                  <select
                    defaultValue={row.normalIcon}
                    onChange={(e) => updateFeature(row.id, 'normalIcon', e.target.value)}
                    className={`${mInput} !cursor-pointer !appearance-none !text-[13px]`}
                  >
                    {ICON_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className={`${mLabel} !mb-0`}>Mô tả - Thường</label>
                  <textarea
                    defaultValue={row.normalDesc}
                    placeholder="Mô tả..."
                    onChange={(e) => updateFeature(row.id, 'normalDesc', e.target.value)}
                    rows={2}
                    className={`${mInput} !resize-y ![font-family:var(--font-body)] !text-[13px]`}
                  />
                </div>
              </div>

              {/* VIP col — amber label + gold border */}
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-[110px] shrink-0">
                  <label className={`${mLabel} !mb-0 ${vipLabelCls}`}>Icon</label>
                  <select
                    defaultValue={row.vipIcon}
                    onChange={(e) => updateFeature(row.id, 'vipIcon', e.target.value)}
                    className={`${mInput} !cursor-pointer !appearance-none ${vipBorderCls} !text-[13px]`}
                  >
                    {ICON_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className={`${mLabel} !mb-0 ${vipLabelCls}`}>Mô tả - VIP</label>
                  <textarea
                    defaultValue={row.vipDesc}
                    placeholder="Mô tả..."
                    onChange={(e) => updateFeature(row.id, 'vipDesc', e.target.value)}
                    rows={2}
                    className={`${mInput} !resize-y ![font-family:var(--font-body)] !text-[13px] ${vipBorderCls}`}
                  />
                </div>
              </div>

              {/* Delete — aligned to first-row label height */}
              <div className="flex items-end pb-[2px] h-full">
                <button
                  type="button"
                  onClick={() => removeFeature(row.id)}
                  className="w-8 h-8 rounded-lg border border-[var(--error-100)] bg-[var(--error-50)] cursor-pointer flex items-center justify-center hover:bg-[var(--error-100)] transition-colors duration-140 shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[var(--error-500)]">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add feature */}
        <button
          type="button"
          onClick={addFeature}
          className="w-full py-[11px] rounded-xl border-2 border-dashed !border-[var(--border-600)] bg-[var(--surface-100)] !text-[var(--brand-500)] ![font-family:var(--font-heading)] !font-bold !text-[13px] cursor-pointer flex items-center justify-center gap-[7px] hover:bg-[var(--surface-300)] transition-colors duration-[var(--motion-fast)]"
        >
          + Thêm tính năng mới
        </button>
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

const GoiCuocTab = () => <GoiCuocForm />

export default GoiCuocTab
