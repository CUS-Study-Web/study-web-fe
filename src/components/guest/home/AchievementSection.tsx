import { useState } from "react";
import { useGetLeaderboardsQuery } from "@/hooks/queries/useLeaderboards";

const fallbackStudents = [
  {
    id: "1",
    name: "Võ Thị Mai Anh",
    title: "Đỗ ngành Y",
    school: "ĐH Y Hà Nội",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bf30c?w=800&q=60",
    subject: "V-ACT",
    scores: [
      { label: "Ngôn ngữ", value: "39 / 40" },
      { label: "Toán logic & Số liệu", value: "37 / 40" },
      { label: "Giải quyết vấn đề", value: "36 / 40" },
    ],
    total: "112 / 120",
  },
  { id: "2", name: "Nguyễn Hoàng Long", title: "Top 50 toàn quốc", school: "ĐH Ngoại Thương", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=60", subject: "V-ACT", scores: [], total: "108 / 120" },
  { id: "3", name: "Phạm Thị Thu Trang", title: "Học bổng xuất sắc", school: "ĐH Kinh tế Quốc dân", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=60", subject: "V-SAT", scores: [], total: "105 / 120" },
  { id: "4", name: "Trần Minh Đức", title: "Đỗ ngành Luật", school: "ĐH Luật Hà Nội", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=60", subject: "HSA", scores: [], total: "102 / 120" },
  { id: "5", name: "Lê Thị Ngọc Hân", title: "Top ngành Dược", school: "ĐH Dược Hà Nội", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=60", subject: "HSCA", scores: [], total: "98 / 120" },
  { id: "6", name: "Ngô Quang Vinh", title: "Đỗ ngành CNTT", school: "ĐH Bách Khoa Hà Nội", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=60", subject: "THPT QG", scores: [], total: "28.5 / 30" },
];

export default function AchievementSection() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const { data: leaderboardRes } = useGetLeaderboardsQuery({ page: 0, size: 20 });
  const liveLeaderboards = leaderboardRes?.data;

  const dynamicStudents = liveLeaderboards && liveLeaderboards.length > 0
    ? liveLeaderboards.map((l) => ({
        id: l.id,
        name: l.studentName,
        title: l.achievement || "Thủ khoa xét tuyển",
        school: l.courseName || "Đại học hàng đầu",
        avatar: l.avatarUrl || "https://images.unsplash.com/photo-1531123897727-8f129e1bf30c?w=800&q=60",
        subject: l.courseName || "V-ACT",
        scores: (l.scores || []).map((s) => ({
          label: s.subjectName,
          value: `${s.score}`,
        })),
        total: `${l.sumScore}`,
      }))
    : fallbackStudents;

  const filteredStudents = dynamicStudents;

  const currentStudent =
    filteredStudents.find((s) => s.id === selectedStudentId) || filteredStudents[0];

  return (
    <section className="bg-[var(--surface-500)] py-16 md:py-24 border-t border-[var(--border-300)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[var(--brand-soft-300)] text-[var(--brand-base-600)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-4">
            THÀNH TÍCH NỔI BẬT
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary-500)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Bảng vàng thành tích
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary-500)] max-w-2xl mx-auto font-medium">
            Lắng nghe trực tiếp từ những học viên xuất sắc đã cùng CUS chinh phục các trường đại học danh giá.
          </p>
        </div>

        {/* Tabs */}
        {/* 
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {defaultPrograms.map((prog) => (
            <button
              key={prog}
              onClick={() => {
                setActiveTab(prog);
                setSelectedStudentId(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === prog 
                  ? "bg-[#FFC107] text-[var(--text-primary-800)] shadow-md" 
                  : "bg-transparent border border-[var(--border-300)] text-[var(--text-secondary-500)] hover:bg-[var(--surface-600)]"
              }`}
            >
              {prog}
            </button>
          ))}
        </div>
        */}

        {/* Top Highlight Section */}
        {currentStudent && (
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Left Hero Student Card */}
            <div className="w-full lg:w-1/3 bg-[var(--neutral-0)] rounded-[var(--radius-xl)] p-8 shadow-sm border border-[var(--border-300)] flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-4 border-[var(--surface-500)] shadow-sm">
                <img src={currentStudent.avatar} alt={currentStudent.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-extrabold text-[var(--text-primary-500)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>{currentStudent.name}</h3>
              <p className="text-sm font-bold text-[var(--brand-base-600)] mb-1">{currentStudent.title}</p>
              <p className="text-xs text-[var(--text-secondary-400)] mb-6">{currentStudent.school}</p>
            </div>

            {/* Right Details */}
            <div className="w-full lg:w-2/3 bg-[var(--neutral-0)] rounded-[var(--radius-xl)] p-8 shadow-sm border border-[var(--border-300)]">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-[var(--text-primary-500)]">
                  {currentStudent.school} · {currentStudent.title}
                </h3>
              </div>
              
              {currentStudent.scores && currentStudent.scores.length > 0 && (
                <>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-[var(--text-secondary-400)] uppercase tracking-wider">ĐIỂM THÀNH PHẦN</span>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {currentStudent.scores.map((score, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-base-600)]"></div>
                          <span className="text-[var(--text-secondary-500)] font-medium">{score.label}</span>
                        </div>
                        <span className="font-extrabold text-[var(--text-primary-500)]">{score.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="bg-[var(--brand-base-700)] rounded-2xl p-6 flex items-center justify-between text-[var(--neutral-0)]">
                <div>
                  <div className="text-xs font-bold text-[#ffffff] opacity-80 uppercase tracking-widest mb-1">TỔNG ĐIỂM</div>
                  <div className="text-4xl font-extrabold tracking-tight text-[#FFC107]">{currentStudent.total}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--brand-base-600)] flex items-center justify-center border border-[var(--brand-base-500)]">
                  <svg className="w-6 h-6 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => {
            const isSelected = student.id === currentStudent?.id;
            return (
              <div
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[var(--brand-base-700)] shadow-md"
                    : "bg-[var(--neutral-0)] border border-[var(--border-300)] hover:bg-[var(--surface-600)]"
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isSelected ? "text-[#ffffff]" : "text-[var(--text-primary-500)]"}`}>
                    {student.name}
                  </h4>
                  <p className={`text-xs ${isSelected ? "text-[#ffffff] opacity-90" : "text-[var(--text-secondary-400)]"}`}>
                    {student.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
