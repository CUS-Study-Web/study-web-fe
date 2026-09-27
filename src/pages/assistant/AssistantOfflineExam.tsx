import { QuanLyVipTab } from '../../components/admin/SystemComponents';

export default function AssistantOfflineExam() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] m-0 mb-1">
            Danh sách đăng ký thi thử offline
          </div>
          <p className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)] m-0">
            Quản lý và tra cứu thông tin thí sinh đăng ký tham dự các kỳ thi thử trực tiếp tại trung tâm CUS.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow-clay-sm)] border border-[rgba(220,233,222,0.5)] p-[28px]">
        <QuanLyVipTab />
      </div>
    </div>
  );
}
