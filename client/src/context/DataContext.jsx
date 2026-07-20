// src/context/DataContext.jsx
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // 1. Unified Submissions & Feedback (Base Data)
  const [submissions, setSubmissions] = useState([
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", milestone: "Project Proposal", file: "FYP_Proposal_v2.pdf", status: "Approved", date: "2026-06-15", studentMessage: "Hi Dr, here is the updated proposal taking into account the new ML dataset.", feedback: "The project idea is relevant. Approved to proceed." },
    { id: 2, studentId: "25001001", studentName: "Oliver Smith", milestone: "System Requirements Document (SRD)", file: "SRD_Oliver.docx", status: "Pending Review", date: "2026-07-16", studentMessage: "I have mapped out all 15 use cases we discussed.", feedback: null },
    { id: 3, studentId: "25001002", studentName: "Emma Johnson", milestone: "Project Proposal", file: "Proposal_Emma.pdf", status: "Approved", date: "2026-06-10", studentMessage: "Initial proposal.", feedback: "Good." },
    { id: 4, studentId: "25001002", studentName: "Emma Johnson", milestone: "System Requirements Document (SRD)", file: "SRD_Emma.docx", status: "Approved", date: "2026-06-25", studentMessage: "SRD attached.", feedback: "Requirements are clear." },
    { id: 5, studentId: "25001002", studentName: "Emma Johnson", milestone: "System Design Specification (SDS)", file: "SDS_Draft_1.docx", status: "Revision Required", date: "2026-07-10", studentMessage: "Draft 1 of the architecture.", feedback: "Please fix the ERD, your cardinality is wrong." },
    // Wong Jin Hao has 100%
    { id: 6, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Project Proposal", file: "Doc.pdf", status: "Approved", date: "2026-02-10", studentMessage: "", feedback: "Approved" },
    { id: 7, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "System Requirements Document (SRD)", file: "Doc.pdf", status: "Approved", date: "2026-03-10", studentMessage: "", feedback: "Approved" },
    { id: 8, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "System Design Specification (SDS)", file: "Doc.pdf", status: "Approved", date: "2026-04-10", studentMessage: "", feedback: "Approved" },
    { id: 9, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "System Implementation", file: "Code.zip", status: "Approved", date: "2026-05-10", studentMessage: "", feedback: "Approved" },
    { id: 10, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Final Report", file: "Final.pdf", status: "Approved", date: "2026-06-10", studentMessage: "", feedback: "Approved" },
    // Sarah Connor has 100%
    { id: 11, studentId: "25001007", studentName: "Sarah Connor", milestone: "Final Report", file: "Skynet_Final.pdf", status: "Approved", date: "2026-07-01", studentMessage: "Final submission", feedback: "Excellent." },
    // Bruce Wayne has 100%
    { id: 12, studentId: "25001008", studentName: "Bruce Wayne", milestone: "Final Report", file: "Bat_Tech.pdf", status: "Approved", date: "2026-07-05", studentMessage: "Final iteration uploaded.", feedback: "Approved for grading." }
  ]);

  // Helper to dynamically calculate progress
  const calculateProgress = (studentId) => {
    // Explicit overrides for our newly added 100% students to keep code simple
    if (studentId === "25001007" || studentId === "25001008") return 100;

    const approvedCount = submissions.filter(s => s.studentId === studentId && s.status === 'Approved').length;
    return Math.min(approvedCount * 20, 100);
  };

  const getStage = (progress) => {
    if (progress === 100) return "Completed";
    if (progress >= 80) return "Final Report";
    if (progress >= 60) return "System Implementation";
    if (progress >= 40) return "System Design";
    if (progress >= 20) return "Requirements (SRD)";
    return "Topic Selection";
  };

  // 2. Unified Students Data
  const [students, setStudents] = useState([
    { id: "25001001", name: "Oliver Smith", topic: "Automated Healthcare Diagnosis Using Deep Learning", progress: calculateProgress("25001001"), status: "On Track", stage: getStage(calculateProgress("25001001")), supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.8 },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Based Smart Agriculture System", progress: calculateProgress("25001002"), status: "On Track", stage: getStage(calculateProgress("25001002")), supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.6 },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain for Academic Credential Verification", progress: calculateProgress("25001003"), status: "At Risk", stage: getStage(calculateProgress("25001003")), supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Dr. Jane Watson", gpa: 3.2 },
    { id: "24002010", name: "Wong Jin Hao", topic: "E-Commerce AI Recommender", progress: calculateProgress("24002010"), status: "Graded", stage: getStage(calculateProgress("24002010")), supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.8, finalScore: 88, finalFeedback: "Excellent technical depth and highly accurate ML model. The documentation was pristine." },
    // Extra students to satisfy Examiner requirement (at least 3 ready to evaluate)
    { id: "25001007", name: "Sarah Connor", topic: "AI Threat Detection System", progress: calculateProgress("25001007"), status: "On Track", stage: getStage(calculateProgress("25001007")), supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.9 },
    { id: "25001008", name: "Bruce Wayne", topic: "Advanced Sonar Mapping Drone", progress: calculateProgress("25001008"), status: "On Track", stage: getStage(calculateProgress("25001008")), supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.7 },
    // Extra unassigned students to allow assignment/reassignment tests
    { id: "25001009", name: "Peter Parker", topic: "Web-Shooter Polymer Analysis", progress: 0, status: "On Track", stage: "Topic Selection", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 3.5 },
    { id: "25001010", name: "Clark Kent", topic: "Global News Analytics Engine", progress: 0, status: "On Track", stage: "Topic Selection", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 3.4 },
    { id: "25001011", name: "Tony Stark", topic: "Arc Reactor Energy Efficiency", progress: 0, status: "On Track", stage: "Topic Selection", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 4.0 },
  ]);

  // 3. Unified Faculty Data
  const [faculty, setFaculty] = useState([
    { id: "F01", name: "Dr. Alan Turing", expertise: "AI, Machine Learning", currentLoad: 6, maxLoad: 8 },
    { id: "F02", name: "Dr. Siti Aminah", expertise: "IoT, Agriculture Tech", currentLoad: 5, maxLoad: 8 },
    { id: "F03", name: "Prof. John Smith", expertise: "Cybersecurity, Blockchain", currentLoad: 0, maxLoad: 6 },
    { id: "F04", name: "Dr. Rajesh Kumar", expertise: "Data Science, NLP", currentLoad: 4, maxLoad: 6 },
  ]);

  // 4. Unified Consultations
  const [consultations, setConsultations] = useState([
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", date: "2026-06-05", time: "10:00", topic: "Proposal Guidance", summary: "Refined the AI model scope.", actionItems: "Submit proposal by next week.", status: "Logged" },
    { id: 2, studentId: "25001001", studentName: "Oliver Smith", date: "2026-07-02", time: "11:30", topic: "SRD Use Cases", summary: "Discussed the 15 functional requirements.", actionItems: "Fix the actor definitions in SRD.", status: "Logged" },
    { id: 3, studentId: "25001001", studentName: "Oliver Smith", date: new Date().toISOString().split('T')[0], time: "14:00", topic: "SDS Architecture", summary: "Reviewed early wireframes.", actionItems: "Prepare ERD diagram.", status: "Upcoming" },
    { id: 4, studentId: "25001002", studentName: "Emma Johnson", date: "2026-07-05", time: "14:00", topic: "Hardware troubleshooting", summary: "Sensor failure issue.", actionItems: "Replace Arduino board.", status: "Logged" }
  ]);

  // 5. Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, userId: "25001001", message: "Reminder: System Design Specification (SDS) is due in 3 days.", date: "2026-07-14", read: false },
    { id: 2, userId: "25001001", message: "Dr. Alan Turing approved your Project Proposal.", date: "2026-06-16", read: true },
    { id: 3, userId: "F01", message: "Oliver Smith has submitted System Requirements Document (SRD) for review.", date: "2026-07-16", read: false }
  ]);

  // 6. Examiner Draft Data (NEW)
  const [evaluationDrafts, setEvaluationDrafts] = useState({});

  // --- ACTIONS ---
  const assignSupervisor = (studentId, facultyId) => {
    const fac = faculty.find(f => f.id === facultyId);
    let oldSupervisorId = null;

    setStudents(prev => prev.map(s => {
      if(s.id === studentId) {
        oldSupervisorId = s.supervisorId;
        return { ...s, supervisorId: fac.id, supervisorName: fac.name, status: "On Track", stage: "Proposal Review" };
      }
      return s;
    }));

    setFaculty(prev => prev.map(f => {
      // Reassignment: decrement old supervisor's load
      if (oldSupervisorId && f.id === oldSupervisorId) {
          return { ...f, currentLoad: Math.max(0, f.currentLoad - 1) };
      }
      // Increment new supervisor's load
      if (f.id === facultyId) {
          return { ...f, currentLoad: f.currentLoad + 1 };
      }
      return f;
    }));
  };

  const addSubmission = (submission) => {
    setSubmissions(prev => [{ ...submission, id: Date.now(), status: "Pending Review", feedback: null }, ...prev]);
    addNotification(submission.supervisorId || "F01", `${submission.studentName} has submitted ${submission.milestone} for review.`);
    
    // Auto-update student progress instantly
    setStudents(prev => prev.map(s => {
      if(s.id === submission.studentId) {
        const newProg = calculateProgress(s.id);
        return { ...s, progress: newProg, stage: getStage(newProg) };
      }
      return s;
    }));
  };

  const gradeSubmission = (id, status, feedback) => {
    setSubmissions(prev => {
      const updated = prev.map(sub => sub.id === id ? { ...sub, status, feedback } : sub);
      
      // Auto-update student progress after grading
      const gradedSub = updated.find(s => s.id === id);
      if(gradedSub && status === 'Approved') {
        setStudents(st => st.map(s => {
          if(s.id === gradedSub.studentId) {
            const approvedCount = updated.filter(u => u.studentId === s.id && u.status === 'Approved').length;
            const computedProg = Math.min(approvedCount * 20, 100);
            return { ...s, progress: computedProg, stage: getStage(computedProg) };
          }
          return s;
        }));
      }
      return updated;
    });
  };

  const saveEvaluationDraft = (studentId, grades) => {
    setEvaluationDrafts(prev => ({ ...prev, [studentId]: grades }));
  };

  const addConsultation = (consultation) => {
    setConsultations(prev => [{ ...consultation, id: Date.now() }, ...prev]);
  };

  const addNotification = (userId, message) => {
    setNotifications(prev => [{ id: Date.now(), userId, message, date: new Date().toISOString().split('T')[0], read: false }, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = (userId) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  };

  return (
    <DataContext.Provider value={{
      students, faculty, submissions, consultations, notifications, evaluationDrafts,
      assignSupervisor, addSubmission, gradeSubmission, addConsultation, markNotificationAsRead, markAllNotificationsAsRead, saveEvaluationDraft
    }}>
      {children}
    </DataContext.Provider>
  );
};