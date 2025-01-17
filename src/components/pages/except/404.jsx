import { Link } from "react-router";
import { OctagonAlert } from "lucide-react";

const NotFoundPage = () => {
    return (
        <>
        <div className="LandingContainer h-dvh text-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto w-4/5 px-4 md:px-8">
                <div className="flex flex-col items-center mt-8">
                <OctagonAlert className="w-16 h-16 text-white text-opacity-85 mb-5"/>
                <p className="mb-6 inline-flex items-center gap-2.5 text-3xl font-semibold text-white text-opacity-85 md:text-5xl" aria-label="logo">
                    AmbiNod
                </p>
                <h1 className="mb-2 text-center text-2xl font-semibold text-gray-400 md:text-3xl">Página no encontrada</h1>
                <p className="mb-12 max-w-screen-md text-center font-medium text-gray-400 md:text-lg">La página que buscas no existe.</p>
                <a className="inline-block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-gray-200 outline-none ring-indigo-300 transition duration-200 hover:bg-gray-800 focus-visible:ring md:text-base border-gray-700 hover:border-gray-800 border-2"><Link to="/">Ir a inicio</Link></a>
                </div>
            </div>
        </div>
        </>
    );
}

export default NotFoundPage;