// src/context/DataContext.jsx
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // 1. Unified Students Data
  const [students, setStudents] = useState([
    // Active Students for Dr. Alan Turing (F01) - 6 Students
    { id: "25001001", name: "Oliver Smith", topic: "Automated Healthcare Diagnosis Using Deep Learning", progress: 35, status: "On Track", stage: "Proposal Review", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.8 },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Based Smart Agriculture System", progress: 60, status: "On Track", stage: "System Design", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.6 },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain for Academic Credential Verification", progress: 15, status: "At Risk", stage: "Topic Selection", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Dr. Jane Watson", gpa: 3.2 },
    { id: "25001004", name: "Mia Davis", topic: "AR Navigation for Campus", progress: 80, status: "On Track", stage: "Final Development", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Dr. Jane Watson", gpa: 3.9 },
    { id: "25001005", name: "Ethan Wilson", topic: "Predictive Maintenance using ML", progress: 45, status: "On Track", stage: "System Design", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Prof. John Smith", gpa: 3.5 },
    { id: "25001006", name: "Ava Taylor", topic: "Smart Traffic Management", progress: 10, status: "At Risk", stage: "Topic Selection", supervisorId: "F01", supervisorName: "Dr. Alan Turing", examinerName: "Pending", gpa: 3.1 },
    
    // Other Active Students
    { id: "25001007", name: "Ahmad bin Yusuf", topic: "Halal Supply Chain Tracker", progress: 50, status: "On Track", stage: "System Design", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.4 },
    { id: "25001008", name: "Priya Sharma", topic: "Tamil Sentiment Analysis AI", progress: 70, status: "On Track", stage: "Development", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Dr. Jane Watson", gpa: 3.7 },
    { id: "25001009", name: "Tan Wei Jie", topic: "Fintech Fraud Detection", progress: 0, status: "Unassigned", stage: "Pending Supervisor", supervisorId: null, supervisorName: "Unassigned", examinerName: "Pending", gpa: 3.5 },

    // 12 Completed Students for Prof. John Smith (Examiner)
    { id: "24002010", name: "Wong Jin Hao", topic: "E-Commerce AI Recommender", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.8, finalScore: 88, finalFeedback: "Excellent technical depth and highly accurate ML model. The documentation was pristine." },
    { id: "24002011", name: "Siti Aishah", topic: "Smart Parking System using Computer Vision", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.6, finalScore: 76, finalFeedback: "Good prototype, though the lighting edge cases in the CV model could have been handled better." },
    { id: "24002012", name: "Arjun Nair", topic: "Fake News Detection on Social Media", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F05", supervisorName: "Dr. Wei Chen", examinerName: "Prof. John Smith", gpa: 3.4, finalScore: 82, finalFeedback: "Solid NLP implementation. Presentation was exceptionally clear and well-structured." },
    { id: "24002013", name: "Lee Zhi Ying", topic: "Hospital Resource Blockchain", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.9, finalScore: 91, finalFeedback: "Outstanding work on smart contracts. Publication-worthy research." },
    { id: "24002014", name: "Muhammad Faizal", topic: "IoT Flood Monitoring System", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.3, finalScore: 72, finalFeedback: "Hardware integration was successful, but the mobile app interface needs UX improvements." },
    { id: "24002015", name: "Kavitha Murugan", sign: "Sign Language to Text Translator", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F05", supervisorName: "Dr. Wei Chen", examinerName: "Prof. John Smith", gpa: 3.7, finalScore: 85, finalFeedback: "Very impactful project. The latency in translation is minimal and highly impressive." },
    { id: "24002016", name: "Tan Xin Yi", topic: "AR Restaurant Menu Application", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.2, finalScore: 68, finalFeedback: "The AR markers occasionally fail to track, but the overall system logic is sound." },
    { id: "24002017", name: "Nur Atiqah", topic: "Dengue Outbreak Prediction ML", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.8, finalScore: 89, finalFeedback: "Rigorous statistical analysis. The dataset preprocessing was handled perfectly." },
    { id: "24002018", name: "Ravi Kumar", topic: "Smart Grid Load Balancing AI", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F05", supervisorName: "Dr. Wei Chen", examinerName: "Prof. John Smith", gpa: 3.5, finalScore: 78, finalFeedback: "Good algorithmic approach, but the report lacked detailed testing methodologies." },
    { id: "24002019", name: "Goh Jun Hui", topic: "Cryptocurrency Arbitrage Tracker", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F02", supervisorName: "Dr. Siti Aminah", examinerName: "Prof. John Smith", gpa: 3.1, finalScore: 65, finalFeedback: "Basic implementation. Missing real-time WebSocket connections as promised in the proposal." },
    { id: "24002020", name: "Farah Nadiah", topic: "Mental Health Support Chatbot", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F04", supervisorName: "Dr. Rajesh Kumar", examinerName: "Prof. John Smith", gpa: 3.9, finalScore: 94, finalFeedback: "Exceptional ethical considerations and robust dialogue tree mapping. Brilliant execution." },
    { id: "24002021", name: "Darren Yap", topic: "Voice Biometric Authentication", progress: 100, status: "Graded", stage: "Completed", supervisorId: "F05", supervisorName: "Dr. Wei Chen", examinerName: "Prof. John Smith", gpa: 3.6, finalScore: 81, finalFeedback: "The neural net architecture is well-designed. Good handling of background noise filtering." }
  ]);

  // 2. Unified Faculty Data
  const [faculty, setFaculty] = useState([
    { id: "F01", name: "Dr. Alan Turing", expertise: "AI, Machine Learning", currentLoad: 6, maxLoad: 8 },
    { id: "F02", name: "Dr. Siti Aminah", expertise: "IoT, Agriculture Tech", currentLoad: 5, maxLoad: 8 },
    { id: "F03", name: "Prof. John Smith", expertise: "Cybersecurity, Blockchain", currentLoad: 0, maxLoad: 6 }, // Mostly acts as Examiner
    { id: "F04", name: "Dr. Rajesh Kumar", expertise: "Data Science, NLP", currentLoad: 4, maxLoad: 6 },
    { id: "F05", name: "Dr. Wei Chen", expertise: "Computer Vision, AR/VR", currentLoad: 4, maxLoad: 6 }
  ]);

  // 3. Unified Submissions & Feedback
  const [submissions, setSubmissions] = useState([
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", milestone: "Project Proposal", file: "FYP_Proposal_v2.pdf", status: "Approved", date: "2026-06-15", studentMessage: "Hi Dr, here is the updated proposal taking into account the new ML dataset.", feedback: "The project idea is relevant. Approved to proceed." },
    { id: 2, studentId: "25001001", studentName: "Oliver Smith", milestone: "System Requirements Document (SRD)", file: "SRD_Oliver.docx", status: "Pending Review", date: "2026-07-16", studentMessage: "I have mapped out all 15 use cases we discussed.", feedback: null },
    { id: 3, studentId: "25001002", studentName: "Emma Johnson", milestone: "System Design Spec", file: "SDS_Draft_1.docx", status: "Revision Required", date: "2026-07-10", studentMessage: "Draft 1 of the architecture.", feedback: "Please fix the ERD, your cardinality is wrong." },
    // Mocking past submissions for a completed student to show history
    { id: 4, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Project Proposal", file: "Proposal.pdf", status: "Approved", date: "2025-08-10", studentMessage: "Initial proposal.", feedback: "Approved." },
    { id: 5, studentId: "24002010", studentName: "Wong Jin Hao", milestone: "Final Report", file: "Final_Thesis_Wong.pdf", status: "Graded", date: "2026-05-20", studentMessage: "Final submission for examiner.", feedback: "Sent to examiner." }
  ]);

  // 4. Unified Consultations
  const [consultations, setConsultations] = useState([
    // 4 Meetings "This Week" for Dr. Alan Turing
    { id: 1, studentId: "25001001", studentName: "Oliver Smith", date: new Date().toISOString().split('T')[0], time: "10:00", topic: "SRD Review", summary: "Reviewed Use Cases.", actionItems: "Proceed to SDS.", status: "Logged" },
    { id: 2, studentId: "25001002", studentName: "Emma Johnson", date: new Date().toISOString().split('T')[0], time: "14:00", topic: "Hardware troubleshooting", summary: "Sensor failure issue.", actionItems: "Replace Arduino board.", status: "Upcoming" },
    { id: 3, studentId: "25001004", studentName: "Mia Davis", date: "2026-07-18", time: "11:30", topic: "AR Marker Testing", summary: "Testing lighting conditions.", actionItems: "Optimize contrast.", status: "Upcoming" },
    { id: 4, studentId: "25001005", studentName: "Ethan Wilson", date: "2026-07-19", time: "09:00", topic: "Dataset Cleaning", summary: "Handling null values.", actionItems: "Apply mean imputation.", status: "Upcoming" },
    // Historical Consultations for Examiner to view
    { id: 5, studentId: "24002010", studentName: "Wong Jin Hao", date: "2026-01-15", time: "10:00", topic: "Algorithm optimization", summary: "Discussed Big O notation.", actionItems: "Refactor loop.", status: "Logged" },
    { id: 6, studentId: "24002010", studentName: "Wong Jin Hao", date: "2026-03-22", time: "14:00", topic: "Draft Review", summary: "Chapter 4 checking.", actionItems: "Fix citations.", status: "Logged" }
  ]);

  // --- ACTIONS ---
  const assignSupervisor = (studentId, facultyId) => {
    const fac = faculty.find(f => f.id === facultyId);
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, supervisorId: fac.id, supervisorName: fac.name, status: "On Track", stage: "Proposal Review" } : s));
    setFaculty(prev => prev.map(f => f.id === facultyId ? { ...f, currentLoad: f.currentLoad + 1 } : f));
  };

  const addSubmission = (submission) => {
    setSubmissions(prev => [{ ...submission, id: Date.now(), status: "Pending Review", feedback: null }, ...prev]);
  };

  const gradeSubmission = (id, status, feedback) => {
    setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status, feedback } : sub));
  };

  const addConsultation = (consultation) => {
    setConsultations(prev => [{ ...consultation, id: Date.now() }, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      students, faculty, submissions, consultations,
      assignSupervisor, addSubmission, gradeSubmission, addConsultation
    }}>
      {children}
    </DataContext.Provider>
  );
};