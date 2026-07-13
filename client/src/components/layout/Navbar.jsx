export default function Navbar({ role }) {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
            <h2 className="text-xl font-semibold">
                {role} Dashboard
            </h2>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-medium">User Name</p>
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
                
                {/* User Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    U
                </div>
            </div>
        </header>
    );
}