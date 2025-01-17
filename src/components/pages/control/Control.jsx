import supabaseClient from "../../../utils/supabase";
import { useState, useEffect } from 'react'
import { LogOut, PlusCircle, Trash2, FileSearch, FileDown, AlertTriangle } from 'lucide-react';
import { useNavigate } from "react-router";

const ControlPanelPage = () => {
    const [userEmail, setUserEmail] = useState('admin@unl.edu.ec');
    const navigate = useNavigate();


    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (!error) {
            navigate('/iniciar-sesión');
        }
    }

    useEffect(() => {

        async function getUserInfo() {
            const { data: { user }, error } = await supabaseClient.auth.getUser();
        
            if (!error) {
                setUserEmail(user.email);
            } 
        }

        getUserInfo();

    }, []);
    return (
        <section className="LandingContainer  text-white">
        <main className="w-4/5 pt-28 pb-10 flex flex-col items-center justify-evenly">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 justify-between items-start md:items-center w-full">
                <div className="space-y-2">
                <h1 className="text-xl font-medium mb-3">Bienvenido, <span className="text-cyan-200 font-semibold">{userEmail}</span></h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg p-6 hover:bg-opacity-100 hover:bg-red-500 hover:scale-101 transform transition duration-200"
                >
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                </button>
                </div>
                <div className="bg-yellow-200 border-l-4 rounded-r-md border-yellow-500 p-4 max-w-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        Esta página está en desarrollo y no es completamente funcional.
                    </p>
                    </div>
                </div>
                </div>
            </div>

            <section className="mt-14 w-full">
                <h2 className="text-xl font-semibold mb-4">Administración de Nodos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div className="text-white shadow overflow-hidden sm:rounded-lg bg-gray-800 shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
                    <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium">Agregar Nodo</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-200">Añade un nuevo nodo al sistema</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Agregar Nodo
                    </button>
                    </div>
                </div>
                <div className="text-white shadow overflow-hidden sm:rounded-lg bg-gray-800 shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
                    <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium">Eliminar Nodo</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-200">Elimina un nodo existente</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar Nodo
                    </button>
                    </div>
                </div>
                <div className="text-white shadow overflow-hidden sm:rounded-lg bg-gray-800 shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
                    <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium">Revisar Nodos</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-200">Revisa los nodos existentes</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <FileSearch className="mr-2 h-4 w-4" /> Revisar Nodos
                    </button>
                    </div>
                </div>
                </div>
            </section>

      <section className="mt-14 w-full">
        <h2 className="text-xl font-semibold mb-4">Exportar Información</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-white shadow overflow-hidden sm:rounded-lg bg-gray-800 shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium">Exportar a PDF</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-200">Descarga la información de un nodo en formato PDF</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FileDown className="mr-2 h-4 w-4" /> Exportar a PDF
              </button>
            </div>
          </div>
          <div className="text-white shadow overflow-hidden sm:rounded-lg bg-gray-800 shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium">Exportar a CSV</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-200">Descarga la información de un nodo en formato CSV</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FileDown className="mr-2 h-4 w-4" /> Exportar a CSV
              </button>
            </div>
          </div>
        </div>
      </section>
      </main>
        </section>
    );
}

export default ControlPanelPage;