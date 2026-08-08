import { useState, useEffect } from 'react'
import type { Course, Instructor, Achievement, Review, WTab, ModalKey } from '../../types/admin'
import {
  WEBSITE_COURSES,
  WEBSITE_INSTRUCTORS,
  WEBSITE_ACHIEVEMENTS,
  WEBSITE_REVIEWS
} from './MockData'
import WebsiteTabsNav from '../../components/admin/WebsiteTabsNav'
import {
  CourseModal,
  InstructorModal,
  AchievementModal,
  ReviewModal
} from '../../components/admin/modals/WebsiteModals'
import TrangChuTab from '../../components/admin/website/TrangChuTab'
import FooterTab from '../../components/admin/website/FooterTab'
import GoiCuocTab from '../../components/admin/website/GoiCuocTab'

const AdminWebsite = () => {
  const [activeTab, setActiveTab] = useState<WTab>("trang-chu")
  const [showModal, setShowModal] = useState<ModalKey | null>(null)
  
  // Local list states
  const [courses, setCourses] = useState<Course[]>(WEBSITE_COURSES)
  const [instructors, setInstructors] = useState<Instructor[]>(WEBSITE_INSTRUCTORS)
  const [achievements, setAchievements] = useState<Achievement[]>(WEBSITE_ACHIEVEMENTS)
  const [reviews, setReviews] = useState<Review[]>(WEBSITE_REVIEWS)

  // Edit item trackers
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | undefined>(undefined)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>(undefined)
  const [editingReview, setEditingReview] = useState<Review | undefined>(undefined)

  // Dropdown row state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)

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
    setActiveTab(tab)
    setActiveDropdownId(null)
  }

  const tabsConfig: Record<WTab, { label: string; addLabel?: string; addModal?: ModalKey }> = {
    "trang-chu":    { label: "Trang chủ" },
    "footer":       { label: "Footer" },
    "goi-cuoc":     { label: "Gói cước" },
    "courses":      { label: "Danh sách khóa học", addLabel: "Thêm khóa học",   addModal: "add-course" },
    "instructors":  { label: "Đội ngũ giảng viên", addLabel: "Thêm giảng viên", addModal: "add-instructor" },
    "achievements": { label: "Bảng thành tích",    addLabel: "Thêm thành tích", addModal: "add-achievement" },
    "reviews":      { label: "Cảm nhận học viên",  addLabel: "Thêm cảm nhận",   addModal: "add-review" },
  }

  const currentTab = tabsConfig[activeTab]

  // Add / Edit Handlers
  const handleSaveCourse = (data: Partial<Course>) => {
    if (editingCourse) {
      setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? { ...c, ...data } as Course : c)))
    } else {
      const newCourse: Course = {
        id: Date.now(),
        title: data.title || '',
        subtitle: data.subtitle || '',
        unit: 'CUS Education',
        desc: data.desc || '',
        subjects: data.subjects || []
      }
      setCourses((prev) => [...prev, newCourse])
    }
  }

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

  // Delete Handlers
  const handleDeleteCourse = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const handleDeleteInstructor = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giảng viên này?")) {
      setInstructors((prev) => prev.filter((i) => i.id !== id))
    }
  }

  const handleDeleteAchievement = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành tích này?")) {
      setAchievements((prev) => prev.filter((a) => a.id !== id))
    }
  }

  const handleDeleteReview = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cảm nhận này?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id))
    }
  }

  // Common styles
  const thClass = "px-5 py-[11px] [font-family:var(--font-heading)] font-bold text-xs text-[var(--text-secondary-300)] text-left uppercase tracking-[0.4px] whitespace-nowrap"
  const tdCellClass = "px-5 py-3.5 [font-family:var(--font-body)] text-[13.5px] text-[var(--text-secondary-600)] vertical-middle align-middle"
  const tdBoldClass = "px-5 py-3.5 [font-family:var(--font-heading)] font-semibold text-[13.5px] text-[var(--text-primary)] vertical-middle align-middle"

  return (
    <div className="max-w-[1280px] mx-auto pt-[8px] pb-[80px]">
      <div className="mb-[28px]">
        <h1 className="[font-family:var(--font-heading)] font-[800] text-[30px] text-[var(--text-primary)] mb-[6px] tracking-[-0.5px]">
          Quản Lý Website
        </h1>
        <p className="[font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
          Quản lý nội dung hiển thị trên trang chủ CUS Education.
        </p>
      </div>

      {/* Tab Panel */}
      <div className="bg-white rounded-[18px] shadow-[var(--shadow-clay-sm)] border border-[rgba(220,233,222,0.5)] overflow-hidden">
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
                  setShowModal(currentTab.addModal!)
                }}
                className="flex items-center gap-2 px-[18px] py-[9px] rounded-[var(--radius-sm)] border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-[13px] cursor-pointer !hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
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
          {activeTab === "footer"    && <FooterTab />}
          {activeTab === "goi-cuoc" && <GoiCuocTab />}

          {/* Tab Tables */}
          {(activeTab === "courses" || activeTab === "instructors" || activeTab === "achievements" || activeTab === "reviews") && (
          <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border-300)]">
            {activeTab === "courses" && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                    {["Tiêu đề", "Tiêu đề phụ", "Mô tả", ""].map((h) => (
                      <th key={h} className={thClass}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, i) => (
                    <tr
                      key={c.id}
                      className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${
                        i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                      }`}
                    >
                      <td className={tdBoldClass}>{c.title}</td>
                      <td className={tdCellClass}>{c.subtitle}</td>
                      <td className={`${tdCellClass} max-w-[260px] truncate`}>{c.desc}</td>
                      <td className={`${tdCellClass} relative whitespace-nowrap`}>
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
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteCourse(c.id)
                                  setActiveDropdownId(null)
                                }}
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                        Không có khóa học nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                      className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${
                        i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                      }`}
                    >
                      <td className={tdBoldClass}>{inst.name}</td>
                      <td className={tdCellClass}>{inst.bio}</td>
                      <td className={`${tdCellClass} relative whitespace-nowrap`}>
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
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteInstructor(inst.id)
                                  setActiveDropdownId(null)
                                }}
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
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
                      className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${
                        i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                      }`}
                    >
                      <td className={tdBoldClass}>{a.name}</td>
                      <td className={tdCellClass}>{a.exam}</td>
                      <td className={tdCellClass}>{a.totalScore}</td>
                      <td className={`${tdCellClass} max-w-[220px] truncate`}>{a.subScores}</td>
                      <td className={`${tdCellClass} relative whitespace-nowrap`}>
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
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteAchievement(a.id)
                                  setActiveDropdownId(null)
                                }}
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
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
                      className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${
                        i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                      }`}
                    >
                      <td className={tdBoldClass}>{r.name}</td>
                      <td className={tdCellClass}>{r.course}</td>
                      <td className={tdCellClass}>{r.time}</td>
                      <td className={`${tdCellClass} max-w-[260px] truncate`}>{r.comment}</td>
                      <td className={`${tdCellClass} relative whitespace-nowrap`}>
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
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteReview(r.id)
                                  setActiveDropdownId(null)
                                }}
                                className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                              >
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
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
          )}
        </div>
      </div>

      {/* Modals Container */}
      {showModal === "add-course" && (
        <CourseModal onSave={handleSaveCourse} onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-course" && (
        <CourseModal course={editingCourse} onSave={handleSaveCourse} onClose={() => setShowModal(null)} />
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
    </div>
  )
}

export default AdminWebsite