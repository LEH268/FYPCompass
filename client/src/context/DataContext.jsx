// src/context/DataContext.jsx
import React, { createContext, useState, useContext, useCallback } from "react";
import {
  MILESTONE_PLAN,
  TOTAL_MILESTONES,
  SUBMISSION_STATUS,
} from "../constants/milestones";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Per-student milestone assignment. Empty array = no milestones assigned,
  // which drives the Test Case 11 empty state.
  const [milestoneAssignments, setMilestoneAssignments] = useState({
    "25001001": MILESTONE_PLAN,
    "25001002": MILESTONE_PLAN,
    "25001003": MILESTONE_PLAN,
    "24002010": MILESTONE_PLAN,
    "25001007": MILESTONE_PLAN,
    "25001008": MILESTONE_PLAN,
    // Unassigned students deliberately have NO milestones — empty-state test accounts
    "25001009": [],
    "25001010": [],
    "25001011": [],
  });

  // 1. Submissions — milestone names now match MILESTONE_PLAN exactly
  const [submissions, setSubmissions] = useState([
    // Oliver Smith: 3 approved of 7 → matches Test Case 9 ("Completed milestones: 3")
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", milestone: "Proposal Submission", file: "FYP_Proposal_v2.pdf", status: "Approved", date: "2026-06-15", studentMessage: "Hi Dr, here is the updated proposal taking into account the new ML dataset.", feedback: "The project idea is relevant. Approved to proceed.", similarityScore: 8 },
    { id: 2, studentId: "25001001", studentName: "Oliver Smith", milestone: "Business Case", file: "BusinessCase_Oliver.pdf", status: "Approved", date: "2026-06-28", studentMessage: "Cost-benefit analysis included as requested.", feedback: "Feasibility is well argued. Approved.", similarityScore: 11 },
    { id: 3, studentId: "25001001", studentName: "Oliver Smith", milestone: "System Requirement Document (SRD)", file: "SRD_Oliver.docx", status: "Approved", date: "2026-07-16", studentMessage: "I have mapped out all 15 use cases we discussed.", feedback: "Requirements traceability is solid. Approved.", similarityScore: 9 },
    { id: 4, studentId: "25001001", studentName: "Oliver Smith", milestone: "System Design Specification (SDS)", file: "SDS_Oliver_v1.docx", status: "Pending Review", date: "2026-07-20", studentMessage: "First pass at the architecture and ERD.", feedback: null, similarityScore: 12 },

    // Emma Johnson
    { id: 5, studentId: "25001002", studentName: "Emma Johnson", milestone: "Proposal Submission", file: "Proposal_Emma.pdf", status: "Approved", date: "2026-06-10", studentMessage: "Initial proposal.", feedback: "Good.", similarityScore: 7 },
    { id: 6, studentId: "25001002", studentName: "Emma Johnson", milestone: "System Requirement Document (SRD)", file: "SRD_Emma.docx", status: "Approved", date: "2026-06-25", studentMessage: "SRD attached.", feedback: "Requirements are clear.", similarityScore: 10 },
    { id: 7, studentId: "25001002", studentName: "Emma Johnson", milestone: "System Design Specification (SDS)", file: "SDS_Draft_1.docx", status: "Revision Required", date: "2026-07-10", studentMessage: "Draft 1 of the architecture.", feedback: "Please fix the ERD, your cardinality is wrong.", similarityScore: 14 },

    // Wong Jin Hao: all 7 approved → genuinely 100%
    { id: 8,  studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Proposal Submission", file: "Proposal.pdf", status: "Approved", date: "2026-02-10", studentMessage: "", feedback: "Approved", similarityScore: 6 },
    { id: 9,  studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Business Case", file: "BusinessCase.pdf", status: "Approved", date: "2026-02-28", studentMessage: "", feedback: "Approved", similarityScore: 8 },
    { id: 10, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "System Requirement Document (SRD)", file: "SRD.pdf", status: "Approved", date: "2026-03-10", studentMessage: "", feedback: "Approved", similarityScore: 9 },
    { id: 11, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "System Design Specification (SDS)", file: "SDS.pdf", status: "Approved", date: "2026-04-10", studentMessage: "", feedback: "Approved", similarityScore: 7 },
    { id: 12, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "System Test Document (STD)", file: "STD.pdf", status: "Approved", date: "2026-05-02", studentMessage: "", feedback: "Approved", similarityScore: 10 },
    { id: 13, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Final Report", file: "Final.pdf", status: "Approved", date: "2026-06-10", studentMessage: "", feedback: "Approved", similarityScore: 11 },
    { id: 14, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Viva Presentation", file: "Viva_Slides.zip", status: "Approved", date: "2026-06-20", studentMessage: "", feedback: "Approved", similarityScore: 5 },

    // Sarah Connor: all 7 approved (replaces the old hardcoded 100% override)
    { id: 15, studentId: "25001007", studentName: "Sarah Connor", milestone: "Proposal Submission", file: "Skynet_Proposal.pdf", status: "Approved", date: "2026-02-15", studentMessage: "", feedback: "Approved", similarityScore: 6 },
    { id: 16, studentId: "25001007", studentName: "Sarah Connor", milestone: "Business Case", file: "Skynet_BC.pdf", status: "Approved", date: "2026-03-01", studentMessage: "", feedback: "Approved", similarityScore: 7 },
    { id: 17, studentId: "25001007", studentName: "Sarah Connor", milestone: "System Requirement Document (SRD)", file: "Skynet_SRD.pdf", status: "Approved", date: "2026-03-20", studentMessage: "", feedback: "Approved", similarityScore: 8 },
    { id: 18, studentId: "25001007", studentName: "Sarah Connor", milestone: "System Design Specification (SDS)", file: "Skynet_SDS.pdf", status: "Approved", date: "2026-04-15", studentMessage: "", feedback: "Approved", similarityScore: 9 },
    { id: 19, studentId: "25001007", studentName: "Sarah Connor", milestone: "System Test Document (STD)", file: "Skynet_STD.pdf", status: "Approved", date: "2026-05-20", studentMessage: "", feedback: "Approved", similarityScore: 10 },
    { id: 20, studentId: "25001007", studentName: "Sarah Connor", milestone: "Final Report", file: "Skynet_Final.pdf", status: "Approved", date: "2026-07-01", studentMessage: "Final submission", feedback: "Excellent.", similarityScore: 12 },
    { id: 21, studentId: "25001007", studentName: "Sarah Connor", milestone: "Viva Presentation", file: "Skynet_Viva.zip", status: "Approved", date: "2026-07-08", studentMessage: "", feedback: "Approved", similarityScore: 5 },

    // Bruce Wayne: all 7 approved
    { id: 22, studentId: "25001008", studentName: "Bruce Wayne", milestone: "Proposal Submission", file: "Bat_Proposal.pdf", status: "Approved", date: "2026-02-18", studentMessage: "", feedback: "Approved", similarityScore: 7 },
    { id: 23, studentId: "25001008", studentName: "Bruce Wayne", milestone: "Business Case", file: "Bat_BC.pdf", status: "Approved", date: "2026-03-05", studentMessage: "", feedback: "Approved", similarityScore: 8 },
    { id: 24, studentId: "25001008", studentName: "Bruce Wayne", milestone: "System Requirement Document (SRD)", file: "Bat_SRD.pdf", status: "Approved", date: "2026-03-25", studentMessage: "", feedback: "Approved", similarityScore: 9 },
    { id: 25, studentId: "25001008", studentName: "Bruce Wayne", milestone: "System Design Specification (SDS)", file: "Bat_SDS.pdf", status: "Approved", date: "2026-04-20", studentMessage: "", feedback: "Approved", similarityScore: 6 },
    { id: 26, studentId: "25001008", studentName: "Bruce Wayne", milestone: "System Test Document (STD)", file: "Bat_STD.pdf", status: "Approved", date: "2026-05-25", studentMessage: "", feedback: "Approved", similarityScore: 11 },
    { id: 27, studentId: "25001008", studentName: "Bruce Wayne", milestone: "Final Report", file: "Bat_Tech.pdf", status: "Approved", date: "2026-07-05", studentMessage: "Final iteration uploaded.", feedback: "Approved for grading.", similarityScore: 10 },
    { id: 28, studentId: "25001008", studentName: "Bruce Wayne", milestone: "Viva Presentation", file: "Bat_Viva.zip", status: "Approved", date: "2026-07-12", studentMessage: "", feedback: "Approved", similarityScore: 5 },
  ]);

  // Progress = approved milestones / assigned milestones. No hardcoded overrides.
  const calculateProgress = useCallback(
    (studentId, subs = submissions) => {
      const assigned = milestoneAssignments[studentId] || [];
      const total = assigned.length;
      if (total === 0) return 0;

      const assignedNames = new Set(assigned.map((m) => m.title));
      const approvedCount = subs.filter(
        (s) =>
          s.studentId === studentId &&
          s.status === SUBMISSION_STATUS.APPROVED &&
          assignedNames.has(s.milestone)
      ).length;

      return Math.round((approvedCount / total) * 100);
    },
    [submissions, milestoneAssignments]
  );

  // Stage derived from the milestone plan rather than fixed 20% bands
  const getStage = useCallback((progress) => {
    if (progress >= 100) return "Completed";
    const index = Math.floor((progress / 100) * TOTAL_MILESTONES);
    const next = MILESTONE_PLAN[Math.min(index, TOTAL_MILESTONES - 1)];
    return next ? next.title : "Topic Selection";
  }, []);

  const getAssignedMilestones = useCallback(
    (studentId) => milestoneAssignments[studentId] || [],
    [milestoneAssignments]
  );

  const [students, setStudents] = useState([
    { id: "25001001", name: "Oliver Smith", topic: "Automated Healthcare Diagnosis Using Deep Learning", progress: 43, status: "On Track", stage: "System Design Specification (SDS)", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.8 },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Based Smart Agriculture System", progress: 29, status: "On Track", stage: "System Requirement Document (SRD)", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.6 },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain for Academic Credential Verification", progress: 0, status: "At Risk", stage: "Proposal Submission", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Dr. Jane Watson", gpa: 3.2 },
    { id: "24002010", name: "Wong Jin Hao", topic: "E-Commerce AI Recommender", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.8, finalScore: 88, finalFeedback: "Excellent technical depth and highly accurate ML model. The documentation was pristine." },
    { id: "25001007", name: "Sarah Connor", topic: "AI Threat Detection System", progress: 100, status: "On Track", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.9 },
    { id: "25001008", name: "Bruce Wayne", topic: "Advanced Sonar Mapping Drone", progress: 100, status: "On Track", stage: "Completed", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.7 },
    { id: "25001009", name: "Peter Parker", topic: "Web-Shooter Polymer Analysis", progress: 0, status: "On Track", stage: "Topic Selection", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 3.5 },
    { id: "25001010", name: "Clark Kent", topic: "Global News Analytics Engine", progress: 0, status: "On Track", stage: "Topic Selection", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 3.4 },
    { id: "25001011", name: "Tony Stark", topic: "Arc Reactor Energy Efficiency", progress: 0, status: "On Track", stage: "Topic Selection", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 4.0 },
  ]);

  const [faculty, setFaculty] = useState([
    { id: "F01", name: "Dr. Alan Turing", expertise: "AI, Machine Learning", currentLoad: 6, maxLoad: 8 },
    { id: "F02", name: "Dr. Siti Aminah", expertise: "IoT, Agriculture Tech", currentLoad: 5, maxLoad: 8 },
    { id: "F03", name: "Prof. John Smith", expertise: "Cybersecurity, Blockchain", currentLoad: 0, maxLoad: 6 },
    { id: "F04", name: "Dr. Rajesh Kumar", expertise: "Data Science, NLP", currentLoad: 4, maxLoad: 6 },
  ]);

  const [consultations, setConsultations] = useState([
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", date: "2026-06-05", time: "10:00", topic: "Proposal Guidance", summary: "Refined the AI model scope.", actionItems: "Submit proposal by next week.", status: "Logged" },
    { id: 2, studentId: "25001001", studentName: "Oliver Smith", date: "2026-07-02", time: "11:30", topic: "SRD Use Cases", summary: "Discussed the 15 functional requirements.", actionItems: "Fix the actor definitions in SRD.", status: "Logged" },
    { id: 3, studentId: "25001001", studentName: "Oliver Smith", date: new Date().toLocaleDateString("en-CA"), time: "14:00", topic: "SDS Architecture", summary: "Reviewed early wireframes.", actionItems: "Prepare ERD diagram.", status: "Upcoming" },    { id: 4, studentId: "25001002", studentName: "Emma Johnson", date: "2026-07-05", time: "14:00", topic: "Hardware troubleshooting", summary: "Sensor failure issue.", actionItems: "Replace Arduino board.", status: "Logged" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, userId: "25001001", message: "Reminder: System Design Specification (SDS) is due in 15 days.", date: "2026-07-23", read: false },
    { id: 2, userId: "25001001", message: "Dr. Alan Turing approved your Proposal Submission.", date: "2026-06-16", read: false },
    { id: 3, userId: "F01", message: "Oliver Smith has submitted System Design Specification (SDS) for review.", date: "2026-07-20", read: false },
  ]);

  const [evaluationDrafts, setEvaluationDrafts] = useState({});

  // --- ACTIONS ---

  const addNotification = (userId, message) => {
    setNotifications((prev) => [
      { id: Date.now() + Math.random(), userId, message, date: new Date().toLocaleDateString("en-CA"), read: false },
      ...prev,
    ]);
  };

  const assignSupervisor = (studentId, facultyId) => {
    const fac = faculty.find((f) => f.id === facultyId);
    if (!fac) return;
    let oldSupervisorId = null;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          oldSupervisorId = s.supervisorId;
          return { ...s, supervisorId: fac.id, supervisorName: fac.name, status: "On Track" };
        }
        return s;
      })
    );

    setFaculty((prev) =>
      prev.map((f) => {
        if (oldSupervisorId && f.id === oldSupervisorId) {
          return { ...f, currentLoad: Math.max(0, f.currentLoad - 1) };
        }
        if (f.id === facultyId) {
          return { ...f, currentLoad: f.currentLoad + 1 };
        }
        return f;
      })
    );

    // Assigning a supervisor also assigns the standard milestone plan
    setMilestoneAssignments((prev) =>
      prev[studentId]?.length ? prev : { ...prev, [studentId]: MILESTONE_PLAN }
    );
  };

  // Recompute progress from a known submissions array (avoids stale closure)
  const syncProgress = (studentId, subs) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const assigned = milestoneAssignments[s.id] || [];
        const total = assigned.length;
        if (total === 0) return { ...s, progress: 0, stage: "Topic Selection" };
        const assignedNames = new Set(assigned.map((m) => m.title));
        const approvedCount = subs.filter(
          (x) => x.studentId === s.id && x.status === SUBMISSION_STATUS.APPROVED && assignedNames.has(x.milestone)
        ).length;
        const prog = Math.round((approvedCount / total) * 100);
        return { ...s, progress: prog, stage: getStage(prog) };
      })
    );
  };

  const addSubmission = (submission) => {
    const status = submission.status || SUBMISSION_STATUS.PENDING;
    const record = { ...submission, id: Date.now(), status, feedback: null };

    setSubmissions((prev) => {
      const next = [record, ...prev];
      syncProgress(submission.studentId, next);
      return next;
    });

    // Drafts stay private to the student — no supervisor notification
    if (status !== SUBMISSION_STATUS.DRAFT) {
      addNotification(
        submission.supervisorId || "F01",
        `${submission.studentName} has submitted ${submission.milestone} for review.`
      );
    }
  };

  const updateSubmission = (id, updates) => {
    setSubmissions((prev) => {
      const target = prev.find((sub) => sub.id === id);
      const next = prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub));

      if (
        target &&
        target.status === SUBMISSION_STATUS.DRAFT &&
        updates.status &&
        updates.status !== SUBMISSION_STATUS.DRAFT
      ) {
        addNotification(
          "F01",
          `${target.studentName} has submitted ${updates.milestone || target.milestone} for review.`
        );
      }

      if (target) syncProgress(target.studentId, next);
      return next;
    });
  };

  const deleteSubmission = (id) => {
    setSubmissions((prev) => {
      const target = prev.find((sub) => sub.id === id);
      const next = prev.filter((sub) => sub.id !== id);
      if (target) syncProgress(target.studentId, next);
      return next;
    });
  };

  const gradeSubmission = (id, status, feedback) => {
    setSubmissions((prev) => {
      const next = prev.map((sub) => (sub.id === id ? { ...sub, status, feedback } : sub));
      const graded = next.find((s) => s.id === id);
      if (graded) syncProgress(graded.studentId, next);
      return next;
    });
  };

  const saveEvaluationDraft = (studentId, grades) => {
    setEvaluationDrafts((prev) => ({ ...prev, [studentId]: grades }));
  };

  const addConsultation = (consultation) => {
    setConsultations((prev) => [{ ...consultation, id: Date.now() }, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = (userId) => {
    setNotifications((prev) => prev.map((n) => (n.userId === userId ? { ...n, read: true } : n)));
  };

  return (
    <DataContext.Provider
      value={{
        students,
        faculty,
        submissions,
        consultations,
        notifications,
        evaluationDrafts,
        milestoneAssignments,
        getAssignedMilestones,
        calculateProgress,
        getStage,
        assignSupervisor,
        addSubmission,
        updateSubmission,
        deleteSubmission,
        gradeSubmission,
        addConsultation,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        saveEvaluationDraft,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};