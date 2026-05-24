import { NavLink, Outlet } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function MainLayout() {

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center space-x-8 space-x-reverse">
                        <span className="text-xl font-bold text-blue-600">NextTask</span>
                        <div className="hidden space-x-6 space-x-reverse md:flex gap-2">
                            <NavLink to="/projects" className="text-sm font-medium text-gray-600 hover:text-blue-600">Find Work</NavLink>
                            <NavLink to="/freelancers" className="text-sm font-medium text-gray-600 hover:text-blue-600">Find Freelancers</NavLink>
                        </div>
                    </div>
                    <div className='flex space-x-4'>
                        <button className="text-gray-600 hover:text-blue-600 text-sm font-medium">Login</button>
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm font-medium">SignUp</button>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
