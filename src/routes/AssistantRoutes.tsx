import { Routes, Route, Navigate } from 'react-router-dom';
import AssistantLayout from '../components/assistant/AssistantLayout';
import AssistantDashboard from '../pages/assistant/AssistantDashboard';
import AssistantCourses from '../pages/assistant/AssistantCourses';
import AssistantExams from '../pages/assistant/AssistantExams';
import AssistantStudents from '../pages/assistant/AssistantStudents';

export default function AssistantRoutes() {
  return (
    <AssistantLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/assistant/dashboard" replace />} />
        <Route path="dashboard" element={<AssistantDashboard />} />
        <Route path="courses" element={<AssistantCourses />} />
        <Route path="exams" element={<AssistantExams />} />
        <Route path="students" element={<AssistantStudents />} />
      </Routes>
    </AssistantLayout>
  );
}
