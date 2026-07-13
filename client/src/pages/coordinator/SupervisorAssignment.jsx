import { useState } from "react";
import { Users, AlertCircle, CheckCircle } from "lucide-react";

export default function SupervisorAssignment() {
    const [assigned, setAssigned] = useState(false);

    // Mock data for unassigned students
    const unassignedStudents = [
        { id: "25011223", name: "Ahmad Bin Ali", title: "Blockchain Voting System", preferred: "Dr. Alan Turing" },
        { id: "24099881", name: "Sarah Lee", title: "E-Commerce Chatbot", preferred: "None" }
    ];

    // Mock data for supervisor capacity
    const supervisors = [
        { id: 1, name: "Dr. Wan Siti Nur Aiza", capacity: "4/8" },
        { id: 2, name: "Dr. Alan Turing", capacity: "8/8" }, // Full capacity
        { id: 3, name: "Prof. Grace Hopper", capacity: "2/6" }
    ];

    const handleAssign = (e) => {
        e.preventDefault();
        setAssigned(true);
        setTimeout(() => setAssigned(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Supervisor Assignment</h1>
                <p className="text-gray-500">Allocate available supervisors to students with pending proposals.</p>
            </div>

            {assigned && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-2 border border-green-200">
                    <CheckCircle size={20} /> Supervisor assigned successfully!
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Student</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Project Title</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Preferred</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Assign Supervisor</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {unassignedStudents.map((student, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-800">{student.name}</p>
                                    <p className="text-sm text-gray-500">{student.id}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-700 text-sm">{student.title}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{student.preferred}</td>
                                <td className="px-6 py-4">
                                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                                        <option value="">Select Supervisor...</option>
                                        {supervisors.map(sup => (
                                            <option key={sup.id} value={sup.id} disabled={sup.capacity.startsWith("8")}>
                                                {sup.name} (Load: {sup.capacity}) {sup.capacity.startsWith("8") ? "- FULL" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={handleAssign} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 font-medium">
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}