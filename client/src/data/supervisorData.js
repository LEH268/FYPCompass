export const supervisorDashboard = {
    name: "Dr. Alan Turing",
    stats: {
        activeStudents: 6,
        pendingReviews: 2,
        upcomingMeetings: 4
    },
    actionItems: [
        { id: 1, type: "Proposal Review", student: "Oliver Smith", date: "Oct 16, 2026", urgency: "High" },
        { id: 2, type: "SDS Document", student: "Emma Johnson", date: "Nov 08, 2026", urgency: "Medium" },
        { id: 3, type: "Consultation Request", student: "Lucas Brown", date: "Nov 10, 2026", urgency: "Low" }
    ],
    students: [
        { id: "25001001", name: "Oliver Smith", title: "Automated Healthcare Diagnosis Using Deep Learning", progress: 35, status: "On Track" },
        { id: "25001002", name: "Emma Johnson", title: "IoT Based Smart Agriculture System", progress: 60, status: "On Track" },
        { id: "25001003", name: "Lucas Brown", title: "Blockchain for Academic Credential Verification", progress: 15, status: "At Risk" },
        { id: "25001004", name: "Mia Davis", title: "AR Navigation for Campus", progress: 80, status: "On Track" },
        { id: "25001005", name: "Ethan Wilson", title: "Predictive Maintenance using ML", progress: 45, status: "On Track" },
        { id: "25001006", name: "Ava Taylor", title: "Smart Traffic Management", progress: 10, status: "At Risk" }
    ]
};