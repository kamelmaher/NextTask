export type Project = {
    id: string;
    title: string;
    description: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    pricingType: "Fixed Price" | "Hourly Rate";
    postedAt: string;
    tags: string[];
    client: { name: string; rating: number; jobsPosted: number };
};

export type Proposal = {
    id: string;
    projectId: string;
    projectTitle: string;
    freelancer: { name: string; title: string; initials: string };
    bid: number;
    coverLetter: string;
    submittedAt: string;
    status: "Under Review" | "Interviewing" | "Accepted" | "Declined";
};

export type PortfolioItem = {
    id: string;
    title: string;
    category: string;
    year: number;
    cover: string;
};

export const currentUser = {
    firstName: "Alex",
    lastName: "Sterling",
    email: "alex.sterling@nextstack.io",
    mobile: "+1 (415) 555-0142",
    title: "Senior Fullstack Developer",
    category: "Development",
    balance: 4250.0,
    pendingEarnings: 1820,
    successRate: 98,
    profileViews: 128,
    initials: "AS",
};

export const recommendedProjects: Project[] = [
    {
        id: "p-1001",
        title: "Fintech Dashboard & API Integration",
        description:
            "Looking for an expert developer to build a secure dashboard for a neo-banking platform. Requires deep knowledge of React, Node.js and high-security API patterns. Long-term partnership possible for the right talent.",
        category: "Development",
        minPrice: 3500,
        maxPrice: 5000,
        pricingType: "Fixed Price",
        postedAt: "2 hours ago",
        tags: ["TypeScript", "PostgreSQL", "Next.js"],
        client: { name: "Northwind Capital", rating: 4.9, jobsPosted: 24 },
    },
    {
        id: "p-1002",
        title: "AI-Powered Content Generator Tool",
        description:
            "Seeking a senior engineer to integrate OpenAI's latest models into a custom SaaS workflow. Must have experience with vector databases and prompt engineering.",
        category: "Artificial Intelligence",
        minPrice: 60,
        maxPrice: 85,
        pricingType: "Hourly Rate",
        postedAt: "5 hours ago",
        tags: ["Python", "LangChain", "OpenAI"],
        client: { name: "Lumen Labs", rating: 4.7, jobsPosted: 12 },
    },
    {
        id: "p-1003",
        title: "Design System Migration to shadcn/ui",
        description:
            "Refactor an existing component library into a maintainable shadcn-based design system. Strong eye for spacing, motion, and accessibility required.",
        category: "Development",
        minPrice: 2200,
        maxPrice: 3800,
        pricingType: "Fixed Price",
        postedAt: "Yesterday",
        tags: ["React", "Tailwind", "Radix"],
        client: { name: "Helix Studio", rating: 4.8, jobsPosted: 7 },
    },
];

export const projectProposals: Proposal[] = [
    {
        id: "pr-01",
        projectId: "p-1001",
        projectTitle: "Fintech Dashboard & API Integration",
        freelancer: { name: "Elias Thorne", title: "Senior Fullstack", initials: "ET" },
        bid: 4200,
        coverLetter:
            "I've shipped two neo-banking dashboards in the last 18 months. I can deliver a hardened auth flow and core ledger views in 4 weeks.",
        submittedAt: "1 hour ago",
        status: "Under Review",
    },
    {
        id: "pr-02",
        projectId: "p-1001",
        projectTitle: "Fintech Dashboard & API Integration",
        freelancer: { name: "Sarah Kim", title: "React Engineer", initials: "SK" },
        bid: 3800,
        coverLetter:
            "Specialist in financial UIs — I focus on perf and correctness. Happy to share a private case study from a Series B fintech.",
        submittedAt: "3 hours ago",
        status: "Interviewing",
    },
    {
        id: "pr-03",
        projectId: "p-1001",
        projectTitle: "Fintech Dashboard & API Integration",
        freelancer: { name: "Marcus Chen", title: "Fullstack Architect", initials: "MC" },
        bid: 4900,
        coverLetter:
            "Architecture-first approach. I'd propose a thin BFF layer to keep your client bundle lean and your API surface explicit.",
        submittedAt: "Yesterday",
        status: "Under Review",
    },
];

export const myProposals: Proposal[] = [
    {
        id: "mp-01",
        projectId: "p-2001",
        projectTitle: "Real-time Analytics Engine",
        freelancer: { name: currentUser.firstName, title: currentUser.title, initials: currentUser.initials },
        bid: 2200,
        coverLetter: "Built three real-time pipelines in the last year — happy to walk through the architecture.",
        submittedAt: "Mar 12, 2024",
        status: "Under Review",
    },
    {
        id: "mp-02",
        projectId: "p-2002",
        projectTitle: "HealthTech Brand Identity",
        freelancer: { name: currentUser.firstName, title: currentUser.title, initials: currentUser.initials },
        bid: 1500,
        coverLetter: "Strong product sensibility on top of engineering — I can bridge design and dev.",
        submittedAt: "Mar 08, 2024",
        status: "Interviewing",
    },
    {
        id: "mp-03",
        projectId: "p-2003",
        projectTitle: "Internal Tooling Refresh",
        freelancer: { name: currentUser.firstName, title: currentUser.title, initials: currentUser.initials },
        bid: 3400,
        coverLetter: "Specialized in cleaning up legacy admin panels into composable, fast workflows.",
        submittedAt: "Feb 28, 2024",
        status: "Accepted",
    },
];

export const portfolioItems: PortfolioItem[] = [
    { id: "pi-1", title: "Solaris Energy App", category: "Product Design", year: 2023, cover: "linear-gradient(135deg,#fef3c7,#fde68a)" },
    { id: "pi-2", title: "Nova Crypto Wallet", category: "Mobile Development", year: 2024, cover: "linear-gradient(135deg,#ddd6fe,#c4b5fd)" },
    { id: "pi-3", title: "E-commerce Core v2", category: "Backend Architecture", year: 2023, cover: "linear-gradient(135deg,#bae6fd,#7dd3fc)" },
    { id: "pi-4", title: "Helix Design System", category: "Design Engineering", year: 2024, cover: "linear-gradient(135deg,#fbcfe8,#f9a8d4)" },
    { id: "pi-5", title: "Pulse Fitness iOS", category: "Mobile App", year: 2022, cover: "linear-gradient(135deg,#bbf7d0,#86efac)" },
    { id: "pi-6", title: "Atlas Logistics Dashboard", category: "SaaS Web App", year: 2023, cover: "linear-gradient(135deg,#e9d5ff,#d8b4fe)" },
];

export function getProjectById(id: string): Project | undefined {
    return recommendedProjects.find((p) => p.id === id);
}

export function getProposalsForProject(id: string): Proposal[] {
    return projectProposals.filter((p) => p.projectId === id);
}
