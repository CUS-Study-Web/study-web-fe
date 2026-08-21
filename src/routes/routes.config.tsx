import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";

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
import LearnerProfilePage from "../pages/learner/LearnerProfilePage";
import LearnerMyCoursesPage from "../pages/learner/LearnerMyCoursesPage";
import LearnerSubjectDetailPage from "../pages/learner/LearnerSubjectDetailPage";
import LearnerExamStartPage from "../pages/learner/LearnerExamStartPage";
import LearnerTakeExamPage from "../pages/learner/LearnerTakeExamPage";

// Assistant Components & Pages
import AssistantLayout from "../components/assistant/AssistantLayout";
import AssistantDashboard from "../pages/assistant/AssistantDashboard";
import AssistantCourses from "../pages/assistant/AssistantCourses";
import AssistantCourseDetail from "../pages/assistant/AssistantCourseDetail";
import AssistantSubjectDetail from "../pages/assistant/AssistantSubjectDetail";
import AssistantUploadExam from "../pages/assistant/AssistantUploadExam";
import AssistantEditExam from "../pages/assistant/AssistantEditExam";
import AssistantCreateExercise from "../pages/assistant/AssistantCreateExercise";
import AssistantEditExercise from "../pages/assistant/AssistantEditExercise";
import AssistantMaterials from "../pages/assistant/AssistantMaterials";
import AssistantStudents from "../pages/assistant/AssistantStudents";
import AssistantFlashcards from "../pages/assistant/AssistantFlashcards";

// Admin Components & Pages
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSystem from "../pages/admin/AdminSystem";
import AdminWebsite from "../pages/admin/AdminWebsite";
import AdminAsstActivities from "../pages/admin/AdminAsstActivities";

function GuestRoute({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn, role } = useAuth();

  if (isLoggedIn) {
    if (role === "admin") return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    if (role === "assistant") return <Navigate to={ROUTES.ASSISTANT.DASHBOARD} replace />;
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

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
  const { logout } = useAuth();
  return (
    <AssistantLayout onLogout={logout}>
      <Outlet />
    </AssistantLayout>
  );
}

function AdminAppLayout() {
  const { logout } = useAuth();
  return (
    <AdminLayout onLogout={logout}>
      <Outlet />
    </AdminLayout>
  );
}

export default function AppRoutes() {
  const { isLoggedIn, role } = useAuth();
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

      {/* Protected Learner Pages using standard AppLayout (Header + Footer) */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isLoggedIn} allowedRoles={["student", "learner", "assistant", "admin"]} userRole={role || "guest"}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.LEARNER.PROFILE} element={<LearnerProfilePage />} />
        <Route path={ROUTES.LEARNER.MY_COURSES} element={<LearnerMyCoursesPage />} />
        <Route path={ROUTES.LEARNER.SUBJECT_DETAIL()} element={<LearnerSubjectDetailPage />} />
        <Route path={ROUTES.LEARNER.EXAM_START()} element={<LearnerExamStartPage />} />
        <Route path={ROUTES.LEARNER.EXERCISE_START()} element={<LearnerExamStartPage />} />
      </Route>

      {/* Full-screen Learner Pages (No Footer) */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isLoggedIn} allowedRoles={["student", "learner", "assistant", "admin"]} userRole={role || "guest"}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.LEARNER.TAKE_EXAM()} element={<LearnerTakeExamPage />} />
        <Route path={ROUTES.LEARNER.TAKE_EXERCISE()} element={<LearnerTakeExamPage />} />
      </Route>

      {/* Full-screen Auth & System Pages */}
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
      </Route>
      <Route path={ROUTES.UNDER_DEVELOPMENT} element={<UnderDevelopmentPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

      {/* Learner Protected Routes (dashboard uses separate layout) */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isLoggedIn} allowedRoles={["student", "learner", "assistant", "admin"]} userRole={role || "guest"}>
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
          <ProtectedRoute isAuthenticated={isLoggedIn} allowedRoles={["assistant", "admin"]} userRole={role || "guest"}>
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
        <Route path={ROUTES.ASSISTANT.COURSE_CREATE_EXERCISE()} element={<AssistantCreateExercise />} />
        <Route path={ROUTES.ASSISTANT.COURSE_EDIT_EXERCISE()} element={<AssistantEditExercise />} />
        <Route path={ROUTES.ASSISTANT.COURSE_SUBJECT_DETAIL()} element={<AssistantSubjectDetail />} />
        <Route path={ROUTES.ASSISTANT.MATERIALS} element={<AssistantMaterials />} />
        <Route path={ROUTES.ASSISTANT.STUDENTS} element={<AssistantStudents />} />
        <Route path={ROUTES.ASSISTANT.FLASHCARDS} element={<AssistantFlashcards />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isLoggedIn} allowedRoles={["admin"]} userRole={role || "guest"}>
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
