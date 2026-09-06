import { useRef } from "react";
import GuestPageLayout from "../../components/guest/GuestPageLayout";
import TeacherCard from "../../components/guest/home/TeacherCard";
import TestimonialCard from "../../components/guest/home/TestimonialCard";
import AchievementSection from "../../components/guest/home/AchievementSection";

import imgLeMinhHieu from "../../assets/images/teacher/Le_minh_hieu.jpg";
import imgThaiThiDangKhuong from "../../assets/images/teacher/Thai_thi_dang_khuong.jpg";
import imgTranQuangHuy from "../../assets/images/teacher/Tran_quang_huy.jpg";
import imgTranQuocTuan from "../../assets/images/teacher/Tran_quoc_tuan.jpg";
import imgTranThiThaoNhu from "../../assets/images/teacher/Tran_thi_thao_nhu.jpg";
import imgPhanVanSi from "../../assets/images/teacher/Phan_van_si.jpg";

const teachers = [
  { img: imgLeMinhHieu, name: "Thầy Lê Minh Hiếu", desc: "Top 2 đầu vào khoa Ngữ Văn - Trường Đại học Sư phạm Hà Nội" },
  { img: imgThaiThiDangKhuong, name: "Cô Thái Thị Đăng Khương", desc: "Tốt nghiệp loại xuất sắc. Huy chương bạc Olympic 30/4 môn vật lý" },
  { img: imgTranQuangHuy, name: "Thầy Trần Quang Huy", desc: "Huy chương vàng Olympic 30/4. Nhiều năm giảng dạy khối 12, HS Olympic" },
  { img: imgTranQuocTuan, name: "Thầy Trần Quốc Tuấn", desc: "Huy chương vàng Olympic. Ths Toán ứng dụng - ĐH Khoa học tự nhiên" },
  { img: imgTranThiThaoNhu, name: "Cô Trần Thị Thảo Như", desc: "Giải nhất HSG KHTN cấp Thành phố. Trường ĐH Bách khoa - ĐHQG HCM" },
  { img: imgPhanVanSi, name: "Thầy Phan Văn Sĩ", desc: "Đạt giải HSG môn Lịch sử cấp tỉnh. Trường Đại học Sư phạm TPHCM" },
];

const testimonials = [
  { name: "Bảo Ngọc", course: "Lớp VACT", review: "Mới đầu em tính dành 2 tháng hè để nghỉ ngơi thôi, nhưng đăng ký học ở CUS xong mới thấy quyết định này quá đúng đắn. Kho tài liệu bài tập ở đây nhiều khủng khiếp luôn, cày hoài không hết mà câu nào cũng chất lượng. Đã thế trong suốt đợt hè, mỗi lần làm bài có chỗ nào bí là em nhắn lên nhóm hỏi liền, thầy cô với trợ giảng giải đáp 24/7 siêu nhiệt tình. Nhờ vậy mà hết hè em thấy mình cải thiện rõ rệt kỹ năng làm bài và mẹo giải nhanh!" },
  { name: "Đức Anh", course: "Lớp VACT", review: "Trải nghiệm 2 tháng hè tại CUS thật sự vượt ngoài mong đợi của em. Trung tâm hỗ trợ chữa bài 1-1 rất chi tiết, chỉ ra từng lỗi sai nhỏ mà em hay mắc phải khi làm bài. Nhờ sự sát sao đó kết hợp với lộ trình học bài bản từ cơ bản đến nâng cao, em cảm thấy kỳ nghỉ hè của mình cực kỳ ý nghĩa và tối ưu được thời gian. Giờ chuẩn bị vào năm học mới em thấy tự tự tin hơn hẳn vì đã nắm chắc kiến thức rồi." },
  { name: "Phương Anh", course: "Lớp VACT", review: "Thầy cô ở CUS dạy cuốn lắm, truyền đạt dễ hiểu mà còn hướng dẫn nhiều phương pháp tư duy logic rất hay. Kho tài liệu bài tập thì ta nói nó rộng bao la, dạng bài nào cũng có để luyện nên em rèn được phản xạ làm bài nhanh hơn nhiều. Đặc biệt là đội ngũ hỗ trợ giải đáp 24/7 cực kỳ tận tâm, dù nửa đêm em hỏi bài vẫn được hỗ trợ chu đáo. Hết 2 tháng hè vừa tranh thủ ôn luyện vừa tích lũy được bao nhiêu kinh nghiệm." },
  { name: "Tuấn Kiệt", course: "Lớp VACT", review: "Thề luôn là lúc đầu tính dành trọn mùa hè để 'gánh team' trong game thôi, ai dè bị phụ huynh dí đi học CUS. 🤓 Cơ mà học rồi mới thấy dính vãi! Lộ trình ở đây thiết kế siêu cuốn, đi từ căn bản đến nâng cao nên đứa mất gốc như em cũng 'load' kịp. Mấy cái mẹo giải nhanh với tư duy logic thầy cô chỉ đỉnh cực, xử lý câu khó gọn hơ. Kỳ nghỉ hè tưởng chán đời ai ngờ lại bứt phá cực nét!" },
  { name: "Khánh Linh", course: "Lớp VACT", review: "Chế nào còn đang lăn tăn thì đăng ký liền đi nha, không hối hận đâu! Điểm tui thích nhất ở CUS là khoản chữa bài 1-1 siêu chi tiết, lỗi sai nhỏ tẹo cũng được thầy cô chỉ ra rồi sửa tận gốc. Đã thế cái kho bài tập ở đây nó nhiều khủng khiếp, tha hồ cày đến khi nào nhuần thấu mới thôi. Qua 2 tháng hè luyện ở trung tâm xong tự dưng thấy trình mình 'up level' rõ rệt!" },
  { name: "Hoàng Long", course: "Lớp VACT", review: "10/10 cho độ chu đáo của CUS luôn ạ! 💯 Nhóm hỗ trợ giải đáp 24/7 đỉnh thực sự, đêm muộn ngồi cày bài tập bí chỗ nào nhắn lên group cái là có anh chị trợ giảng 'cứu nét' liền. Môi trường học thì siêu năng động, các bạn xung quanh ai cũng 'pro' làm mình có động lực cày cuốc theo. Nhờ vậy mà hết hè em vừa rèn được phản xạ làm bài cực nhanh, vừa tự tin sẵn sàng 'nghênh chiến' năm học mới!" },
  { name: "Thảo Nguyên", course: "Lớp VACT", review: "Hè này quyết định đầu tư thời gian học CUS đúng là không thừa một giây nào. Ban đầu học cũng rén lắm nhưng không khí ở lớp năng động vãi, thầy cô giảng bài vui tính mà còn siêu nhiệt tình. Học xong khóa hè cái tư duy logic của em nó 'khác bọt' liền, làm bài tập khó nhanh gọn hẳn. Nói chung là tối ưu hóa được nguyên cái nghỉ hè siêu chất lượng!" },
  { name: "Quốc Bảo", course: "Lớp VACT", review: "U là trời, ngợp trong đống bài tập của CUS luôn mấy bác ơi! Kho tài liệu nhiều khủng khiếp, từ câu dễ đến mấy dạng phân hóa đều có đủ để cày. Đã thế thầy cô còn chấm bài sát sao, hỗ trợ chữa 1-1 tận răng nên biết rõ mình đang hổng chỗ nào để bù liền. Hết 2 tháng hè tự dưng thấy mình vững tâm lý hẳn, không còn sợ mấy dạng bài khó nữa." },
  { name: "Nhã Uyên", course: "Lớp VACT", review: "Vừa 'chốt hạ' 2 tháng hè ở CUS xong và đây là cảm nhận thật lòng: flex ngay sự hỗ trợ 24/7 siêu tận tâm, bài khó cỡ nào quăng lên nhóm cũng được giải thích cặn kẽ. Lộ trình học bài bản, đi từng bước chắc chắn nên không bị kiệt sức hay ngợp kiến thức. Thêm điểm cộng là dàn bạn học cùng gu, học xong vừa có thêm cạ cứng vừa tự tin bước vô năm học mới luôn!" },
  { name: "Minh Quân", course: "Lớp VACT", review: "Tưởng đi học hè sẽ 'stress' lắm nhưng ở CUS thì vibe khác hoàn toàn nha! Thầy cô truyền động lực siêu đỉnh, hướng dẫn bao nhiêu mẹo giải nhanh với cách tư duy bài khó cực sáng tạo. Kho tài liệu bài tập thì đúng kiểu 'bao la bạt ngàn', cày thỏa thích luôn. Trợ giảng lại còn đồng hành sát sao chữa bài 1-1 nữa. Tự dưng trải qua 2 tháng hè xong thấy kiến thức của mình nó 'mượt' hơn hẳn!" },
  { name: "Phụ huynh em Bảo Long", course: "Phụ huynh chị Ngọc Hà – Lớp 12", review: "Ban đầu gia đình tính cho con tập trung thi THPT Quốc gia thôi, nhưng thấy xu hướng xét tuyển ĐGNL ĐHQG ngày càng nhiều nên quyết định cho con ôn thêm. Bài thi ĐGNL đòi hỏi kiến thức rộng và tư duy nhanh chứ không học tủ được. Ở Cus, các thầy cô hệ thống lại kiến thức cực kỳ khoa học, dạy mẹo phân bổ thời gian và tư duy xử lý câu hỏi lạ rất hay. Đợt thi vừa rồi con đạt 985 điểm ĐGNL, cầm chắc tấm vé vào ĐH Bách Khoa sớm. Gia đình trút được hẳn gánh nặng áp lực lớp 12!", isParent: true },
  { name: "Phụ huynh em Minh Triết", course: "Phụ huynh chú Văn Hòa – Lớp 12", review: "Con tôi học lệch, chỉ giỏi các môn Tự nhiên còn phần Tiếng Việt với Sử - Địa của bài thi ĐGNL thì rất lo lắng. Đăng ký cho cháu học khóa ĐGNL ở Cus thực sự là quyết định đúng đắn. Thầy cô hỗ trợ lấy lại nền tảng phần kiến thức xã hội rất ngắn gọn, dễ nhớ, còn phần Toán logic thì được rèn phản xạ làm bài cực nhanh. Cháu thi đợt 1 đạt 920 điểm, đỗ thẳng nguyện vọng 1 ngành CNTT ĐH Khoa học Tự nhiên. Cảm ơn Cus rất nhiều!", isParent: true },
  { name: "Phụ huynh em Hải Yến", course: "Phụ huynh chị Bích Phượng – Lớp 12", review: "Điểm tôi đánh giá cao nhất ở khóa ôn ĐGNL của Cus là ngân hàng đề thi thử rất sát với cấu trúc thực tế. Tuần nào con cũng được luyện đề áp lực thời gian như thi thật, làm xong thầy cô sửa tỉ mỉ từng dạng câu hỏi phân hóa. Con gái tôi từ chỗ hoang mang vì cấu trúc đề lạ, sau 2 tháng theo học đã nắm chắc phương pháp và đạt 890 điểm. Môi trường học tập chuyên nghiệp và sát sao với học sinh.", isParent: true },
  { name: "Phụ huynh em Quốc An", course: "Phụ huynh anh Tiến Dũng – Lớp 12", review: "Năm lớp 12 con vừa phải lo học trên lớp, vừa ôn THPT lại thêm ĐGNL nên rất dễ quá tải. Nhưng lộ trình ôn ĐGNL tại Cus được thiết kế vô cùng tinh gọn, không bắt học sinh cày bừa mà tập trung vào tư duy và kỹ năng phân tích đề. Thầy cô còn tư vấn rất kỹ cho gia đình về cách chọn đợt thi, đăng ký nguyện vọng sao cho tối ưu nhất. Nhờ sự đồng hành của Cus mà con tự tin vượt qua kỳ thi với điểm số vượt kỳ vọng.", isParent: true },
];

export default function AboutPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTestimonialsContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const scrollLeftTestimonials = () => {
    if (scrollTestimonialsContainerRef.current) {
      scrollTestimonialsContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRightTestimonials = () => {
    if (scrollTestimonialsContainerRef.current) {
      scrollTestimonialsContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
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

          <div className="relative group px-4 md:px-0">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] !text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Scrollable List */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto flex gap-6 scroll-smooth pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory"
            >
              {teachers.map((teacher, idx) => (
                <div key={idx} className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start">
                  <TeacherCard {...teacher} />
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] !text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
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

          <div className="relative group px-4 md:px-0 mt-8">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeftTestimonials}
              className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] !text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Scrollable List */}
            <div
              ref={scrollTestimonialsContainerRef}
              className="overflow-x-auto flex gap-6 scroll-smooth pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory"
            >
              {testimonials.map((testi, idx) => (
                <div key={idx} className="w-[300px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start">
                  <TestimonialCard {...testi} />
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRightTestimonials}
              className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] !text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
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
