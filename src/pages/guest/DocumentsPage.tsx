import { useState, useRef, useEffect } from "react";
import GuestPageLayout from "../../components/guest/GuestPageLayout";
import DocumentCard from "../../components/guest/DocumentCard";
import { useGetInfiniteDocumentsQuery, useGetInfiniteGuestDocumentsQuery } from "../../hooks/queries/useDocuments";
import { useAuth } from "../../contexts/AuthContext";
import type { DocumentResponse, GuestDocumentResponse, DocType } from "../../types/api/document.api";
import { SORT_OPTIONS } from "../../utils/sortOptions";

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<DocType>("THEORY");
  const [sort, setSort] = useState<string>("createdAt,desc");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (sortRef.current?.contains(e.target as Node)) return;
      }
      setSortOpen(false);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [sortOpen]);

  const activeSortOption = SORT_OPTIONS.find(opt => opt.value === sort) || SORT_OPTIONS[0];
  const { user, isLoading: isAuthLoading } = useAuth();

  const authReady = !isAuthLoading;
  const isGuest = !user;

  const authQuery = useGetInfiniteDocumentsQuery({
    size: 12,
    docType: activeTab,
    sort: ["accessTier,asc", sort],
    enabled: authReady && !isGuest,
  });

  const guestQuery = useGetInfiniteGuestDocumentsQuery({
    size: 12,
    docType: activeTab,
    sort: ["accessTier,asc", sort],
    enabled: authReady && isGuest,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = isGuest ? guestQuery : authQuery;

  const documents = data?.pages.flatMap((page) => page.data) || [];

  return (
    <GuestPageLayout
      eyebrow="THƯ VIỆN HỌC LIỆU"
      title="Tài liệu"
      description="Tải về các tài liệu ôn tập chất lượng cao. Một số tài liệu yêu cầu tài khoản VIP."
    >
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-10 mb-20">
        {/* Tabs and Sort */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveTab("THEORY")}
              className={`px-8 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs ${activeTab === "THEORY"
                  ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
                  : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
                }`}
            >
              Lý thuyết
            </div>
            <div
              onClick={() => setActiveTab("EXERCISE")}
              className={`px-8 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs ${activeTab === "EXERCISE"
                  ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
                  : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
                }`}
            >
              Bài tập
            </div>
          </div>

          <div className="relative" ref={sortRef}>
            <div
              onClick={() => setSortOpen(!sortOpen)}
              className="px-6 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] flex items-center gap-2 outline-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5h10M11 9h7M11 13h4M3 17l4 4 4-4M7 21V3" />
              </svg>
              Sắp xếp: <span className="font-semibold">{activeSortOption.label}</span>
            </div>

            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 bg-white rounded-[12px] border border-[var(--border-default)] py-2 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-left transition-colors hover:bg-[var(--surface-500)] ${sort === opt.value ? 'text-[var(--brand-base-600)] bg-[#edf4ee] hover:bg-[#edf4ee]' : 'text-[var(--text-primary)]'
                      }`}
                  >
                    {sort === opt.value ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <div className="w-[16px]" />
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 border-b border-[var(--border-300)] pb-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#1f1f1c]" style={{ fontFamily: "var(--font-heading)" }}>
            Tài liệu {activeTab === "THEORY" ? "lý thuyết" : "bài tập"}
          </h2>
          <span className="text-sm font-bold text-[#5c635e] mb-1">{data?.pages[0]?.paging.total || 0} tài liệu</span>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-10">
          {isLoading ? (
            <div className="col-span-full py-10 text-center font-bold text-[var(--text-secondary)]">
              Đang tải danh sách tài liệu...
            </div>
          ) : documents.length === 0 ? (
            <div className="col-span-full py-10 text-center font-bold text-[var(--text-secondary)]">
              Chưa có tài liệu nào
            </div>
          ) : (
            documents.map((doc: DocumentResponse | GuestDocumentResponse, index: number) => {
              const isLocked = doc.accessTier === "VIP" && !user?.isVip;
              const type = doc.badges && doc.badges.length > 0 ? doc.badges[0].name : (('docType' in doc && doc.docType === 'THEORY') ? 'LÝ THUYẾT' : 'BÀI TẬP');
              const tag = doc.badges && doc.badges.length > 1 ? doc.badges[1].name : (('fileType' in doc && doc.fileType) || 'TÀI LIỆU');

              return (
                <DocumentCard
                  key={doc.id}
                  id={doc.id}
                  title={doc.title}
                  desc={doc.description || ""}
                  type={type}
                  tag={tag}
                  isVip={isLocked}
                  index={index}
                  pages={doc.numPages}
                  downloads={doc.downloadCount}
                  createdAt={'createdAt' in doc ? doc.createdAt : undefined}
                />
              );
            })
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-2.5 bg-white border-2 border-[var(--border-default)] rounded-full font-bold text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isFetchingNextPage ? 'Đang tải...' : 'Hiển thị thêm'}
            </button>
          </div>
        )}
      </section>
    </GuestPageLayout>
  );
}
