import PageHero from "../../components/guest/PageHero";
import CourseCard from "../../components/guest/CourseCard";

const programsData = [
  {
    title: "V-ACT",
    tag: "ĐGNL TP.HCM",
    subtitle: "Đánh giá Năng lực — ĐHQG TP.HCM",
    desc: "Kỳ thi đánh giá toàn diện các năng lực: ngôn ngữ, tư duy logic, giải quyết vấn đề trên giấy, do Đại học Quốc gia TP.HCM tổ chức để...",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#28522d] hover:bg-[#1e4022]"
  },
  {
    title: "V-SAT",
    tag: "Khảo thí quốc gia",
    subtitle: "Kỳ thi đánh giá năng lực theo môn học",
    desc: "Kỳ thi đánh giá năng lực theo từng môn học độc lập: Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa hoàn toàn trên máy tính, do các trường...",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#1e4e8c] hover:bg-[#163a69]"
  },
  {
    title: "HSA",
    tag: "ĐGNL ĐHQG Hà Nội",
    subtitle: "Đánh giá Năng lực — ĐHQG Hà Nội",
    desc: "Kỳ thi đánh giá toàn diện năng lực: tư duy định lượng, định tính và khoa học; trên máy tính, do Đại học Quốc gia Hà Nội tổ chức, p...",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#8c571e] hover:bg-[#694116]"
  },
  {
    title: "HSCA",
    tag: "ĐH Sư phạm TP.HCM",
    subtitle: "Đánh giá Năng lực chuyên biệt — ĐHSP TP.HCM",
    desc: "Đánh giá năng lực chuyên biệt do Trường Đại học Sư phạm TP.HCM tổ chức, chủ yếu dùng để xét tuyển khối ngành Sư phạm và Giáo dục...",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#8c2d76] hover:bg-[#692258]"
  },
  {
    title: "THPT QG",
    tag: "Bộ GD&ĐT",
    subtitle: "Kỳ thi Tốt nghiệp THPT Quốc Gia",
    desc: "Kỳ thi Tốt nghiệp THPT Quốc Gia do Bộ Giáo dục và Đào tạo tổ chức hàng năm, vừa xét tốt nghiệp THPT vừa là cơ sở xét tuyển đại học...",
    img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=60&auto=format&fit=crop",
    btnColor: "bg-[#1e4e8c] hover:bg-[#163a69]"
  },
];

export default function CoursesPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="CHƯƠNG TRÌNH LUYỆN THI"
        title="Khóa học tại CUS"
        description="5 chương trình luyện thi được thiết kế chuyên biệt cho từng kỳ thi — lộ trình bài bản, lớp học tinh gọn và đội ngũ giảng viên tận tâm."
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}
