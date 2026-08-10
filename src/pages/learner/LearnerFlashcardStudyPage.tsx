import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import Header from "../../components/guest/Header";

// ─── Flashcard data ───────────────────────────────────────────────────────────
const FLASHCARD_WORDS = [
  { id: 1, word: "Perseverance", type: "Noun", phonetic: "/ˌpɜː.sɪˈvɪər.əns/", meaning: "Sự kiên trì, bền bỉ", example: "Her perseverance finally paid off when she passed the exam." },
  { id: 2, word: "Ambiguous",    type: "Adjective", phonetic: "/æmˈbɪɡ.ju.əs/",  meaning: "Mơ hồ, không rõ ràng", example: "The instructions were ambiguous and caused confusion." },
  { id: 3, word: "Eloquent",     type: "Adjective", phonetic: "/ˈel.ə.kwənt/",   meaning: "Hùng hồn, lưu loát", example: "She gave an eloquent speech at the ceremony." },
  { id: 4, word: "Diligent",     type: "Adjective", phonetic: "/ˈdɪl.ɪ.dʒənt/",  meaning: "Chăm chỉ, cần cù", example: "The diligent student reviewed her notes every evening." },
  { id: 5, word: "Phenomenon",   type: "Noun",      phonetic: "/fɪˈnɒm.ɪ.nən/",  meaning: "Hiện tượng", example: "The aurora borealis is a natural phenomenon." },
];

export default function LearnerFlashcardStudyPage() {
  const navigate = useNavigate();

  // Phase 1 state
  const [phase, setPhase] = useState<1 | 2>(1);
  const [p1Index, setP1Index] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [notRemembered, setNotRemembered] = useState<typeof FLASHCARD_WORDS>([]);
  
  // Phase 2 state
  const [p2Index, setP2Index] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [answerState, setAnswerState] = useState<"idle" | "wrong">("idle");
  const [p2Remembered, setP2Remembered] = useState<number[]>([]);

  const typeColor: Record<string, { bg: string; color: string }> = {
    Noun:      { bg: "#DDEAF8", color: "#2F6FAE" },
    Adjective: { bg: "#F5E6F3", color: "#9B4E8D" },
    Verb:      { bg: "var(--brand-soft-500)", color: "var(--brand-base-500)" },
  };

  // ── Phase 1 logic ──
  const p1Total = FLASHCARD_WORDS.length;
  const p1Card = FLASHCARD_WORDS[p1Index % p1Total];
  const p1Badge = typeColor[p1Card.type] ?? { bg: "var(--surface-500)", color: "#6B746D" };

  const p1Mark = (remembered: boolean) => {
    if (!remembered) {
      setNotRemembered(prev => prev.find(w => w.id === p1Card.id) ? prev : [...prev, p1Card]);
    }
    setFlipped(false);
    if (p1Index + 1 >= p1Total) {
      setTimeout(() => {
        setP2Index(0);
        setPhase(2);
      }, 280);
    } else {
      setTimeout(() => setP1Index(i => i + 1), 280);
    }
  };

  // ── Phase 2 logic ──
  const p2Words = notRemembered.length > 0 ? notRemembered : FLASHCARD_WORDS;
  const p2Total = p2Words.length;
  const p2Card = p2Words[p2Index % p2Total];
  const p2Badge = typeColor[p2Card?.type ?? ""] ?? { bg: "var(--surface-500)", color: "#6B746D" };
  const isWrong = answerState === "wrong";

  const p2GoNext = () => {
    setAnswerState("idle");
    setInputVal("");
    setTimeout(() => setP2Index(i => i + 1), 120);
  };
  
  const p2Check = () => {
    const input = inputVal.trim().toLowerCase();
    const answer = p2Card.meaning.toLowerCase();
    if (input.length > 1 && answer.includes(input)) {
      setP2Remembered(p => p.includes(p2Card.id) ? p : [...p, p2Card.id]);
      p2GoNext();
    } else {
      setAnswerState("wrong");
    }
  };

  // Shared nav row renderer
  const NavRow = ({ current, total, remembered, label }: { current: number; total: number; remembered: number; label: string }) => (
    <div className="w-full max-w-[560px] flex items-center justify-between mb-5">
      <button 
        onClick={() => navigate(ROUTES.LEARNER.FLASHCARD_TOPICS)}
        className="flex items-center gap-1.5 font-[family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary-600)] bg-white border-[1.5px] border-[var(--border-500)] rounded-[10px] px-3.5 py-[7px] cursor-pointer hover:bg-[var(--surface-100)] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Danh sách chủ đề
      </button>
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
                className={`px-4.5 py-1.5 rounded-full font-[family:var(--font-heading)] font-bold text-xs transition-all duration-200 ${phase === idx + 1 ? "bg-[var(--brand-base-500)] text-white shadow-sm" : "bg-transparent text-[var(--text-secondary-400)]"}`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════ PHASE 1 ══════════════════ */}
        {phase === 1 && (
          <>
            <NavRow current={p1Index + 1} total={p1Total} remembered={p1Total - notRemembered.length > 0 ? p1Total - notRemembered.length : 0} label="Giai đoạn 1" />
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
                  <span className="rounded-full px-3.5 py-1 font-[family:var(--font-heading)] font-bold text-xs" style={{ background: p1Badge.bg, color: p1Badge.color }}>{p1Card.type}</span>
                  <div className="font-[family:var(--font-body)] text-sm text-[var(--text-secondary-400)] italic">{p1Card.phonetic}</div>
                  <div className="absolute bottom-3.5 font-[family:var(--font-body)] text-[11px] text-[var(--border-600)]">Nhấn để lật thẻ</div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-white rounded-[22px] shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-[var(--border-300)] py-7 px-9 flex flex-col justify-center gap-4 select-none" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-[family:var(--font-heading)] font-black text-[28px] text-[var(--text-primary-900)]">{p1Card.word}</span>
                    <span className="rounded-full px-[11px] py-[3px] font-[family:var(--font-heading)] font-bold text-[11px]" style={{ background: p1Badge.bg, color: p1Badge.color }}>{p1Card.type}</span>
                  </div>
                  <div className="font-[family:var(--font-body)] text-[13px] text-[var(--text-secondary-400)] italic">{p1Card.phonetic}</div>
                  <div className="bg-[var(--brand-soft-100)] rounded-xl py-3 px-4 border-l-[4px] border-[var(--brand-base-500)]">
                    <div className="font-[family:var(--font-heading)] font-semibold text-[10px] text-[var(--brand-base-500)] uppercase tracking-[0.5px] mb-1">Nghĩa tiếng Việt</div>
                    <div className="font-[family:var(--font-heading)] font-bold text-[17px] text-[var(--text-primary-900)]">{p1Card.meaning}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 1 action buttons */}
            <div className="flex gap-3 w-full max-w-[560px]">
              <button 
                onClick={() => p1Mark(false)}
                className="flex-1 font-[family:var(--font-heading)] !font-bold text-[14px] py-3 rounded-[13px] border-2 border-[var(--error-200)] bg-[var(--error-50)] !text-[var(--error-600)] cursor-pointer transition-opacity duration-150 hover:opacity-85"
              >
                Chưa thuộc
              </button>
              <button 
                onClick={() => p1Mark(true)}
                className="flex-1 font-[family:var(--font-heading)] !font-bold text-[14px] py-3 rounded-[13px] border-none bg-[var(--brand-base-500)] !text-white cursor-pointer shadow-sm transition-opacity duration-150 hover:opacity-90"
              >
                ✅ Đã nhớ
              </button>
            </div>
          </>
        )}

        {/* ══════════════════ PHASE 2 ══════════════════ */}
        {phase === 2 && (
          <>
            {/* Phase 2 prototype note */}
            <div className="w-full max-w-[560px] bg-[var(--warning-50)] border border-[var(--warning-200)] rounded-[10px] py-2.5 px-4 mb-4.5 flex items-start gap-2">
              <span className="text-[14px] shrink-0 mt-0.5">💡</span>
              <p className="font-[family:var(--font-body)] text-[12px] text-[var(--warning-800)] m-0 leading-[1.5]">
                <strong>Giai đoạn Ôn tập</strong> — Hiển thị {p2Words.length} từ bạn chưa nhớ. Nhập đúng nghĩa → tự động chuyển thẻ. Nhập sai → hiển thị đáp án → "Tiếp tục".
              </p>
            </div>

            <NavRow current={(p2Index % p2Total) + 1} total={p2Total} remembered={p2Remembered.length} label="Giai đoạn 2" />
            <div className="w-full max-w-[560px] h-[5px] rounded-[3px] bg-[var(--border-500)] mb-6 overflow-hidden">
              <div className="h-full rounded-[3px] bg-[var(--info-500)] transition-all duration-300 ease-out" style={{ width: `${(((p2Index % p2Total) + 1) / p2Total) * 100}%` }} />
            </div>

            {/* Quiz card */}
            <div className="w-full max-w-[560px] bg-white rounded-[22px] shadow-[0_16px_32px_rgba(0,0,0,0.06)] border border-[var(--border-300)] pt-[34px] px-10 pb-[30px] mb-3.5">
              <div className="font-[family:var(--font-heading)] font-black text-[38px] text-[var(--text-primary-900)] tracking-[-0.5px] leading-[1.15] mb-3">{p2Card.word}</div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="rounded-full px-[13px] py-1 font-[family:var(--font-heading)] font-bold text-xs" style={{ background: p2Badge.bg, color: p2Badge.color }}>{p2Card.type}</span>
                <span className="font-[family:var(--font-body)] text-sm text-[var(--text-secondary-400)] italic">{p2Card.phonetic}</span>
              </div>
              <input
                value={inputVal}
                onChange={e => { setInputVal(e.target.value); if (isWrong) setAnswerState("idle"); }}
                onKeyDown={e => { if (e.key === "Enter") { if (isWrong) p2GoNext(); else p2Check(); } }}
                placeholder="Nhập nghĩa tiếng Việt..."
                className={`font-[family:var(--font-body)] text-sm py-[11px] px-3.5 rounded-[11px] border-[1.5px] outline-none w-full box-border text-[var(--text-primary-900)] transition-colors duration-200 ${isWrong ? 'border-[var(--error-500)] bg-[var(--error-50)]' : 'border-[var(--border-500)] bg-white focus:border-[var(--brand-base-500)]'}`}
              />
              {isWrong && (
                <div className="mt-2.5 flex items-center gap-2 bg-[var(--error-50)] border border-[var(--error-200)] rounded-[10px] py-2.5 px-3.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0"><circle cx="12" cy="12" r="10" stroke="var(--error-500)" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="var(--error-500)" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="font-[family:var(--font-body)] text-[13px] text-[var(--error-600)]">
                    Đáp án đúng: <strong className="font-[family:var(--font-heading)] font-bold">{p2Card.meaning}</strong>
                  </span>
                </div>
              )}
            </div>

            <div className="w-full max-w-[560px]">
              <button 
                onClick={isWrong ? p2GoNext : p2Check}
                className={`w-full font-[family:var(--font-heading)] !font-bold text-[15px] py-3.5 rounded-[14px] border-none !text-white cursor-pointer shadow-sm transition-all duration-200 hover:opacity-90 ${isWrong ? 'bg-[var(--text-secondary-600)]' : 'bg-[var(--info-500)]'}`}
              >
                {isWrong ? "Tiếp tục →" : "Kiểm tra"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
