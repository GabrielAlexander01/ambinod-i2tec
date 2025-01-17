

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadFireflyPreset} from "@tsparticles/preset-firefly";
import HeroBg from '../../../assets/seasonBg.svg';
import { Link } from "react-router";

const Hero = () => {
  const [init, setInit] = useState(false);
  
  const scrollToSection = () => {
      const targetSection = document.getElementById('Características');
      targetSection.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFireflyPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false, 
        zIndex: 1, 
    },
      background: {
        image: `url(${HeroBg})`,
        repeat: "no-repeat",
        size: "cover",
        position: "",
        opacity: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 1,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <>
      <div className="HeroSection w-full pb-8 lg:pb-6 pt-32 lg:pt-20">
        <div className="w-4/5 mx-auto max-w-screen-2xl px-4 md:px-8">
          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-2 text-5xl lg:text-6xl font-medium opacity-90 text-gray-200">AmbiNod</p>
              <h1 className="mb-6 text-2xl lg:text-4xl tracking-tight font-medium opacity-90 text-blue-300">Entiende tu entorno</h1>
              <p className="leading-relaxed text-base md:text-lg font-medium text-sky-100 opacity-90 mb-7">
                Recopilamos condiciones ambientales de impacto para las personas.
                Un proyecto comunitario enfocado en los sectores urbanos de la ciudad de Loja, Ecuador.</p>
              <div className="lg:w-full flex flex-col gap-2.5 md:flex-row md:justify-center lg:justify-start">
                <button
                href="#FeaturesLanding"
                onClick={scrollToSection}
                className="btn btn-info bg-blue-400 bg-opacity-80 text-white border-none hover:bg-blue-500 hover:bg-opacity-100 text-lg">
                  Conoce más
                </button>
                <Link to="/monitor" className="btn btn-info bg-transparent bg-opacity-80 border-solid border-1 border-opacity-70 border-slate-400 hover:bg-opacity-20 hover:bg-slate-600 hover:border-slate-400 text-slate-100 text-lg">
                <button>
                  Datos reales
                </button>
                </Link>
              </div>
            </div>
            <div className="h-48 overflow-hidden lg:h-auto xl:w-5/12 relative hidden :block xl:block">
              <Particles
              className="absolute w-full h-full"
              id="tsparticles"
              options={options}
              />
            </div>
          </section>
        </div>
      </div>
      </>
    );
  }    
  else {
    return (
      <div className="HeroSection h-dvh w-full pb-10 lg:pb-12 bg-blue-500 bg-opacity-15 pt-32 lg:pt-20">
      </div>
    );
  }
}

export default Hero;