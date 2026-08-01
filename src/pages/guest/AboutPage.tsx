import PageHero from "../../components/guest/PageHero";
import TeacherCard from "../../components/guest/TeacherCard";
import TestimonialCard from "../../components/guest/TestimonialCard";
import AchievementSection from "../../components/guest/AchievementSection";

const teachers = [
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=60", subject: "TOÁN HỌC", name: "TS. Nguyễn Thị Lan", desc: "Tiến sĩ ĐH Quốc Gia Hà Nội - 15 năm luyện thi" },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=60", subject: "VẬT LÝ", name: "ThS. Trần Minh Đức", desc: "HLV đội tuyển Olympic Vật lý - hơn 200 học sinh đạt điểm tuyệt đối" },
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60", subject: "TIẾNG ANH", name: "CN. Lê Thị Hoa", desc: "IELTS 9.0 - Thạc sĩ Oxford - 12 năm kinh nghiệm" },
  { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=60", subject: "HÓA HỌC", name: "ThS. Phạm Quốc Bảo", desc: "Cố vấn Olympic Hóa học Quốc gia từ năm 2011" },
];

const testimonials = [
  { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=60", name: "Trần Khánh Linh", course: "Khóa Toán nâng cao", date: "Tháng 6, 2024", review: "Giáo viên giảng rất dễ hiểu, bài tập phong phú và sát đề thi thật. Em cảm thấy tự tin hơn rất nhiều sau mỗi buổi học." },
  { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=60", name: "Phạm Đức Anh", course: "Khóa Vật lý", date: "Tháng 5, 2024", review: "Thầy Đức dạy cực kỳ cuốn, kết hợp lý thuyết và bài tập trắc nghiệm rất mượt. Điểm thi thử của em từ 6 lên 9 sau 2 tháng." },
  { avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=60", name: "Ngô Bảo Châu", course: "Khóa Tiếng Anh", date: "Tháng 5, 2024", review: "Cô Hoa rất tận tâm, luôn sửa bài viết chi tiết và cung cấp tài liệu bổ sung. Kỹ năng đọc hiểu của em tiến bộ rõ rệt." },
];

export default function AboutPage() {
  return (
    <div className="pb-0 bg-[var(--surface-500)]">
      <PageHero
        eyebrow="VỀ CHÚNG TÔI"
        title="Giới thiệu CUS"
        description="Khám phá đội ngũ giảng viên chuyên gia, thành tích nổi bật và cảm nghĩ thực tế từ hàng nghìn học viên đã gắn bó với CUS."
      />

      {/* Teachers Section */}
      <section className="bg-[var(--neutral-0)] py-16 md:py-24">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, idx) => (
              <TeacherCard key={idx} {...teacher} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <AchievementSection />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testi, idx) => (
              <TestimonialCard key={idx} {...testi} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
