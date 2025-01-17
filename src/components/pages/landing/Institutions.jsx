import unlPhoto from '../../../assets/unl.jpg'
import citPhoto from '../../../assets/cit.jpg'
import i2tecPhoto from '../../../assets/i2tec_logo.jpg'


const Institutions = () => {
    return (
        <>
        <section className="InstitutionsSection w-full text-gray-300 pt-14">
            <div className="px-5 py-9 lg:py-10 mx-auto w-4/5">
                <div className="h-2 bg-gray-300 rounded overflow-hidden pb-1">
                    <div className="w-2/5 h-full pb-2 bg-blue-400"></div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-wrap sm:flex-row flex-col pb-6 pt-10 mb-12">
                        <h2 className="sm:w-2/5 text-white title-font text-3xl mb-2 sm:mb-0 font-bold opacity-90 lg:text-4xl ">Trabajamos juntos</h2>
                        <p className="sm:w-3/5 leading-relaxed sm:pl-10 pl-0 font-normal text-white opacity-70 text-base lg:text-xl">AmbiNod es un proyecto que nace en la <span className="font-bold">Universidad Nacional de Loja</span>, con apoyo de nuestras instituciones internas.</p>
                    </div>
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center">
                    <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <a href="https://www.unl.edu.ec/" target='_blank'>
                                <img alt="Foto de la UNL" className="object-cover object-center h-full w-full hover:cursor-pointer hover:scale-105 transform transition duration-200" src={unlPhoto}/>
                            </a>
                        </div>
                        <h2 className="text-base lg:text-xl font-extrabold opacity-90 title-font text-white mt-5">Universidad Nacional de Loja</h2>
                        <p className="text-base leading-relaxed mt-2">La primera Universidad en la región sur de Ecuador. Ubicada entre las cinco mejores universidades públicas. <span className="opacity-100 font-bold">¡Educamos para Transformar!</span></p>
                        <a className="text-blue-300 font-bold inline-flex items-center mt-3 hover:cursor-pointer hover:scale-105 transform transition duration-100" href="https://www.unl.edu.ec/" target="_blank">
                            Ir a UNL
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                    <div className="rounded-lg h-64 overflow-hidden">
                    <a href="https://telecomunicaciones.edu.ec/" target="_blank">
                    <img alt="Foto de CIT" className="object-cover object-center h-full w-full hover:cursor-pointer hover:scale-105 transform transition duration-200" src={citPhoto}/>
                       </a>
                    </div>
                    <h2 className=" text-base lg:text-xl font-extrabold opacity-90 title-font text-white mt-5">Carrera de Telecomunicaciones</h2>
                    <p className="text-base leading-relaxed mt-2">En la carrera de Telecomunicaciones se promueve la investigación científica y el uso, desarrollo y aplicación de las <span className="opacity-100 font-bold">tecnologías electrónicas, de información y comunicación.</span></p>
                    <a className="text-blue-300 font-bold inline-flex items-center mt-3 hover:cursor-pointer hover:scale-105 transform transition duration-100" href="https://telecomunicaciones.edu.ec/" target="_blank">Ir a CIT
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    </a>
                </div>
                <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                    <div className="rounded-lg h-64 overflow-hidden">
                    <a href="https://i2tec.ec/" target="_blank">
                    <img alt="Foto de i2TEC" className="object-cover object-center h-full w-full hover:cursor-pointer hover:scale-105 transform transition duration-200" src={i2tecPhoto}/>
                    </a>
                    </div>
                    <h2 className="text-base lg:text-xl font-extrabold opacity-90 title-font text-white mt-5">Centro de Investigación i²TEC</h2>
                    <p className="text-base leading-relaxed mt-2">Centro de estudios y pruebas para la investigación científica y desarrollo de prtotipado afiliado a la <span className="opacity-100 font-bold">Facultad de la Energía de la UNL.</span></p>
                    <a className="text-blue-300 font-bold inline-flex items-center mt-3 hover:cursor-pointer hover:scale-105 transform transition duration-100" href="https://i2tec.ec/" target='_blank'>Ir a i²TEC
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    </a>
                </div>
                </div>
            </div>
        </section>    
        </>
    );
}

export default Institutions;