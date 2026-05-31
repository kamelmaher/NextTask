import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProjects } from "../features/projects/projects.reducers";
import { ProjectCard } from "../components/ProjectCard";

const ProjectsPage = () => {
    const dispatch = useAppDispatch();

    const { projects, loading } = useAppSelector(state => state.projects)

    // Filters
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    // Filter logic (frontend filtering)
    // const filteredProjects = useMemo(() => {
    //     return projects
    //         .filter((project) => {
    //             const matchSearch =
    //                 project.title.toLowerCase().includes(search.toLowerCase()) ||
    //                 project.desc.toLowerCase().includes(search.toLowerCase());

    //             // const matchType = type ? project.type === type : true;

    //             // const matchCategory = category
    //             //     ? project.category?._id === category
    //             //     : true;

    //             const matchMin =
    //                 minPrice !== "" ? project.minPrice >= Number(minPrice) : true;

    //             const matchMax =
    //                 maxPrice !== "" ? project.maxPrice <= Number(maxPrice) : true;

    //             return matchSearch && matchMin && matchMax;
    //         })
    //         .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    // }, [projects, search, minPrice, maxPrice]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-4">Projects</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="border p-2 rounded-md md:col-span-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Type */}
                <select
                    className="border p-2 rounded-md"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="fixed">Fixed</option>
                    <option value="hourly">Hourly</option>
                </select>

                {/* Category */}
                <select
                    className="border p-2 rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {/* replace with your dynamic categories from redux if available */}
                </select>

                {/* Price Range */}
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="border p-2 rounded-md w-full"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value ? Number(e.target.value) : "")
                        }
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="border p-2 rounded-md w-full"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value ? Number(e.target.value) : "")
                        }
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <p>Loading...</p>
            ) : projects.length === 0 ? (
                <p className="text-gray-500">No projects found</p>
            ) : (
                <div className="grid grid-cols-1  gap-4">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;