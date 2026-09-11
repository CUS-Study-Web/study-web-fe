import { useState, useEffect } from 'react'
import { mLabel, mInput } from '../modals/website/ModalHelpers'
import { useNotification } from '../../common/NotificationProvider'
import { validateImageFile } from '../../../utils/fileUtils'
import {
  useGetHomepageContentQuery,
  useUpdateHomepageContentMutation,
} from '../../../hooks/queries/useWebsiteManagement'
import type { CtaTarget } from '../../../types/api/websiteManagement.api'

const CTA_TARGET_OPTIONS: { value: CtaTarget; label: string }[] = [
  { value: 'REGISTER', label: 'Trang đăng ký (/register)' },
  { value: 'COURSES', label: 'Danh sách khóa học (/courses)' },
  { value: 'LOGIN', label: 'Trang đăng nhập (/login)' },
  { value: 'ABOUT', label: 'Giới thiệu (/about)' },
]

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

const SmallCircle = ({
  label,
  preview,
  onFileSelect,
  id,
}: {
  label: string
  preview: string | null
  onFileSelect: (file: File, url: string) => void
  id: string
}) => {
  const { showError } = useNotification()
  return (
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
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) {
              try {
                validateImageFile(f)
                onFileSelect(f, URL.createObjectURL(f))
              } catch (err: any) {
                showError(err.message)
              }
            }
            e.target.value = ''
          }}
        />
      </div>
      <span className="[font-family:var(--font-body)] text-xs text-[var(--text-secondary-300)]">{label}</span>
    </div>
  )
}

const BigDropzone = ({
  preview,
  onFileSelect,
  id,
}: {
  preview: string | null
  onFileSelect: (file: File, url: string) => void
  id: string
}) => {
  const { showError } = useNotification()
  return (
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
            PNG, JPG, WEBP · tối đa 10MB
          </div>
        </>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) {
            try {
              validateImageFile(f)
              onFileSelect(f, URL.createObjectURL(f))
            } catch (err: any) {
              showError(err.message)
            }
          }
          e.target.value = ''
        }}
      />
    </div>
  )
}

const TrangChuTab = () => {
  const { data: response, isLoading, isError, error, refetch } = useGetHomepageContentQuery()
  const updateMutation = useUpdateHomepageContentMutation()
  const { showError } = useNotification()

  const homepage = response?.data

  // Form states
  const [badgeTitle, setBadgeTitle] = useState('')
  const [headline1, setHeadline1] = useState('')
  const [headline2, setHeadline2] = useState('')
  const [description, setDescription] = useState('')
  const [ctaBtn1Name, setCtaBtn1Name] = useState('')
  const [ctaBtn1Target, setCtaBtn1Target] = useState<CtaTarget>('REGISTER')
  const [ctaBtn2Name, setCtaBtn2Name] = useState('')
  const [ctaBtn2Target, setCtaBtn2Target] = useState<CtaTarget>('COURSES')
  const [stat1Number, setStat1Number] = useState('')
  const [stat1Desc, setStat1Desc] = useState('')
  const [stat2Number, setStat2Number] = useState('')
  const [stat2Desc, setStat2Desc] = useState('')
  const [studentStatsDesc, setStudentStatsDesc] = useState('')

  // Images and uploaded files
  const [heroPreview, setHeroPreview] = useState<string | null>(null)
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [av1Preview, setAv1Preview] = useState<string | null>(null)
  const [av1File, setAv1File] = useState<File | null>(null)
  const [av2Preview, setAv2Preview] = useState<string | null>(null)
  const [av2File, setAv2File] = useState<File | null>(null)
  const [av3Preview, setAv3Preview] = useState<string | null>(null)
  const [av3File, setAv3File] = useState<File | null>(null)

  // Sync state from server data
  useEffect(() => {
    if (homepage) {
      setBadgeTitle(homepage.badgeTitle ?? '')
      setHeadline1(homepage.headline1 ?? '')
      setHeadline2(homepage.headline2 ?? '')
      setDescription(homepage.description ?? '')
      setCtaBtn1Name(homepage.ctaBtn1Name ?? '')
      setCtaBtn1Target(homepage.ctaBtn1Target ?? 'REGISTER')
      setCtaBtn2Name(homepage.ctaBtn2Name ?? '')
      setCtaBtn2Target(homepage.ctaBtn2Target ?? 'COURSES')
      setStat1Number(homepage.stat1Number ?? '')
      setStat1Desc(homepage.stat1Desc ?? '')
      setStat2Number(homepage.stat2Number ?? '')
      setStat2Desc(homepage.stat2Desc ?? '')
      setStudentStatsDesc(homepage.studentStatsDesc ?? '')
      setHeroPreview(homepage.mainImageUrl ?? null)
      setHeroFile(null)
      setAv1Preview(homepage.student1Avatar ?? null)
      setAv1File(null)
      setAv2Preview(homepage.student2Avatar ?? null)
      setAv2File(null)
      setAv3Preview(homepage.student3Avatar ?? null)
      setAv3File(null)
    }
  }, [homepage])

  const handleReset = () => {
    if (homepage) {
      setBadgeTitle(homepage.badgeTitle ?? '')
      setHeadline1(homepage.headline1 ?? '')
      setHeadline2(homepage.headline2 ?? '')
      setDescription(homepage.description ?? '')
      setCtaBtn1Name(homepage.ctaBtn1Name ?? '')
      setCtaBtn1Target(homepage.ctaBtn1Target ?? 'REGISTER')
      setCtaBtn2Name(homepage.ctaBtn2Name ?? '')
      setCtaBtn2Target(homepage.ctaBtn2Target ?? 'COURSES')
      setStat1Number(homepage.stat1Number ?? '')
      setStat1Desc(homepage.stat1Desc ?? '')
      setStat2Number(homepage.stat2Number ?? '')
      setStat2Desc(homepage.stat2Desc ?? '')
      setStudentStatsDesc(homepage.studentStatsDesc ?? '')
      setHeroPreview(homepage.mainImageUrl ?? null)
      setHeroFile(null)
      setAv1Preview(homepage.student1Avatar ?? null)
      setAv1File(null)
      setAv2Preview(homepage.student2Avatar ?? null)
      setAv2File(null)
      setAv3Preview(homepage.student3Avatar ?? null)
      setAv3File(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Frontend validation to prevent 400 Bad Request
    if (description.length > 100) {
      showError('Đoạn mô tả không được vượt quá 100 ký tự.')
      return
    }
    if (studentStatsDesc.length > 50) {
      showError('Mô tả thống kê học viên không được vượt quá 50 ký tự.')
      return
    }

    const formData = new FormData()
    formData.append('badgeTitle', badgeTitle)
    formData.append('headline1', headline1)
    formData.append('headline2', headline2)
    formData.append('description', description)
    formData.append('ctaBtn1Name', ctaBtn1Name)
    formData.append('ctaBtn1Target', ctaBtn1Target)
    formData.append('ctaBtn2Name', ctaBtn2Name)
    formData.append('ctaBtn2Target', ctaBtn2Target)
    formData.append('stat1Number', stat1Number)
    formData.append('stat1Desc', stat1Desc)
    formData.append('stat2Number', stat2Number)
    formData.append('stat2Desc', stat2Desc)
    formData.append('studentStatsDesc', studentStatsDesc)

    if (heroFile) {
      formData.append('mainImage', heroFile)
    }
    if (av1File) {
      formData.append('student1Avatar', av1File)
    }
    if (av2File) {
      formData.append('student2Avatar', av2File)
    }
    if (av3File) {
      formData.append('student3Avatar', av3File)
    }

    updateMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <div className="py-16 text-center text-[var(--text-secondary-400)] flex flex-col items-center justify-center gap-3">
        <svg className="animate-spin h-6 w-6 text-[var(--brand-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="[font-family:var(--font-heading)] text-sm font-semibold">Đang tải dữ liệu trang chủ...</span>
      </div>
    )
  }

  if (isError) {
    const errorMsg = (error as any)?.response?.data?.message || (error as any)?.message || 'Không thể tải dữ liệu trang chủ.'
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
      {/* Section 1 — Nội dung chính */}
      <SectionCard title="1. Nội dung chính">
        <Fld label="Badge tiêu đề">
          <input
            placeholder="Ví dụ: Luyện thi ĐGNL - CUS"
            value={badgeTitle}
            maxLength={255}
            onChange={(e) => setBadgeTitle(e.target.value)}
            className={mInput}
          />
        </Fld>
        <Fld label="Tiêu đề dòng 1">
          <input
            placeholder="Ví dụ: Cơ hội do bạn quyết —"
            value={headline1}
            maxLength={255}
            onChange={(e) => setHeadline1(e.target.value)}
            className={mInput}
          />
        </Fld>
        <Fld label="Tiêu đề dòng 2 (In đậm)">
          <input
            placeholder="Ví dụ: Tương lai do bạn chọn!"
            value={headline2}
            maxLength={255}
            onChange={(e) => setHeadline2(e.target.value)}
            className={mInput}
          />
        </Fld>
        <Fld label={`Đoạn mô tả (${description.length}/100 ký tự)`}>
          <textarea
            placeholder="Nhập mô tả ngắn cho trang chủ (tối đa 100 ký tự)..."
            value={description}
            maxLength={100}
            onChange={(e) => setDescription(e.target.value)}
            className={`${mInput} resize-y min-h-[90px] [font-family:var(--font-body)]`}
          />
        </Fld>
      </SectionCard>

      {/* Section 2 — CTA */}
      <SectionCard title="2. Nút điều hướng (CTA)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Nút chính
            </div>
            <Fld label="Tên nút 1">
              <input
                placeholder="Ví dụ: Bắt đầu ngay"
                value={ctaBtn1Name}
                maxLength={100}
                onChange={(e) => setCtaBtn1Name(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Mục tiêu điều hướng (Target) nút 1">
              <select
                value={ctaBtn1Target}
                onChange={(e) => setCtaBtn1Target(e.target.value as CtaTarget)}
                className={`${mInput} cursor-pointer`}
              >
                {CTA_TARGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Fld>
          </div>
          <div>
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3 pb-2 border-b border-[var(--border-300)]">
              Nút phụ
            </div>
            <Fld label="Tên nút 2">
              <input
                placeholder="Ví dụ: Xem khóa học"
                value={ctaBtn2Name}
                maxLength={100}
                onChange={(e) => setCtaBtn2Name(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Mục tiêu điều hướng (Target) nút 2">
              <select
                value={ctaBtn2Target}
                onChange={(e) => setCtaBtn2Target(e.target.value as CtaTarget)}
                className={`${mInput} cursor-pointer`}
              >
                {CTA_TARGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Fld>
          </div>
        </div>
      </SectionCard>

      {/* Section 3 — Hero image & floating stats */}
      <SectionCard title="3. Hình ảnh & chỉ số nổi">
        <Fld label="Ảnh bìa chính (Main Image)">
          <BigDropzone
            preview={heroPreview}
            onFileSelect={(file, url) => {
              setHeroFile(file)
              setHeroPreview(url)
            }}
            id="cms-hero-img"
          />
        </Fld>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
          <div className="bg-white rounded-xl border border-[var(--border-300)] p-4">
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3">
              Chỉ số nổi 1 (góc trên phải)
            </div>
            <Fld label="Số">
              <input
                placeholder="Ví dụ: 29 / 30"
                value={stat1Number}
                maxLength={50}
                onChange={(e) => setStat1Number(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Mô tả">
              <input
                placeholder="Ví dụ: Điểm thi cao nhất 2024"
                value={stat1Desc}
                maxLength={255}
                onChange={(e) => setStat1Desc(e.target.value)}
                className={mInput}
              />
            </Fld>
          </div>

          <div className="bg-white rounded-xl border border-[var(--border-300)] p-4">
            <div className="[font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary-300)] uppercase tracking-[0.4px] mb-3">
              Chỉ số nổi 2 (góc dưới trái)
            </div>
            <Fld label="Số">
              <input
                placeholder="Ví dụ: 96%"
                value={stat2Number}
                maxLength={50}
                onChange={(e) => setStat2Number(e.target.value)}
                className={mInput}
              />
            </Fld>
            <Fld label="Mô tả">
              <input
                placeholder="Ví dụ: đạt điểm mục tiêu"
                value={stat2Desc}
                maxLength={255}
                onChange={(e) => setStat2Desc(e.target.value)}
                className={mInput}
              />
            </Fld>
          </div>
        </div>
      </SectionCard>

      {/* Section 4 — Student stats */}
      <SectionCard title="4. Thống kê học viên">
        <div className="flex gap-8 justify-center mb-5 py-3">
          <SmallCircle
            label="Avatar 1"
            preview={av1Preview}
            onFileSelect={(file, url) => {
              setAv1File(file)
              setAv1Preview(url)
            }}
            id="cms-av1"
          />
          <SmallCircle
            label="Avatar 2"
            preview={av2Preview}
            onFileSelect={(file, url) => {
              setAv2File(file)
              setAv2Preview(url)
            }}
            id="cms-av2"
          />
          <SmallCircle
            label="Avatar 3"
            preview={av3Preview}
            onFileSelect={(file, url) => {
              setAv3File(file)
              setAv3Preview(url)
            }}
            id="cms-av3"
          />
        </div>
        <Fld label={`Mô tả thống kê học viên (${studentStatsDesc.length}/50 ký tự)`}>
          <textarea
            placeholder="Ví dụ: 3.400+ học viên đã đỗ vào các trường top đầu (tối đa 50 ký tự)..."
            value={studentStatsDesc}
            maxLength={50}
            onChange={(e) => setStudentStatsDesc(e.target.value)}
            className={`${mInput} resize-y min-h-[72px] [font-family:var(--font-body)]`}
          />
        </Fld>
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
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  )
}

export default TrangChuTab
