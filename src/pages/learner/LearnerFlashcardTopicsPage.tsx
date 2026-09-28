import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";
import FlashcardTopicItem from "../../components/learner/FlashcardTopicItem";
import { useGetLearnerFlashcardMetricsQuery, useGetLearnerFlashcardTopicsQuery } from "../../hooks/queries/useFlashcardTopics";

export default function LearnerFlashcardTopicsPage() {
  const { data: metricsData, isLoading: isLoadingMetrics } = useGetLearnerFlashcardMetricsQuery();
  const { data: topicsData, isLoading: isLoadingTopics } = useGetLearnerFlashcardTopicsQuery({ page: 0, size: 50 });

  const metrics = metricsData?.data;
  const topics = topicsData?.data || [];

  return (
    <div className="bg-[var(--surface-200)] min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[var(--brand-base-500)] to-[var(--brand-base-900)] pt-14 pb-22 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="font-[family:var(--font-heading)] font-black text-4xl !text-white m-0 mb-2.5 leading-tight">Học từ vựng với Flashcard</div>
          <div className="font-[family:var(--font-body)] text-[15px] text-[var(--brand-soft-200)] m-0 mb-8">Ôn luyện từ vựng hiệu quả theo phương pháp Active Recall</div>
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Chủ đề", value: metrics?.totalTopics || 0 },
              { label: "Tổng từ vựng", value: metrics?.totalWords || 0 },
              { label: "Đã nhớ", value: metrics?.totalRememberedWords || 0 },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-[14px] px-5.5 py-3">
                <div className="font-[family:var(--font-heading)] font-black text-2xl text-[var(--warning-300)] leading-none">{s.value}</div>
                <div className="font-[family:var(--font-body)] text-xs text-[var(--brand-soft-500)]/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic grid */}
      <div className="bg-[var(--surface-500)] py-10 px-8 pb-20 flex-grow">
        <div className="max-w-[1280px] mx-auto">
          {(isLoadingMetrics || isLoadingTopics) ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-[3px] border-[var(--brand-base-500)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topics.map(topic => (
                <FlashcardTopicItem key={topic.id} topic={topic} />
              ))}
              {topics.length === 0 && (
                <div className="col-span-full py-10 text-center font-[family:var(--font-body)] text-[var(--text-secondary-400)]">
                  Chưa có chủ đề nào được xuất bản.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
