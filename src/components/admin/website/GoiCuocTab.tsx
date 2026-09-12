import { useState, useEffect, useCallback } from 'react'
import { mLabel, mInput } from '@/components/admin/modals/website/ModalHelpers'
import { Spinner } from '@/components/Loading'
import {
  useGetPricingPageQuery,
  useUpdatePricingPageMutation,
  useAddFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} from '@/hooks/queries/usePricingPage'
import type {
  FeatureIconAccess,
  PricingPageUpdateRequest,
} from '@/types/api/pricingPage.api'
import { useNotification } from '@/components/common/NotificationProvider'

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

type LocalFeatureRow = {
  id: string
  featureName: string
  iconNormalAccess: FeatureIconAccess
  normalAccess: string
  iconVipAccess: FeatureIconAccess
  vipAccess: string
  isNew?: boolean
}

const ICON_OPTS: { value: FeatureIconAccess; label: string }[] = [
  { value: 'CHECKED', label: '✅ Tick xanh' },
  { value: 'UNCHECKED', label: '❌ X đỏ' },
  { value: 'NON_EXIST', label: '— Không có' },
]

const vipLabelCls = '![color:var(--warning-500)]'
const vipBorderCls = '![border-color:#F5C518]'

const GoiCuocForm = () => {
  const { data: pageData, isLoading } = useGetPricingPageQuery()
  const updatePricingPageMutation = useUpdatePricingPageMutation()
  const addFeatureMutation = useAddFeatureMutation()
  const updateFeatureMutation = useUpdateFeatureMutation()
  const deleteFeatureMutation = useDeleteFeatureMutation()

  const { showSuccess, showError } = useNotification()
  const [isSaving, setIsSaving] = useState(false)

  // Normal Plan Form State
  const [normalName, setNormalName] = useState('Tài khoản Thường')
  const [normalPrice, setNormalPrice] = useState('Miễn phí')
  const [normalDesc, setNormalDesc] = useState('Phù hợp để khám phá nền tảng CUS với các tính năng cơ bản.')
  const [normalBtnText, setNormalBtnText] = useState('Đang sử dụng')

  // VIP Plan Form State
  const [vipTag, setVipTag] = useState('+ Phổ biến')
  const [vipName, setVipName] = useState('Tài khoản VIP')
  const [vipPrice, setVipPrice] = useState('199.000 đ')
  const [vipBillingPeriod, setVipBillingPeriod] = useState('/tháng')
  const [vipDesc, setVipDesc] = useState('Đầy đủ tính năng, không giới hạn truy cập toàn bộ nội dung và đề thi.')
  const [vipBtnText, setVipBtnText] = useState('Nâng cấp ngay +')

  // Feature Comparison Table State
  const [features, setFeatures] = useState<LocalFeatureRow[]>([])
  const [deletedFeatureIds, setDeletedFeatureIds] = useState<string[]>([])

  const syncDataToState = useCallback(() => {
    if (pageData?.data) {
      const { normalPackage, vipPackage, features: apiFeatures } = pageData.data

      if (normalPackage) {
        setNormalName(normalPackage.name || '')
        setNormalPrice(normalPackage.price || '')
        setNormalDesc(normalPackage.description || '')
        setNormalBtnText(normalPackage.buttonText || '')
      }

      if (vipPackage) {
        setVipTag(vipPackage.tag || '')
        setVipName(vipPackage.name || '')
        setVipPrice(vipPackage.price || '')
        setVipBillingPeriod(vipPackage.billingPeriod || '')
        setVipDesc(vipPackage.description || '')
        setVipBtnText(vipPackage.buttonText || '')
      }

      if (apiFeatures && apiFeatures.length > 0) {
        setFeatures(
          apiFeatures.map((f) => ({
            id: f.id,
            featureName: f.featureName,
            iconNormalAccess: f.iconNormalAccess || 'CHECKED',
            normalAccess: f.normalAccess || '',
            iconVipAccess: f.iconVipAccess || 'CHECKED',
            vipAccess: f.vipAccess || '',
          }))
        )
      } else {
        setFeatures([])
      }
      setDeletedFeatureIds([])
    }
  }, [pageData])

  useEffect(() => {
    syncDataToState()
  }, [syncDataToState])

  const addFeature = () => {
    const newId = `temp-${Date.now()}`
    setFeatures((f) => [
      ...f,
      {
        id: newId,
        featureName: '',
        iconNormalAccess: 'CHECKED',
        normalAccess: '',
        iconVipAccess: 'CHECKED',
        vipAccess: '',
        isNew: true,
      },
    ])
  }

  const removeFeature = (id: string) => {
    setFeatures((f) => f.filter((r) => r.id !== id))
    if (!id.startsWith('temp-')) {
      setDeletedFeatureIds((prev) => [...prev, id])
    }
  }

  const updateFeatureField = (id: string, field: keyof LocalFeatureRow, val: any) => {
    setFeatures((f) => f.map((r) => (r.id === id ? { ...r, [field]: val } : r)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const start = Date.now()

    try {
      // 1. Update general pricing page info
      const updatePayload: PricingPageUpdateRequest = {
        normalPackage: {
          name: normalName.trim(),
          price: normalPrice.trim(),
          description: normalDesc.trim(),
          buttonText: normalBtnText.trim(),
        },
        vipPackage: {
          name: vipName.trim(),
          price: vipPrice.trim(),
          billingPeriod: vipBillingPeriod.trim(),
          description: vipDesc.trim(),
          buttonText: vipBtnText.trim(),
          tag: vipTag.trim(),
        },
      }
      await updatePricingPageMutation.mutateAsync(updatePayload)

      // 2. Delete removed features
      for (const delId of deletedFeatureIds) {
        await deleteFeatureMutation.mutateAsync(delId)
      }

      // 3. Add or update features
      for (const row of features) {
        if (!row.featureName.trim()) continue
        const req = {
          featureName: row.featureName.trim(),
          iconNormalAccess: row.iconNormalAccess,
          normalAccess: row.normalAccess.trim(),
          iconVipAccess: row.iconVipAccess,
          vipAccess: row.vipAccess.trim(),
          normalHasIcon: row.iconNormalAccess !== 'NON_EXIST',
          vipHasIcon: row.iconVipAccess !== 'NON_EXIST',
        }

        if (row.isNew || row.id.startsWith('temp-')) {
          await addFeatureMutation.mutateAsync(req)
        } else {
          await updateFeatureMutation.mutateAsync({ id: row.id, data: req })
        }
      }

      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      showSuccess('Cập nhật thông tin gói cước thành công!')
      setDeletedFeatureIds([])
    } catch (error: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      const errMsg = error?.response?.data?.message || error?.message || 'Lỗi khi lưu gói cước!'
      showError(errMsg)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-[60px] text-center [font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)] flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" color="brand" />
        <span>Đang tải thông tin gói cước...</span>
      </div>
    )
  }

  return (
    <>
      {/* Section 1 — Plan info */}
      <SectionCard title="1. Thông tin Gói cước">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="bg-white border border-[var(--border-300)] rounded-[var(--radius-md)] p-5">
            <div className="[font-family:var(--font-heading)] font-extrabold text-[13px] text-[var(--text-secondary-600)] uppercase tracking-[0.5px] mb-4 pb-2.5 border-b border-[var(--surface-600)]">
              Tài khoản Thường
            </div>
            <Fld label="Tên gói">
              <input
                placeholder="Ví dụ: Tài khoản Thường"
                value={normalName}
                onChange={(e) => setNormalName(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Giá">
              <input
                placeholder="Ví dụ: Miễn phí"
                value={normalPrice}
                onChange={(e) => setNormalPrice(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Mô tả">
              <textarea
                placeholder="Phù hợp để khám phá nền tảng CUS..."
                value={normalDesc}
                onChange={(e) => setNormalDesc(e.target.value)}
                className={`${mInput} resize-y min-h-[80px] [font-family:var(--font-body)]`}
              />
            </Fld>
            <Fld label="Chữ trên nút bấm">
              <input
                placeholder="Ví dụ: Đang sử dụng"
                value={normalBtnText}
                onChange={(e) => setNormalBtnText(e.target.value)}
                className={mInput}
              />
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
              <input
                placeholder="Ví dụ: + Phổ biến"
                value={vipTag}
                onChange={(e) => setVipTag(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Tên gói">
              <input
                placeholder="Ví dụ: Tài khoản VIP"
                value={vipName}
                onChange={(e) => setVipName(e.target.value)}
                className={mInput}
              />
            </Fld>
            <div className="mb-3.5">
              <label className={mLabel}>Giá &amp; Chu kỳ</label>
              <div className="flex gap-2">
                <input
                  placeholder="199.000 đ"
                  value={vipPrice}
                  onChange={(e) => setVipPrice(e.target.value)}
                  className={`${mInput} flex-[2]`}
                />
                <input
                  placeholder="/tháng"
                  value={vipBillingPeriod}
                  onChange={(e) => setVipBillingPeriod(e.target.value)}
                  className={`${mInput} flex-[1]`}
                />
              </div>
            </div>
            <Fld label="Mô tả">
              <textarea
                placeholder="Đầy đủ tính năng, không giới hạn..."
                value={vipDesc}
                onChange={(e) => setVipDesc(e.target.value)}
                className={`${mInput} resize-y min-h-[80px] [font-family:var(--font-body)]`}
              />
            </Fld>
            <Fld label="Chữ trên nút bấm">
              <input
                placeholder="Ví dụ: Nâng cấp ngay +"
                value={vipBtnText}
                onChange={(e) => setVipBtnText(e.target.value)}
                className={mInput}
              />
            </Fld>
          </div>
        </div>
      </SectionCard>

      {/* Section 2 — Feature comparison */}
      <SectionCard title="2. So sánh tính năng">
        {/* Column headers */}
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
                  value={row.featureName}
                  placeholder="Ví dụ: Làm đề thi"
                  onChange={(e) => updateFeatureField(row.id, 'featureName', e.target.value)}
                  className={`${mInput} !font-semibold !text-[13px]`}
                />
              </div>

              {/* Normal col */}
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-[110px] shrink-0">
                  <label className={`${mLabel} !mb-0`}>Icon</label>
                  <select
                    value={row.iconNormalAccess}
                    onChange={(e) => updateFeatureField(row.id, 'iconNormalAccess', e.target.value as FeatureIconAccess)}
                    className={`${mInput} !cursor-pointer !appearance-none !text-[13px]`}
                  >
                    {ICON_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className={`${mLabel} !mb-0`}>Mô tả - Thường</label>
                  <textarea
                    value={row.normalAccess}
                    placeholder="Mô tả..."
                    onChange={(e) => updateFeatureField(row.id, 'normalAccess', e.target.value)}
                    rows={2}
                    className={`${mInput} !resize-y ![font-family:var(--font-body)] !text-[13px]`}
                  />
                </div>
              </div>

              {/* VIP col */}
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-[110px] shrink-0">
                  <label className={`${mLabel} !mb-0 ${vipLabelCls}`}>Icon</label>
                  <select
                    value={row.iconVipAccess}
                    onChange={(e) => updateFeatureField(row.id, 'iconVipAccess', e.target.value as FeatureIconAccess)}
                    className={`${mInput} !cursor-pointer !appearance-none ${vipBorderCls} !text-[13px]`}
                  >
                    {ICON_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className={`${mLabel} !mb-0 ${vipLabelCls}`}>Mô tả - VIP</label>
                  <textarea
                    value={row.vipAccess}
                    placeholder="Mô tả..."
                    onChange={(e) => updateFeatureField(row.id, 'vipAccess', e.target.value)}
                    rows={2}
                    className={`${mInput} !resize-y ![font-family:var(--font-body)] !text-[13px] ${vipBorderCls}`}
                  />
                </div>
              </div>

              {/* Delete */}
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
        <button
          type="button"
          onClick={syncDataToState}
          disabled={isSaving}
          className="px-6 py-[11px] rounded-xl border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-300)] ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-[11px] rounded-xl !border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving && <Spinner size="sm" color="white" />}
          <span>Lưu thay đổi</span>
        </button>
      </div>
    </>
  )
}

const GoiCuocTab = () => <GoiCuocForm />

export default GoiCuocTab
