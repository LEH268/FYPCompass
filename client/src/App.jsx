// src/App.jsx
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
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
import CoordinatorStudents from "./pages/coordinator/CoordinatorStudents";
import CoordinatorStudentDetails from "./pages/coordinator/CoordinatorStudentDetails";
import CoordinatorSupervisors from "./pages/coordinator/CoordinatorSupervisors";
import CoordinatorSupervisorDetails from "./pages/coordinator/CoordinatorSupervisorDetails";
import SupervisorAssignment from "./pages/coordinator/SupervisorAssignment";

// Examiner Pages
import ExaminerDashboard from "./pages/examiner/ExaminerDashboard";
import ExaminerStudents from "./pages/examiner/ExaminerStudents";
import ExaminerStudentDetails from "./pages/examiner/ExaminerStudentDetails";
import ProjectEvaluation from "./pages/examiner/ProjectEvaluation";

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          {/* Default & Authentication */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ================= STUDENT ================= */}
          <Route path="/student" element={<MainLayout role="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="proposal" element={<ProposalSubmission />} />
            <Route path="milestones" element={<MilestoneTimeline />} />
            <Route path="consultations" element={<ConsultationRecords />} />
          </Route>

          {/* ================= SUPERVISOR ================= */}
          <Route path="/supervisor" element={<MainLayout role="supervisor" />}>
            <Route index element={<SupervisorDashboard />} />
            <Route path="students" element={<StudentProgress />} />
            <Route path="students/:id" element={<SupervisorStudentDetails />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="consultations" element={<SupervisorConsultation />} />
          </Route>

          {/* ================= COORDINATOR ================= */}
          <Route path="/coordinator" element={<MainLayout role="coordinator" />}>
            <Route index element={<CoordinatorDashboard />} />
            <Route path="students" element={<CoordinatorStudents />} />
            <Route path="students/:id" element={<CoordinatorStudentDetails />} />
            <Route path="supervisors" element={<CoordinatorSupervisors />} />
            <Route path="supervisors/:id" element={<CoordinatorSupervisorDetails />} />
            <Route path="assignment" element={<SupervisorAssignment />} />
          </Route>

          {/* ================= EXAMINER ================= */}
          <Route path="/examiner" element={<MainLayout role="examiner" />}>
            <Route index element={<ExaminerDashboard />} />
            <Route path="students" element={<ExaminerStudents />} />
            <Route path="students/:id" element={<ExaminerStudentDetails />} />
            <Route path="evaluations" element={<ProjectEvaluation />} />
            <Route path="evaluations/:id" element={<ProjectEvaluation />} />
          </Route>

          {/* ================= 404 ================= */}
          <Route
            path="*"
            element={
              <div className="flex h-screen items-center justify-center text-2xl font-bold text-slate-500 bg-slate-50">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}