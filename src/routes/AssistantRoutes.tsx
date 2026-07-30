import { Routes, Route, Navigate } from 'react-router-dom';
import AssistantLayout from '../components/assistant/AssistantLayout';
import Dashboard from '../pages/assistant/Dashboard';
import Courses from '../pages/assistant/Courses';
import Exams from '../pages/assistant/Exams';
import Students from '../pages/assistant/Students';

export default function AssistantRoutes() {
  return (
    <AssistantLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/asst/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="exams" element={<Exams />} />
        <Route path="students" element={<Students />} />
      </Routes>
    </AssistantLayout>
  );
}
