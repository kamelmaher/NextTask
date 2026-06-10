import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import ProfileLayout from "./layouts/ProfilLayout";
import ProfilePage from "./pages/ProfilePage";
import PortfolioPage from "./pages/Profile.portfolio";
import ProposalsPage from "./pages/Profile.proposals";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import NewProjectPage from "./pages/Project.new";
import PortfolioItem from "./pages/PortfolioItem";
import PortfolioNewPage from "./pages/Portfolio.new";
import UserProjects from "./pages/Profile.projects";
import ContractPage from "./pages/ContractPage";
import PostedProjects from "./pages/Profile.PostedProjects";
import AdminLayout from "./layouts/AdminLayout";
import DashboardUsers from "./pages/Admin/DashboardUsers";
import DashboardProjects from "./pages/Admin/DashboardProjects";
import DashboardContracts from "./pages/Admin/DashboardContracts";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<HomePage />} />

                {/* Profile */}
                <Route path="/profile" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
                    <Route index element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="portfolio" element={<PortfolioPage />} />
                    <Route path="proposals" element={<ProposalsPage />} />
                    <Route path="projects" element={<UserProjects />} />
                    <Route path="posted" element={<PostedProjects />} />
                </Route>

                {/* Portfolio */}
                <Route path="/portfolio/new" element={<PortfolioNewPage />} />
                <Route path="/portfolio/new/:id" element={<PortfolioNewPage />} />
                <Route path="/portfolio/item/:id" element={<PortfolioItem />} />

                {/* Projects */}
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/project/new" element={<ProtectedRoute><NewProjectPage /></ProtectedRoute>} />

                {/* contract */}
                <Route path="/contract/:id" element={<ProtectedRoute><ContractPage /></ProtectedRoute>} />

                {/* Dashboard */}
                <Route path="/admin" element={<ProtectedRoute forAdmin={true}><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<DashboardProjects />} />
                    <Route path="projects" element={<DashboardProjects />} />
                    <Route path="users" element={<DashboardUsers />} />
                    <Route path="contracts" element={<DashboardContracts />} />
                </Route>

                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Route>
        </Routes>
    );
}
