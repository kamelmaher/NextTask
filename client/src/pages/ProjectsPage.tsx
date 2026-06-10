import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProjects } from "../features/projects/projects.reducers";
import { ProjectCard } from "../components/ProjectCard";
import Spinner from "../components/Spinner";
import { getCategories } from "../features/category/category.reducer";
import useDebounce from "../hooks/useDebounce";

const ProjectsPage = () => {
    const dispatch = useAppDispatch();

    const { projects, loading } = useAppSelector(state => state.projects)
    const { categories, loading: categoryLoading } = useAppSelector(state => state.category)
    // Filters
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        minPrice: 0,
        maxPrice: 0
    })

    useEffect(() => {
        dispatch(fetchProjects({}));
        dispatch(getCategories())
    }, [dispatch]);

    const debouncedSearch = useDebounce(filters.search, 500);

    useEffect(() => {
        dispatch(fetchProjects({
            ...filters,
            search: debouncedSearch
        }))
    }, [dispatch, debouncedSearch, filters])

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
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />

                {/* Category */}
                {
                    categoryLoading ? <Spinner /> :
                        <select
                            className="border p-2 rounded-md"
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            {
                                categories.length && categories.map(category => (
                                    <option value={category._id} key={category._id}>{category.title}</option>
                                ))
                            }
                        </select>
                }

                {/* Price Range */}
                <div className="flex gap-2 items-center">
                    <p>Min:</p>
                    <input
                        type="number"
                        placeholder="Min"
                        className="border p-2 rounded-md w-full"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: +e.target.value })}
                    />
                    <p>Max:</p>
                    <input
                        type="number"
                        placeholder="Max"
                        className="border p-2 rounded-md w-full"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })}
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <Spinner size="lg" />
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