import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../components/ProfileSidebar";


export default function ProfileLayout() {
    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-3">
                        <ProfileSidebar />
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
