import { useState, useEffect, useRef } from 'react'
import type { Course, Instructor, Achievement, Review, WTab, ModalKey, DocType } from '../../types/admin'
import {
  WEBSITE_INSTRUCTORS,
  WEBSITE_ACHIEVEMENTS,
  WEBSITE_REVIEWS
} from './MockData'
import WebsiteTabsNav from '../../components/admin/website/WebsiteTabsNav'
import {
  CourseModal,
  AddCourseModal,
  InstructorModal,
  AchievementModal,
  ReviewModal,
  DocumentTypeModal,
} from '../../components/admin/modals/WebsiteModals'
import { ConfirmMiniModal } from '../../components/admin/modals/website/ConfirmMiniModal'
import TrangChuTab from '../../components/admin/website/TrangChuTab'
import FooterTab from '../../components/admin/website/FooterTab'
import GoiCuocTab from '../../components/admin/website/GoiCuocTab'

// API Hooks
import {
  useGetAdminCoursesQuery,
  useDeleteCourseMutation,
} from '../../hooks/queries/useCourses'
import { useNotification } from '../../components/common/NotificationProvider'

interface DocTypeActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

function DocTypeActionMenu({ onEdit, onDelete }: DocTypeActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (btnRef.current?.contains(e.target as Node)) return;
        if (menuRef.current?.contains(e.target as Node)) return;
      }
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
          className="bg-white rounded-[10px] border border-[var(--border-default)] py-1.5 min-w-[160px]"
        >
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa
          </button>
        </div>
      )}
    </>
  );
}

const AdminWebsite = () => {
  const [activeTab, setActiveTab] = useState<WTab>("courses")
  const [showModal, setShowModal] = useState<ModalKey | null>(null)
  const [showDevPopup, setShowDevPopup] = useState(false)

  // API state for courses
  const { data: coursesData, isLoading: isLoadingCourses } = useGetAdminCoursesQuery({ size: 100 })
  const courses = coursesData?.data || []

  const deleteCourse = useDeleteCourseMutation()

  // Local list states (mocked ones)
  const [instructors, setInstructors] = useState<Instructor[]>(WEBSITE_INSTRUCTORS)
  const [achievements, setAchievements] = useState<Achievement[]>(WEBSITE_ACHIEVEMENTS)
  const [reviews, setReviews] = useState<Review[]>(WEBSITE_REVIEWS)
  const [docTypes, setDocTypes] = useState<DocType[]>([
    { id: 1, name: 'Bài tập' },
    { id: 2, name: 'Đề thi' },
    { id: 3, name: 'Lý thuyết' },
    { id: 4, name: 'Toán' },
  ])

  // Edit item trackers
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | undefined>(undefined)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>(undefined)
  const [editingReview, setEditingReview] = useState<Review | undefined>(undefined)
  const [editingDocType, setEditingDocType] = useState<DocType | undefined>(undefined)
  const [docTypeToDelete, setDocTypeToDelete] = useState<DocType | null>(null)

  // Dropdown row state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const { showSuccess, showError } = useNotification()

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownId(null)
    }
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleTabChange = (tab: WTab) => {
    if (tab !== "courses" && tab !== "doc-types") {
      setShowDevPopup(true)
      return
    }
    setActiveTab(tab)
    setActiveDropdownId(null)
  }

  const tabsConfig: Record<WTab, { label: string; addLabel?: string; addModal?: ModalKey }> = {
    "trang-chu": { label: "Trang chủ" },
    "footer": { label: "Footer" },
    "goi-cuoc": { label: "Gói cước" },
    "courses": { label: "Danh sách khóa học", addLabel: "Thêm khóa học", addModal: "add-course" },
    "doc-types": { label: "Loại tài liệu", addLabel: "Thêm loại tài liệu", addModal: "add-doc-type" },
    "instructors": { label: "Đội ngũ giảng viên", addLabel: "Thêm giảng viên", addModal: "add-instructor" },
    "achievements": { label: "Bảng thành tích", addLabel: "Thêm thành tích", addModal: "add-achievement" },
    "reviews": { label: "Cảm nhận học viên", addLabel: "Thêm cảm nhận", addModal: "add-review" },
  }

  const currentTab = tabsConfig[activeTab]

  // Add / Edit Handlers
  // handleSaveCourse removed — CourseModal now handles all course/subject mutations internally.

  const handleSaveInstructor = (data: Partial<Instructor>) => {
    if (editingInstructor) {
      setInstructors((prev) => prev.map((i) => (i.id === editingInstructor.id ? { ...i, ...data } as Instructor : i)))
    } else {
      const newInstr: Instructor = {
        id: Date.now(),
        name: data.name || '',
        bio: data.bio || '',
        image: data.image
      }
      setInstructors((prev) => [...prev, newInstr])
    }
  }

  const handleSaveAchievement = (data: Partial<Achievement>) => {
    if (editingAchievement) {
      setAchievements((prev) => prev.map((a) => (a.id === editingAchievement.id ? { ...a, ...data } as Achievement : a)))
    } else {
      const newAch: Achievement = {
        id: Date.now(),
        name: data.name || '',
        exam: data.exam || '',
        totalScore: data.totalScore || '',
        subScores: data.subScores || '',
        image: data.image
      }
      setAchievements((prev) => [...prev, newAch])
    }
  }

  const handleSaveReview = (data: Partial<Review>) => {
    if (editingReview) {
      setReviews((prev) => prev.map((r) => (r.id === editingReview.id ? { ...r, ...data } as Review : r)))
    } else {
      const newRev: Review = {
        id: Date.now(),
        name: data.name || '',
        course: data.course || '',
        time: data.time || '',
        comment: data.comment || '',
        image: data.image
      }
      setReviews((prev) => [...prev, newRev])
    }
  }

  const handleSaveDocType = (data: Partial<DocType>) => {
    if (editingDocType) {
      setDocTypes((prev) => prev.map((d) => (d.id === editingDocType.id ? { ...d, ...data } as DocType : d)))
    } else {
      const newDoc: DocType = {
        id: Date.now(),
        name: data.name || ''
      }
      setDocTypes((prev) => [...prev, newDoc])
    }
  }

  // Delete Handlers
  const handleDeleteCourse = async (id: string) => {
    setDeletingId(`course-${id}`)
    const startTime = Date.now()
    try {
      await deleteCourse.mutateAsync(id)
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showSuccess("Xóa khóa học thành công!")
    } catch {
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showError("Lỗi khi xóa khóa học!")
    } finally {
      setDeletingId(null)
      setCourseToDelete(null)
    }
  }

  const handleDeleteInstructor = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giảng viên này?")) {
      setDeletingId(`instr-${id}`)
      await new Promise(r => setTimeout(r, 500))
      setInstructors((prev) => prev.filter((i) => i.id !== id))
      showSuccess("Xóa giảng viên thành công!")
      setDeletingId(null)
    }
  }

  const handleDeleteAchievement = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành tích này?")) {
      setDeletingId(`ach-${id}`)
      await new Promise(r => setTimeout(r, 500))
      setAchievements((prev) => prev.filter((a) => a.id !== id))
      showSuccess("Xóa thành tích thành công!")
      setDeletingId(null)
    }
  }

  const handleDeleteReview = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cảm nhận này?")) {
      setDeletingId(`rev-${id}`)
      await new Promise(r => setTimeout(r, 500))
      setReviews((prev) => prev.filter((r) => r.id !== id))
      showSuccess("Xóa cảm nhận thành công!")
      setDeletingId(null)
    }
  }

  const handleDeleteDocType = async (id: number) => {
    setDeletingId(`doctype-${id}`)
    await new Promise(r => setTimeout(r, 500))
    setDocTypes((prev) => prev.filter((d) => d.id !== id))
    showSuccess("Xóa loại tài liệu thành công!")
    setDeletingId(null)
    setDocTypeToDelete(null)
  }

  // Common styles
  const thClass = "px-5 py-[11px] [font-family:var(--font-heading)] font-bold text-xs text-[var(--text-secondary-300)] text-left uppercase tracking-[0.4px] whitespace-nowrap"
  const tdCellClass = "px-5 py-3.5 [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-600)] align-middle"
  const tdBoldClass = "px-5 py-3.5 [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] align-middle"

  return (
    <div className="max-w-[1280px] mx-auto pt-[8px] pb-[80px]">
      <div className="mb-[48px]">
        <h1 className="[font-family:var(--font-heading)] font-[800] text-[30px] text-[var(--text-primary)] mb-[6px] tracking-[-0.5px]">
          Quản Lý Website
        </h1>
        <p className="[font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
          Quản lý nội dung hiển thị trên trang chủ CUS Education.
        </p>
      </div>

      {/* Tab Panel */}
      <div className="bg-white rounded-[18px] shadow-[var(--shadow-clay-sm)] border border-[rgba(220,233,222,0.5)]">
        <WebsiteTabsNav activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="p-7">
          {/* Header Action Row */}
          <div className="flex items-center justify-between py-4 mb-4">
            <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
              {currentTab.label}
            </div>
            {currentTab.addModal && (
              <button
                onClick={() => {
                  setEditingCourse(undefined)
                  setEditingInstructor(undefined)
                  setEditingAchievement(undefined)
                  setEditingReview(undefined)
                  setEditingDocType(undefined)
                  setShowModal(currentTab.addModal!)
                }}
                className="flex items-center gap-2 px-[18px] py-[9px] rounded-[var(--radius-sm)] border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-[13px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {currentTab.addLabel}
              </button>
            )}
          </div>

          {/* CMS form tabs */}
          {activeTab === "trang-chu" && <TrangChuTab />}
          {activeTab === "footer" && <FooterTab />}
          {activeTab === "goi-cuoc" && <GoiCuocTab />}

          {/* Tab Tables */}
          {(activeTab === "courses" || activeTab === "doc-types" || activeTab === "instructors" || activeTab === "achievements" || activeTab === "reviews") && (
            <div className="rounded-[var(--radius-md)] border border-[var(--border-300)] overflow-visible">
              <div>
                {activeTab === "courses" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Tiêu đề", "Tiêu đề phụ", "Mô tả", "Trạng thái", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingCourses && (
                        <tr>
                          <td colSpan={4} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Đang tải dữ liệu...
                          </td>
                        </tr>
                      )}
                      {!isLoadingCourses && courses.map((c, i) => (
                        <tr
                          key={c.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                            }`}
                        >
                          <td className={tdBoldClass}>{c.title}</td>
                          <td className={tdCellClass}>{c.subTitle}</td>
                          <td className={`${tdCellClass} max-w-[260px] truncate`}>{c.description}</td>
                          <td className={tdCellClass}>
                            <span className={`px-2 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold ${
                              c.status === 'PUBLISH' ? 'bg-[#E3F5E7] text-[#1D9A44]' : 
                              c.status === 'DEVELOPING' ? 'bg-[#E3F2FD] text-[#1976D2]' : 
                              'bg-[var(--surface-500)] text-[var(--text-secondary-400)]'
                            }`}>
                              {c.status === 'PUBLISH' ? 'Công khai' : c.status === 'DEVELOPING' ? 'Đang cập nhật' : 'Bản nháp'}
                            </span>
                          </td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `course-${c.id}` ? (
                              <div className="flex justify-end pr-2">
                                <svg className="animate-spin h-5 w-5 text-[var(--brand-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `course-${c.id}` ? null : `course-${c.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `course-${c.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingCourse(c)
                                        setShowModal("edit-course")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        setCourseToDelete(c)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!isLoadingCourses && courses.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có khóa học nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === "doc-types" && (
                  <div className="w-full">
                    <div className="flex justify-between items-center bg-[var(--surface-500)] border-b border-[var(--border-300)] px-5 py-[11px]">
                      <div className={thClass} style={{ padding: 0 }}>Tên loại tài liệu</div>
                      <div className={thClass} style={{ padding: 0 }}></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                      {[...docTypes].sort((a, b) => a.name.localeCompare(b.name)).map((type) => (
                        <div key={type.id} className="border border-[var(--border-300)] rounded-[12px] p-4 flex items-center justify-between bg-white hover:shadow-[var(--shadow-clay-sm)] transition-shadow">
                          <span className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)]">
                            {type.name}
                          </span>
                          <div className="relative">
                            {deletingId === `doctype-${type.id}` ? (
                              <svg className="animate-spin h-5 w-5 text-[var(--brand-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <DocTypeActionMenu
                                onEdit={() => {
                                  setEditingDocType(type)
                                  setShowModal("edit-doc-type")
                                }}
                                onDelete={() => setDocTypeToDelete(type)}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "instructors" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Giảng viên", "Mô tả", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {instructors.map((inst, i) => (
                        <tr
                          key={inst.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                            }`}
                        >
                          <td className={tdBoldClass}>{inst.name}</td>
                          <td className={tdCellClass}>{inst.bio}</td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `instr-${inst.id}` ? (
                              <div className="flex justify-end pr-2">
                                <svg className="animate-spin h-5 w-5 text-[var(--brand-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `instr-${inst.id}` ? null : `instr-${inst.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `instr-${inst.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingInstructor(inst)
                                        setShowModal("edit-instructor")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteInstructor(inst.id)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {instructors.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có giảng viên nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === "achievements" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Học viên", "Kì thi", "Tổng điểm", "Điểm thành phần", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {achievements.map((a, i) => (
                        <tr
                          key={a.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                            }`}
                        >
                          <td className={tdBoldClass}>{a.name}</td>
                          <td className={tdCellClass}>{a.exam}</td>
                          <td className={tdCellClass}>{a.totalScore}</td>
                          <td className={`${tdCellClass} max-w-[220px] truncate`}>{a.subScores}</td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `ach-${a.id}` ? (
                              <div className="flex justify-end pr-2">
                                <svg className="animate-spin h-5 w-5 text-[var(--brand-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `ach-${a.id}` ? null : `ach-${a.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `ach-${a.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingAchievement(a)
                                        setShowModal("edit-achievement")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteAchievement(a.id)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {achievements.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có thành tích nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === "reviews" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Học viên", "Khóa học", "Thời gian", "Bình luận", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((r, i) => (
                        <tr
                          key={r.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                            }`}
                        >
                          <td className={tdBoldClass}>{r.name}</td>
                          <td className={tdCellClass}>{r.course}</td>
                          <td className={tdCellClass}>{r.time}</td>
                          <td className={`${tdCellClass} max-w-[260px] truncate`}>{r.comment}</td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `rev-${r.id}` ? (
                              <div className="flex justify-end pr-2">
                                <svg className="animate-spin h-5 w-5 text-[var(--brand-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `rev-${r.id}` ? null : `rev-${r.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `rev-${r.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingReview(r)
                                        setShowModal("edit-review")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteReview(r.id)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {reviews.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có cảm nhận nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals Container */}
      {showModal === "add-course" && (
        <AddCourseModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-course" && editingCourse && (
        <CourseModal course={editingCourse} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-instructor" && (
        <InstructorModal onSave={handleSaveInstructor} onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-instructor" && (
        <InstructorModal instructor={editingInstructor} onSave={handleSaveInstructor} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-achievement" && (
        <AchievementModal onSave={handleSaveAchievement} onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-achievement" && (
        <AchievementModal achievement={editingAchievement} onSave={handleSaveAchievement} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-review" && (
        <ReviewModal onSave={handleSaveReview} onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-review" && (
        <ReviewModal review={editingReview} onSave={handleSaveReview} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-doc-type" && (
        <DocumentTypeModal onSave={handleSaveDocType} onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-doc-type" && (
        <DocumentTypeModal docType={editingDocType} onSave={handleSaveDocType} onClose={() => setShowModal(null)} />
      )}

      {/* Delete Confirm Modal for Course */}
      {courseToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa khóa học"
          message={
            <span>
              Bạn có chắc chắn muốn xóa khóa học <strong>"{courseToDelete.title}"</strong>? Tất cả dữ liệu liên quan sẽ bị xóa.
            </span>
          }
          isDanger
          confirmText="Xóa khóa học"
          isSubmitting={deletingId === `course-${courseToDelete.id}`}
          onConfirm={() => handleDeleteCourse(courseToDelete.id)}
          onClose={() => setCourseToDelete(null)}
        />
      )}
      
      {docTypeToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa loại tài liệu"
          message={
            <span>
              Bạn có chắc chắn muốn xóa loại tài liệu <strong>"{docTypeToDelete.name}"</strong>? Tất cả dữ liệu liên quan sẽ bị xóa.
            </span>
          }
          isDanger
          confirmText="Xóa loại tài liệu"
          isSubmitting={deletingId === `doctype-${docTypeToDelete.id}`}
          onConfirm={() => handleDeleteDocType(docTypeToDelete.id)}
          onClose={() => setDocTypeToDelete(null)}
        />
      )}

      {showDevPopup && (
        <ConfirmMiniModal
          title="Đang phát triển"
          message="Tính năng đang được phát triển. Vui lòng quay lại sau!"
          confirmText="Đóng"
          onConfirm={() => setShowDevPopup(false)}
          onClose={() => setShowDevPopup(false)}
        />
      )}
    </div>
  )
}

export default AdminWebsite