import { useState } from 'react';
import { useGetCoursesQuery } from '../../../hooks/queries/useCourses';
import { registerFormService } from '../../../services/registerFormService';
import type { SubmitGuestRegisterFormRequest } from '../../../types/api/registerForm.api';
import { useNotification } from '../../common/NotificationProvider';

export default function TrialForm() {
  const [formData, setFormData] = useState<SubmitGuestRegisterFormRequest>({
    name: '',
    phoneNumber: '',
    email: '',
    subject: '',
    note: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();
  const { data: coursesData } = useGetCoursesQuery({ size: 100 });
  const courses = coursesData?.data || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      showError('Vui lòng điền đầy đủ các trường bắt buộc (Họ tên, Điện thoại, Email).');
      return;
    }
    
    try {
      setIsLoading(true);
      await registerFormService.submitGuestRegisterForm(formData);
      showSuccess('Đăng ký thi thử thành công! Chúng tôi sẽ sớm liên hệ với bạn.');
      setFormData({ name: '', phoneNumber: '', email: '', subject: '', note: '' });
    } catch (error) {
      showError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="trial" className="w-full bg-[#122615] text-white py-16 md:py-20 px-4 md:px-8 lg:px-12 xl:px-16 border-y border-[#1f4023] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h3
            className="text-3xl md:text-5xl font-black !text-[#FFC107] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Thi thử tại CUS
          </h3>
          <p
            className="text-sm md:text-base !text-[#beccbf] mt-3 max-w-xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Điền thông tin bên dưới để đăng ký thi thử miễn phí cùng CUS Education.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6 max-w-5xl mx-auto" onSubmit={handleSubmit}>
          {/* Single row for 4 fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Họ tên */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 flex items-center gap-0.5 uppercase tracking-wider">
                Họ tên <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Họ và tên"
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>

            {/* Điện thoại */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 flex items-center gap-0.5 uppercase tracking-wider">
                Điện thoại <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="0912 345 678"
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 flex items-center gap-0.5 uppercase tracking-wider">
                Email <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="@gmail.com"
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              />
            </div>

            {/* Môn thi */}
            <div className="flex flex-col">
              <label className="text-xs font-bold !text-[#e8f0e9] mb-2 uppercase tracking-wider">
                Môn thi
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition text-sm font-medium"
              >
                <option value="" className="bg-[#18321b] text-[#729075]">Chọn môn thi...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.title} className="bg-[#18321b] text-white">
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Area */}
          <div className="flex flex-col">
            <label className="text-xs font-bold !text-[#e8f0e9] mb-2 uppercase tracking-wider">
              Bạn muốn thi thử môn gì?
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={4}
              placeholder="Nhập thông tin bạn muốn thi thử..."
              className="w-full bg-[#18321b] border border-[#2c5a31] rounded-[var(--radius-md)] px-4 py-3.5 !text-white placeholder-[#729075] focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition resize-none text-sm font-medium"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-12 py-3.5 bg-[#FFC107] hover:bg-[#ffcd38] active:scale-95 text-[#1f1f1c] font-extrabold rounded-[var(--radius-md)] shadow-lg shadow-[#FFC107]/20 hover:shadow-xl hover:shadow-[#FFC107]/30 transition-all duration-200 text-base ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isLoading ? 'Đang gửi...' : 'Đăng ký ngay!'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
