import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/guest/Header";
import Footer from "./components/guest/Footer";
import MapSection from "./components/guest/home/MapSection";
import Home from "./pages/guest/Home";
import CoursesPage from "./pages/guest/CoursesPage";
import TrialExamPage from "./pages/guest/TrialExamPage";
import DocumentsPage from "./pages/guest/DocumentsPage";
import AboutPage from "./pages/guest/AboutPage";
import LoginPage from "./pages/guest/LoginPage";
import RegisterPage from "./pages/guest/RegisterPage";
import VipPage from "./pages/guest/VipPage";
import CourseDetailPage from "./pages/guest/CourseDetailPage";

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/trial" element={<TrialExamPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/vip" element={<VipPage />} />
        </Route>

        {/* Full-screen Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
