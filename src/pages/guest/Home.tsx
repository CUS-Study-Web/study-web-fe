import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../utils/routes";
import Hero from "../../components/guest/home/Hero";
import Programs from "../../components/guest/home/Programs";
import TrialForm from "../../components/guest/home/TrialForm";

export default function Home() {
  const { isLoggedIn, role } = useAuth();

  // Redirect staff users to their dashboards instead of showing the public homepage
  if (isLoggedIn) {
    if (role === "admin") {
      return <Navigate to={ROUTES.ADMIN.WEBSITE} replace />;
    }
    if (role === "assistant") {
      return <Navigate to={ROUTES.ASSISTANT.COURSES} replace />;
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <Programs />
      <TrialForm />
    </div>
  );
}
