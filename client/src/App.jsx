import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

// Layout - CORRECTED IMPORT PATH
import Layout from "./components/layout/MainLayout";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ProposalSubmission from "./pages/student/ProposalSubmission";
import MilestoneTimeline from "./pages/student/MilestoneTimeline";
import FeedbackPage from "./pages/student/FeedbackPage";
import ConsultationRecords from "./pages/student/ConsultationRecords";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={<Login/>}
        />

        {/* Student Layout */}
        <Route
          path="/student"
          element={<Layout role="Student"/>}
        >
          <Route
            path="dashboard"
            element={<StudentDashboard/>}
          />
          <Route
            path="proposal"
            element={<ProposalSubmission/>}
          />
          <Route
            path="milestones"
            element={<MilestoneTimeline/>}
          />
          <Route
            path="feedback"
            element={<FeedbackPage/>}
          />
          <Route
            path="consultations"
            element={<ConsultationRecords/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;