import danielImg from '../../../assets/daniel-aguinsaca.jpeg'
import franklinImg from '../../../assets/franklin_jimenez.jpg'


const Contributors = () => {

    return (
        <section className="ContributorsSection w-full text-gray-400">
            <div className="container px-5 py-24 mx-auto w-4/5">
                <div className="flex flex-col text-center w-full mb-20">
                <div className="h-2 bg-gray-300 rounded overflow-hidden pb-1">
                    <div className="w-2/4 h-full pb-2 bg-blue-400"></div>
                </div>
                <h2 className="pt-10 font-bold title-font text-2xl lg:text-3xl mb-4 text-white opacity-90">Con profesionales a la altura</h2>
                <p className="lg:w-2/3 mx-auto leading-relaxed font-medium text-gray-200 opacity-90 text-base lg:text-lg">Los colaboradores que aportaron, de la mano de <span className="font-extrabold text-sky-200 text-opacity-90">alumnos y maestros.</span></p>
                </div>
                <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img alt="Foto de Daniel Anguinsaca" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={danielImg}/>
                    <div className="flex-grow sm:pl-8">
                        <h3 className="title-font font-bold text-lg text-white">Daniel Aguinsaca Guachanamá</h3>
                        <h4 className="text-gray-100 text-opacity-90 mb-3">Tesista.</h4>
                        <p className="text-gray-300 text-opacity-90 mb-4">Estudiante CIT, promotor principal del proyecto.</p>
                    </div>
                    </div>
                </div>
                <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img alt="Foto de Franklin Jiménez" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={franklinImg}/>
                    <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-bold text-lg text-white">Franklin Jiménez Peralta</h2>
                        <h3 className="text-gray-100 text-opacity-90 mb-3">Mgstr. en Telecomunicaciones.</h3>
                        <p className="text-gray-300 text-opacity-90 mb-4">Docente CIT y tutor de proyectos enfocados en tecnologías IoT.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default Contributors;