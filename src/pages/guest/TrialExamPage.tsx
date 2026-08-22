import { useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import GuestPageLayout from "../../components/guest/GuestPageLayout";
import ExamCard from "../../components/guest/ExamCard";
import { useGetCoursesQuery } from "../../hooks/queries/useCourses";
import { assessmentService } from "../../services/assessmentService";
import { assessmentKeys } from "../../hooks/queries/useAssessments";

export default function TrialExamPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: coursesData, isLoading: isCoursesLoading } = useGetCoursesQuery({ size: 100 });
  const courses = coursesData?.data || [];

  const examQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: assessmentKeys.exams(course.id, { size: 100 }),
      queryFn: () => assessmentService.getExams(course.id, { size: 100 }),
      enabled: !!course.id,
    })),
  });

  const isExamsLoading = examQueries.some((q) => q.isLoading);

  const allExams = useMemo(() => {
    const combined: any[] = [];
    examQueries.forEach((query, index) => {
      const course = courses[index];
      const exams = query.data?.data || [];
      exams.forEach((exam) => {
        if (exam.assessmentType === "EXAM") {
          combined.push({
            id: exam.id,
            courseId: course.id,
            subject: course.title,
            title: exam.title,
            time: exam.durationMin ? `${exam.durationMin} phút` : "Không giới hạn",
            questions: exam.numQuestions ? `${exam.numQuestions} câu` : "0 câu",
            isVip: exam.accessTier === "VIP",
          });
        }
      });
    });
    return combined;
  }, [examQueries, courses]);

  const categories = ["Tất cả", ...courses.map((c) => c.title)];

  const filteredExams = allExams.filter((exam) => {
    const matchesCategory = selectedCategory === "Tất cả" || exam.subject === selectedCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <GuestPageLayout
      eyebrow="LUYỆN TẬP THỰC CHIẾN"
      title="Thi thử"
      description="Hơn 200 đề thi thử được cập nhật liên tục. Một số đề thi yêu cầu tài khoản VIP."
      heroExtra={
        <div className="max-w-2xl relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[#a0b8a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đề thi..."
            className="w-full bg-[#28522d] border border-[#3c6d42] rounded-xl py-3.5 pl-12 pr-4 !text-white placeholder-[#beccbf] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
          />
        </div>
      }
    >
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-8">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-[var(--border-300)] pb-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[var(--brand-base-600)] !text-white border border-[var(--brand-base-600)] shadow-sm"
                    : "bg-white text-[#333a35] border border-[var(--border-500)] hover:bg-[#edf4ee] hover:text-[var(--brand-base-600)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {(isCoursesLoading || isExamsLoading) && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-base-600)]"></div>
          </div>
        )}

        {/* Exams Grid */}
        {!isCoursesLoading && !isExamsLoading && filteredExams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredExams.map((exam) => (
              <ExamCard key={exam.id} {...exam} />
            ))}
          </div>
        )}

        {!isCoursesLoading && !isExamsLoading && filteredExams.length === 0 && (
          <div className="text-center py-12 text-[#5c635e]">
            <p className="text-lg font-bold">Không tìm thấy đề thi phù hợp.</p>
            <p className="text-sm mt-1">Vui lòng thử chọn môn học khác hoặc xóa từ khóa tìm kiếm.</p>
          </div>
        )}
      </section>
    </GuestPageLayout>
  );
}
