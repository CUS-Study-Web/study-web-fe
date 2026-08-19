import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEMO_MATERIALS_ASST } from '../../types/mockData';
import type { AssistantDocument } from '../../types/assistant';
import AssistantUploadMaterialPopup from '../../components/assistant/material/AssistantUploadMaterialPopup';
import AssistantEditMaterialPopup from '../../components/assistant/material/AssistantEditMaterialPopup';
import AssistantViewMaterialPopup from '../../components/assistant/material/AssistantViewMaterialPopup';
import AssistantConfirmPopup from '../../components/assistant/AssistantConfirmPopup';
import AssistantFeatureInDevPopup from '../../components/assistant/AssistantFeatureInDevPopup';

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

// ── 3-dot action menu ────────────────────────────────────────────────────────

interface MaterialActionMenuProps {
  doc: AssistantDocument;
  onView: (doc: AssistantDocument) => void;
  onDownload: () => void;
  onEdit: (doc: AssistantDocument) => void;
  onDelete: (id: number) => void;
}

function MaterialActionMenu({ doc, onView, onDownload, onEdit, onDelete }: MaterialActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (btnRef.current?.contains(e.target as Node)) return;
        if (menuRef.current?.contains(e.target as Node)) return;
      }
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPos.top,
            right: menuPos.right,
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          }}
          className="bg-white rounded-[10px] border border-[var(--border-default)] py-1.5 min-w-[160px]"
        >
          {/* Tải về */}
          <button
            onClick={() => { setOpen(false); onDownload(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải về
          </button>

          {/* Xem */}
          <button
            onClick={() => { setOpen(false); onView(doc); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Xem
          </button>

          {/* Sửa */}
          <button
            onClick={() => { setOpen(false); onEdit(doc); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Sửa
          </button>

          {/* Xóa */}
          <button
            onClick={() => { setOpen(false); onDelete(doc.id); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa
          </button>
        </div>
      )}
    </>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AssistantMaterials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"ly-thuyet" | "bai-tap">("ly-thuyet");
  const [docs, setDocs] = useState<AssistantDocument[]>(DEMO_MATERIALS_ASST);
  const [search, setSearch] = useState("");

  const [showUpload, setShowUpload] = useState(() => searchParams.get('upload') === '1');
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState<AssistantDocument | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  // Clear URL param after reading it once
  useEffect(() => {
    if (searchParams.get('upload') === '1') {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filtered = docs.filter(d => {
    if (d.cat !== activeTab) return false;
    const q = search.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.subject.toLowerCase().includes(q);
  });

  const counts = {
    "ly-thuyet": docs.filter(d => d.cat === "ly-thuyet").length,
    "bai-tap": docs.filter(d => d.cat === "bai-tap").length,
  };

  const handleDeleteRequest = (id: number) => {
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget !== null) {
      setDocs(prev => prev.filter(d => d.id !== deleteTarget));
    }
    setDeleteTarget(null);
  };

  const handleEditClick = (doc: AssistantDocument) => {
    setSelectedMaterial(doc);
    setShowEdit(true);
  };

  const handleViewClick = (doc: AssistantDocument) => {
    setSelectedMaterial(doc);
    setShowView(true);
  };

  const deleteDoc = docs.find(d => d.id === deleteTarget);

  return (
    <div className="flex flex-col h-full w-full">
      {showUpload && <AssistantUploadMaterialPopup onClose={() => setShowUpload(false)} />}
      {showEdit && <AssistantEditMaterialPopup material={selectedMaterial} onClose={() => setShowEdit(false)} />}
      {showView && <AssistantViewMaterialPopup material={selectedMaterial} onClose={() => setShowView(false)} />}

      {showDevPopup && (
        <AssistantFeatureInDevPopup onClose={() => setShowDevPopup(false)} />
      )}

      {deleteTarget !== null && (
        <AssistantConfirmPopup
          title="Xóa tài liệu"
          message={`Bạn có chắc muốn xóa tài liệu "${deleteDoc?.title ?? ''}"? Hành động này không thể hoàn tác.`}
          confirmLabel="Xóa"
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] m-0 mb-1">
            Tài liệu
          </div>
          <p className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)] m-0">
            Quản lý tài liệu học tập và bài tập
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
        {/* Sliding white pill indicator */}
        <div
          className="absolute top-[4px] bottom-[4px] rounded-[10px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: 'calc(50% - 4px)',
            transform: activeTab === 'ly-thuyet' ? 'translateX(0)' : 'translateX(100%)',
            background: '#ffffff',
            boxShadow: '0 1px 6px rgba(0,0,0,0.10), 0 0.5px 2px rgba(0,0,0,0.06)',
          }}
        />

        {/* Tab 1: Lý thuyết */}
        <div
          onClick={() => setActiveTab("ly-thuyet")}
          className={`relative z-10 min-w-[130px] px-6 py-2 rounded-[10px] border-none cursor-pointer bg-transparent flex justify-center items-center gap-1.5 font-[family-name:var(--font-heading)] text-[14px] transition-all duration-300 select-none ${activeTab === 'ly-thuyet'
            ? 'text-[var(--brand-700)] font-semibold'
            : 'text-[var(--text-tertiary)] font-medium hover:text-gray-600'
            }`}
        >
          Lý thuyết
          <span className={`text-[12px] transition-opacity duration-300 ${activeTab === 'ly-thuyet' ? 'opacity-80' : 'opacity-50'}`}>
            ({counts["ly-thuyet"]})
          </span>
        </div>

        {/* Tab 2: Bài tập */}
        <div
          onClick={() => setActiveTab("bai-tap")}
          className={`relative z-10 min-w-[130px] px-6 py-2 rounded-[10px] border-none cursor-pointer bg-transparent flex justify-center items-center gap-1.5 font-[family-name:var(--font-heading)] text-[14px] transition-all duration-300 select-none ${activeTab === 'bai-tap'
            ? 'text-[var(--brand-700)] font-semibold'
            : 'text-[var(--text-tertiary)] font-medium hover:text-gray-600'
            }`}
        >
          Bài tập
          <span className={`text-[12px] transition-opacity duration-300 ${activeTab === 'bai-tap' ? 'opacity-80' : 'opacity-50'}`}>
            ({counts["bai-tap"]})
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
            placeholder="Tìm kiếm theo tiêu đề hoặc môn học..."
            className="flex-1 border-none outline-none bg-transparent font-[family-name:var(--font-body)] text-[14px] text-[var(--text-primary)]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--surface-500)]">
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Tiêu đề</th>
                {activeTab === "ly-thuyet" && (
                  <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Môn học</th>
                )}
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Loại file</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Tải lên lúc</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Quyền truy cập</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-[var(--surface-400)] transition-colors duration-140 border-t border-[var(--surface-500)]">
                  <td className="py-3.5 px-5">
                    <span className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)]">
                      {doc.title}
                    </span>
                  </td>
                  {activeTab === "ly-thuyet" && (
                    <td className="py-3.5 px-5">
                      <SubjectBadge subject={doc.subject} />
                    </td>
                  )}
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
                    <div className="flex justify-end">
                      <MaterialActionMenu
                        doc={doc}
                        onView={handleViewClick}
                        onDownload={() => setShowDevPopup(true)}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteRequest}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={activeTab === "ly-thuyet" ? 6 : 5} className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
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
