import { Link } from 'react-router';
import '../../App.css'

/* Componente común, cabecera superior de la aplicación web. */
const Navbar = () => {
    return (
        <>
        <div className="navbar navbar-bg fixed z-10 filter backdrop-blur-sm">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="font-semibold menu menu-md dropdown-content text-white bg-gray-800 bg-opacity-80 rounded-box z-[1] mt-5 w-40 p-2 shadow">
                <li><Link to="/monitor">Monitor</Link></li>
                <li><Link to="/registros">Registros</Link></li>
                <li><Link to="/panel">Panel</Link></li>

            </ul>
            </div>
            <a className="btn btn-ghost text-2xl font-extrabold text-white opacity-80 hover:opacity-100 hover:text-opacity-100 hover:cursor-pointer hover:scale-95 transform transition duration-100"><Link to="/">AmbiNod</Link></a>
        </div>
        <div className="navbar-center hidden lg:flex text-white opacity-70 font-bold">
            <ul className="menu menu-horizontal px-3 text-base">
            <li className='mx-4 hover:text-white hover:text-opacity-100 hover:font-extrabold hover:cursor-pointer hover:scale-105 transform transition duration-100'><Link to="/monitor">Monitor</Link></li>
            <li className='mx-4 hover:text-white hover:text-opacity-100 hover:font-extrabold hover:cursor-pointer hover:scale-105 transform transition duration-100'><Link to="/registros">Registros</Link></li>
            <li className='mx-4 hover:text-white hover:text-opacity-100 hover:font-extrabold hover:cursor-pointer hover:scale-105 transform transition duration-100'><Link to="/panel">Panel</Link></li>
            </ul>
        </div>
        <div className="navbar-end">
            <a href='https://i2tec.ec/' target='_blank' className="btn btn-ghost font-bold text-white opacity-60 hover:bg-blue-400 hover:bg-opacity-20 hover:opacity-100 text-lg  hover:text-opacity-100 hover:cursor-pointer hover:scale-95 transform transition duration-100">
                i²TEC UNL
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffce"><path d="m348-306-42-42 182-182H330v-60h260v260h-60v-158L348-306Zm432-174v-300H480v-60h360v360h-60ZM180-120q-24 0-42-18t-18-42v-660h60v660h660v60H180Z"/></svg>
            </a>
        </div>
        </div>
        </>

    );
}

export default Navbar;
