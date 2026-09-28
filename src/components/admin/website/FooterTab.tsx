import { useState, useEffect } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { mLabel, mInput } from '../modals/website/ModalHelpers'
import { useNotification } from '../../common/NotificationProvider'
import {
  useGetFooterContentQuery,
  useUpdateFooterContentMutation,
} from '../../../hooks/queries/useWebsiteManagement'
import type { FooterLinkItemRequest, UpdateFooterRequest } from '../../../types/api/websiteManagement.api'
import RouteCascader from './RouteCascader'

type LinkRow = {
  id?: string
  label: string
  url: string
}

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

const MAX_LINKS_PER_CATEGORY = 8

const normalizeLinkUrl = (url: string): string => {
  if (!url) return ''
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('//')
  ) {
    return trimmed
  }
  if (trimmed.startsWith('www.')) {
    return `https://${trimmed}`
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

const NavColRows = ({
  rows,
  setRows,
}: {
  rows: LinkRow[]
  setRows: React.Dispatch<React.SetStateAction<LinkRow[]>>
}) => {
  const isMaxReached = rows.length >= MAX_LINKS_PER_CATEGORY

  const handleUrlBlur = (i: number, val: string) => {
    const normalized = normalizeLinkUrl(val)
    if (normalized !== val) {
      setRows((r) => r.map((x, j) => (j === i ? { ...x, url: normalized } : x)))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[var(--text-secondary-400)] font-medium">
          {rows.length}/{MAX_LINKS_PER_CATEGORY} mục
        </span>
        {isMaxReached && (
          <span className="text-xs text-amber-600 font-semibold">
            Đã đạt giới hạn tối đa {MAX_LINKS_PER_CATEGORY} mục
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-2.5">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              placeholder="Tên hiển thị"
              value={row.label}
              maxLength={150}
              className={`${mInput} flex-[0_0_140px] box-border`}
              onChange={(e) => setRows((r) => r.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
            />
            <RouteCascader
              urlValue={row.url}
              onSelect={(selectedLabel, selectedUrl) => {
                setRows((r) =>
                  r.map((x, j) =>
                    j === i
                      ? {
                          ...x,
                          label: selectedLabel,
                          url: selectedUrl,
                        }
                      : x
                  )
                )
              }}
              onUrlChange={(newUrl) => {
                setRows((r) => r.map((x, j) => (j === i ? { ...x, url: newUrl } : x)))
              }}
              onUrlBlur={() => handleUrlBlur(i, row.url)}
            />
            <button
                type="button"
                onClick={() => setRows((r) => r.filter((_, j) => j !== i))}
                className="w-8 h-8 flex-shrink-0 rounded-lg border !border-[var(--border-500)] bg-white cursor-pointer flex items-center justify-center hover:bg-[var(--surface-600)] transition-colors"
                title="Xóa mục này"
              >
                <Trash2 size={13} className="text-[var(--error-500)]" />
              </button>
            </div>
          ))}
      </div>
      <button
        type="button"
        disabled={isMaxReached}
        onClick={() => {
          if (!isMaxReached) {
            setRows((r) => [...r, { label: '', url: '' }])
          }
        }}
        className={`flex items-center gap-1.5 px-3.5 py-[7px] !rounded-[var(--radius-sm)] !border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-600)] ![font-family:var(--font-heading)] !font-semibold !text-xs transition-colors ${
          isMaxReached ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[var(--surface-600)]'
        }`}
      >
        + Thêm mục mới
      </button>
    </div>
  )
}

const FooterTab = () => {
  const { data: response, isLoading, isError, error, refetch } = useGetFooterContentQuery()
  const updateMutation = useUpdateFooterContentMutation()
  const { showError } = useNotification()

  const footer = response?.data

  // Form states
  const [companyName, setCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [tiktokUrl, setTiktokUrl] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [workingHours, setWorkingHours] = useState('')
  const [copyrightText, setCopyrightText] = useState('')
  const [privacyUrl, setPrivacyUrl] = useState('')
  const [termsUrl, setTermsUrl] = useState('')

  const [col1, setCol1] = useState<LinkRow[]>([])
  const [col2, setCol2] = useState<LinkRow[]>([])

  useEffect(() => {
    if (footer) {
      setCompanyName(footer.companyName ?? '')
      setAddress(footer.address ?? '')
      setFacebookUrl(footer.facebookUrl ?? '')
      setInstagramUrl(footer.instagramUrl ?? '')
      setYoutubeUrl(footer.youtubeUrl ?? '')
      setTiktokUrl(footer.tiktokUrl ?? '')
      setPhone(footer.phone ?? '')
      setEmail(footer.email ?? '')
      setWebsite(footer.website ?? '')
      setWorkingHours(footer.workingHours ?? '')
      setCopyrightText(footer.copyrightText ?? '')
      setPrivacyUrl(footer.privacyUrl ?? '')
      setTermsUrl(footer.termsUrl ?? '')

      const links = footer.links || []
      const programLinks = links
        .filter((l) => l.category === 'PROGRAM')
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((l) => ({ id: l.id, label: l.label, url: l.url }))
      const aboutLinks = links
        .filter((l) => l.category === 'ABOUT')
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((l) => ({ id: l.id, label: l.label, url: l.url }))

      setCol1(programLinks)
      setCol2(aboutLinks)
    }
  }, [footer])

  const handleReset = () => {
    if (footer) {
      setCompanyName(footer.companyName ?? '')
      setAddress(footer.address ?? '')
      setFacebookUrl(footer.facebookUrl ?? '')
      setInstagramUrl(footer.instagramUrl ?? '')
      setYoutubeUrl(footer.youtubeUrl ?? '')
      setTiktokUrl(footer.tiktokUrl ?? '')
      setPhone(footer.phone ?? '')
      setEmail(footer.email ?? '')
      setWebsite(footer.website ?? '')
      setWorkingHours(footer.workingHours ?? '')
      setCopyrightText(footer.copyrightText ?? '')
      setPrivacyUrl(footer.privacyUrl ?? '')
      setTermsUrl(footer.termsUrl ?? '')

      const links = footer.links || []
      setCol1(
        links
          .filter((l) => l.category === 'PROGRAM')
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((l) => ({ id: l.id, label: l.label, url: l.url }))
      )
      setCol2(
        links
          .filter((l) => l.category === 'ABOUT')
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((l) => ({ id: l.id, label: l.label, url: l.url }))
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (address.length > 100) {
      showError('Địa chỉ không được vượt quá 100 ký tự.')
      return
    }

    if (col1.length > MAX_LINKS_PER_CATEGORY || col2.length > MAX_LINKS_PER_CATEGORY) {
      showError(`Mỗi danh mục chỉ được tối đa ${MAX_LINKS_PER_CATEGORY} liên kết.`)
      return
    }

    // Check link rows
    for (const item of [...col1, ...col2]) {
      if (!item.label.trim() || !item.url.trim()) {
        showError('Tất cả các liên kết phải có tên hiển thị và URL đầy đủ.')
        return
      }
    }

    const linksToSubmit: FooterLinkItemRequest[] = [
      ...col1.map((item, idx) => ({
        id: item.id,
        label: item.label.trim(),
        url: normalizeLinkUrl(item.url),
        sortOrder: idx,
        category: 'PROGRAM' as const,
      })),
      ...col2.map((item, idx) => ({
        id: item.id,
        label: item.label.trim(),
        url: normalizeLinkUrl(item.url),
        sortOrder: idx,
        category: 'ABOUT' as const,
      })),
    ]

    const payload: UpdateFooterRequest = {
      companyName: companyName.trim(),
      address: address.trim(),
      facebookUrl: facebookUrl.trim(),
      instagramUrl: instagramUrl.trim(),
      youtubeUrl: youtubeUrl.trim(),
      tiktokUrl: tiktokUrl.trim(),
      phone: phone.trim(),
      email: email.trim(),
      website: website.trim(),
      workingHours: workingHours.trim(),
      copyrightText: copyrightText.trim(),
      privacyUrl: privacyUrl.trim(),
      termsUrl: termsUrl.trim(),
      links: linksToSubmit,
    }

    updateMutation.mutate(payload)
  }

  if (isLoading) {
    return (
      <div className="py-16 text-center text-[var(--text-secondary-400)] flex flex-col items-center justify-center gap-3">
        <Loader2 size={24} className="animate-spin text-[var(--brand-500)]" />
        <span className="[font-family:var(--font-heading)] text-sm font-semibold">Đang tải dữ liệu footer...</span>
      </div>
    )
  }

  if (isError) {
    const errorMsg = (error as any)?.response?.data?.message || (error as any)?.message || 'Không thể tải dữ liệu footer.'
    return (
      <div className="p-6 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-center my-4">
        <p className="font-semibold text-sm mb-2">{errorMsg}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-xs font-bold hover:bg-[#B91C1C] cursor-pointer"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Section 1 — Company & Social */}
      <SectionCard title="1. Thông tin Công ty & Mạng xã hội">
        <Fld label="Tên công ty">
          <input
            placeholder="Ví dụ: CÔNG TY TNHH ĐÀO TẠO PHÁT TRIỂN CUS"
            value={companyName}
            maxLength={255}
            onChange={(e) => setCompanyName(e.target.value)}
            className={mInput}
          />
        </Fld>
        <Fld label={`Địa chỉ (${address.length}/100 ký tự)`}>
          <textarea
            placeholder="Ví dụ: 479 Mã Lò, phường Bình Hưng Hoà A, quận Bình Tân, TP.HCM (tối đa 100 ký tự)"
            value={address}
            maxLength={100}
            onChange={(e) => setAddress(e.target.value)}
            className={`${mInput} resize-y min-h-[72px] [font-family:var(--font-body)]`}
          />
        </Fld>
        <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-2.5 mt-1">
          Mạng xã hội
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Fld label="Facebook URL">
            <input
              placeholder="https://facebook.com/..."
              value={facebookUrl}
              maxLength={500}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="Instagram URL">
            <input
              placeholder="https://instagram.com/..."
              value={instagramUrl}
              maxLength={500}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="YouTube URL">
            <input
              placeholder="https://youtube.com/..."
              value={youtubeUrl}
              maxLength={500}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="TikTok URL">
            <input
              placeholder="https://tiktok.com/..."
              value={tiktokUrl}
              maxLength={500}
              onChange={(e) => setTiktokUrl(e.target.value)}
              className={mInput}
            />
          </Fld>
        </div>
      </SectionCard>

      {/* Section 2 — Nav columns */}
      <SectionCard title="2. Cột điều hướng (Links)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Chương trình học (PROGRAM)
            </div>
            <NavColRows rows={col1} setRows={setCol1} />
          </div>
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Về CUS (ABOUT)
            </div>
            <NavColRows rows={col2} setRows={setCol2} />
          </div>
        </div>
      </SectionCard>

      {/* Section 3 — Contact */}
      <SectionCard title="3. Thông tin Liên hệ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Fld label="Số điện thoại">
            <input
              placeholder="Ví dụ: 036 217 4805"
              value={phone}
              maxLength={50}
              onChange={(e) => setPhone(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="Email">
            <input
              placeholder="Ví dụ: luyenthicungcus@gmail.com"
              value={email}
              maxLength={150}
              onChange={(e) => setEmail(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="Website">
            <input
              placeholder="Ví dụ: www.luyenthicungcus.com.vn"
              value={website}
              maxLength={255}
              onChange={(e) => setWebsite(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="Giờ làm việc">
            <input
              placeholder="Ví dụ: T2–T7: 7:30–21:00"
              value={workingHours}
              maxLength={100}
              onChange={(e) => setWorkingHours(e.target.value)}
              className={mInput}
            />
          </Fld>
        </div>
      </SectionCard>

      {/* Section 4 — Copyright & policy */}
      <SectionCard title="4. Bản quyền & Dưới cùng (Bottom Bar)">
        <Fld label="Dòng bản quyền (Copyright)">
          <input
            placeholder="Ví dụ: © 2025 Công ty TNHH Đào Tạo Phát Triển CUS. Bảo lưu mọi quyền."
            value={copyrightText}
            maxLength={255}
            onChange={(e) => setCopyrightText(e.target.value)}
            className={mInput}
          />
        </Fld>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <Fld label="Đường dẫn Chính sách bảo mật (Privacy URL)">
            <input
              placeholder="Ví dụ: /privacy"
              value={privacyUrl}
              maxLength={500}
              onChange={(e) => setPrivacyUrl(e.target.value)}
              className={mInput}
            />
          </Fld>
          <Fld label="Đường dẫn Điều khoản dịch vụ (Terms URL)">
            <input
              placeholder="Ví dụ: /terms"
              value={termsUrl}
              maxLength={500}
              onChange={(e) => setTermsUrl(e.target.value)}
              className={mInput}
            />
          </Fld>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={updateMutation.isPending}
          className="px-6 py-[11px] rounded-xl border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-300)] ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)] disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 px-6 py-[11px] rounded-xl !border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)] disabled:opacity-50"
        >
          {updateMutation.isPending && (
            <Loader2 size={16} className="animate-spin text-white" />
          )}
          {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  )
}

export default FooterTab
