import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import Header from "../../components/guest/Header";
import { useGetLearnerFlashcardsStudyQuery, useUpdateLearnerFlashcardProgressMutation } from "../../hooks/queries/useFlashcards";

export default function LearnerFlashcardStudyPage() {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();

  const { data: studyData, isLoading } = useGetLearnerFlashcardsStudyQuery(topicId || "");
  const { mutate: updateProgress } = useUpdateLearnerFlashcardProgressMutation();

  const p1Words = studyData?.data || [];

  // Tracking state
  const [sessionUpdates, setSessionUpdates] = useState<Record<string, string>>({});
  const getStatus = (cardId: string) => sessionUpdates[cardId] || p1Words.find(w => w.id === cardId)?.status || "NOT_STUDIED";

  // Phase 1 state
  const [phase, setPhase] = useState<1 | 2>(1);
  const [p1Index, setP1Index] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Phase 2 state
  const [p2Words, setP2Words] = useState<typeof p1Words | null>(null);
  const [p2Index, setP2Index] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [answerState, setAnswerState] = useState<"idle" | "wrong" | "correct">("idle");
  const [p2Remembered, setP2Remembered] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false); // To satisfy any potential user requirement for 0.5s loading on Phase 2 Check

  const handleStartPhase2 = (updates = sessionUpdates) => {
    const getStat = (id: string) => updates[id] || p1Words.find(w => w.id === id)?.status || "NOT_STUDIED";
    const wordsForP2 = p1Words.filter(w => getStat(w.id) === "NOT_REMEMBERED");
    setP2Words(wordsForP2);
    setP2Index(0);
    setP2Remembered([]);
    setAnswerState("idle");
    setInputVal("");
    setPhase(2);
  };

  const typeColor: Record<string, { bg: string; color: string }> = {
    Noun: { bg: "#DDEAF8", color: "#2F6FAE" },
    Adjective: { bg: "#F5E6F3", color: "#9B4E8D" },
    Verb: { bg: "var(--brand-soft-500)", color: "var(--brand-base-500)" },
    Pronoun: { bg: "#FEF1E1", color: "#B76E00" },
    Adverb: { bg: "#E1F5F5", color: "#007C7C" },
    Preposition: { bg: "#EAE4F2", color: "#5B418E" },
    Conjunction: { bg: "#FCE8E8", color: "#C23A3A" },
    Interjection: { bg: "#EFF5E1", color: "#628A2C" },
    Determiner: { bg: "#EEF0F2", color: "#5A6B7C" },
  };

  if (isLoading) {
    return (
      <div className="bg-[var(--surface-200)] min-h-screen select-none flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10 h-10 border-[3px] border-[var(--brand-base-500)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (p1Words.length === 0) {
    return (
      <div className="bg-[var(--surface-200)] min-h-screen select-none flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center font-[family:var(--font-heading)] font-bold text-[var(--text-secondary-400)]">
          Chủ đề này chưa có từ vựng nào.
        </div>
      </div>
    );
  }

  // ── Phase 1 logic ──
  const p1Total = p1Words.length;
  const p1Card = p1Words[p1Index % p1Total];
  const p1Badge = typeColor[p1Card.partOfSpeech] ?? { bg: "var(--surface-500)", color: "#6B746D" };

  const p1Mark = (remembered: boolean) => {
    const newStatus = remembered ? "REMEMBERED" : "NOT_REMEMBERED";
    updateProgress({
      topicId: topicId || "",
      cardId: p1Card.id,
      payload: { status: newStatus }
    });

    const newUpdates = { ...sessionUpdates, [p1Card.id]: newStatus };
    setSessionUpdates(newUpdates);

    setFlipped(false);
    if (p1Index + 1 >= p1Total) {
      setTimeout(() => {
        handleStartPhase2(newUpdates);
      }, 280);
    } else {
      setTimeout(() => setP1Index(i => i + 1), 280);
    }
  };

  // ── Phase 2 logic ──
  const activeP2Words = p2Words || [];
  const p2Total = activeP2Words.length;
  const p2Card = p2Total > 0 ? activeP2Words[p2Index % p2Total] : p1Words[0];
  const p2Badge = typeColor[p2Card?.partOfSpeech ?? ""] ?? { bg: "var(--surface-500)", color: "#6B746D" };
  const isWrong = answerState === "wrong";
  const isCorrect = answerState === "correct";
  const showAnswer = isWrong || isCorrect;

  const p2GoNext = () => {
    if (p2Remembered.length >= p2Total) {
      navigate(ROUTES.LEARNER.FLASHCARD_TOPIC_DETAIL(topicId || ""));
      return;
    }
    setAnswerState("idle");
    setInputVal("");
    setTimeout(() => setP2Index(i => i + 1), 120);
  };

  const p2Check = () => {
    if (isChecking || showAnswer) return;
    setIsChecking(true);

    setTimeout(() => {
      setIsChecking(false);
      const input = inputVal.trim().toLowerCase();
      const answer = p2Card.meaning.toLowerCase();

      // Exact match or contains check (if input is at least 2 chars long)
      const isCorrectWord = input === answer || (input.length > 1 && answer.includes(input));

      if (input.length > 0 && isCorrectWord) {
        updateProgress({
          topicId: topicId || "",
          cardId: p2Card.id,
          payload: { status: "REMEMBERED" }
        });
        setP2Remembered(p => p.includes(p2Card.id) ? p : [...p, p2Card.id]);
        setSessionUpdates(prev => ({ ...prev, [p2Card.id]: "REMEMBERED" }));
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
    }, 500); // UI delay for checking effect
  };

  // Shared nav row renderer
  const NavRow = ({ current, total, remembered, label }: { current: number; total: number; remembered: number; label: string }) => (
    <div className="w-full max-w-[560px] flex items-center justify-between mb-5">
      <div
        onClick={() => navigate(ROUTES.LEARNER.FLASHCARD_TOPIC_DETAIL(topicId || "1"))}
        className="flex items-center gap-1.5 font-[family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary-600)] bg-white border-[1.5px] border-[var(--border-500)] rounded-[10px] px-3.5 py-[7px] cursor-pointer hover:bg-[var(--surface-100)] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Danh sách từ vựng
      </div>
      <div className="text-center">
        <div className="font-[family:var(--font-heading)] font-bold text-[14px] text-[var(--text-secondary-600)]">{current} / {total}</div>
        <div className="font-[family:var(--font-body)] text-[11px] text-[var(--text-secondary-200)] mt-0.5">{label}</div>
      </div>
      <div className="font-[family:var(--font-heading)] font-bold text-[13px] text-[var(--brand-base-500)]">✅ {remembered} đã nhớ</div>
    </div>
  );

  return (
    <div className="bg-[var(--surface-200)] min-h-screen select-none flex flex-col">
      <Header />
      <div className="min-h-[calc(100vh-68px)] bg-[var(--surface-500)] flex flex-col items-center pt-9 px-6 pb-14">

        {/* Phase label pill */}
        <div className="mb-5">
          <div className="flex gap-0 bg-[var(--border-300)] rounded-full p-[3px]">
            {["Giai đoạn 1 — Học thẻ", "Giai đoạn 2 — Ôn tập"].map((label, idx) => (
              <div
                key={label}
                onClick={() => {
                  if (idx === 0) setPhase(1);
                  if (idx === 1) handleStartPhase2();
                }}
                className={`px-4.5 py-1.5 rounded-full font-[family:var(--font-heading)] font-bold text-xs transition-all duration-200 cursor-pointer ${phase === idx + 1 ? "bg-[var(--brand-base-500)] text-white shadow-sm" : "bg-transparent text-[var(--text-secondary-400)] hover:text-[var(--text-primary-800)]"}`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════ PHASE 1 ══════════════════ */}
        {phase === 1 && (
          <>
            <NavRow current={p1Index + 1} total={p1Total} remembered={p1Words.filter(w => getStatus(w.id) === "REMEMBERED").length} label="Giai đoạn 1" />
            <div className="w-full max-w-[560px] h-[5px] rounded-[3px] bg-[var(--border-500)] mb-6 overflow-hidden">
              <div className="h-full rounded-[3px] bg-[var(--brand-base-500)] transition-all duration-300 ease-out" style={{ width: `${((p1Index + 1) / p1Total) * 100}%` }} />
            </div>

            {/* Flip card */}
            <div className="w-full max-w-[560px] perspective-[1200px] mb-5">
              <div
                onClick={() => setFlipped(f => !f)}
                className="relative w-full h-[300px] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
                style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-[22px] shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-[var(--border-300)] flex flex-col items-center justify-center py-9 px-11 gap-3.5 select-none" style={{ backfaceVisibility: "hidden" }}>
                  <div className="font-[family:var(--font-heading)] font-black text-[42px] text-[var(--text-primary-900)] text-center tracking-[-0.5px] leading-[1.2]">{p1Card.word}</div>
                  <span className="rounded-full px-3.5 py-1 font-[family:var(--font-heading)] font-bold text-xs" style={{ background: p1Badge.bg, color: p1Badge.color }}>{p1Card.partOfSpeech}</span>
                  <div className="font-[family:var(--font-body)] text-sm text-[var(--text-secondary-400)] italic">{p1Card.pronunciation}</div>
                  <div className="absolute bottom-3.5 font-[family:var(--font-body)] text-[11px] text-[var(--border-600)]">Nhấn để lật thẻ</div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-white rounded-[22px] shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-[var(--border-300)] py-7 px-9 flex flex-col justify-center gap-4 select-none" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-[family:var(--font-heading)] font-black text-[28px] text-[var(--text-primary-900)]">{p1Card.word}</span>
                    <span className="rounded-full px-[11px] py-[3px] font-[family:var(--font-heading)] font-bold text-[11px]" style={{ background: p1Badge.bg, color: p1Badge.color }}>{p1Card.partOfSpeech}</span>
                  </div>
                  <div className="font-[family:var(--font-body)] text-[13px] text-[var(--text-secondary-400)] italic">{p1Card.pronunciation}</div>
                  <div className="bg-[var(--brand-soft-100)] rounded-xl py-3 px-4 border-l-[4px] border-[var(--brand-base-500)]">
                    <div className="font-[family:var(--font-heading)] font-semibold text-[10px] text-[var(--brand-base-500)] uppercase tracking-[0.5px] mb-1">Nghĩa tiếng Việt</div>
                    <div className="font-[family:var(--font-heading)] font-bold text-[17px] text-[var(--text-primary-900)]">{p1Card.meaning}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 1 action buttons */}
            <div className="flex flex-col gap-3 w-full max-w-[560px]">
              <div className="flex gap-3 w-full">
                <div
                  onClick={() => p1Mark(false)}
                  className="flex-1 flex items-center justify-center font-[family:var(--font-heading)] !font-bold text-[14px] py-3 rounded-[13px] border-2 border-[var(--error-200)] bg-[var(--error-50)] !text-[var(--error-600)] cursor-pointer transition-opacity duration-150 hover:opacity-85"
                >
                  Chưa thuộc
                </div>
                <div
                  onClick={() => p1Mark(true)}
                  className="flex-1 flex items-center justify-center font-[family:var(--font-heading)] !font-bold text-[14px] py-3 rounded-[13px] border-none bg-[var(--brand-base-500)] !text-white cursor-pointer shadow-sm transition-opacity duration-150 hover:opacity-90"
                >
                  ✅ Đã nhớ
                </div>
              </div>
              <div
                onClick={() => handleStartPhase2()}
                className="w-full flex items-center justify-center gap-1.5 font-[family:var(--font-heading)] !font-bold text-[14px] py-3 rounded-[13px] border-2 border-[var(--info-200)] bg-[var(--info-50)] !text-[var(--info-600)] cursor-pointer transition-opacity duration-150 hover:opacity-85"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Tiến hành ôn tập
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ PHASE 2 ══════════════════ */}
        {phase === 2 && activeP2Words.length === 0 ? (
          p1Words.filter(w => getStatus(w.id) === "NOT_STUDIED").length > 0 ? (
            <div className="w-full max-w-[560px] bg-white rounded-[22px] border border-[var(--border-300)] py-12 px-8 flex flex-col items-center justify-center text-center shadow-[0_16px_32px_rgba(0,0,0,0.06)]">
              <div className="text-[40px] mb-4">📚</div>
              <div className="font-[family:var(--font-heading)] font-black text-[24px] text-[var(--text-primary-900)] mb-3 tracking-tight">
                Đã hoàn thành ôn tập
              </div>
              <div className="font-[family:var(--font-body)] text-[14px] text-[var(--text-secondary-500)] mb-8 leading-[1.6]">
                Còn <strong className="text-[var(--brand-base-500)] font-bold">{p1Words.filter(w => getStatus(w.id) === "NOT_STUDIED").length}</strong> từ chưa học trong chủ đề này.<br />Hãy quay lại học để tiếp tục nhé.
              </div>
              <div
                onClick={() => setPhase(1)}
                className="font-[family:var(--font-heading)] font-bold text-[14px] px-8 py-3.5 rounded-xl bg-[var(--brand-base-500)] text-white hover:opacity-90 transition-opacity cursor-pointer shadow-sm border-none"
              >
                Quay lại học
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[560px] bg-white rounded-[22px] border border-[var(--border-300)] py-12 px-8 flex flex-col items-center justify-center text-center shadow-[0_16px_32px_rgba(0,0,0,0.06)]">
              <div className="text-[44px] mb-4">🎉</div>
              <div className="font-[family:var(--font-heading)] font-black text-[24px] text-[var(--success-600)] mb-3 tracking-tight">
                Chúc mừng!
              </div>
              <div className="font-[family:var(--font-body)] text-[14px] text-[var(--text-secondary-500)] mb-8 leading-[1.6]">
                Bạn đã nhớ hết tất cả từ vựng trong chủ đề này.
              </div>
              <div
                onClick={() => navigate(ROUTES.LEARNER.FLASHCARD_TOPIC_DETAIL(topicId || ""))}
                className="font-[family:var(--font-heading)] font-bold text-[14px] px-8 py-3.5 rounded-xl bg-[var(--success-500)] text-white hover:opacity-90 transition-opacity cursor-pointer shadow-sm border-none"
              >
                Hoàn tất
              </div>
            </div>
          )
        ) : phase === 2 && activeP2Words.length > 0 && (
          <>
            {/* Phase 2 prototype note */}
            <div className="w-full max-w-[560px] bg-[var(--warning-50)] border border-[var(--warning-200)] rounded-[10px] py-2.5 px-4 mb-4.5 flex items-start gap-2">
              <span className="text-[14px] shrink-0 mt-0.5">💡</span>
              <div className="font-[family:var(--font-body)] text-[12px] text-[var(--warning-800)] m-0 leading-[1.5]">
                <strong>Giai đoạn Ôn tập</strong> — Hiển thị {activeP2Words.length} từ bạn chưa nhớ. Nhập đúng nghĩa → tự động chuyển thẻ. Nhập sai → hiển thị đáp án → "Tiếp tục".
              </div>
            </div>

            <NavRow current={(p2Index % p2Total) + 1} total={p2Total} remembered={p2Remembered.length} label="Giai đoạn 2" />
            <div className="w-full max-w-[560px] h-[5px] rounded-[3px] bg-[var(--border-500)] mb-6 overflow-hidden">
              <div className="h-full rounded-[3px] bg-[var(--info-500)] transition-all duration-300 ease-out" style={{ width: `${(((p2Index % p2Total) + 1) / p2Total) * 100}%` }} />
            </div>

            {/* Quiz card */}
            <div className="w-full max-w-[560px] bg-white rounded-[22px] shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-[var(--border-300)] pt-[34px] px-10 pb-[30px] mb-3.5">
              <div className="font-[family:var(--font-heading)] font-black text-[38px] text-[var(--text-primary-900)] tracking-[-0.5px] leading-[1.15] mb-3">{p2Card.word}</div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="rounded-full px-[13px] py-1 font-[family:var(--font-heading)] font-bold text-xs" style={{ background: p2Badge.bg, color: p2Badge.color }}>{p2Card.partOfSpeech}</span>
                <span className="font-[family:var(--font-body)] text-sm text-[var(--text-secondary-400)] italic">{p2Card.pronunciation}</span>
              </div>
              <input
                value={inputVal}
                onChange={e => { setInputVal(e.target.value); if (showAnswer) setAnswerState("idle"); }}
                onKeyDown={e => { if (e.key === "Enter") { if (showAnswer) p2GoNext(); else p2Check(); } }}
                placeholder="Nhập nghĩa tiếng Việt..."
                className={`font-[family:var(--font-body)] text-sm py-[11px] px-3.5 rounded-[11px] border-[1.5px] outline-none w-full box-border transition-colors duration-200 ${isWrong
                  ? 'border-[var(--error-500)] bg-[var(--error-50)] text-[var(--error-900)]'
                  : isCorrect
                    ? 'border-[#5DBB70] bg-[#F2FCF4] text-[#1B401F]'
                    : 'border-[var(--border-500)] bg-white text-[var(--text-primary-900)] focus:border-[var(--brand-base-500)]'
                  }`}
              />
              {showAnswer && (
                <div className={`mt-2.5 flex items-center gap-2 border rounded-[10px] py-2.5 px-3.5 ${isWrong ? 'bg-[var(--error-50)] border-[var(--error-200)]' : 'bg-[#F2FCF4] border-[#A8E0B3]'
                  }`}>
                  {isWrong ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0"><circle cx="12" cy="12" r="10" stroke="var(--error-500)" strokeWidth="2" /><path d="M12 8v4M12 16h.01" stroke="var(--error-500)" strokeWidth="2" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0"><circle cx="12" cy="12" r="10" stroke="#5DBB70" strokeWidth="2" /><path d="M8 12l3 3 5-6" stroke="#5DBB70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                  <span className={`font-[family:var(--font-body)] text-[13px] ${isWrong ? 'text-[var(--error-600)]' : 'text-[#2C5A31]'}`}>
                    Đáp án đúng: <strong className="font-[family:var(--font-heading)] font-bold">{p2Card.meaning}</strong>
                  </span>
                </div>
              )}
            </div>

            <div className="w-full max-w-[560px]">
              <div
                onClick={showAnswer ? p2GoNext : p2Check}
                className={`w-full flex items-center justify-center gap-1.5 font-[family:var(--font-heading)] !font-bold text-[15px] py-3.5 rounded-[14px] border-none !text-white cursor-pointer shadow-sm transition-all duration-200 hover:opacity-90 ${showAnswer ? (isWrong ? 'bg-[var(--text-secondary-600)]' : 'bg-[var(--brand-base-500)]') : 'bg-[var(--info-500)]'}`}
              >
                {isChecking ? (
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : showAnswer ? (
                  p2Remembered.length >= p2Total ? "Hoàn tất" : "Tiếp tục →"
                ) : (
                  "Kiểm tra"
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
