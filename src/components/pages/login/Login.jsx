import { useState } from "react";
import { useNavigate } from "react-router";
import supabaseClient from "../../../utils/supabase";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [notAuth, setNotAuth] = useState(true);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error)
            {
                setNotAuth(false);
                setTimeout(() => {
                setNotAuth(true);
                      } , 3000);
            }
        else if (data){
                setIsAuth(true);
                setTimeout(() => {
                    navigate('/panel');
                  } , 2000);
            }
    }

    return (
        <section className="LandingContainer h-dvh text-white">
            <div className="flex flex-col relative items-center justify-center w-4/5 md:w-auto mt-20 mb-5 py-10 px-16 bg-gray-800 rounded-lg shadow-lg shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
                <div role="alert" className={`${isAuth ? 'block' : 'hidden'} alert alert-success fixed z-10 bottom-5 w-4/5 opacity-100 bg-opacity-80 bg-green-500 text-center`}>
                    <span className="text-gray-200 font-semibold">Éxito, dirigiendo al panel.</span>
                </div>
                <div role="alert" className={`${notAuth ? 'hidden' : 'block'} alert alert-success fixed z-10 bottom-5 w-4/5 opacity-100 bg-opacity-80 bg-red-500 text-center`}>
                    <span className="text-gray-200 font-semibold">Error, credenciales incorrectas.</span>
                </div>
                <h1 className="text-center text-xl font-bold tracking-tight md:text-3xl text-opacity-90 text-white mb-4">
                    Iniciar sesión
                </h1>
                <p className="hidden md:block font-medium text-opacity-70 text-center">
                    Autentícate para acceder al panel 
                </p>
                <p className="hidden md:block font-medium text-opacity-70 text-center">
                de control de nodos, acceso limitado.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="mt-2 md:mt-7" >
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm md:text-base font-semibold text-white text-opacity-90">Correo electrónico</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400 focus:border-blue-400" placeholder="nombre@unl.edu.ec" required/>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="password" className="block mb-2 text-sm md:text-base font-semibold text-white text-opacity-90">Contraseña</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••••" className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400 focus:border-blue-400" required/>
                    </div>
                    <button
                    type="submit"
                    className="btn w-full bg-blue-400 bg-opacity-50 hover:bg-blue-500 text-white text-opacity-95 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-9">Entrar</button>
                    <p className="text-sm font-light text-gray-400 mt-6 text-center">
                        ¿No tienes cuenta? Contáctate con un <a href="mailto:daniel.a.aguinsaca@unl.edu.ec" className="font-medium text-primary-600 hover:underline text-primary-500">administrador</a>.
                    </p>
                </form>
            </div>
        </section>
    );
}

export default LoginPage;