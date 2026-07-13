import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ProposalSubmission from "./pages/student/ProposalSubmission";
import MilestoneTimeline from "./pages/student/MilestoneTimeline";
import ConsultationRecords from "./pages/student/ConsultationRecords";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import StudentProgress from "./pages/supervisor/StudentProgress";

// Coordinator Pages
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route path="/student" element={<MainLayout role="student" />}>
          <Route index element={<StudentDashboard />} />
          <Route path="proposal" element={<ProposalSubmission />} />
          <Route path="milestones" element={<MilestoneTimeline />} />
          <Route path="consultations" element={<ConsultationRecords />} />
        </Route>

        {/* Supervisor Routes */}
        <Route path="/supervisor" element={<MainLayout role="supervisor" />}>
          <Route index element={<SupervisorDashboard />} />
          <Route path="students" element={<StudentProgress />} />
        </Route>

        {/* Coordinator Routes */}
        <Route path="/coordinator" element={<MainLayout role="coordinator" />}>
          <Route index element={<CoordinatorDashboard />} />
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<div className="flex h-screen items-center justify-center text-2xl font-bold text-gray-500">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}