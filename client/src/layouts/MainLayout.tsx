import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold text-blue-600">NextTask</h1>

                    <div className="flex gap-4 text-sm">
                        <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
                        <NavLink to="/projects" className="hover:text-blue-600">Projects</NavLink>
                        <NavLink to="/profile" className="hover:text-blue-600">Profile</NavLink>
                    </div >
                </div >
            </nav >

            <main>
                <Outlet />
            </main>

            <footer className="bg-white mt-10">
                <div className="max-w-6xl mx-auto p-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} NextTask. All rights reserved.
                </div>
            </footer>
        </div >
    );
}
