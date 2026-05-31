import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import MyProposalsPage from "./pages/MyProposalsPage";
import ProfileLayout from "./layouts/ProfilLayout";
import ProfilePage from "./pages/ProfilePage";
import PortfolioPage from "./pages/Profile.portfolio";
import ProposalsPage from "./pages/Profile.proposals";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import NewProjectPage from "./pages/Project.new";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<HomePage />} />
                <Route path="/profile" element={<ProfileLayout />}>
                    <Route index element={<ProfilePage />} />
                    <Route path="portfolio" element={<PortfolioPage />} />
                    <Route path="proposals" element={<ProposalsPage />} />
                </Route>
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/project/new" element={<NewProjectPage />} />
                <Route path="/proposals/:id" element={<MyProposalsPage />} />
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Route>
        </Routes>
    );
}
