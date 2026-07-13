import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; 
import { Outlet } from "react-router-dom";

export default function Layout({ role }) {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar role={role} />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar role={role} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}