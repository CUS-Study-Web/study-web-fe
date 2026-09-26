import React, { useState, useEffect } from "react"
import { useNotification } from "../../common/NotificationProvider"
import { useVipFormContentQuery, useUpdateVipFormContentMutation } from "../../../hooks/queries/useVipSubscription"

export default function VipFormTab() {
  const { showSuccess, showError } = useNotification()
  const { data: formContent, isLoading } = useVipFormContentQuery()
  const { mutate: updateContent, isPending } = useUpdateVipFormContentMutation()

  const [formTitle, setFormTitle] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [hotline, setHotline] = useState("")
  const [fanpage, setFanpage] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountHolder, setAccountHolder] = useState("")
  const [syntax, setSyntax] = useState("")
  const [qrImageFile, setQrImageFile] = useState<File | null>(null)
  const [qrImagePreview, setQrImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (formContent?.data) {
      const d = formContent.data
      setFormTitle(d.formTitle || "")
      setFormDesc(d.description || "")
      setHotline(d.hotline || "")
      setFanpage(d.fanpageLink || "")
      setBankName(d.bankName || "")
      setAccountNumber(d.accountNumber || "")
      setAccountHolder(d.accountHolder || "")
      setSyntax(d.transferContent || "")
      setQrImagePreview(d.accountHolderQrUrl || null)
    }
  }, [formContent])

  const sectionCard = (title: string, children: React.ReactNode) => (
    <div className="bg-[#FAFCFA] rounded-[16px] border border-[#E8EFEA] p-[24px_24px_20px] mb-5">
      <div className="flex items-center gap-[8px] mb-5">
        <div className="w-[4px] h-[18px] rounded-[2px] bg-[#2C5A31]" />
        <span className="[font-family:var(--font-heading)] font-[800] text-[13px] text-[#2C5A31] uppercase tracking-[0.5px]">
          {title}
        </span>
      </div>
      {children}
    </div>
  )

  const labelClass = "block [font-family:var(--font-heading)] font-semibold text-[13px] text-[#1B1F1C] mb-[8px]"
  const inputClass = "w-full p-[12px_16px] rounded-[12px] border-[1.5px] border-[#D4DCD5] bg-white [font-family:var(--font-body)] text-[14px] text-[#1B1F1C] outline-none transition-colors focus:border-[#2C5A31]"

  const fld = (label: string, el: React.ReactNode) => (
    <div className="mb-4">
      <label className={labelClass}>{label}</label>
      {el}
    </div>
  )

  const handleReset = () => {
    if (formContent?.data) {
      const d = formContent.data
      setFormTitle(d.formTitle || "")
      setFormDesc(d.description || "")
      setHotline(d.hotline || "")
      setFanpage(d.fanpageLink || "")
      setBankName(d.bankName || "")
      setAccountNumber(d.accountNumber || "")
      setAccountHolder(d.accountHolder || "")
      setSyntax(d.transferContent || "")
      setQrImageFile(null)
      setQrImagePreview(d.accountHolderQrUrl || null)
    }
  }

  const handleSave = () => {
    const formData = new FormData();
    if (formTitle) formData.append("formTitle", formTitle);
    if (formDesc) formData.append("description", formDesc);
    if (hotline) formData.append("hotline", hotline);
    if (fanpage) formData.append("fanpageLink", fanpage);
    if (bankName) formData.append("bankName", bankName);
    if (accountHolder) formData.append("accountHolder", accountHolder);
    if (accountNumber) formData.append("accountNumber", accountNumber);
    if (syntax) formData.append("transferContent", syntax);
    if (qrImageFile) formData.append("accountHolderQr", qrImageFile);

    updateContent(formData, {
      onSuccess: () => {
        showSuccess("Lưu cấu hình Form VIP thành công!")
      },
      onError: (err: any) => {
        showError(err.message || "Có lỗi xảy ra khi lưu form!")
      }
    })
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-10">
        <div className="w-8 h-8 border-4 border-[var(--brand-500)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="relative">

      {/* Section 1: Thông tin chung */}
      {sectionCard(
        "1. Thông tin chung",
        <>
          {fld(
            "Tiêu đề form",
            <input
              className={inputClass}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Nhập tiêu đề form đăng ký VIP..."
            />
          )}
          {fld(
            "Mô tả giới thiệu",
            <textarea
              className={`${inputClass} resize-y min-h-[90px]`}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Nhập đoạn mô tả giới thiệu quyền lợi và hướng dẫn..."
            />
          )}
          <div className="grid grid-cols-2 gap-[18px]">
            {fld(
              "Hotline hỗ trợ",
              <input
                className={inputClass}
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                placeholder="Ví dụ: 0912 345 678"
              />
            )}
            {fld(
              "Link Fanpage",
              <input
                className={inputClass}
                value={fanpage}
                onChange={(e) => setFanpage(e.target.value)}
                placeholder="Ví dụ: https://facebook.com/cuseducation"
              />
            )}
          </div>
        </>
      )}

      {/* Section 2: Thông tin thanh toán & Mã QR */}
      {sectionCard(
        "2. Thông tin thanh toán & Mã QR",
        <>
          <div className="grid grid-cols-2 gap-[18px]">
            {fld(
              "Tên ngân hàng",
              <input
                className={inputClass}
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Ví dụ: MB Bank"
              />
            )}
            {fld(
              "Số tài khoản",
              <input
                className={inputClass}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Ví dụ: 123456789"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-[18px]">
            {fld(
              "Chủ tài khoản",
              <input
                className={inputClass}
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Ví dụ: CONG TY TNHH DAO TAO PHAT TRIEN CUS"
              />
            )}
            {fld(
              "Cú pháp chuyển khoản mẫu",
              <input
                className={inputClass}
                value={syntax}
                onChange={(e) => setSyntax(e.target.value)}
                placeholder="Ví dụ: Họ Tên - SĐT - VIP"
              />
            )}
          </div>

          {/* Field 5: Ảnh mã QR thanh toán */}
          <div className="mb-4">
            <label className={labelClass}>Ảnh mã QR thanh toán</label>
            <div className="border-[2px] border-dashed border-[#C4D4C6] rounded-[14px] p-[24px_20px] bg-white flex items-center gap-[24px] flex-wrap">
              <div className="w-[130px] h-[130px] rounded-[12px] border border-[#D4DCD5] bg-[#FAFCFA] flex items-center justify-center overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                {qrImagePreview ? (
                  <img
                    src={qrImagePreview}
                    alt="Mã QR xem trước"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A0AAA2" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="[font-family:var(--font-heading)] font-bold text-[14px] text-[#1B1F1C] mb-1">
                  {qrImagePreview ? "Ảnh QR tùy chỉnh đã tải lên" : "Mã QR thanh toán mặc định"}
                </div>
                <div className="[font-family:var(--font-body)] text-[12.5px] text-[#6B746D] mb-[14px] leading-[1.6]">
                  Ảnh này sẽ hiển thị trực tiếp cho học viên quét mã chuyển khoản tại trang đăng ký VIP. Hỗ trợ JPG, PNG, WEBP.
                </div>
                <div className="flex gap-[10px] items-center">
                  <button
                    type="button"
                    onClick={() => document.getElementById("qr-custom-input")?.click()}
                    className="inline-flex items-center gap-[6px] px-[16px] py-[8px] rounded-[10px] border-[1.5px] border-[#2C5A31] bg-[#EEF5EF] text-[#2C5A31] [font-family:var(--font-heading)] font-bold text-[13px] cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#2C5A31" strokeWidth="2" strokeLinecap="round" />
                      <polyline points="17 8 12 3 7 8" stroke="#2C5A31" strokeWidth="2" strokeLinecap="round" />
                      <line x1="12" y1="3" x2="12" y2="15" stroke="#2C5A31" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Thay đổi ảnh
                  </button>
                  {qrImagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setQrImageFile(null)
                        setQrImagePreview(null)
                      }}
                      className="px-[14px] py-[8px] rounded-[10px] border-[1.5px] border-[#D4DCD5] bg-white text-[#C94B4B] [font-family:var(--font-heading)] font-semibold text-[13px] cursor-pointer"
                    >
                      Đặt lại mặc định
                    </button>
                  )}
                </div>
                <input
                  id="qr-custom-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) {
                      setQrImageFile(f)
                      setQrImagePreview(URL.createObjectURL(f))
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.96)] backdrop-blur-[8px] border-t-[1.5px] border-[#E8EFEA] p-[16px_20px] flex justify-end items-center gap-[12px] z-[30] rounded-b-[16px] mt-6 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={handleReset}
          className="px-[26px] py-[11px] rounded-[12px] border-[1.5px] border-[#D4DCD5] bg-white text-[#6B746D] [font-family:var(--font-heading)] font-bold text-[14px] cursor-pointer transition-colors duration-150 hover:bg-[#F4F7F4]"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="px-[28px] py-[11px] rounded-[12px] border-none bg-[#2C5A31] text-white [font-family:var(--font-heading)] font-bold text-[14px] cursor-pointer shadow-[0_2px_10px_rgba(44,90,49,0.28)] transition-colors duration-150 hover:bg-[#234A28] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  )
}
