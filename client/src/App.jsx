import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./components/layout/MainLayout";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ProposalSubmission from "./pages/student/ProposalSubmission";
import MilestoneTimeline from "./pages/student/MilestoneTimeline";
import ConsultationRecords from "./pages/student/ConsultationRecords";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import StudentProgress from "./pages/supervisor/StudentProgress";
import SupervisorStudentDetails from "./pages/supervisor/SupervisorStudentDetails"; 
import FeedbackManagement from "./pages/supervisor/FeedbackManagement";
import SupervisorConsultation from "./pages/supervisor/SupervisorConsultation";

// Coordinator Pages
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import SupervisorAssignment from "./pages/coordinator/SupervisorAssignment";

// Examiner Pages
import ExaminerDashboard from "./pages/examiner/ExaminerDashboard";
import ProjectEvaluation from "./pages/examiner/ProjectEvaluation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
          <Route path="students/:id" element={<SupervisorStudentDetails />} /> 
          <Route path="feedback" element={<FeedbackManagement />} />
          <Route path="consultations" element={<SupervisorConsultation />} />
        </Route>

        {/* Coordinator Routes */}
        <Route path="/coordinator" element={<MainLayout role="coordinator" />}>
          <Route index element={<CoordinatorDashboard />} />
          <Route path="assignment" element={<SupervisorAssignment />} />
        </Route>

        {/* Examiner Routes */}
        <Route path="/examiner" element={<MainLayout role="examiner" />}>
          <Route index element={<ExaminerDashboard />} />
          <Route path="evaluations" element={<ProjectEvaluation />} />
        </Route>

        <Route path="*" element={<div className="flex h-screen items-center justify-center text-2xl font-bold text-slate-500 bg-slate-50">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}