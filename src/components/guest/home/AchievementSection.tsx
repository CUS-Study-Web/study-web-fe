import { useState } from "react";

import avatarYenNhi from "../../../assets/images/avatar_student/avatar_nguyen_thi_yen_nhi.jpg";
import avatarGiaPhu from "../../../assets/images/avatar_student/avatar_nguyen_gia_phu.jpg";
import avatarTuanNgoc from "../../../assets/images/avatar_student/avatar_duong_tuan_ngoc.jpg";
import avatarTrucNhi from "../../../assets/images/avatar_student/avatar_pham_truc_nhi.jpg";

const students = [
  {
    id: 1, name: "Nguyễn Thị Yến Nhi", title: "Học viên khóa 2025", school: "", avatar: avatarYenNhi, highlight: true, scores: [
      { label: "Tiếng Việt", value: "280" },
      { label: "Tiếng Anh", value: "210" },
      { label: "Toán", value: "218" },
      { label: "Tư duy khoa học", value: "253" },
    ], total: "961"
  },
  {
    id: 2, name: "Nguyễn Gia Phú", title: "Học viên khóa 2025", school: "", avatar: avatarGiaPhu, highlight: false, scores: [
      { label: "Tiếng Việt", value: "253" },
      { label: "Tiếng Anh", value: "245" },
      { label: "Toán", value: "242" },
      { label: "Tư duy khoa học", value: "253" },
    ], total: "993"
  },
  {
    id: 3, name: "Dương Tuấn Ngọc", title: "Học viên khóa 2025", school: "", avatar: avatarTuanNgoc, highlight: false, scores: [
      { label: "Tiếng Việt", value: "260" },
      { label: "Tiếng Anh", value: "206" },
      { label: "Toán", value: "224" },
      { label: "Tư duy khoa học", value: "261" },
    ], total: "951"
  },
  {
    id: 4, name: "Phạm Trúc Nhi", title: "Học viên khóa 2025", school: "", avatar: avatarTrucNhi, highlight: false, scores: [
      { label: "Tiếng Việt", value: "275" },
      { label: "Tiếng Anh", value: "208" },
      { label: "Toán", value: "197" },
      { label: "Tư duy khoa học", value: "258" },
    ], total: "938"
  },
];

// const programs = ["V-ACT", "V-SAT", "HSA", "HSCA", "THPT QG"];

export default function AchievementSection() {
  // const [activeTab, setActiveTab] = useState("V-ACT");
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

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
          {programs.map((prog) => (
            <button
              key={prog}
              onClick={() => setActiveTab(prog)}
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
        <div className="flex flex-col lg:flex-row gap-6 mb-6">

          {/* Left Hero Student Card */}
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-[var(--neutral-0)] to-[#ebf5ed] rounded-[var(--radius-xl)] p-8 shadow-sm border border-[var(--border-300)] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-4 border-[#FFC107] shadow-sm">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-extrabold text-[var(--text-primary-500)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>{selectedStudent.name}</h3>
            <p className="text-sm font-bold text-[var(--brand-base-600)] mb-1">{selectedStudent.title}</p>
            {selectedStudent.school && <p className="text-xs text-[var(--text-secondary-400)] mb-6">{selectedStudent.school}</p>}

            {/* Pagination dots & arrows */}
            <div className="flex items-center gap-4 mt-auto pt-6">
              <div
                onClick={() => {
                  const idx = students.findIndex(s => s.id === selectedStudent.id);
                  if (idx > 0) setSelectedStudentId(students[idx - 1].id);
                  else setSelectedStudentId(students[students.length - 1].id);
                }}
                className="w-8 h-8 rounded-full border border-[var(--border-300)] flex items-center justify-center text-[var(--text-secondary-500)] hover:bg-[var(--surface-600)] transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </div >
              <div className="flex gap-1.5">
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all ${s.id === selectedStudent.id ? 'w-6 bg-[var(--brand-base-600)]' : 'w-1.5 bg-[var(--border-300)]'}`}
                  ></div>
                ))}
              </div>
              <div
                onClick={() => {
                  const idx = students.findIndex(s => s.id === selectedStudent.id);
                  if (idx < students.length - 1) setSelectedStudentId(students[idx + 1].id);
                  else setSelectedStudentId(students[0].id);
                }}
                className="w-8 h-8 rounded-full border border-[var(--border-300)] flex items-center justify-center text-[var(--text-secondary-500)] hover:bg-[var(--surface-600)] transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div >
            </div>
          </div>

          {/* Right Details */}
          <div className="w-full lg:w-2/3 bg-gradient-to-br from-[var(--neutral-0)] to-[#ebf5ed] rounded-[var(--radius-xl)] p-8 shadow-sm border border-[var(--border-300)]">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-[var(--text-primary-500)]">
                {selectedStudent.school ? `${selectedStudent.school} · ` : ''}{selectedStudent.title}
              </h3>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-[var(--text-secondary-400)] uppercase tracking-wider">ĐIỂM THÀNH PHẦN</span>
            </div>

            <div className="space-y-3 mb-8">
              {selectedStudent.scores?.map((score, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-base-600)]"></div>
                    <span className="text-[var(--text-secondary-500)] font-medium">{score.label}</span>
                  </div>
                  <span className="font-extrabold text-[var(--text-primary-500)]">{score.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[var(--brand-base-700)] to-[var(--brand-base-600)] rounded-2xl p-6 flex items-center justify-between text-[var(--neutral-0)]">
              <div>
                <div className="text-xs font-bold text-[#ffffff] opacity-80 uppercase tracking-widest mb-1">TỔNG ĐIỂM</div>
                <div className="text-4xl font-extrabold tracking-tight text-[#FFC107]">{selectedStudent.total}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[var(--brand-base-600)] flex items-center justify-center border border-[var(--brand-base-500)]">
                <svg className="w-6 h-6 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudentId(student.id)}
              className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${student.id === selectedStudent.id ? "bg-gradient-to-r from-[var(--brand-base-700)] to-[var(--brand-base-600)] shadow-md" : "bg-[var(--neutral-0)] border border-[var(--border-300)] hover:bg-[var(--surface-600)]"}`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFC107]">
                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className={`text-sm font-bold ${student.id === selectedStudent.id ? "text-[#ffffff]" : "text-[var(--text-primary-500)]"}`}>{student.name}</div>
                <div className={`text-xs ${student.id === selectedStudent.id ? "text-[#ffffff] opacity-90" : "text-[var(--text-secondary-400)]"}`}>{student.title}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
