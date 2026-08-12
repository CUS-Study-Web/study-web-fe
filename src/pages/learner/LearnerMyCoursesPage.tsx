import LearnerCourseCard from "../../components/learner/LearnerCourseCard";

type EnrolledCourse = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  progress: number;
};

const MY_COURSES_DATA: EnrolledCourse[] = [
  {
    id: "v-act",
    title: "V-ACT",
    tag: "ĐGNL TP.HCM",
    desc: "Kỳ thi đánh giá toàn diện các năng lực: ngôn ngữ, tư duy logic, giải quyết vấn đề trên giấy, do Đại học Quốc gia TPHCM tổ chức để xét tuyển đại học.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60&auto=format&fit=crop",
    progress: 38,
  },
  {
    id: "v-sat",
    title: "V-SAT",
    tag: "Khảo thí quốc gia",
    desc: "Kỳ thi đánh giá năng lực theo từng môn học độc lập: Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa hoàn toàn trên máy tính, do các trường đại học phối hợp với Trung tâm Khảo thí quốc gia tổ chức.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=60&auto=format&fit=crop",
    progress: 61,
  },
  {
    id: "hsa",
    title: "HSA",
    tag: "ĐGNL ĐHQG Hà Nội",
    desc: "Kỳ thi đánh giá toàn diện năng lực: tư duy định lượng, định tính và khoa học trên máy tính, do Đại học Quốc gia Hà Nội tổ chức, phục vụ xét tuyển đại học.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop",
    progress: 22,
  },
  {
    id: "hsca",
    title: "HSCA",
    tag: "ĐH Sư phạm TP.HCM",
    desc: "Đánh giá năng lực chuyên biệt do Trường Đại học Sư phạm TP.HCM tổ chức, chủ yếu dùng để xét tuyển khối ngành Sư phạm và Giáo dục.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop",
    progress: 0,
  },
  {
    id: "thpt-qg",
    title: "THPT QG",
    tag: "Bộ GD&ĐT",
    desc: "Kỳ thi Tốt nghiệp THPT Quốc Gia do Bộ Giáo dục và Đào tạo tổ chức hàng năm, vừa xét tốt nghiệp THPT vừa là cơ sở xét tuyển đại học.",
    img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=60&auto=format&fit=crop",
    progress: 15,
  },
];

export default function LearnerMyCoursesPage() {
  return (
    <div className="pb-20 bg-[var(--surface-500)] min-h-screen">
      {/* ── Banner Header ── */}
      <section className="bg-[#18341e] py-12 px-4 md:px-8 lg:px-12 border-b border-[#254d2d]">
        <div className="max-w-[1200px] mx-auto">
          {/* Pill Badge */}
          <div className="inline-block bg-[#27502f] border border-[#396942] !text-[#b5cfb9] rounded-full px-4 py-1 text-[11px] font-extrabold mb-4 uppercase tracking-wider shadow-xs">
            HỌC VIÊN
          </div>
          {/* Title */}
          <div className="text-3xl md:text-4xl font-black !text-white mb-3 tracking-tight font-[family:var(--font-heading)]">
            Khóa học của tôi
          </div>
          {/* Subtitle */}
          <div className="!text-[#b5cfb9] max-w-xl text-sm md:text-base font-medium">
            Các khoá luyện thi bạn đang theo học tại CUS.
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10">
        <div className="mb-10 md:mb-12">
          <div className="text-[32px] font-black text-[var(--brand-base-700)] leading-tight mb-2 font-[family:var(--font-heading)]">
            {MY_COURSES_DATA.length} khóa học
          </div>
        </div>

        {/* Grid of 5 Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MY_COURSES_DATA.map((course) => (
            <LearnerCourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}