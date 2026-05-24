import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import MyProposalsPage from "./pages/MyProposalsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/proposals/:id" element={<MyProposalsPage />} />
            </Route>
        </Routes>
    );
}
