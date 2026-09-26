import { useRegisterFormDetailQuery } from '../../../../hooks/queries/useRegisterForms';
import { Spinner } from '../../../Loading';

interface RegisterFormDetailModalProps {
  formId: string | null;
  onClose: () => void;
}

export const RegisterFormDetailModal = ({ formId, onClose }: RegisterFormDetailModalProps) => {
  const { data: detailData, isLoading, isError } = useRegisterFormDetailQuery(formId);
  const form = detailData?.data;

  if (!formId) return null;

  const phone = form?.phoneNumber || (form as unknown as { phoneNumer?: string })?.phoneNumer || '';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[580px] shadow-2xl border border-[#E0EAE2] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Green Gradient */}
        <div className="bg-gradient-to-br from-[#244b29] to-[#2C5A31] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <div
                className="[font-family:var(--font-heading)] font-bold text-[18px] leading-tight !text-white"
                style={{ color: '#ffffff' }}
              >
                Chi tiết đăng ký thi offline
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border-none"
            aria-label="Đóng"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <Spinner size="md" color="brand" />
              <span className="[font-family:var(--font-body)] text-[13px] text-[#6B746D]">
                Đang tải thông tin chi tiết...
              </span>
            </div>
          )}

          {isError && !isLoading && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="[font-family:var(--font-heading)] font-semibold text-[14px] text-red-600 mb-1">
                Không thể tải thông tin đơn đăng ký
              </p>
              <p className="[font-family:var(--font-body)] text-[12.5px] text-[#6B746D]">
                Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.
              </p>
            </div>
          )}

          {!isLoading && !isError && form && (
            <div className="space-y-4">
              {/* Candidate Quick Header Card without pill badge */}
              <div className="flex items-center p-4 rounded-[14px] bg-[#F4F8F5] border border-[#DEECE0]">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#2C5A31] text-white flex items-center justify-center [font-family:var(--font-heading)] font-bold text-[16px] shrink-0 shadow-xs">
                    {form.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="[font-family:var(--font-heading)] font-bold text-[16px] text-[#1B1F1C]">
                      {form.name}
                    </div>
                    <div className="[font-family:var(--font-body)] text-[12.5px] text-[#556358] flex items-center gap-2 mt-0.5">
                      <span>{form.email}</span>
                      {phone && (
                        <>
                          <span>•</span>
                          <span>{phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Họ và tên */}
                <div className="bg-[#FAFCFA] border border-[#E8EFEA] rounded-[12px] p-3.5">
                  <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[#2C5A31] uppercase tracking-[0.4px] mb-1 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Họ và tên
                  </div>
                  <div className="[font-family:var(--font-heading)] font-semibold text-[13.5px] text-[#1B1F1C]">
                    {form.name || '—'}
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className="bg-[#FAFCFA] border border-[#E8EFEA] rounded-[12px] p-3.5">
                  <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[#2C5A31] uppercase tracking-[0.4px] mb-1 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Số điện thoại
                  </div>
                  <div className="[font-family:var(--font-body)] font-medium text-[13.5px] text-[#1B1F1C]">
                    {phone || 'Chưa cung cấp'}
                  </div>
                </div>

                {/* Địa chỉ Email */}
                <div className="bg-[#FAFCFA] border border-[#E8EFEA] rounded-[12px] p-3.5">
                  <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[#2C5A31] uppercase tracking-[0.4px] mb-1 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Địa chỉ Email
                  </div>
                  <div className="[font-family:var(--font-body)] font-medium text-[13.5px] text-[#1B1F1C] break-all">
                    {form.email || '—'}
                  </div>
                </div>

                {/* Môn đăng ký */}
                <div className="bg-[#FAFCFA] border border-[#E8EFEA] rounded-[12px] p-3.5">
                  <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[#2C5A31] uppercase tracking-[0.4px] mb-1 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Môn đăng ký
                  </div>
                  <div className="[font-family:var(--font-heading)] font-semibold text-[13.5px] text-[#1B1F1C]">
                    {form.subject || '—'}
                  </div>
                </div>

                {/* Ngày đăng ký */}
                <div className="bg-[#FAFCFA] border border-[#E8EFEA] rounded-[12px] p-3.5 col-span-1 sm:col-span-2">
                  <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[#2C5A31] uppercase tracking-[0.4px] mb-1 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                    </svg>
                    Ngày đăng ký
                  </div>
                  <div className="[font-family:var(--font-heading)] font-semibold text-[13.5px] text-[#1B1F1C]">
                    {formatDate(form.registeredDate || form.createdAt)}
                  </div>
                </div>
              </div>

              {/* Note Section */}
              <div className="bg-[#FAFCFA] border border-[#E8EFEA] rounded-[12px] p-4">
                <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[#2C5A31] uppercase tracking-[0.4px] mb-1.5 flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Ghi chú của thí sinh
                </div>
                <div className="[font-family:var(--font-body)] text-[13.5px] leading-relaxed text-[#2D3748] whitespace-pre-wrap">
                  {form.note ? (
                    form.note
                  ) : (
                    <span className="text-[#9BA59E] italic">Không có ghi chú nào.</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="px-6 py-4 border-t border-[#EEF3EF] bg-[#FAFCFA] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-[10px] border border-[#D4DCD5] bg-white text-[#1B1F1C] [font-family:var(--font-heading)] font-semibold text-[13px] hover:bg-[#F4F7F4] transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
