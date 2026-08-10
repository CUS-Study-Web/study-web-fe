import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";
import FlashcardTopicItem, { type FlashcardTopic } from "../../components/learner/FlashcardTopicItem";

// ─── Flashcard data ───────────────────────────────────────────────────────────
const FLASHCARD_TOPICS: FlashcardTopic[] = [
  { id: 1, title: "Từ vựng cốt lõi ĐGNL",        total: 50,  learned: 32 },
  { id: 2, title: "Động từ bất quy tắc",          total: 80,  learned: 45 },
  { id: 3, title: "Thành ngữ tiếng Anh",          total: 60,  learned: 18 },
  { id: 4, title: "Từ vựng học thuật (Academic)", total: 120, learned: 67 },
  { id: 5, title: "Từ vựng V-ACT — Toán học",    total: 40,  learned: 40 },
  { id: 6, title: "Từ vựng THPT — Khoa học",     total: 90,  learned: 12 },
];

export default function LearnerFlashcardTopicsPage() {
  const totalWords = FLASHCARD_TOPICS.reduce((s, t) => s + t.total, 0);
  const totalLearned = FLASHCARD_TOPICS.reduce((s, t) => s + t.learned, 0);

  return (
    <div className="bg-[var(--surface-200)] min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[var(--brand-base-500)] to-[var(--brand-base-900)] pt-14 pb-22 px-6">
        <div className="max-w-[860px] mx-auto">
          <h1 className="font-[family:var(--font-heading)] font-black text-4xl !text-white m-0 mb-2.5 leading-tight">Học từ vựng với Flashcard</h1>
          <p className="font-[family:var(--font-body)] text-[15px] text-[var(--brand-soft-200)] m-0 mb-8">Ôn luyện từ vựng hiệu quả theo phương pháp Active Recall</p>
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Chủ đề", value: FLASHCARD_TOPICS.length },
              { label: "Tổng từ vựng", value: totalWords },
              { label: "Đã nhớ", value: totalLearned },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {FLASHCARD_TOPICS.map(topic => (
              <FlashcardTopicItem key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
