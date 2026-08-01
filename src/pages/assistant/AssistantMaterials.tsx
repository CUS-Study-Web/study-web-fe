import { useState } from 'react';
import { DEMO_MATERIALS_ASST } from '../../types/assistant/mockData';
import type { AssistantDocument } from '../../types/assistant/models';
import AssistantUploadMaterialPopup from '../../components/assistant/material/AssistantUploadMaterialPopup';
import AssistantEditMaterialPopup from '../../components/assistant/material/AssistantEditMaterialPopup';
import AssistantViewMaterialPopup from '../../components/assistant/material/AssistantViewMaterialPopup';

const SUBJECT_COLORS: Record<string, string> = {
  "Toán": "var(--brand-500)",
  "Vật lý": "var(--info-700)",
  "Hóa học": "var(--error-700)",
  "Tiếng Anh": "var(--warning-700)",
  "Ngữ văn": "var(--warning-500)",
  "Sinh học": "var(--success-700)"
};

const SubjectBadge = ({ subject }: { subject: string }) => {
  const color = SUBJECT_COLORS[subject] || "var(--neutral-600)";
  return (
    <span
      style={{ color: color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
      className="px-3 py-1.5 rounded-md font-[family-name:var(--font-heading)] font-bold text-[13px] uppercase tracking-wide"
    >
      {subject}
    </span>
  );
};

const FileTypeBadge = ({ type }: { type: string }) => (
  <span className="px-2.5 py-1 rounded-md bg-[var(--surface-muted)] text-[var(--text-secondary)] font-[family-name:var(--font-heading)] font-semibold text-[11px]">
    {type}
  </span>
);

const AccessBadge = ({ access }: { access: string }) => {
  const isPublic = access === "Public";
  return (
    <span className={`px-3 py-1.5 rounded-full font-[family-name:var(--font-heading)] font-bold text-[13px] ${isPublic ? 'bg-[var(--brand-soft-500)] text-[var(--brand-500)]' : 'bg-[var(--warning-100)] text-[var(--warning-600)]'}`}>
      {isPublic ? "🌐 Public" : "⭐ VIP"}
    </span>
  );
};

export default function AssistantMaterials() {
  const [activeTab, setActiveTab] = useState<"ly-thuyet" | "de-thi">("ly-thuyet");
  const [docs, setDocs] = useState<AssistantDocument[]>(DEMO_MATERIALS_ASST);
  const [search, setSearch] = useState("");

  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState<AssistantDocument | null>(null);

  const filtered = docs.filter(d => {
    if (d.cat !== activeTab) return false;
    const q = search.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.subject.toLowerCase().includes(q) || d.kythi.toLowerCase().includes(q);
  });

  const counts = {
    "ly-thuyet": docs.filter(d => d.cat === "ly-thuyet").length,
    "de-thi": docs.filter(d => d.cat === "de-thi").length
  };

  const handleDelete = (id: number) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  };

  const handleEditClick = (doc: AssistantDocument) => {
    setSelectedMaterial(doc);
    setShowEdit(true);
  };

  const handleViewClick = (doc: AssistantDocument) => {
    setSelectedMaterial(doc);
    setShowView(true);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {showUpload && <AssistantUploadMaterialPopup onClose={() => setShowUpload(false)} />}
      {showEdit && <AssistantEditMaterialPopup material={selectedMaterial} onClose={() => setShowEdit(false)} />}
      {showView && <AssistantViewMaterialPopup material={selectedMaterial} onClose={() => setShowView(false)} />}

      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] m-0 mb-1">
            Tài liệu
          </div>
          <p className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)] m-0">
            Quản lý tài liệu học tập và đề thi
          </p>
        </div>

        <div
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[14px] cursor-pointer shadow-sm hover:shadow-md active:scale-95 transition-all duration-200"
          style={{ color: 'var(--neutral-0)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-0)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Tải lên
        </div>
      </div>

      <div className="relative flex bg-[var(--surface-muted)] p-[4px] rounded-[10px] w-fit mb-6" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}>
        {/* Sliding white pill indicator - Xử lý nền trắng và đổ bóng cho state Active */}
        <div
          className="absolute top-[4px] bottom-[4px] rounded-[10px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: 'calc(50% - 4px)',
            transform: activeTab === 'ly-thuyet' ? 'translateX(0)' : 'translateX(100%)',
            background: '#ffffff',
            boxShadow: '0 1px 6px rgba(0,0,0,0.10), 0 0.5px 2px rgba(0,0,0,0.06)',
          }}
        />

        {/* div 1: Lý thuyết */}
        <div
          onClick={() => setActiveTab("ly-thuyet")}
          className={`relative z-10 min-w-[130px] px-6 py-2 rounded-[10px] border-none cursor-pointer bg-transparent flex justify-center items-center gap-1.5 font-[family-name:var(--font-heading)] text-[14px] transition-all duration-300 select-none ${activeTab === 'ly-thuyet'
            ? 'text-[var(--brand-700)] font-semibold' // Trạng thái Active: Chữ xanh đậm, đậm hơn
            : 'text-[var(--text-tertiary)] font-medium hover:text-gray-600' // Trạng thái Inactive: Chữ nhạt
            }`}
        >
          Lý thuyết
          <span
            className={`text-[12px] transition-opacity duration-300 ${activeTab === 'ly-thuyet' ? 'opacity-80' : 'opacity-50'
              }`}
          >
            ({counts["ly-thuyet"]})
          </span>
        </div>

        {/* div 2: Đề thi */}
        <div
          onClick={() => setActiveTab("de-thi")}
          className={`relative z-10 min-w-[130px] px-6 py-2 rounded-[10px] border-none cursor-pointer bg-transparent flex justify-center items-center gap-1.5 font-[family-name:var(--font-heading)] text-[14px] transition-all duration-300 select-none ${activeTab === 'de-thi'
            ? 'text-[var(--brand-700)] font-semibold' // Trạng thái Active
            : 'text-[var(--text-tertiary)] font-medium hover:text-gray-600' // Trạng thái Inactive
            }`}
        >
          Đề thi
          <span
            className={`text-[12px] transition-opacity duration-300 ${activeTab === 'de-thi' ? 'opacity-80' : 'opacity-50'
              }`}
          >
            ({counts["de-thi"]})
          </span>
        </div>
      </div>

      <div className="bg-[var(--surface-card)] rounded-[18px] border border-[var(--border-default)] shadow-[var(--shadow-clay-sm)] overflow-hidden flex flex-col">
        <div className="p-[14px_20px] border-b border-[var(--border-subtle)] flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--neutral-700)]">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề, môn học hoặc kỳ thi..."
            className="flex-1 border-none outline-none bg-transparent font-[family-name:var(--font-body)] text-[14px] text-[var(--text-primary)]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--surface-muted)]">
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Tiêu đề</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                  {activeTab === "ly-thuyet" ? "Môn học" : "Kỳ thi"}
                </th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Loại file</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Tải lên lúc</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Quyền truy cập</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-[var(--brand-soft-50)] transition-colors duration-140 border-t border-[var(--surface-muted)]">
                  <td className="py-3.5 px-5">
                    <span className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)]">
                      {doc.title}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    {activeTab === "ly-thuyet" ? (
                      <SubjectBadge subject={doc.subject} />
                    ) : (
                      <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-800)]">
                        {doc.kythi}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5">
                    <FileTypeBadge type={doc.fileType} />
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                      {doc.date}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <AccessBadge access={doc.access} />
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex gap-1.5 justify-end items-center">
                      {/* Xem */}
                      <div
                        onClick={() => handleViewClick(doc)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md border-none cursor-pointer font-[family-name:var(--font-heading)] font-medium text-[13px] transition-all duration-150 active:scale-95"
                        style={{ background: '#EBF5F0', color: '#1A7A56' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#D8EDE5')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#EBF5F0')}
                      >
                        Xem
                      </div>
                      {/* Sửa */}
                      <div
                        onClick={() => handleEditClick(doc)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md border-none cursor-pointer font-[family-name:var(--font-heading)] font-medium text-[13px] transition-all duration-150 active:scale-95"
                        style={{ background: '#F3F4F6', color: '#374151' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#E5E7EB')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#F3F4F6')}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                        Sửa
                      </div>
                      {/* Xóa */}
                      <div
                        onClick={() => handleDelete(doc.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md border-none cursor-pointer font-[family-name:var(--font-heading)] font-medium text-[13px] transition-all duration-150 active:scale-95"
                        style={{ background: '#FEF2F2', color: '#DC2626' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#FEE2E2')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#FEF2F2')}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Xóa
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                    Không tìm thấy tài liệu phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
