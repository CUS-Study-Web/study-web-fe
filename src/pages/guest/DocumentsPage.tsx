import { useState } from "react";
import GuestPageLayout from "../../components/guest/GuestPageLayout";
import DocumentCard from "../../components/guest/DocumentCard";
import { useGetInfiniteDocumentsQuery } from "../../hooks/queries/useDocuments";
import { useAuth } from "../../contexts/AuthContext";
import type { DocumentResponse, DocType } from "../../types/api/document.api";

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<DocType>("THEORY");
  const { user } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteDocumentsQuery({
    size: 12,
    docType: activeTab,
    sort: ["accessTier,asc", "createdAt,desc"],
  });

  const documents = data?.pages.flatMap((page) => page.data) || [];

  return (
    <GuestPageLayout
      eyebrow="THƯ VIỆN HỌC LIỆU"
      title="Tài liệu"
      description="Tải về các tài liệu ôn tập chất lượng cao. Một số tài liệu yêu cầu tài khoản VIP."
    >
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-10 mb-20">
        {/* Tabs: Lý thuyết / Bài tập */}
        <div className="flex items-center gap-3 mb-12">
          <div
            onClick={() => setActiveTab("THEORY")}
            className={`px-8 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs ${
              activeTab === "THEORY"
                ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
                : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
            }`}
          >
            Lý thuyết
          </div>
          <div
            onClick={() => setActiveTab("EXERCISE")}
            className={`px-8 py-2.5 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-xs ${
              activeTab === "EXERCISE"
                ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
                : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
            }`}
          >
            Bài tập
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
            documents.map((doc: DocumentResponse, index: number) => {
              const isLocked = doc.accessTier === "VIP" && !user?.isVip;
              const type = doc.badges && doc.badges.length > 0 ? doc.badges[0].name : (doc.docType === 'THEORY' ? 'LÝ THUYẾT' : 'BÀI TẬP');
              const tag = doc.badges && doc.badges.length > 1 ? doc.badges[1].name : (doc.fileType || 'PDF');
              
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
                  createdAt={doc.createdAt}
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
