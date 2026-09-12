import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";
import { useGetLearnerFlashcardTopicByIdQuery } from "../../hooks/queries/useFlashcardTopics";
import { useGetInfiniteLearnerFlashcardWordsQuery } from "../../hooks/queries/useFlashcards";

export default function LearnerFlashcardTopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  type Filter = "all" | "learned" | "unlearned" | "unstudied";
  const [filter, setFilter] = useState<Filter>("all");

  const apiStatusMap: Record<Filter, 'ALL' | 'REMEMBERED' | 'NOT_REMEMBERED' | 'NOT_STUDIED'> = {
    all: "ALL",
    learned: "REMEMBERED",
    unlearned: "NOT_REMEMBERED",
    unstudied: "NOT_STUDIED"
  };

  const { data: topicData, isLoading: isLoadingTopic } = useGetLearnerFlashcardTopicByIdQuery(topicId || "");
  const { 
    data: wordsData, 
    isLoading: isLoadingWords, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGetInfiniteLearnerFlashcardWordsQuery(topicId || "", { status: apiStatusMap[filter], size: 20 });

  const topic = topicData?.data;
  
  const words = useMemo(() => {
    if (!wordsData) return [];
    return wordsData.pages.flatMap(page => page.data);
  }, [wordsData]);

  const typeColor: Record<string, { bg: string; color: string }> = {
    Noun: { bg: "bg-[#DDEAF8]", color: "text-[#2F6FAE]" },
    Adjective: { bg: "bg-[#F5E6F3]", color: "text-[#9B4E8D]" },
    Verb: { bg: "bg-[#DCE9DE]", color: "text-[#2C5A31]" },
    Pronoun: { bg: "bg-[#FEF1E1]", color: "text-[#B76E00]" },
    Adverb: { bg: "bg-[#E1F5F5]", color: "text-[#007C7C]" },
    Preposition: { bg: "bg-[#EAE4F2]", color: "text-[#5B418E]" },
    Conjunction: { bg: "bg-[#FCE8E8]", color: "text-[#C23A3A]" },
    Interjection: { bg: "bg-[#EFF5E1]", color: "text-[#628A2C]" },
    Determiner: { bg: "bg-[#EEF0F2]", color: "text-[#5A6B7C]" },
  };

  if (isLoadingTopic) {
    return <div className="min-h-screen bg-[var(--surface-200)] flex items-center justify-center"><div className="w-10 h-10 border-[3px] border-[var(--brand-base-500)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!topic) {
    return <div className="min-h-screen bg-[var(--surface-200)] flex items-center justify-center">Không tìm thấy chủ đề</div>;
  }

  const pct = topic.progressPercent;
  const unlearnedCount = topic.totalWords - topic.rememberedWords;

  const filterBtns: { key: Filter; label: string; count?: number }[] = [
    { key: "all", label: "Tất cả", count: topic.totalWords },
    { key: "learned", label: "Đã nhớ", count: topic.rememberedWords },
    { key: "unlearned", label: "Chưa thuộc" },
    { key: "unstudied", label: "Chưa học" },
  ];

  return (
    <div className="bg-[var(--surface-200)] min-h-screen flex flex-col">
      <Header />

      {/* Header Area */}
      <div className="bg-gradient-to-br from-[var(--brand-base-500)] to-[var(--brand-base-900)] pt-10 px-6 pb-12">
        <div className="max-w-[1000px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-4.5">
            <div onClick={() => navigate(ROUTES.LEARNER.FLASHCARD_TOPICS)}
              className="bg-transparent border-none cursor-pointer font-[family:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-soft-500)]/70 p-0 hover:text-[var(--brand-soft-500)] transition-colors">
              Flashcard
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" className="text-[var(--brand-soft-500)]/50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="font-[family:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-soft-500)]">{topic.title}</div>
          </div>

          <div className="font-[family:var(--font-heading)] font-black text-[30px] text-white m-0 mb-5 tracking-tight leading-[1.25]">{topic.title}</div>

          {/* Stats + progress + button */}
          <div className="flex items-end gap-8 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <div className="flex justify-between mb-2">
                <span className="font-[family:var(--font-body)] text-[13px] text-[var(--brand-soft-500)]/80">Đã nhớ {topic.rememberedWords}/{topic.totalWords} từ vựng</span>
                <span className="font-[family:var(--font-heading)] font-bold text-[13px] text-[#F5C518]">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#5DBB70] to-[#F5C518] transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex gap-5 mt-3.5">
                {[
                  { label: "Tổng từ", value: topic.totalWords, color: "text-white" },
                  { label: "Đã nhớ", value: topic.rememberedWords, color: "text-[#5DBB70]" },
                  { label: "Chưa thuộc", value: unlearnedCount, color: "text-[#FFCDD2]" },
                ].map(s => (
                  <div key={s.label}>
                    <div className={`font-[family:var(--font-heading)] font-extrabold text-[22px] ${s.color} leading-none`}>{s.value}</div>
                    <div className="font-[family:var(--font-body)] text-[11px] text-[var(--brand-soft-500)]/65 mt-[3px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div onClick={() => navigate(ROUTES.LEARNER.FLASHCARD_STUDY(String(topic.id)))}
                className="font-[family:var(--font-heading)] font-extrabold text-[15px] py-3.5 px-9 rounded-[14px] border-none bg-[#F5C518] text-[#1B1F1C] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-150 flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 3l14 9-14 9V3z" fill="#1B1F1C" /></svg>
                Học ngay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1000px] w-full mx-auto -mt-5 px-6 pb-20 flex-grow">
        <div className="bg-white rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[var(--border-300)] overflow-hidden">

          {/* Filter row */}
          <div className="py-4 px-5.5 border-b border-[var(--border-100)] flex gap-2 items-center">
            {filterBtns.map(f => (
              <div key={f.key} onClick={() => setFilter(f.key)}
                className={`font-[family:var(--font-heading)] font-bold text-xs py-1.5 px-4 rounded-full cursor-pointer transition-all duration-150 ${filter === f.key
                  ? "border-none bg-[var(--brand-base-500)] text-white shadow-[0_2px_8px_rgba(44,90,49,0.25)]"
                  : "border-[1.5px] border-[var(--border-500)] bg-white text-[var(--text-secondary-400)]"
                  }`}>
                {f.label} {f.count !== undefined && <span className="opacity-70 ml-1">({f.count})</span>}
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--surface-500)]">
                  {["Tiếng Anh", "Phiên âm", "Từ loại", "Nghĩa tiếng Việt", "Trạng thái"].map((h, i) => (
                    <th key={h} className={`py-3 px-4.5 font-[family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-400)] uppercase tracking-[0.4px] whitespace-nowrap border-b border-[var(--border-300)] ${i === 4 ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoadingWords && words.length === 0 ? (
                  <tr><td colSpan={5} className="p-12 text-center font-[family:var(--font-body)] text-sm text-[var(--text-secondary-200)]"><div className="flex justify-center"><div className="w-6 h-6 border-[2.5px] border-[var(--brand-base-500)] border-t-transparent rounded-full animate-spin"></div></div></td></tr>
                ) : words.length === 0 ? (
                  <tr><td colSpan={5} className="p-12 text-center font-[family:var(--font-body)] text-sm text-[var(--text-secondary-200)]">Không có từ vựng nào.</td></tr>
                ) : words.map(w => {
                  const badge = typeColor[w.partOfSpeech] ?? { bg: "bg-[var(--surface-500)]", color: "text-[var(--text-secondary-400)]" }
                  return (
                    <tr key={w.id} className="border-b border-[var(--surface-500)] transition-colors duration-150 hover:bg-[var(--surface-200)] group">
                      <td className="py-3.5 px-4.5">
                        <span className="font-[family:var(--font-heading)] font-extrabold text-[15px] text-[var(--text-primary-600)]">{w.word}</span>
                      </td>
                      <td className="py-3.5 px-4.5">
                        <span className="font-[family:var(--font-body)] text-[13px] text-[var(--text-secondary-400)] italic">{w.pronunciation}</span>
                      </td>
                      <td className="py-3.5 px-4.5">
                        <span className={`${badge.bg} ${badge.color} rounded-full py-1 px-2.5 font-[family:var(--font-heading)] font-bold text-[11px] whitespace-nowrap`}>{w.partOfSpeech}</span>
                      </td>
                      <td className="py-3.5 px-4.5">
                        <span className="font-[family:var(--font-body)] text-sm text-[var(--text-secondary-600)]">{w.meaning}</span>
                      </td>
                      <td className="py-3.5 px-4.5 text-center">
                        {w.status === 'REMEMBERED' ? (
                          <span className="bg-[var(--brand-soft-500)] text-[var(--brand-base-500)] rounded-full py-1 px-3 font-[family:var(--font-heading)] font-bold text-[11px] whitespace-nowrap inline-flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="var(--brand-base-500)" /><path d="M3.5 6l2 2 3-3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Đã nhớ
                          </span>
                        ) : w.status === 'NOT_REMEMBERED' ? (
                           <span className="bg-[#FFF1F0] text-[#F5222D] border border-[#FFA39E] rounded-full py-1 px-3 font-[family:var(--font-heading)] font-bold text-[11px] whitespace-nowrap">Chưa thuộc</span>
                        ) : (
                          <span className="bg-[var(--surface-500)] text-[var(--text-secondary-400)] rounded-full py-1 px-3 font-[family:var(--font-heading)] font-bold text-[11px] whitespace-nowrap">Chưa học</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {/* Load More Button */}
            {hasNextPage && (
              <div className="p-4 flex justify-center border-t border-[var(--border-100)]">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="font-[family:var(--font-heading)] font-bold text-[13px] text-[var(--brand-base-500)] border border-[var(--brand-base-500)] rounded-full px-6 py-2 bg-transparent cursor-pointer hover:bg-[var(--brand-soft-100)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isFetchingNextPage ? (
                    <><div className="w-3.5 h-3.5 border-[2px] border-[var(--brand-base-500)] border-t-transparent rounded-full animate-spin"></div> Đang tải...</>
                  ) : "Tải thêm"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
