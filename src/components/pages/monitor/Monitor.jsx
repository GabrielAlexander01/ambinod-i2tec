import { useState, useEffect, useMemo } from 'react';
import { MapPin, ThermometerSnowflake, Droplets, Volume2, Sun, Gauge, InfoIcon} from 'lucide-react';
import {Map, Marker} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadFireflyPreset} from "@tsparticles/preset-firefly";
import supabaseClient from '../../../utils/supabase';
import { DateTime } from 'luxon';

const MonitorPage = () => {
  /* Variables de cambios en el monitor */
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [nodes, setNodes] = useState([]); 
  const [currentNode, setCurrentNode] = useState([]);
  const [currentNodeState, setCurrentNodeState] = useState("");
  const [currentNodeData, setCurrentNodeData] = useState([]);
  const [selectOption, setSelectOption] = useState(0);

  /* Manejar cambio en la selección del nodo */
  const handleNodeChange = (e) => {
    const selectedOption = Number(e.target.value); 
    //console.log("Nueva opción seleccionada: ", selectedOption);
    setSelectOption(selectedOption);
  };

  /* Maneja datos en tiempo real, nuvas entradas en supabase (ws) */
  const handleRealtimeUpdates = (payload) => {
    //console.log('Nuevos datos recibidos!', payload);
    const newData = [Object.assign({}, payload.new)];
    setCurrentNodeData(newData);

    const lastDiffTime = DateTime.now().setZone("America/Guayaquil").diff(DateTime.fromISO(newData[0].created_at, {setZone: true}), ["days", "hours", "minutes"]).toObject();
    lastDiffTime.hours -= 5;

    for (let key in lastDiffTime) {
      if (key === "days" && lastDiffTime[key] > 0)
      {
        setCurrentNodeState("Inactivo");
        break;
      }
      else if (key === "hours" && lastDiffTime[key] > 0)
      {
        setCurrentNodeState("Inactivo");
        break;
      }
      else if (key === "minutes" && lastDiffTime[key] > 30)
      {
        setCurrentNodeState("Inactivo");
        break;
      }
      else
        setCurrentNodeState("Activo");
    }
  }
  
  /* Ejecutar código inicial con supabase, nodos + data inicial */
  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const { data, error } = await supabaseClient.from('ttn_nodes').select('*');

        if (!error) {
            setNodes(data);
            //console.log("Nodos iniciales recuperados: ", data);
            const currentNode = data.filter(node => node.node_id === 1);
            setCurrentNode(currentNode);
            //console.log("Nodo inicial: ", currentNode);
        }
      }
      catch (e) {
        //console.error("Error en la consulta inicial: ", e);
      }
    };

    const fetchInitialData = async () => {
      try {
        const { data, error } = await supabaseClient
        .from('ttn_nodes_data')
        .select('*')
        .eq('node_id', 1)
        .order('created_at', { ascending: false })
        .limit(1);
  
        if (!error) {
          const currentNodeData = data.filter(node => node.node_id === 1);
          //console.log("Datos iniciales: ", currentNodeData);
          setCurrentNodeData(currentNodeData);

          const lastDiffTime = DateTime.now().setZone("America/Guayaquil").diff(DateTime.fromISO(currentNodeData[0].created_at, {setZone: true}), ["days", "hours", "minutes"]).toObject();
          lastDiffTime.hours -= 5;

          for (let key in lastDiffTime) {
            if (key === "days" && lastDiffTime[key] > 0)
            {
              setCurrentNodeState("Inactivo");
              break;
            }
            else if (key === "hours" && lastDiffTime[key] > 0)
            {
              setCurrentNodeState("Inactivo");
              break;
            }
            else if (key === "minutes" && lastDiffTime[key] > 30)
            {
              setCurrentNodeState("Inactivo");
              break;
            }
            else
              setCurrentNodeState("Activo");
          }
        }  
      }
      catch (e) {
        //console.error("Error en la consulta de datos iniciales: ", e);
      }
    }
 
    fetchNodes();
    fetchInitialData();
    setLoading(false);

    supabaseClient.channel('ttn_nodes_data')
                  .on('postgres_changes', { event: 'INSERT', schema: 'public',
                      table: 'ttn_nodes_data' }, handleRealtimeUpdates)
                  .subscribe();

    //console.log("Suscrito al canal ttn_nodes_data");

    /*
    return async () => {
      await supabaseClient.removeAllChannels().then((result) => {
      console.log("Desuscrito del canal ttn_nodes_data:", result);
      })
    }
    */

  }, []);

  /* Actualiza nuevos datos de supabase según lo seleccionado */
  useEffect(() => {
    if (selectOption)
    {
        const newCurrentNode = nodes.filter(node => node.node_id === selectOption);
        //console.log("Nodo seleccionado: ", newCurrentNode);
        setCurrentNode(newCurrentNode);
    
        const fetchNodeData = async () => {
          try {
            const { data, error } = await supabaseClient
            .from('ttn_nodes_data')
            .select('*')
            .eq('node_id', selectOption)
            .order('created_at', { ascending: false })
            .limit(1);
      
            if (!error){
              const currentNodeData = data.filter(node => node.node_id === selectOption);
              setCurrentNodeData(currentNodeData);
              //console.log("Datos del nodo seleccionado: ", currentNodeData);

              const lastDiffTime = DateTime.now().setZone("America/Guayaquil").diff(DateTime.fromISO(currentNodeData[0].created_at, {setZone: true}), ["days", "hours", "minutes"]).toObject();
              lastDiffTime.hours -= 5;
    
              for (let key in lastDiffTime) {
                if (key === "days" && lastDiffTime[key] > 0)
                {
                  setCurrentNodeState("Inactivo");
                  break;
                }
                else if (key === "hours" && lastDiffTime[key] > 0)
                {
                  setCurrentNodeState("Inactivo");
                  break;
                }
                else if (key === "minutes" && lastDiffTime[key] > 30)
                {
                  setCurrentNodeState("Inactivo");
                  break;
                }
                else
                  setCurrentNodeState("Activo");
              }
            }  
          }
          catch (e) {
            //console.error(e);
          }
        }
    
        fetchNodeData();
      }

  
    }, [selectOption, nodes]);

  /* Inicia el motor de tsparticles */
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
          value: 100,
        },
        opacity: {
          value: 0.2,
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
  
  if (loading) return
  <section className="LandingContainer h-dvh  text-white"></section>;
    
  if (init) {
  return (
    <section className="LandingContainer text-white">
      <Particles
      className="absolute w-full h-full"
        id="tsparticles"
        options={options}
        />
      <main className="w-4/5 pt-28 pb-10 flex flex-col items-center justify-evenly">
        <div className="w-full mb-8 flex flex-col md:flex-row justify-center items-center gap-5 lg:gap-16">
          <div className="w-auto bg-blue-800 border-l-4 border-blue-500 text-blue-200 font-medium rounded-r-md shadow-lg shadow-gray-900 p-4 over:bg-opacity-50">
            <div className='flex flex-row items-center justify-start mb-2'>
              <InfoIcon className="w-5 h-5 text-blue-200 mr-2" />
              <p className="font-extrabold">Información</p>
            </div>
            <p>Contamos con un nodo de medición. Esperamos implementar más instancias.</p>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-300">Filtrar por nodo</span>
            </div>
            <select
            onChange={handleNodeChange}
            className="bg-gray-800 select select-bordered shadow-md shadow-gray-900">
              <option disabled>Selecciona un nodo</option>
               {nodes.map(node => (
                <option key={node.node_id} value={node.node_id}>
                    {node.location}
                </option>
            ))}
            </select>
            <div className="label">
              <span className="label-text-alt text-gray-400">Nodos de medición</span>
              <span className="label-text-alt">1-{nodes.length}</span>
            </div>
          </label>
        </div>
        <div className="w-full grid md:grid-cols-6 grid-cols-1 gap-6 mb-8">
          <div className="md:col-start-1 md:col-end-5 rounded-lg shadow-lg shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200 hidden md:block overflow-hidden">
            <Map
            className = "w-full h-full"
            longitude={currentNode[0] ? Number(currentNode[0].longitude) : -79.20489731925568}
            latitude={currentNode[0] ? Number(currentNode[0].latitude) : -4.00308313968852}
            zoom={15}
            dragPan={true}
            dragRotate={true}
            scrollZoom={true}
            mapStyle="https://tiles.openfreemap.org/styles/bright"
            >
            <Marker longitude={currentNode[0] ? Number(currentNode[0].longitude) : -79.20489731925568}
                    latitude={currentNode[0] ? Number(currentNode[0].latitude) : -4.00308313968852} anchor="bottom">
            <MapPin strokeWidth={2.8} className="w-6 h-7 text-red-500"/>
            </Marker>
            </Map>
          </div>
          <div className="md:col-start-5 md:col-end-7 p-6 rounded-lg shadow-lg bg-gray-800 shadow-gray-900 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
            <div className="flex flex-row items-center justify-start mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-opacity-95 text-gray-200">{currentNode[0] ? currentNode[0].location : "Sin información"}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-base text-opacity-95 font-medium text-gray-300">Última actualización</p>
              </div>
              <div>
                <p className="text-base text-gray-400">Fecha</p>
                <p className="text-sm font-medium">
                  {currentNodeData[0] ? `${DateTime.fromISO(currentNodeData[0].created_at).toLocaleString()}` : "---"}</p>
              </div>
              <div>
                <p className="text-base text-gray-400">Hora</p>
                <p className="text-sm font-medium">
                {currentNodeData[0] ? `${DateTime.fromISO(currentNodeData[0].created_at, {setZone: true}).hour}h : ${DateTime.fromISO(currentNodeData[0].created_at, {setZone: true}).minute}min` : "---"}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-400">Estado</p>
                <p className={`text-sm font-medium ${currentNodeState === "Activo" ? "text-green-300" : "text-red-300"}`}>{currentNodeData[0] ? currentNodeState : '---'}</p>
              </div>
            </div>
          </div>
        </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <div className="md:col-start-1 md:col-end-4 bg-gray-800 rounded-lg shadow-lg shadow-gray-900 p-6 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
          <div className="flex items-center mb-4">
            <ThermometerSnowflake className="w-7 h-7 text-teal-200 mr-2" />
            <h3 className="text-lg font-semibold">Temperatura</h3>
          </div>
          <p className="text-3xl font-bold">{currentNodeData[0] ? `${ currentNodeData[0].temperature} °C` : '---'}</p>
          <p className="text-sm text-gray-400 mt-2">Temperatura actual ±2°C</p>
        </div>
        <div className="md:col-start-4 md:col-end-7 bg-gray-800 rounded-lg shadow-lg shadow-gray-900 p-6 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
          <div className="flex items-center mb-4">
            <Droplets className="w-7 h-7 text-blue-200 mr-2" />
            <h3 className="text-lg font-semibold">Humedad</h3>
          </div>
          <p className="text-3xl font-bold">{currentNodeData[0] ? `${ currentNodeData[0].humidity} %` : '---'}</p>
          <p className="text-sm text-gray-400 mt-2">Humedad relativa ±5%</p>
        </div>
        <div className="md:col-start-1 md:col-end-3 bg-gray-800 rounded-lg shadow-lg shadow-gray-900 p-6 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
          <div className="flex items-center mb-4">
            <Volume2 className="w-7 h-7 text-red-200 mr-2" />
            <h3 className="text-lg font-semibold">Nivel de Ruido</h3>
          </div>
          <p className="text-3xl font-bold">{currentNodeData[0] ? `${ currentNodeData[0].noise} dB` : '---'}</p>
          <p className="text-sm text-gray-400 mt-2">Intensidad sonora</p>
        </div>
        <div className="md:col-start-3 md:col-end-5 bg-gray-800 rounded-lg shadow-lg shadow-gray-900 p-6 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950  hover:scale-101 transform transition duration-200">
          <div className="flex items-center mb-4">
            <Sun className="w-7 h-7 text-yellow-200 mr-2" />
            <h3 className="text-lg font-semibold">Índice UV</h3>
          </div>
          <p className="text-3xl font-bold">{currentNodeData[0] ? `${ currentNodeData[0].uv}` : '---'}</p>
          <p className="text-sm text-gray-400 mt-2">Radiación ultravioleta ±1uvi</p>
        </div>
        <div className="md:col-start-5 md:col-end-7 bg-gray-800 rounded-lg shadow-lg shadow-gray-900 p-6 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
          <div className="flex items-center mb-4">
            <Gauge className="w-7 h-7 text-green-300 mr-2" />
            <h3 className="text-lg font-semibold">Co2</h3>
          </div>
          <p className="text-3xl font-bold">{currentNodeData[0] ? `${ currentNodeData[0].co2} ppm` : '---'}</p>
          <p className="text-sm text-gray-400 mt-2">Concentración de dióxido de carbono ±3%</p>
        </div>
      </div>
    </main>
  </section>

  );
  }
  else {
    return (
      <section className="LandingContainer h-dvh text-white"></section>
    );
  }
}

export default MonitorPage;


