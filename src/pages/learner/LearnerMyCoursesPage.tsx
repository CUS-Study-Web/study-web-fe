import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

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
          <h1 className="text-3xl md:text-4xl font-black !text-white mb-3 tracking-tight font-[family:var(--font-heading)]">
            Khóa học của tôi
          </h1>
          {/* Subtitle */}
          <p className="!text-[#b5cfb9] max-w-xl text-sm md:text-base font-medium">
            Các khoá luyện thi bạn đang theo học tại CUS.
          </p>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10">
        <div className="mb-10 md:mb-12">
          <h2 className="text-[32px] font-black text-[var(--brand-base-700)] leading-tight mb-2 font-[family:var(--font-heading)]">
            {MY_COURSES_DATA.length} khóa học
          </h2>
        </div>

        {/* Grid of 5 Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MY_COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-[var(--brand-base-700)] rounded-[24px] overflow-hidden shadow-lg flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-1 border-none"
            >
              {/* Image Section */}
              <div className="relative h-[220px] w-full overflow-hidden bg-[var(--brand-base-800)]">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
                {/* Lớp gradient màu xanh nền mờ dần lên trên (Kéo dài xuống dưới 10px để bù trừ sai số pixel khi scale) */}
                <div className="absolute -bottom-[10px] left-0 right-0 h-[calc(50%+10px)] bg-gradient-to-t from-[var(--brand-base-700)] via-[var(--brand-base-700)] via-15% to-transparent" />

                {/* Tag Badge Top Left */}
                <div className="absolute top-4 left-5 bg-white/15 backdrop-blur-md border border-white/40 !text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {course.tag}
                </div>

                {/* Course Title Overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="!text-white text-[22px] leading-tight font-black font-[family:var(--font-heading)]">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-5">
                {/* Description */}
                <p className="text-sm leading-relaxed font-medium line-clamp-3 !text-[var(--brand-base-100)]">
                  {course.desc}
                </p>

                {/* Progress Bar Section */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between font-bold text-[15px] font-[family:var(--font-heading)]">
                    <span className="!text-[var(--brand-base-50)]">Tiến độ</span>
                    <span className="!text-[var(--success-300)]">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--brand-base-900)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${course.progress}%`,
                        background: "linear-gradient(to right, var(--success-300), white)"
                      }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={ROUTES.LEARNER.SUBJECT_DETAIL(course.id)}
                  className="w-full inline-flex items-center justify-center py-3.5 bg-white/5 hover:bg-white/10 border border-[var(--brand-base-300)] !text-white text-sm font-black rounded-[16px] transition-all cursor-pointer font-[family:var(--font-heading)]"
                >
                  Tiếp tục học →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}