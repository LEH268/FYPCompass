
export const supervisorDashboard = {
    name: "Dr. Wan Siti Nur Aiza",
    stats: {
        activeStudents: 4,
        pendingReviews: 3,
        upcomingMeetings: 2
    },
    actionItems: [
        { id: 1, type: "Proposal Review", student: "Lee Earn Hui", date: "Oct 16, 2026", urgency: "High" },
        { id: 2, type: "SDS Document", student: "Grace Wong Xin En", date: "Nov 08, 2026", urgency: "Medium" },
        { id: 3, type: "Consultation Request", student: "Muhammad Amirul", date: "Nov 10, 2026", urgency: "Low" }
    ],
    students: [
        { id: "25008442", name: "Lee Earn Hui", title: "FYPCompass System", progress: 45, status: "On Track" },
        { id: "24127094", name: "Grace Wong Xin En", title: "AI Image Classifier", progress: 60, status: "Needs Review" },
        { id: "23068810", name: "Muhammad Amirul", title: "IoT Smart Home", progress: 20, status: "Behind Schedule" }
    ]
};