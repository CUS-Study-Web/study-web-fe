import GuestPageLayout from "../../components/guest/GuestPageLayout";
import CourseCard from "../../components/guest/CourseCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../contexts/AuthContext";

const programsData = [
  {
    id: "v-act",
    title: "V-ACT",
    tag: "ĐGNL TP.HCM",
    subtitle: "Đánh giá Năng lực — ĐHQG TP.HCM",
    desc: "Kỳ thi đánh giá toàn diện các năng lực: ngôn ngữ, tư duy logic, giải quyết vấn đề trên giấy, do Đại học Quốc gia TP.HCM tổ chức để...",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#28522d] hover:bg-[#1e4022]"
  },
  {
    id: "v-sat",
    title: "V-SAT",
    tag: "Khảo thí quốc gia",
    subtitle: "Kỳ thi đánh giá năng lực theo môn học",
    desc: "Kỳ thi đánh giá năng lực theo từng môn học độc lập: Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa hoàn toàn trên máy tính, do các trường...",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#1d3d54] hover:bg-[#152e3f]"
  },
  {
    id: "hsa",
    title: "HSA",
    tag: "ĐGNL ĐHQG Hà Nội",
    subtitle: "Đánh giá Năng lực — ĐHQG Hà Nội",
    desc: "Kỳ thi đánh giá toàn diện năng lực: tư duy định lượng, định tính và khoa học; trên máy tính, do Đại học Quốc gia Hà Nội tổ chức, p...",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#6e5005] hover:bg-[#523c04]"
  },
  {
    id: "hsca",
    title: "HSCA",
    tag: "ĐH Sư phạm TP.HCM",
    subtitle: "Đánh giá Năng lực chuyên biệt — ĐHSP TP.HCM",
    desc: "Đánh giá năng lực chuyên biệt do Trường Đại học Sư phạm TP.HCM tổ chức, chủ yếu dùng để xét tuyển khối ngành Sư phạm và Giáo dục...",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#7e3b7b] hover:bg-[#612c5f]"
  },
  {
    id: "thpt-qg",
    title: "THPT QG",
    tag: "Bộ GD&ĐT",
    subtitle: "Kỳ thi Tốt nghiệp THPT Quốc Gia",
    desc: "Kỳ thi Tốt nghiệp THPT Quốc Gia do Bộ Giáo dục và Đào tạo tổ chức hàng năm, vừa xét tốt nghiệp THPT vừa là cơ sở xét tuyển đại học...",
    img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#1b4357] hover:bg-[#133242]"
  },
];

export default function CoursesPage() {
  const { isLoggedIn } = useAuth();

  const myCoursesBtn = isLoggedIn ? (
    <Link
      to={ROUTES.LEARNER.MY_COURSES}
      className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/40 rounded-full !text-white text-sm font-bold backdrop-blur-md transition-all shadow-sm active:scale-95"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path 
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Khóa học của tôi
    </Link>
  ) : undefined;

  return (
    <GuestPageLayout
      eyebrow="CHƯƠNG TRÌNH LUYỆN THI"
      title="Khóa học tại CUS"
      description="5 chương trình luyện thi được thiết kế chuyên biệt cho từng kỳ thi — lộ trình bài bản, lớp học tinh gọn và đội ngũ giảng viên tận tâm."
      heroExtra={myCoursesBtn}
    >
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </section>
    </GuestPageLayout>
  );
}
