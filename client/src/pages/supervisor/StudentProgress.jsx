import { supervisorDashboard } from "../../data/supervisorData";
import ProgressBar from "../../components/ProgressBar";
import { Search } from "lucide-react";

export default function StudentProgress() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Student Progress</h1>
                    <p className="text-gray-500">Monitor and evaluate your assigned FYP students.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search student..." 
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                </div>
            </div>

            {/* Student List Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Student Name / ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Project Title</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 w-1/4">Overall Progress</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {supervisorDashboard.students.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-800">{student.name}</p>
                                    <p className="text-sm text-gray-500">{student.id}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{student.title}</td>
                                <td className="px-6 py-4">
                                    <ProgressBar progress={student.progress} />
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        student.status === 'On Track' ? 'bg-green-100 text-green-700' :
                                        student.status === 'Needs Review' ? 'bg-orange-100 text-orange-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {student.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 font-medium hover:underline">
                                        View Details
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