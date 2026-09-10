import { useRef } from "react";
import GuestPageLayout from "@/components/guest/GuestPageLayout";
import TeacherCard from "@/components/guest/home/TeacherCard";
import TestimonialCard from "@/components/guest/home/TestimonialCard";
import AchievementSection from "@/components/guest/home/AchievementSection";
import { useGetTeachersQuery } from "@/hooks/queries/useTeachers";
import { useGetReviewsQuery } from "@/hooks/queries/useReviews";

const fallbackTeachers = [
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=60", subject: "TOÁN HỌC", name: "TS. Nguyễn Thị Lan", desc: "Tiến sĩ ĐH Quốc Gia Hà Nội - 15 năm luyện thi" },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=60", subject: "VẬT LÝ", name: "ThS. Trần Minh Đức", desc: "HLV đội tuyển Olympic Vật lý - hơn 200 học sinh đạt điểm tuyệt đối" },
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60", subject: "TIẾNG ANH", name: "CN. Lê Thị Hoa", desc: "IELTS 9.0 - Thạc sĩ Oxford - 12 năm kinh nghiệm" },
  { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=60", subject: "HÓA HỌC", name: "ThS. Phạm Quốc Bảo", desc: "Cố vấn Olympic Hóa học Quốc gia từ năm 2011" },
];

const fallbackTestimonials = [
  { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=60", name: "Bảo Ngọc", course: "Lớp VACT", date: "Tháng 6, 2024", review: "Mới đầu em tính dành 2 tháng hè để nghỉ ngơi thôi, nhưng đăng ký học ở CUS xong mới thấy quyết định này quá đúng đắn. Kho tài liệu bài tập ở đây nhiều khủng khiếp luôn, cày hoài không hết mà câu nào cũng chất lượng. Đã thế trong suốt đợt hè, mỗi lần làm bài có chỗ nào bí là em nhắn lên nhóm hỏi liền, thầy cô với trợ giảng giải đáp 24/7 siêu nhiệt tình. Nhờ vậy mà hết hè em thấy mình cải thiện rõ rệt kỹ năng làm bài và mẹo giải nhanh!" },
  { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=60", name: "Đức Anh", course: "Lớp VACT", date: "Tháng 5, 2024", review: "Trải nghiệm 2 tháng hè tại CUS thật sự vượt ngoài mong đợi của em. Trung tâm hỗ trợ chữa bài 1-1 rất chi tiết, chỉ ra từng lỗi sai nhỏ mà em hay mắc phải khi làm bài. Nhờ sự sát sao đó kết hợp với lộ trình học bài bản từ cơ bản đến nâng cao, em cảm thấy kỳ nghỉ hè của mình cực kỳ ý nghĩa và tối ưu được thời gian. Giờ chuẩn bị vào năm học mới em thấy tự tin hơn hẳn vì đã nắm chắc kiến thức rồi." },
  { avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=60", name: "Phương Anh", course: "Lớp VACT", date: "Tháng 5, 2024", review: "Thầy cô ở CUS dạy cuốn lắm, truyền đạt dễ hiểu mà còn hướng dẫn nhiều phương pháp tư duy logic rất hay. Kho tài liệu bài tập thì bao la, dạng bài nào cũng có để luyện nên em rèn được phản xạ làm bài nhanh hơn nhiều. Đặc biệt là đội ngũ hỗ trợ giải đáp 24/7 cực kỳ tận tâm, dù nửa đêm em hỏi bài vẫn được hỗ trợ chu đáo. Hết 2 tháng hè vừa tranh thủ ôn luyện vừa tích lũy được bao nhiêu kinh nghiệm." },
];

export default function AboutPage() {
  const teacherScrollRef = useRef<HTMLDivElement>(null);
  const reviewScrollRef = useRef<HTMLDivElement>(null);

  const { data: teacherRes } = useGetTeachersQuery({ page: 0, size: 50 });
  const { data: reviewRes } = useGetReviewsQuery({ page: 0, size: 50 });

  const teacherList =
    teacherRes?.data && teacherRes.data.length > 0
      ? teacherRes.data.map((t) => ({
          img: t.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=60",
          subject: t.subject.toUpperCase(),
          name: t.name,
          desc: t.description,
        }))
      : fallbackTeachers;

  const reviewList =
    reviewRes?.data && reviewRes.data.length > 0
      ? reviewRes.data.map((r) => ({
          avatar: r.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=60",
          name: r.studentName,
          course: r.course?.title || "Học viên CUS",
          date: r.timeText || "Gần đây",
          review: r.comment,
        }))
      : fallbackTestimonials;

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, offset: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <GuestPageLayout
      eyebrow="VỀ CHÚNG TÔI"
      title="Giới thiệu CUS"
      description="Khám phá đội ngũ giảng viên chuyên gia, thành tích nổi bật và cảm nghĩ thực tế từ hàng nghìn học viên đã gắn bó với CUS."
      padded={false}
    >
      {/* Teachers Section */}
      <section id="teachers" className="bg-[var(--neutral-0)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-[var(--brand-soft-300)] text-[var(--brand-base-600)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-4">
              ĐỘI NGŨ GIẢNG VIÊN
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary-500)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Gặp gỡ chuyên gia của chúng tôi
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary-500)] max-w-2xl mx-auto font-medium">
              Mỗi giảng viên tại CUS đều đạt trình độ cao nhất và có niềm đam mê thực sự với việc giúp học sinh phát huy tiềm năng.
            </p>
          </div>

          {/* Teacher Horizontal Carousel */}
          <div className="relative group px-2 md:px-0">
            {/* Left Button */}
            <button
              type="button"
              onClick={() => scrollCarousel(teacherScrollRef, -340)}
              className={`absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white hover:bg-[var(--surface-500)] text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer ${
                teacherList.length <= 4 ? 'md:hidden' : ''
              } ${teacherList.length <= 1 ? 'hidden' : ''}`}
              aria-label="Previous teachers"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Scrollable Row */}
            <div
              ref={teacherScrollRef}
              className="overflow-x-auto flex gap-6 scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory items-stretch"
            >
              {teacherList.map((teacher, idx) => (
                <div key={idx} className="w-[270px] sm:w-[290px] md:w-[310px] flex-shrink-0 snap-start flex flex-col">
                  <TeacherCard {...teacher} />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => scrollCarousel(teacherScrollRef, 340)}
              className={`absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white hover:bg-[var(--surface-500)] text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer ${
                teacherList.length <= 4 ? 'md:hidden' : ''
              } ${teacherList.length <= 1 ? 'hidden' : ''}`}
              aria-label="Next teachers"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <div id="achievements">
        <AchievementSection />
      </div>

      {/* Testimonials Section */}
      <section className="bg-[var(--neutral-0)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-[var(--brand-soft-300)] text-[var(--brand-base-600)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-4">
              PHẢN HỒI HỌC VIÊN
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary-500)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Cảm nghĩ học viên
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary-500)] max-w-2xl mx-auto font-medium">
              Hàng nghìn học viên đã chia sẻ trải nghiệm thực tế của mình tại CUS.
            </p>
          </div>

          {/* Testimonial Horizontal Carousel */}
          <div className="relative group px-2 md:px-0">
            {/* Left Button */}
            <button
              type="button"
              onClick={() => scrollCarousel(reviewScrollRef, -380)}
              className={`absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white hover:bg-[var(--surface-500)] text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer ${
                reviewList.length <= 3 ? 'md:hidden' : ''
              } ${reviewList.length <= 1 ? 'hidden' : ''}`}
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Scrollable Row */}
            <div
              ref={reviewScrollRef}
              className={`overflow-x-auto flex gap-6 scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory items-stretch ${
                reviewList.length < 3 ? 'md:justify-center' : ''
              }`}
            >
              {reviewList.map((testi, idx) => (
                <div
                  key={idx}
                  className="w-[300px] sm:w-[340px] md:w-[calc((100%-48px)/3)] flex-shrink-0 snap-start flex flex-col"
                >
                  <TestimonialCard {...testi} />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => scrollCarousel(reviewScrollRef, 380)}
              className={`absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white hover:bg-[var(--surface-500)] text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer ${
                reviewList.length <= 3 ? 'md:hidden' : ''
              } ${reviewList.length <= 1 ? 'hidden' : ''}`}
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </GuestPageLayout>
  );
}
