import { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DocumentResponse } from '../../types/api/document.api';
import { useGetInfiniteDocumentsQuery, useDeleteDocumentMutation } from '../../hooks/queries/useDocuments';
import AssistantUploadMaterialPopup from '../../components/assistant/material/AssistantUploadMaterialPopup';
import AssistantEditMaterialPopup from '../../components/assistant/material/AssistantEditMaterialPopup';
import AssistantViewMaterialPopup from '../../components/assistant/material/AssistantViewMaterialPopup';
import AssistantConfirmPopup from '../../components/assistant/AssistantConfirmPopup';
import AssistantFeatureInDevPopup from '../../components/assistant/AssistantFeatureInDevPopup';
import AssistantMaterialSortPopup from '../../components/assistant/material/AssistantMaterialSortPopup';
import { getDisplayFileType, FILE_TYPE_COLORS } from '../../utils/fileUtils';
import { useNotification } from '../../components/common/NotificationProvider';
import { MoreVertical, Eye, Pencil, Trash2, Upload, Search, Globe, Crown } from 'lucide-react';

const FileTypeBadge = ({ type }: { type: string }) => {
  const displayType = getDisplayFileType(type);
  return (
    <span className={`px-2.5 py-1 rounded-md font-[family-name:var(--font-heading)] font-semibold text-[11px] ${FILE_TYPE_COLORS[displayType] ?? 'bg-[var(--surface-muted)] text-[var(--text-secondary)]'}`}>
      {displayType}
    </span>
  );
};

const AccessBadge = ({ access }: { access: string }) => {
  const isPublic = access === "PUBLIC";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-[family-name:var(--font-heading)] font-bold text-[13px] ${isPublic ? 'bg-[var(--brand-soft-500)] text-[var(--brand-500)]' : 'bg-[var(--warning-100)] text-[var(--warning-600)]'}`}>
      {isPublic ? <Globe className="w-3.5 h-3.5" /> : <Crown className="w-3.5 h-3.5" />}
      <span>{isPublic ? "Public" : "VIP"}</span>
    </span>
  );
};

// ── 3-dot action menu ────────────────────────────────────────────────────────

interface MaterialActionMenuProps {
  doc: DocumentResponse;
  onView: (doc: DocumentResponse) => void;
  onEdit: (doc: DocumentResponse) => void;
  onDelete: (id: string) => void;
}

function MaterialActionMenu({ doc, onView, onEdit, onDelete }: MaterialActionMenuProps) {
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
        <MoreVertical className="w-4 h-4 text-[var(--neutral-500)]" />
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
          {/* Xem */}
          <button
            onClick={() => { setOpen(false); onView(doc); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <Eye className="w-3.5 h-3.5 text-current" />
            Xem
          </button>

          {/* Sửa */}
          <button
            onClick={() => { setOpen(false); onEdit(doc); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <Pencil className="w-3.5 h-3.5 text-current" />
            Sửa
          </button>

          {/* Xóa */}
          <button
            onClick={() => { setOpen(false); onDelete(doc.id); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <Trash2 className="w-3.5 h-3.5 text-current" />
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
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<string>("createdAt,desc");
  const { showSuccess, showError } = useNotification();

  const [showUpload, setShowUpload] = useState(() => searchParams.get('upload') === '1');
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState<DocumentResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGetInfiniteDocumentsQuery({
    size: 20,
    docType: activeTab === 'ly-thuyet' ? 'THEORY' : 'EXERCISE',
    search: debouncedSearch.trim() || undefined,
    sort: [sort],
  });

  const { mutate: deleteDocument, isPending: isDeleting } = useDeleteDocumentMutation();

  const docs = useMemo(() => {
    return data?.pages.flatMap(page => page.data) || [];
  }, [data]);

  // Use a hardcoded estimate or real total if API provides it
  const totalElements = data?.pages[0]?.paging?.total || 0;

  // Clear URL param after reading it once
  useEffect(() => {
    if (searchParams.get('upload') === '1') {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleDeleteRequest = (id: string) => {
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteDocument(deleteTarget, {
        onSuccess: () => {
          showSuccess("Xóa tài liệu thành công");
          setDeleteTarget(null);
        },
        onError: (err: any) => {
          showError(err.message || "Có lỗi xảy ra khi xóa tài liệu");
          setDeleteTarget(null);
        }
      });
    }
  };

  const handleEditClick = (doc: DocumentResponse) => {
    setSelectedMaterial(doc);
    setShowEdit(true);
  };

  const handleViewClick = (doc: DocumentResponse) => {
    // Cast it to AssistantDocument for the view popup since it probably expects it,
    // or just let it fail/warn if we need to modify AssistantViewMaterialPopup too.
    // For now, pass it as any, or we should update AssistantViewMaterialPopup next.
    setSelectedMaterial(doc as any);
    setShowView(true);
  };

  const deleteDoc = docs.find(d => d.id === deleteTarget);

  return (
    <div className="flex flex-col h-full w-full">
      {showUpload && <AssistantUploadMaterialPopup onClose={() => setShowUpload(false)} />}
      {showEdit && <AssistantEditMaterialPopup material={selectedMaterial} onClose={() => setShowEdit(false)} />}
      {showView && <AssistantViewMaterialPopup material={selectedMaterial as any} onClose={() => setShowView(false)} />}

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
          isLoading={isDeleting}
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
          <Upload className="w-4 h-4 text-white" />
          Tải lên
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative flex bg-[var(--surface-muted)] p-[4px] rounded-[10px] w-fit" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}>
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
          {activeTab === 'ly-thuyet' && (
            <span className={`text-[12px] transition-opacity duration-300 ${activeTab === 'ly-thuyet' ? 'opacity-80' : 'opacity-50'}`}>
              ({totalElements})
            </span>
          )}
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
          {activeTab === 'bai-tap' && (
             <span className={`text-[12px] transition-opacity duration-300 ${activeTab === 'bai-tap' ? 'opacity-80' : 'opacity-50'}`}>
              ({totalElements})
            </span>
          )}
        </div>
      </div>

      <AssistantMaterialSortPopup currentSort={sort} onSortChange={setSort} />
    </div>

      <div className="bg-[var(--surface-card)] rounded-[18px] border border-[var(--border-default)] shadow-[var(--shadow-clay-sm)] overflow-hidden flex flex-col">
        <div className="p-[14px_20px] border-b border-[var(--border-subtle)] flex items-center gap-2.5">
          <Search className="w-4 h-4 text-[var(--neutral-700)]" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề..."
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
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Nhãn</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Loại file</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Tải lên lúc</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">Quyền truy cập</th>
                <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && docs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : docs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                    Không tìm thấy tài liệu phù hợp
                  </td>
                </tr>
              ) : (
                docs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[var(--surface-400)] transition-colors duration-140 border-t border-[var(--surface-500)]">
                    <td className="py-3.5 px-5">
                      <span className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)]">
                        {doc.title}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex gap-1.5 flex-wrap">
                        {doc.badges?.map((badge: any) => (
                          <span key={badge.id} className="px-2.5 py-1 rounded-md font-[family-name:var(--font-heading)] font-bold text-[10px] uppercase tracking-wide bg-[var(--brand-100)] text-[var(--brand-600)]">
                            {badge.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <FileTypeBadge type={doc.fileType} />
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                        {new Date(doc.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <AccessBadge access={doc.accessTier} />
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex justify-end">
                        <MaterialActionMenu
                          doc={doc}
                          onView={handleViewClick}
                          onEdit={handleEditClick}
                          onDelete={handleDeleteRequest}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {hasNextPage && (
          <div className="p-4 border-t border-[var(--border-default)] flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-5 py-2.5 rounded-full border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-600)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isFetchingNextPage ? 'Đang tải...' : '+ Hiển thị thêm'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
