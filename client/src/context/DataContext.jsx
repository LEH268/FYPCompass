// src/context/DataContext.jsx
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // 1. Unified Students Data
  const [students, setStudents] = useState([
    { id: "25001001", name: "Oliver Smith", topic: "Automated Healthcare Diagnosis Using Deep Learning", progress: 35, status: "On Track", stage: "Proposal Review", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.8 },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Based Smart Agriculture System", progress: 60, status: "On Track", stage: "System Design", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.6 },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain for Academic Credential Verification", progress: 15, status: "At Risk", stage: "Topic Selection", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Dr. Jane Watson", gpa: 3.2 },
    { id: "25001004", name: "Mia Davis", topic: "AR Navigation for Campus", progress: 80, status: "On Track", stage: "Final Development", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Dr. Jane Watson", gpa: 3.9 },
    { id: "25001005", name: "Ethan Wilson", topic: "Predictive Maintenance using ML", progress: 45, status: "On Track", stage: "System Design", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.5 },
    { id: "25001006", name: "Ava Taylor", topic: "Smart Traffic Management", progress: 10, status: "At Risk", stage: "Topic Selection", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Pending", gpa: 3.1 },
    { id: "25001007", name: "Ahmad bin Yusuf", topic: "Halal Supply Chain Tracker", progress: 50, status: "On Track", stage: "System Design", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.4 },
    { id: "25001008", name: "Priya Sharma", topic: "Tamil Sentiment Analysis AI", progress: 70, status: "On Track", stage: "Development", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Dr. Jane Watson", gpa: 3.7 },
    { id: "25001009", name: "Tan Wei Jie", topic: "Fintech Fraud Detection", progress: 0, status: "Unassigned", stage: "Pending Supervisor", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 3.5 },
    { id: "24002010", name: "Wong Jin Hao", topic: "E-Commerce AI Recommender", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.8, finalScore: 88, finalFeedback: "Excellent technical depth and highly accurate ML model. The documentation was pristine." },
    { id: "24002011", name: "Siti Aishah", topic: "Smart Parking System using Computer Vision", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.6, finalScore: 76, finalFeedback: "Good prototype, though the lighting edge cases in the CV model could have been handled better." }
  ]);

  // 2. Unified Faculty Data
  const [faculty, setFaculty] = useState([
    { id: "F01", name: "Dr. Alan Turing", expertise: "AI, Machine Learning", currentLoad: 6, maxLoad: 8 },
    { id: "F02", name: "Dr. Siti Aminah", expertise: "IoT, Agriculture Tech", currentLoad: 5, maxLoad: 8 },
    { id: "F03", name: "Prof. John Smith", expertise: "Cybersecurity, Blockchain", currentLoad: 0, maxLoad: 6 },
    { id: "F04", name: "Dr. Rajesh Kumar", expertise: "Data Science, NLP", currentLoad: 4, maxLoad: 6 },
    { id: "F05", name: "Dr. Wei Chen", expertise: "Computer Vision, AR/VR", currentLoad: 4, maxLoad: 6 }
  ]);

  // 3. Unified Submissions & Feedback
  const [submissions, setSubmissions] = useState([
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", milestone: "Project Proposal", file: "FYP_Proposal_v2.pdf", status: "Approved", date: "2026-06-15", studentMessage: "Hi Dr, here is the updated proposal taking into account the new ML dataset.", feedback: "The project idea is relevant. Approved to proceed." },
    { id: 2, studentId: "25001001", studentName: "Oliver Smith", milestone: "System Requirements Document (SRD)", file: "SRD_Oliver.docx", status: "Pending Review", date: "2026-07-16", studentMessage: "I have mapped out all 15 use cases we discussed.", feedback: null },
    { id: 3, studentId: "25001002", studentName: "Emma Johnson", milestone: "System Design Spec", file: "SDS_Draft_1.docx", status: "Revision Required", date: "2026-07-10", studentMessage: "Draft 1 of the architecture.", feedback: "Please fix the ERD, your cardinality is wrong." }
  ]);

  // 4. Unified Consultations
  const [consultations, setConsultations] = useState([
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", date: new Date().toISOString().split('T')[0], time: "10:00", topic: "SRD Review", summary: "Reviewed Use Cases.", actionItems: "Proceed to SDS.", status: "Logged" },
    { id: 2, studentId: "25001002", studentName: "Emma Johnson", date: new Date().toISOString().split('T')[0], time: "14:00", topic: "Hardware troubleshooting", summary: "Sensor failure issue.", actionItems: "Replace Arduino board.", status: "Upcoming" }
  ]);

  // 5. Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, userId: "25001001", message: "Reminder: System Design Specification (SDS) is due in 3 days.", date: "2026-07-14", read: false },
    { id: 2, userId: "25001001", message: "Dr. Alan Turing approved your Project Proposal.", date: "2026-06-16", read: true },
    { id: 3, userId: "F01", message: "Oliver Smith has submitted System Requirements Document (SRD) for review.", date: "2026-07-16", read: false },
    { id: 4, userId: "F01", message: "Meeting reminder: Consultation with Emma Johnson at 14:00 today.", date: new Date().toISOString().split('T')[0], read: false },
    { id: 5, userId: "C01", message: "Warning: 3 students have missed their Proposal submission deadline.", date: "2026-07-10", read: false },
    { id: 6, userId: "E01", message: "You have 2 new final reports pending your evaluation.", date: "2026-07-15", read: false }
  ]);

  // --- ACTIONS ---
  const assignSupervisor = (studentId, facultyId) => {
    const fac = faculty.find(f => f.id === facultyId);
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, supervisorId: fac.id, supervisorName: fac.name, status: "On Track", stage: "Proposal Review" } : s));
    setFaculty(prev => prev.map(f => f.id === facultyId ? { ...f, currentLoad: f.currentLoad + 1 } : f));
  };

  const addSubmission = (submission) => {
    setSubmissions(prev => [{ ...submission, id: Date.now(), status: "Pending Review", feedback: null }, ...prev]);
    // Notify supervisor
    addNotification(submission.supervisorId || "F01", `${submission.studentName} has submitted ${submission.milestone} for review.`);
  };

  const gradeSubmission = (id, status, feedback) => {
    setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status, feedback } : sub));
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
      students, faculty, submissions, consultations, notifications,
      assignSupervisor, addSubmission, gradeSubmission, addConsultation, markNotificationAsRead, markAllNotificationsAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};