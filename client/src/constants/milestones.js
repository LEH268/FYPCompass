// src/constants/milestones.js
// SINGLE SOURCE OF TRUTH for the FYP milestone plan.
// Every page must import from here — never redeclare milestone names locally.

export const MILESTONE_PLAN = [
  {
    id: 1,
    title: "Proposal Submission",
    dueDate: "2026-06-20",   // was 2026-10-15 — Oliver submitted 06-15, approved on time
    description: "Initial proposal outlining the FYP scope and objectives.",
  },
  {
    id: 2,
    title: "Business Case",
    dueDate: "2026-07-03",   // was 2026-10-25 — Oliver submitted 06-28
    description: "Justification of project feasibility, cost and expected benefit.",
  },
  {
    id: 3,
    title: "System Requirement Document (SRD)",
    dueDate: "2026-07-18",   // was 2026-11-01 — Oliver submitted 07-16
    description: "Detailed documentation of functional and non-functional requirements.",
  },
  {
    id: 4,
    title: "System Design Specification (SDS)",
    dueDate: "2026-08-07",   // was 2026-11-07 — upcoming, Oliver's is Pending Review
    description: "Architectural design, sequence diagrams, and class diagrams.",
  },
  {
    id: 5,
    title: "System Test Document (STD)",
    dueDate: "2026-09-11",   // was 2026-11-25 — future, Not Submitted
    description: "Test cases, test data and UAT results for the built system.",
  },
  {
    id: 6,
    title: "Final Report",
    dueDate: "2026-10-16",   // was 2026-12-15 — future, Not Submitted
    description: "Complete written report covering all phases of the project.",
  },
  {
    id: 7,
    title: "Viva Presentation",
    dueDate: "2026-11-06",   // was 2026-12-22 — future, Not Submitted
    description: "Demonstration and defence of the system before the examiners.",
  },
];

// Plain name list for <select> dropdowns
export const MILESTONE_NAMES = MILESTONE_PLAN.map((m) => m.title);

export const TOTAL_MILESTONES = MILESTONE_PLAN.length;

// Submission lifecycle statuses (what DataContext stores)
export const SUBMISSION_STATUS = {
  DRAFT: "Draft",
  PENDING: "Pending Review",
  APPROVED: "Approved",
  REVISION: "Revision Required",
};

// Milestone display statuses (what the timeline shows)
export const MILESTONE_STATUS = {
  COMPLETED: "Completed",
  PENDING: "Pending Review",
  REVISION: "Revision Required",
  DRAFT: "Draft",
  NOT_SUBMITTED: "Not Submitted",
};

// Maps a stored submission status → the timeline's display status
export const toMilestoneStatus = (submissionStatus) => {
  switch (submissionStatus) {
    case SUBMISSION_STATUS.APPROVED:
      return MILESTONE_STATUS.COMPLETED;
    case SUBMISSION_STATUS.DRAFT:
      return MILESTONE_STATUS.DRAFT;
    case SUBMISSION_STATUS.REVISION:
      return MILESTONE_STATUS.REVISION;
    case SUBMISSION_STATUS.PENDING:
      return MILESTONE_STATUS.PENDING;
    default:
      return MILESTONE_STATUS.NOT_SUBMITTED;
  }
};

export const formatDueDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const isOverdue = (isoDueDate, status) => {
  if (status === MILESTONE_STATUS.COMPLETED) return false;
  return new Date(isoDueDate + "T23:59:59") < new Date();
};

export const daysUntilDue = (isoDueDate) => {
  const diff = new Date(isoDueDate + "T00:00:00") - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const FILE_RULES = {
  ALLOWED_EXTENSIONS: ["pdf", "doc", "docx", "zip"],
  ALLOWED_MIME_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",
  ],
  MAX_FILE_SIZE: 50 * 1024 * 1024,
  ACCEPT_ATTR: ".pdf,.doc,.docx,.zip",
};

export const MIN_DESCRIPTION_LENGTH = 10;

export const CURRENT_STUDENT = {
  id: "25001001",
  name: "Oliver Smith",
};