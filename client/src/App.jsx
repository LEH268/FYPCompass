import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

// Layout
import Layout from "./components/layout/MainLayout";

// =====================
// Student Pages
// =====================
import StudentDashboard from "./pages/student/StudentDashboard";
import ProposalSubmission from "./pages/student/ProposalSubmission";
import MilestoneTimeline from "./pages/student/MilestoneTimeline";
import FeedbackPage from "./pages/student/FeedbackPage";
import ConsultationRecords from "./pages/student/ConsultationRecords";

// =====================
// Supervisor Pages
// =====================
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import StudentProgress from "./pages/supervisor/StudentProgress";
import FeedbackManagement from "./pages/supervisor/FeedbackManagement";
// FIX: Added the missing SupervisorConsultation import
import SupervisorConsultation from "./pages/supervisor/SupervisorConsultation"; 

// =====================
// Coordinator Pages
// =====================
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import SupervisorAssignment from "./pages/coordinator/SupervisorAssignment";

// =====================
// Examiner Pages
// =====================
import ExaminerDashboard from "./pages/examiner/ExaminerDashboard";
import ProjectEvaluation from "./pages/examiner/ProjectEvaluation";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route 
          path="/" 
          element={<Login />} 
        />
        
        {/* =========================
            STUDENT ROUTES
        ========================= */}
        <Route 
          path="/student" 
          element={<Layout role="Student" />}
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="proposal" element={<ProposalSubmission />} />
          <Route path="milestones" element={<MilestoneTimeline />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="consultations" element={<ConsultationRecords />} />
        </Route>

        {/* =========================
            SUPERVISOR ROUTES
        ========================= */}
        <Route 
          path="/supervisor" 
          element={<Layout role="Supervisor" />}
        >
          <Route path="dashboard" element={<SupervisorDashboard />} />
          <Route path="progress" element={<StudentProgress />} />
          <Route path="feedback" element={<FeedbackManagement />} />
          {/* FIX: Added the missing route to match the Sidebar link */}
          <Route path="consultations" element={<SupervisorConsultation />} />
        </Route>

        {/* =========================
            COORDINATOR ROUTES
        ========================= */}
        <Route 
          path="/coordinator" 
          element={<Layout role="Coordinator" />}
        >
          <Route path="dashboard" element={<CoordinatorDashboard />} />
          {/* FIX: Changed path from "supervisor-assignment" to "assign" so it matches the Sidebar onClick */}
          <Route path="assign" element={<SupervisorAssignment />} />
        </Route>

        {/* =========================
            EXAMINER ROUTES
        ========================= */}
        <Route 
          path="/examiner" 
          element={<Layout role="Examiner" />}
        >
          <Route path="dashboard" element={<ExaminerDashboard />} />
          <Route path="evaluate/:id" element={<ProjectEvaluation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;