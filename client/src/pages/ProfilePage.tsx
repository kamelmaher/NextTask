import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import UpdateProfileForm from "../components/UpdateProfileForm";
import Spinner from "../components/Spinner";
import WalletTopUp from "../components/WalletTopUp";
import { Edit3, MapPin, Link as LinkIcon, Calendar, Award, Star, Briefcase, DollarSign, Mail, Shield } from "lucide-react";
import { StatGrid } from "../components/DashboardUi";

export default function ProfilePage() {
    const { user, isAuthenticated, fetchUserLoading, authChecked } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        if (fetchUserLoading || !authChecked) return;
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, fetchUserLoading, authChecked, navigate]);

    if (fetchUserLoading || !authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <StatGrid stats={[
                { label: "Total earned", value: "$128k", delta: "+$8.2k this month" },
                { label: "Jobs done", value: "84" },
                { label: "Repeat clients", value: "62%" },
                { label: "Response time", value: "2h" },
            ]} />

            <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-dark">About</h2>
                <p className="mt-3 leading-7 text-text-body">
                    I'm a senior product designer turned full-stack developer with 9+ years of experience shipping polished digital
                    products for startups and enterprise teams. I specialize in React, Tailwind, and design systems — from initial
                    discovery through delivery and post-launch iteration. I care deeply about craft, communication, and shipping
                    on time.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-dark">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Figma", "Design Systems", "Framer Motion", "Node.js", "PostgreSQL", "Next.js", "Product Strategy"].map((s) => (
                        <span key={s} className="rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary-dark">{s}</span>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-dark">Work history</h2>
                <ul className="mt-4 space-y-4">
                    {[
                        { title: "SaaS marketing site redesign", client: "Sarah Chen", rating: 5, comment: "Elena exceeded expectations. Pixel-perfect, fast, and thoughtful." },
                        { title: "iOS app onboarding flow", client: "Marcus Rivera", rating: 5, comment: "One of the best designers I've worked with. Will hire again." },
                        { title: "Brand identity package", client: "Aiko Tanaka", rating: 4.8, comment: "Beautiful work and great communication throughout." },
                    ].map((w) => (
                        <li key={w.title} className="border-l-2 border-primary-soft pl-4">
                            <p className="font-medium text-text-dark">{w.title}</p>
                            <p className="text-xs text-text-muted">{w.client} · ⭐ {w.rating}</p>
                            <p className="mt-1 text-sm italic text-text-body">"{w.comment}"</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}