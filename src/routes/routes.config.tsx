import { Routes, Route, Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import ProtectedRoute from "./ProtectedRoute";

// Common Layouts
import Header from "../components/guest/Header";
import Footer from "../components/guest/Footer";
import MapSection from "../components/guest/home/MapSection";

// System Pages
import NotFoundPage from "../pages/NotFoundPage";
import UnderDevelopmentPage from "../pages/UnderDevelopmentPage";

// Guest Pages
import Home from "../pages/guest/Home";
import CoursesPage from "../pages/guest/CoursesPage";
import CourseDetailPage from "../pages/guest/CourseDetailPage";
import TrialExamPage from "../pages/guest/TrialExamPage";
import DocumentsPage from "../pages/guest/DocumentsPage";
import AboutPage from "../pages/guest/AboutPage";
import VipPage from "../pages/guest/VipPage";
import LoginPage from "../pages/guest/LoginPage";
import RegisterPage from "../pages/guest/RegisterPage";

// Learner Components & Pages
import LearnerLayout from "../components/learner/LearnerLayout";
import LearnerDashboard from "../pages/learner/LearnerDashboard";

// Assistant Components & Pages
import AssistantLayout from "../components/assistant/AssistantLayout";
import AssistantDashboard from "../pages/assistant/AssistantDashboard";
import AssistantCourses from "../pages/assistant/AssistantCourses";
import AssistantCourseDetail from "../pages/assistant/AssistantCourseDetail";
import AssistantSubjectDetail from "../pages/assistant/AssistantSubjectDetail";
import AssistantUploadExam from "../pages/assistant/AssistantUploadExam";
import AssistantEditExam from "../pages/assistant/AssistantEditExam";
import AssistantMaterials from "../pages/assistant/AssistantMaterials";
import AssistantStudents from "../pages/assistant/AssistantStudents";
import AssistantFlashcards from "../pages/assistant/AssistantFlashcards";

// Admin Components & Pages
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSystem from "../pages/admin/AdminSystem";
import AdminWebsite from "../pages/admin/AdminWebsite";
import AdminAsstActivities from "../pages/admin/AdminAsstActivities";

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-500)]">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <div>
        <Footer />
        {isHome && <MapSection />}
      </div>
    </div>
  );
}

function LearnerAppLayout() {
  return (
    <LearnerLayout>
      <Outlet />
    </LearnerLayout>
  );
}

function AssistantAppLayout() {
  const navigate = useNavigate();
  return (
    <AssistantLayout onLogout={() => navigate(ROUTES.AUTH.LOGIN)}>
      <Outlet />
    </AssistantLayout>
  );
}

function AdminAppLayout() {
  const navigate = useNavigate();
  return (
    <AdminLayout onLogout={() => navigate(ROUTES.AUTH.LOGIN)}>
      <Outlet />
    </AdminLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Guest Public Layout */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COURSES} element={<CoursesPage />} />
        <Route path={ROUTES.COURSE_DETAIL()} element={<CourseDetailPage />} />
        <Route path={ROUTES.TRIAL} element={<TrialExamPage />} />
        <Route path={ROUTES.DOCUMENTS} element={<DocumentsPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.VIP} element={<VipPage />} />
      </Route>

      {/* Full-screen Auth & System Pages */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.UNDER_DEVELOPMENT} element={<UnderDevelopmentPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

      {/* Learner Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["student", "learner", "assistant", "admin"]} userRole="student">
            <LearnerAppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.LEARNER.ROOT} element={<Navigate to={ROUTES.LEARNER.DASHBOARD} replace />} />
        <Route path={ROUTES.LEARNER.DASHBOARD} element={<LearnerDashboard />} />
      </Route>

      {/* Assistant Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["assistant", "admin"]} userRole="assistant">
            <AssistantAppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.ASSISTANT.ROOT} element={<Navigate to={ROUTES.ASSISTANT.DASHBOARD} replace />} />
        <Route path={ROUTES.ASSISTANT.DASHBOARD} element={<AssistantDashboard />} />
        <Route path={ROUTES.ASSISTANT.COURSES} element={<AssistantCourses />} />
        <Route path={ROUTES.ASSISTANT.COURSE_DETAIL()} element={<AssistantCourseDetail />} />
        <Route path={ROUTES.ASSISTANT.COURSE_UPLOAD_EXAM()} element={<AssistantUploadExam />} />
        <Route path={ROUTES.ASSISTANT.COURSE_EDIT_EXAM()} element={<AssistantEditExam />} />
        <Route path={ROUTES.ASSISTANT.COURSE_SUBJECT_DETAIL()} element={<AssistantSubjectDetail />} />
        <Route path={ROUTES.ASSISTANT.MATERIALS} element={<AssistantMaterials />} />
        <Route path={ROUTES.ASSISTANT.STUDENTS} element={<AssistantStudents />} />
        <Route path={ROUTES.ASSISTANT.FLASHCARDS} element={<AssistantFlashcards />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]} userRole="admin">
            <AdminAppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.ADMIN.ROOT} element={<Navigate to={ROUTES.ADMIN.DASHBOARD} replace />} />
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN.SYSTEM} element={<AdminSystem />} />
        <Route path={ROUTES.ADMIN.WEBSITE} element={<AdminWebsite />} />
        <Route path={ROUTES.ADMIN.ACTIVITIES} element={<AdminAsstActivities />} />
      </Route>

      {/* Catch-all 404 Fallback Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
