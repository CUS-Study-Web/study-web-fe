import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../components/common/NotificationProvider";
import { useSubscribeVipMutation, useRenewVipMutation } from "../../hooks/queries/useVipSubscription";
import { ROUTES } from "../../utils/routes";

export default function LearnerVipRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRenewMode = searchParams.get("mode") === "renew";

  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const subscribeMutation = useSubscribeVipMutation();
  const renewMutation = useRenewVipMutation();
  const activeMutation = isRenewMode ? renewMutation : subscribeMutation;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill from user profile
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.gmail ?? "");
  const [birth, setBirth] = useState(user?.birth ?? "");
  const [note, setNote] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [fileDragging, setFileDragging] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setEvidenceFile(file);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEvidenceFile(file);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !email.trim() || !birth || !evidenceFile) {
      showError("Vui lòng điền đầy đủ các trường bắt buộc và tải lên minh chứng.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("birth", birth);
    formData.append("phone", phone.trim());
    formData.append("evidence", evidenceFile);
    if (note.trim()) {
      formData.append("note", note.trim());
    }

    const successMessage = isRenewMode
      ? "Gửi gia hạn VIP thành công! Trung tâm sẽ liên hệ xác nhận trong vòng 24 giờ."
      : "Gửi đăng ký VIP thành công! Trung tâm sẽ liên hệ xác nhận trong vòng 24 giờ.";

    activeMutation.mutate(formData, {
      onSuccess: () => {
        showSuccess(successMessage);
        navigate(ROUTES.VIP);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
        showError(message);
      },
    });
  };

  return (
    <div className="bg-[var(--surface-500)] min-h-screen py-[36px] px-[24px] pb-[80px]">
      <div className="max-w-[800px] mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate(ROUTES.VIP)}
          className="flex items-center gap-[6px] [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary-300)] bg-transparent border-none cursor-pointer p-0 mb-[20px] hover:text-[var(--text-primary)] transition-colors duration-[var(--motion-fast)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Quay lại
        </button>

        {/* CARD 1 — Header */}
        <div className="bg-white rounded-[var(--radius-sm)] border border-[var(--border-300)] shadow-sm mb-[16px] overflow-hidden border-t-[6px] border-t-[var(--brand-base-500)]">
          <div className="p-[28px]">
            {/* VIP badge */}
            <div className="inline-flex items-center gap-[6px] bg-[rgba(245,197,24,0.15)] border border-[rgba(212,160,23,0.35)] rounded-full px-[12px] py-[4px] mb-[14px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--warning-500)] uppercase tracking-[0.5px]">
                ✦ Tài khoản VIP
              </span>
            </div>

            <h1 className="[font-family:var(--font-heading)] font-black text-[22px] text-[var(--text-primary)] m-0 mb-[12px] leading-[1.35]">
              {isRenewMode
                ? "Gia hạn Khóa học VIP — Trung tâm Luyện thi ĐGNL - CUS"
                : "Đăng ký Khóa học VIP — Trung tâm Luyện thi ĐGNL - CUS"}
            </h1>

            <p className="[font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-600)] leading-[1.75] m-0 mb-[20px]">
              Chào mừng bạn đến với Trung tâm Luyện thi ĐGNL - CUS! Tài khoản VIP giúp các bạn
              học viên có quyền truy cập vào các khóa học của CUS và mở khóa nhiều tài liệu giúp
              đạt mục tiêu điểm số cao nhất trong kỳ thi. Bạn vui lòng điền đầy đủ và chính xác
              các thông tin dưới đây để trung tâm hỗ trợ xếp lớp và hoàn tất thủ tục đăng ký nhé.
            </p>

            <div className="border-t border-[var(--surface-500)] pt-[16px] flex flex-col gap-[8px]">
              {[
                { icon: "📞", text: "Hotline hỗ trợ: [Điền số điện thoại của trung tâm]" },
                { icon: "📘", text: "Fanpage: [Điền link Fanpage nếu có]" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-[10px]">
                  <span className="text-[16px]">{icon}</span>
                  <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2 — Thông tin học viên */}
        <div className="bg-white rounded-[var(--radius-sm)] border border-[var(--border-300)] shadow-sm mb-[16px] overflow-hidden">
          <SectionTitle text="Phần 1: Thông tin học viên" />
          <div className="px-[24px] pt-[18px] pb-[24px] flex flex-col gap-[16px]">
            <FormField label="Họ và tên" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên..."
                className="w-full px-[14px] py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[14px] text-[var(--text-primary)] outline-none bg-white focus:border-[var(--brand-500)] transition-colors duration-[var(--motion-fast)]"
              />
            </FormField>

            <FormField label="Số điện thoại" required>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại của bạn..."
                className="w-full px-[14px] py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[14px] text-[var(--text-primary)] outline-none bg-white focus:border-[var(--brand-500)] transition-colors duration-[var(--motion-fast)]"
              />
            </FormField>

            <FormField label="Địa chỉ email" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email..."
                className="w-full px-[14px] py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[14px] text-[var(--text-primary)] outline-none bg-white focus:border-[var(--brand-500)] transition-colors duration-[var(--motion-fast)]"
              />
            </FormField>

            <FormField label="Ngày sinh" required>
              <input
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                className="w-full px-[14px] py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[14px] text-[var(--text-primary)] outline-none bg-white focus:border-[var(--brand-500)] transition-colors duration-[var(--motion-fast)]"
              />
            </FormField>
          </div>
        </div>

        {/* CARD 3 — Thanh toán */}
        <div className="bg-white rounded-[var(--radius-sm)] border border-[var(--border-300)] shadow-sm mb-[16px] overflow-hidden">
          <SectionTitle text="Phần 2: Thông tin thanh toán & minh chứng" />
          <div className="px-[24px] pt-[18px] pb-[24px] flex flex-col gap-[20px]">
            {/* Transfer info block */}
            <div className="bg-[var(--brand-soft-200)] border border-[var(--brand-soft-600)] rounded-[var(--radius-sm)] p-[18px_20px]">
              <div className="[font-family:var(--font-heading)] font-extrabold text-[13px] text-[var(--brand-base-500)] uppercase tracking-[0.6px] mb-[12px] flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
                </svg>
                Thông tin chuyển khoản
              </div>
              {[
                ["Ngân hàng", "[Tên Ngân Hàng]"],
                ["Số tài khoản", "[Số tài khoản]"],
                ["Chủ tài khoản", "[Tên chủ tài khoản]"],
              ].map(([key, value]) => (
                <div
                  key={key}
                  className="flex gap-[8px] mb-[6px] [font-family:var(--font-body)] text-[13px]"
                >
                  <span className="text-[var(--text-secondary-300)] min-w-[130px]">{key}:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{value}</span>
                </div>
              ))}
              <div className="mt-[10px] bg-white rounded-[8px] p-[10px_12px] border border-dashed border-[var(--brand-soft-600)]">
                <div className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-300)] mb-[3px]">
                  Cú pháp chuyển khoản:
                </div>
                <div className="[font-family:var(--font-heading)] font-bold text-[13px] text-[var(--brand-base-500)]">
                  Họ Tên - SĐT - VIP
                </div>
                <div className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-200)] mt-[2px]">
                  Ví dụ: Nguyen Van A - 0987654321 - VIP
                </div>
              </div>
            </div>

            {/* QR code */}
            <div>
              <label className="block [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] mb-[6px]">
                Mã QR thanh toán
              </label>
              <p className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)] m-0 mb-[12px] leading-[1.6]">
                Bạn vui lòng quét mã QR bên dưới để thanh toán, sau đó chụp lại màn hình giao dịch
                thành công.
              </p>
              <div className="flex justify-center">
                <div className="w-[180px] h-[180px] bg-[var(--brand-soft-200)] border-2 border-[var(--brand-soft-600)] rounded-[16px] flex flex-col items-center justify-center gap-[10px]">
                  <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                    <rect
                      x="4"
                      y="4"
                      width="34"
                      height="34"
                      rx="4"
                      stroke="var(--brand-base-500)"
                      strokeWidth="3"
                    />
                    <rect x="12" y="12" width="18" height="18" rx="2" fill="var(--brand-base-500)" />
                    <rect
                      x="72"
                      y="4"
                      width="34"
                      height="34"
                      rx="4"
                      stroke="var(--brand-base-500)"
                      strokeWidth="3"
                    />
                    <rect x="80" y="12" width="18" height="18" rx="2" fill="var(--brand-base-500)" />
                    <rect
                      x="4"
                      y="72"
                      width="34"
                      height="34"
                      rx="4"
                      stroke="var(--brand-base-500)"
                      strokeWidth="3"
                    />
                    <rect x="12" y="80" width="18" height="18" rx="2" fill="var(--brand-base-500)" />
                  </svg>
                  <span className="[font-family:var(--font-body)] text-[11px] text-[var(--text-secondary-300)]">
                    Quét để thanh toán
                  </span>
                </div>
              </div>
            </div>

            {/* Upload dropzone */}
            <div>
              <label className="block [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] mb-[6px]">
                Tải lên minh chứng chuyển khoản (ảnh chụp màn hình){" "}
                <span className="text-[var(--error-500)]">*</span>
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setFileDragging(true);
                }}
                onDragLeave={() => setFileDragging(false)}
                onDrop={handleFileDrop}
                onClick={handleFileSelect}
                className={`border-2 border-dashed rounded-[var(--radius-sm)] p-[28px_20px] text-center cursor-pointer transition-all duration-[var(--motion-fast)] ${
                  fileDragging
                    ? "border-[var(--brand-base-500)] bg-[var(--brand-soft-200)]"
                    : "border-[var(--brand-soft-600)] bg-[var(--surface-50)] hover:border-[var(--brand-base-300)]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {evidenceFile ? (
                  <div className="flex items-center justify-center gap-[10px]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                        fill="var(--brand-base-500)"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        fill="none"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="[font-family:var(--font-heading)] font-bold text-[14px] text-[var(--brand-base-500)]">
                      {evidenceFile.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mx-auto mb-[10px] block"
                    >
                      <path
                        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke={fileDragging ? "var(--brand-base-500)" : "var(--text-secondary-200)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="[font-family:var(--font-heading)] font-bold text-[14px] text-[var(--text-secondary-600)] mb-[4px]">
                      Kéo thả ảnh vào đây hoặc nhấn để chọn
                    </div>
                    <div className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-200)]">
                      PNG, JPG, JPEG — tối đa 10MB
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Message textarea */}
            <FormField label="Bạn muốn nhắn gửi thêm điều gì đến trung tâm không?">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Tôi muốn đăng ký khóa V-ACT, bắt đầu từ tháng 8..."
                rows={4}
                className="w-full px-[14px] py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[14px] text-[var(--text-primary)] outline-none bg-white resize-y leading-[1.6] focus:border-[var(--brand-500)] transition-colors duration-[var(--motion-fast)]"
              />
            </FormField>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-[8px]">
          <button
            onClick={handleSubmit}
            disabled={activeMutation.isPending}
            className="[font-family:var(--font-heading)] font-extrabold text-[16px] py-[16px] px-[56px] rounded-[var(--radius-md)] border-none bg-gradient-to-br from-[var(--brand-base-500)] to-[var(--brand-base-400)] text-white cursor-pointer shadow-[0_4px_20px_rgba(44,90,49,0.35)] transition-all duration-[var(--motion-fast)] flex items-center gap-[10px] hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(44,90,49,0.4)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {activeMutation.isPending
              ? "Đang gửi..."
              : isRenewMode ? "Gửi gia hạn" : "Gửi đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function SectionTitle({ text }: { text: string }) {
  return (
    <div className="px-[24px] pt-[20px] mb-[4px]">
      <div className="flex items-center gap-[10px] mb-[4px]">
        <div className="w-[4px] h-[20px] bg-[var(--brand-base-500)] rounded-[2px]" />
        <span className="[font-family:var(--font-heading)] font-extrabold text-[13px] text-[var(--brand-base-500)] uppercase tracking-[0.6px]">
          {text}
        </span>
      </div>
      <div className="h-[1px] bg-[var(--brand-base-500)] opacity-20 mt-[10px] ml-[14px]" />
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] mb-[6px]">
        {label}
        {required && <span className="text-[var(--error-500)]"> *</span>}
      </label>
      {children}
    </div>
  );
}
