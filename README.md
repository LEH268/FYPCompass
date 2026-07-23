# FYPCompass

FYPCompass is a Final Year Project (FYP) website to manage the flow of completing FYP for Malaysian private universities. It centralises FYP supervisioninto a single system to address ossies of fragmented mix of email, spreadsheets, and chat tools currently used to manage the FYP process. This is a prototyppe built as part of the BIS2102 Information System Analysis and Design Mini Project.

## Features

FYPCompass supports four user roles, each with a dedicated dashboard and workflow:

- **Student** — Submit and track proposals, view milestone timelines, and log consultation records.
- **Supervisor** — Monitor student progress, review submissions, manage feedback, and log consultations.
- **Coordinator** — Oversee students and supervisors, and manage supervisor–student assignments.
- **Examiner** — View assigned students and submit project evaluations.

## Tech Stack

- **React 19** with **Vite** for the frontend build tooling
- **React Router (HashRouter)** for client-side, role-based routing
- **Tailwind CSS v4** for styling
- **shadcn/ui** and **Base UI** for accessible component primitives
- **Recharts** for data visualisation
- **lucide-react** for icons

## Project Structure

```
FYPCompass/
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── student/         # Dashboard, proposal, milestones, consultations
│   │   │   ├── supervisor/      # Dashboard, student progress, feedback, consultations, settings
│   │   │   ├── coordinator/     # Dashboard, students, supervisors, assignment
│   │   │   └── examiner/        # Dashboard, students, evaluations
│   │   ├── components/layout/   # Navbar, Sidebar, MainLayout
│   │   ├── context/             # DataContext (mock data + state)
│   │   ├── data/                # Static supervisor data
│   │   └── App.jsx              # Route definitions
│   └── package.json
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Other Scripts

```bash
npm run build     # Build for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Roles & Routes

| Role        | Base Route   | Key Pages                                                                 |
|-------------|--------------|-----------------------------------------------------------------------------|
| Student     | `/student`     | Dashboard, Proposal Submission, Milestone Timeline, Consultation Records  |
| Supervisor  | `/supervisor`  | Dashboard, Student Progress, Feedback Management, Consultations, Settings |
| Coordinator | `/coordinator` | Dashboard, Students, Supervisors, Supervisor Assignment                   |
| Examiner    | `/examiner`    | Dashboard, Students, Project Evaluation                                   |

## Roadmap

- [ ] Backend API and database integration
- [ ] Authentication and role-based access control
- [ ] File upload and storage for proposals/reports
- [ ] Notifications for milestone deadlines and feedback

## Academic Context

FYPCompass is developed as a coursework project for **BIS2102**, addressing fragmented FYP supervision tools and MQA audit compliance needs in Malaysian private universities.

## License

This project is for academic purposes as part of BIS2102 Mini Project by:
Lee Earn Hui (25008442)
Grace Wong Xin En (24127094)
Muhammad Amirul Aijaz Bin Nor Azham Hakim (23068810)
