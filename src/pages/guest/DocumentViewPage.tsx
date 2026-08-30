import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useEffect, useState } from "react";
import { useGetDocumentDetailQuery, useDownloadDocumentMutation } from "../../hooks/queries/useDocuments";
import * as mammoth from "mammoth";
import { downloadFileFromUrl } from "../../utils/fileUtils";
import { useNotification } from "../../components/common/NotificationProvider";

const COLOR_THEMES = [
  { bg: '#28522d', soft: 'rgba(40,82,45,0.1)' },
  { bg: '#1d4ed8', soft: 'rgba(29,78,216,0.1)' },
  { bg: '#ea580c', soft: 'rgba(234,88,12,0.1)' },
  { bg: '#dc2626', soft: 'rgba(220,38,38,0.1)' },
  { bg: '#db2777', soft: 'rgba(219,39,119,0.1)' },
  { bg: '#65a30d', soft: 'rgba(101,163,13,0.1)' },
  { bg: '#9333ea', soft: 'rgba(147,51,234,0.1)' },
];

export default function DocumentViewPage() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showError, showSuccess } = useNotification();

  const { data: response, isLoading, error } = useGetDocumentDetailQuery(docId || "");
  const doc = response?.data;
  const { mutate: downloadDoc, isPending: isDownloading } = useDownloadDocumentMutation();

  const [docxHtml, setDocxHtml] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (doc?.fileUrl && ['DOCX', 'DOC'].includes(doc.fileType?.toUpperCase() || '')) {
      fetch(doc.fileUrl)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => {
          mammoth.convertToHtml({ arrayBuffer })
            .then((result) => setDocxHtml(result.value))
            .catch((err) => console.error("Mammoth error:", err));
        })
        .catch(err => console.error("Fetch DOCX error:", err));
    }
  }, [doc?.fileUrl, doc?.fileType]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#F4F7F4] flex items-center justify-center pt-[72px]">Đang tải tài liệu...</div>;
  }

  if (error || !doc) {
    return <div className="min-h-screen bg-[#F4F7F4] flex flex-col gap-4 items-center justify-center pt-[72px]">
      <div className="font-bold text-xl text-[var(--text-secondary)]">Không tìm thấy tài liệu, hoặc bạn không có quyền truy cập.</div>
      <button onClick={() => navigate(ROUTES.DOCUMENTS)} className="px-6 py-2 bg-[var(--brand-500)] text-white font-bold rounded-lg cursor-pointer">Quay lại danh sách</button>
    </div>;
  }

  const colorIndex = location.state?.colorIndex;
  const hash = docId ? docId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const finalIndex = colorIndex !== undefined ? colorIndex : hash;
  const colorTheme = COLOR_THEMES[finalIndex % COLOR_THEMES.length];

  const tags = doc.badges && doc.badges.length > 0 ? doc.badges.map(b => b.name) : [doc.docType === 'THEORY' ? 'LÝ THUYẾT' : 'BÀI TẬP'];
  const ext = doc.fileType?.toUpperCase() || 'PDF';

  const handleDownload = () => {
    if (!docId) return;
    downloadDoc(docId, {
      onSuccess: (res) => {
        if (res.data?.downloadUrl) {
          downloadFileFromUrl(res.data.downloadUrl, `${doc.title}.${ext.toLowerCase()}`);
          showSuccess("Đang tải file...");
        } else {
          showError("Không lấy được đường dẫn tải về.");
        }
      },
      onError: (err: any) => {
        showError(err.message || "Không thể tải tài liệu này.");
      }
    });
  };

  return (
    <div className="bg-[#F4F7F4] min-h-screen pb-20 pt-[72px]">
      <div className="bg-gradient-to-br from-[#2C5A31] to-[#1e4023] pt-10 pb-[60px] px-6">
        <div className="max-w-[1160px] mx-auto">
          <button
            onClick={() => navigate(ROUTES.DOCUMENTS)}
            className="flex items-center gap-2 bg-white/12 border-none rounded-[10px] px-3.5 py-2 cursor-pointer !text-[#DCE9DE] font-['Noto_Sans',sans-serif] text-[13px] mb-5 transition-colors hover:bg-white/20"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Quay lại tài liệu
          </button>

          <div className="flex gap-2.5 mb-3.5">
            {tags.map((t) => (
              <span key={t} className="bg-white/15 rounded-full px-3 py-1 font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[11px] text-[#DCE9DE]">
                {t}
              </span>
            ))}
          </div>

          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[32px] text-white m-0 mb-2.5 tracking-[-0.6px] leading-[1.25]">
            {doc.title}
          </div>

          <div className="flex gap-5 flex-wrap">
            {[`📄 ${doc.numPages || 0} trang`, `↓ ${doc.downloadCount || 0} lượt tải`, doc.accessTier === 'VIP' ? "⭐ Yêu cầu VIP" : "✓ Miễn phí 100%"].map((item) => (
              <span key={item} className="font-['Noto_Sans',sans-serif] text-[13px] text-[#DCE9DE]/80">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto -mt-7 px-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Left: Document Viewer */}
        <div>
          <div className="bg-[#3C3C3C] rounded-t-[16px] px-4.5 py-3 flex items-center justify-between shadow-[0_-4px_24px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-l from-white/25 to-transparent pointer-events-none" />
            <div className="flex gap-1.5 relative z-10">
              {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
            </div>
            <div className="bg-white/12 rounded-lg px-3.5 py-1.5 font-['Noto_Sans',sans-serif] text-[12px] !text-white/70 relative z-10 truncate max-w-[300px]">
              {doc.title}.{ext.toLowerCase()} — Trang 1 / {doc.numPages || 0}
            </div>
            <div className="w-16 relative z-10" />
          </div>
          <div className="bg-[#6B6B6B] p-6 rounded-b-[16px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] overflow-x-auto">
            <div className="bg-white rounded shadow-[0_4px_24px_rgba(0,0,0,0.3)] font-['Noto_Sans',sans-serif] min-h-[700px] min-w-[500px] max-h-[1100px] relative overflow-hidden flex flex-col">

              {ext === 'PDF' && doc.fileUrl ? (
                <iframe src={`${doc.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} className="flex-1 w-full border-none pointer-events-none min-h-[1100px]" title="PDF Preview" />
              ) : (['DOCX', 'DOC'].includes(ext) && docxHtml) ? (
                <div className="p-10 md:px-[52px] py-12 pointer-events-none flex-1">
                  <div dangerouslySetInnerHTML={{ __html: docxHtml }} className="document-preview text-[#3D4540] text-[13px] leading-[1.75]" />
                </div>
              ) : (
                <div className="p-10 md:px-[52px] py-12 pointer-events-none flex-1 flex flex-col items-center justify-center text-gray-400">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  <span className="mt-4 text-sm font-semibold">Đang tải bản xem trước...</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-b from-transparent via-white/80 to-white flex items-end justify-center pb-6 z-20 pointer-events-none">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[14px] text-[#2C5A31] bg-white px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-[#2C5A31]/10">Tải xuống để xem toàn bộ nội dung →</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="sticky top-[84px]">
          <div className="bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-[#D4DCD5] overflow-hidden">
            <div className="px-5.5 py-5" style={{ background: `linear-gradient(135deg, ${colorTheme.bg} 0%, ${colorTheme.bg}cc 100%)` }}>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-extrabold text-[15px] text-white mb-1 leading-snug">{doc.title}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t) => <span key={t} className="bg-white/20 text-white rounded-full px-2 py-0.5 font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[10px]">{t}</span>)}
              </div>
            </div>
            <div className="p-5.5">
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[14px] text-[#1B1F1C] mb-2">Tóm tắt nội dung</div>
              <div className="font-['Noto_Sans',sans-serif] text-[13px] leading-[1.7] text-[#6B746D] m-0 mb-5 whitespace-pre-wrap">{doc.description || "Chưa có mô tả."}</div>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[{ label: "Số trang", value: doc.numPages || 0 }, { label: "Lượt tải", value: doc.downloadCount || 0 }, { label: "Định dạng", value: ext }, { label: "Cập nhật", value: doc.createdAt ? new Date(doc.createdAt).getFullYear() : 2024 }].map(({ label, value }) => (
                  <div key={label} className="bg-[#F4F7F4] rounded-[10px] px-3.5 py-3">
                    <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[14px] text-[#1B1F1C] truncate">{value}</div>
                    <div className="font-['Noto_Sans',sans-serif] text-[11px] text-[#6B746D] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <div className="text-center py-4 pb-5">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-extrabold text-[20px] tracking-[-0.3px]" style={{ color: colorTheme.bg }}>Tải xuống {doc.accessTier === 'VIP' ? 'Dành cho VIP' : 'Miễn phí'}!</div>
                <div className="font-['Noto_Sans',sans-serif] text-[13px] text-[#6B746D] mt-1">{doc.accessTier === 'VIP' ? 'Yêu cầu tài khoản VIP' : 'Không cần đăng ký · Không giới hạn'}</div>
              </div>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-[14px] border-none !text-white font-['Be_Vietnam_Pro',sans-serif] font-bold text-[16px] cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-transform duration-140 hover:-translate-y-[1px] disabled:opacity-70 disabled:hover:translate-y-0"
                style={{ background: colorTheme.bg }}
              >
                {isDownloading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3V12M9 12L5.5 8.5M9 12L12.5 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 15H15" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
                {isDownloading ? 'Đang lấy file...' : 'Tải xuống'}
              </button>

              <div className="font-['Noto_Sans',sans-serif] text-[12px] text-[#D4DCD5] text-center mt-3.5">
                Tài liệu chỉ dành cho mục đích học tập
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
