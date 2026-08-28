import { useState, useEffect, useRef } from 'react';
import type { DocumentResponse } from '../../../types/api/document.api';
import AssistantConfirmPopup from '../AssistantConfirmPopup';
import { useNotification } from '../../common/NotificationProvider';
import { validateDocumentFile, downloadFileFromUrl } from '../../../utils/fileUtils';
import * as mammoth from 'mammoth';
import { useGetBadgesQuery } from '../../../hooks/queries/useBadges';
import { useUpdateDocumentMutation } from '../../../hooks/queries/useDocuments';
import AssistantBadgeSelectPopup from './AssistantBadgeSelectPopup';

interface AssistantEditMaterialPopupProps {
  material: DocumentResponse | null;
  onClose: () => void;
}

export default function AssistantEditMaterialPopup({ material, onClose }: AssistantEditMaterialPopupProps) {
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('Lý thuyết');
  const [fileType, setFileType] = useState('');
  const [access, setAccess] = useState('public');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [numPages, setNumPages] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [isBadgeDropdownOpen, setIsBadgeDropdownOpen] = useState(false);

  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [docxHtml, setDocxHtml] = useState<string | null>(null);
  const [docxZoom, setDocxZoom] = useState<number>(100);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { showError, showSuccess } = useNotification();

  const { data: badgesData } = useGetBadgesQuery({ page: 0, size: 100 });
  const availableBadges = badgesData?.data || [];
  
  const { mutate: updateDocument, isPending } = useUpdateDocumentMutation();

  useEffect(() => {
    if (material) {
      setTitle(material.title);
      setDocType(material.docType === 'THEORY' ? 'Lý thuyết' : 'Bài tập');
      setFileType(material.fileType || 'PDF');
      setAccess(material.accessTier === 'VIP' ? 'vip' : 'public');
      setNumPages(material.numPages || '');
      setDescription(material.description || '');
      setYoutubeLink(material.youtubeUrl || '');
      setSelectedBadges(material.badges?.map(b => b.id) || []);
    }
  }, [material]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(e.target as Node)) {
        setIsBadgeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setFileUrl(null);
      setDocxHtml(null);
      // setFileType(''); // Don't reset in edit unless replacing file changes it
      return;
    }

    const ext = selectedFile.name.split('.').pop()?.toUpperCase() || '';
    if (['DOCX', 'DOC'].includes(ext)) {
      setFileType('Word');
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          mammoth.convertToHtml({ arrayBuffer })
            .then((result) => setDocxHtml(result.value))
            .catch((err) => console.error("Mammoth error:", err));
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      setFileType('PDF');
      setDocxHtml(null);
    }

    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFile = (file: File) => {
    try {
      const ext = file.name.split('.').pop()?.toUpperCase() || '';
      if (!['PDF', 'DOCX'].includes(ext)) {
        showError('Chỉ hỗ trợ file định dạng PDF và DOCX');
        return;
      }
      validateDocumentFile(file);
      setSelectedFile(file);
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveFile = () => setSelectedFile(null);

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges(prev => {
      if (prev.includes(badgeId)) return prev.filter(id => id !== badgeId);
      if (prev.length >= 2) {
        showError("Chỉ được chọn tối đa 2 nhãn");
        return prev;
      }
      return [...prev, badgeId];
    });
  };

  const labelClass = 'block font-[family-name:var(--font-heading)] font-bold text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1.5';
  const inputClass = 'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] outline-none box-border bg-transparent focus:border-[var(--brand-400)] transition-colors';
  const selectClass = 'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] outline-none box-border bg-[var(--surface-card)] focus:border-[var(--brand-400)] transition-colors cursor-pointer';

  const isPdf = selectedFile?.type === 'application/pdf' || selectedFile?.name.endsWith('.pdf');
  const isDocx = selectedFile?.name.endsWith('.docx') || selectedFile?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const handleSave = () => {
    if (!title.trim()) {
      showError('Vui lòng nhập tiêu đề tài liệu');
      return;
    }
    if (!numPages) {
      showError('Vui lòng nhập số trang');
      return;
    }
    if (selectedBadges.length === 0) {
      showError('Vui lòng chọn ít nhất 1 nhãn');
      return;
    }
    if (!description.trim()) {
      showError('Vui lòng nhập mô tả');
      return;
    }
    setShowConfirm(true);
  };

  const handleSaveConfirm = () => {
    if (!material) return;
    
    const formData = new FormData();
    if (selectedFile) formData.append('file', selectedFile);
    formData.append('title', title.trim());
    formData.append('docType', docType === 'Lý thuyết' ? 'THEORY' : 'EXERCISE');
    formData.append('numPages', numPages.toString());
    formData.append('description', description.trim());
    formData.append('accessTier', access === 'public' ? 'PUBLIC' : 'VIP');
    if (youtubeLink.trim()) {
      formData.append('youtubeUrl', youtubeLink.trim());
    }
    selectedBadges.forEach(id => {
      formData.append('badgeIds', id);
    });

    updateDocument({ id: material.id, formData }, {
      onSuccess: () => {
        showSuccess('Cập nhật tài liệu thành công');
        setShowConfirm(false);
        onClose();
      },
      onError: (err: any) => {
        showError(err.message || 'Có lỗi xảy ra khi cập nhật tài liệu');
        setShowConfirm(false);
      }
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] w-full max-w-[1200px] h-[90vh] flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border-default)] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-100)] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--brand-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <div className="font-[family-name:var(--font-heading)] font-extrabold text-[length:var(--text-body-lg)] text-[var(--text-primary)] leading-tight">
                  Chỉnh sửa tài liệu
                </div>
                <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] mt-0.5">
                  Cập nhật thông tin tài liệu
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] bg-transparent border-none cursor-pointer text-xl transition-colors">
              ×
            </button>
          </div>

          {/* Content Body */}
          <div className="flex flex-1 min-h-0">
            {/* Left: Preview/Dropzone */}
            <div className="flex-1 border-r border-[var(--border-default)] bg-[var(--surface-muted)] p-5 relative overflow-hidden flex flex-col">
              {selectedFile ? (
                <div className="flex flex-col flex-1 min-h-0 rounded-[12px] overflow-hidden border border-[var(--border-default)] bg-white">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-default)] bg-white shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] font-medium truncate flex-1">
                      {selectedFile.name}
                    </span>
                    <div
                      onClick={() => {
                        if (fileUrl) {
                          showSuccess('Đang tải về...');
                          downloadFileFromUrl(fileUrl, selectedFile.name);
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--brand-600)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
                    >
                      Tải về
                    </div>
                    <label className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none">
                      Đổi file
                      <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
                    </label>
                    <button onClick={handleRemoveFile} className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-red-200 bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-red-500 cursor-pointer hover:bg-red-50 transition-colors select-none">
                      Xóa
                    </button>
                  </div>

                  {isPdf && fileUrl ? (
                    <iframe src={`${fileUrl}#toolbar=1&navpanes=0&scrollbar=1`} className="flex-1 w-full border-none" title="PDF Preview" />
                  ) : isDocx && docxHtml ? (
                    <div className="flex-1 w-full flex flex-col min-h-0 bg-[#f3f4f6]">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-default)] bg-white shrink-0">
                        <div className="text-[12px] font-semibold text-[var(--text-secondary)]">Xem trước DOCX</div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setDocxZoom(z => Math.max(50, z - 10))} className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" title="Thu nhỏ">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                          <span className="text-[12px] font-medium text-gray-600 w-10 text-center">{docxZoom}%</span>
                          <button onClick={() => setDocxZoom(z => Math.min(200, z + 10))} className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" title="Phóng to">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 min-h-0 overflow-auto p-4 md:p-8 flex justify-center items-start bg-[#f3f4f6]">
                        <div className="bg-white shadow-sm border border-gray-200 document-preview" style={{ width: '800px', minHeight: '1131px', padding: '40px', zoom: `${docxZoom}%` } as React.CSSProperties}>
                          <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-[var(--surface-muted)]">
                      <div className="w-16 h-16 rounded-[12px] bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)]">File đã được chọn</div>
                      <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)]">Không có bản xem trước cho định dạng này</div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-4 h-full rounded-[12px] border-2 border-dashed transition-all duration-200 ${isDragOver ? 'border-[var(--brand-500)] bg-[var(--brand-soft-300)]' : 'border-[var(--border-default)] bg-[var(--surface-muted)]'
                    }`}
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--brand-600)]">
                    Kéo thả file mới để thay thế file hiện tại
                  </div>
                  <label className="px-5 py-2 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none shadow-sm">
                    Chọn File
                    <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
                  </label>
                  <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)] italic">
                    Hỗ trợ file PDF, DOCX (Tối đa 50MB)
                  </div>
                </div>
              )}
            </div>

            {/* Right: Form */}
            <div className="w-[380px] p-7 overflow-y-auto shrink-0 flex flex-col bg-white">
              <div className="space-y-4 flex-1">
                <div>
                  <label className={labelClass}>Tiêu đề tài liệu</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề tài liệu..." className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Loại tài liệu</label>
                    <select value={docType} onChange={(e) => setDocType(e.target.value)} className={selectClass}>
                      <option value="Lý thuyết">Lý thuyết</option>
                      <option value="Bài tập">Bài tập</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Loại file</label>
                    <input
                      type="text"
                      value={fileType}
                      placeholder="Chưa upload file"
                      readOnly
                      className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] outline-none box-border bg-[var(--surface-muted)] cursor-not-allowed select-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Số trang</label>
                    <input
                      type="number"
                      min={1}
                      value={numPages}
                      onChange={(e) => setNumPages(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Nhập số trang..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Quyền truy cập</label>
                    <select value={access} onChange={(e) => setAccess(e.target.value)} className={selectClass}>
                      <option value="public">🌐 Public</option>
                      <option value="vip">⭐ VIP</option>
                    </select>
                  </div>
                </div>

                <div ref={badgeRef}>
                  <label className={labelClass}>
                    Nhãn (Badges) <span className="normal-case text-[10px] text-[var(--text-tertiary)] italic ml-1">- Chọn ít nhất 1, tối đa 2 nhãn</span>
                  </label>
                  <div
                    className={`min-h-[46px] p-2 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] bg-transparent cursor-pointer flex flex-wrap gap-2 items-center ${isBadgeDropdownOpen ? 'border-[var(--brand-400)]' : ''}`}
                    onClick={() => setIsBadgeDropdownOpen(!isBadgeDropdownOpen)}
                  >
                    {selectedBadges.length === 0 && <span className="text-[var(--text-tertiary)] px-2 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)]">Chọn nhãn...</span>}
                    {selectedBadges.map(badgeId => {
                      const badge = availableBadges.find(b => b.id === badgeId);
                      if (!badge) return null;
                      return (
                        <span key={badge.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-semibold bg-[var(--brand-100)] text-[var(--brand-600)]">
                          {badge.name}
                          <button type="button" onClick={(e) => { e.stopPropagation(); toggleBadge(badge.id); }} className="hover:text-[var(--brand-800)] opacity-60 hover:opacity-100 transition-opacity">
                            ×
                          </button>
                        </span>
                      )
                    })}
                  </div>

                  {isBadgeDropdownOpen && (
                    <AssistantBadgeSelectPopup
                      availableBadges={availableBadges}
                      selectedBadges={selectedBadges}
                      toggleBadge={toggleBadge}
                      onClose={() => setIsBadgeDropdownOpen(false)}
                    />
                  )}
                </div>

                <div>
                  <label className={labelClass}>Mô tả</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả tài liệu..."
                    className={`${inputClass} resize-none`}
                    rows={4}
                  />
                </div>

                <div>
                  <label className={labelClass}>Link YouTube (không bắt buộc)</label>
                  <input type="url" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 mt-6 shrink-0 pt-4 border-t border-[var(--border-default)]">
                <div onClick={onClose} className="flex-1 p-3 flex items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors">
                  Hủy
                </div>
                <div onClick={handleSave} className="flex-[2] p-3 flex items-center justify-center rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] text-[var(--text-inverse)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--brand-600)] transition-colors">
                  Lưu thay đổi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận chỉnh sửa"
          message={`Bạn có chắc chắn muốn lưu thay đổi cho tài liệu "${title}"?`}
          confirmLabel="Lưu"
          variant="warning"
          onConfirm={handleSaveConfirm}
          onCancel={() => setShowConfirm(false)}
          isLoading={isPending}
        />
      )}
    </>
  );
}
