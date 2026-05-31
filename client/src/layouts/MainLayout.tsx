import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useEffect } from 'react';
import { me } from '../features/auth/auth.reducer';
import { useAppDispatch } from '../store/store';

export default function MainLayout() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(me());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
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
