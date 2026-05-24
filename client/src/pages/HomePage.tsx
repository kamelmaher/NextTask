import ProjectCard from '../components/ProjectCard';
import { projects } from "../data/products"
export const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-blue-900 py-20 text-white">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h1 className="mb-6 text-4xl font-extrabold md:text-5xl tracking-tight">Title</h1>
                    <p className="mb-8 text-lg text-blue-100">Sub Title</p>

                    <div className="mx-auto flex max-w-2xl overflow-hidden rounded-lg bg-white p-2 shadow-lg items-center">
                        <select className="border-none bg-transparent px-4 text-gray-700 focus:outline-none text-sm">
                            <option>Projects</option>
                            <option>Freelancers</option>
                        </select>
                        <input type="text" placeholder="Find Freelancers" className="w-full px-4 py-3 text-gray-800 focus:outline-none text-sm" />
                        <button className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 text-sm shrink-0">Search</button>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Latest Projects</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </div>
    );
};

