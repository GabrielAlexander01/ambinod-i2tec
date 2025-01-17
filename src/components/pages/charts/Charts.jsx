import { useState, useEffect, useMemo } from 'react';
import { AreaChart } from '@tremor/react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadFireflyPreset} from "@tsparticles/preset-firefly";
import supabaseClient from '../../../utils/supabase';
import { DateTime } from 'luxon';


  const temperatureFormatter = (number) =>
    `${Intl.NumberFormat('us').format(number).toString()} °C`;

  const humidityFormatter = (number) =>
    `${Intl.NumberFormat('us').format(number).toString()} %`;

  const noiseFormatter = (number) =>
    `${Intl.NumberFormat('us').format(number).toString()} dB`;

  const co2Formatter = (number) =>
    `${Intl.NumberFormat('us').format(number).toString()} ppm`;
  
  

const ChartsPage = () => {
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState([]);
  const [selectedRange, setSelectedRange] = useState('Último día');
  const [currentTemperatureData, setCurrentTemperatureData] = useState([]);
  const [currentHumidityData, setCurrentHumidityData] = useState([]);
  const [currentCo2Data, setCurrentCo2Data] = useState([]);
  const [currentNoiseData, setCurrentNoiseData] = useState([]);
  const [currentUvData, setCurrentUvData] = useState([]);


  /* Manejar cambio en la selección del nodo */
  const handleNodeChange = (e) => {
    const selectedOption = Number(e.target.value); 
    ////console.log("Nuevo nodo seleccionado: ", selectedOption);
    const currentNode = nodes.filter(node => node.node_id === selectedOption);
    setCurrentNode(currentNode);
  };

  /* Manejar cambio en la selección del rango */
  const handleRange = (e) => {
    const selectedRange = Number(e.target.value);
    
    if (selectedRange === 1)
    {
      setSelectedRange("Último día");
      ////console.log("Nuevo rango seleccionado: ", "Último día");
    }
    else if (selectedRange === 2)
    {
      setSelectedRange("Últimos 7 días");
      ////console.log("Nuevo rango seleccionado: ", "Últimos 7 días");
    }
    else if (selectedRange === 3)
    {
      setSelectedRange("Últimas 2 semanas");
      ////console.log("Nuevo rango seleccionado: ", "Últimas 2 semanas");
    }
    else if (selectedRange === 4)
    {
      setSelectedRange("Último mes");
      //console.log("Nuevo rango seleccionado: ", "Último mes");
    }
  }

  /* Ejecutar código inicial con supabase, nodos + data inicial */
  useEffect(() => {
    const fetchNodes = async () => {    
      const { data, error } = await supabaseClient.from('ttn_nodes').select('*');
  
      if (!error)
      {
        setNodes(data);
        //console.log("Nodos iniciales recuperados: ", data);
        const currentNode = data.filter(node => node.node_id === 1);
        setCurrentNode(currentNode);
        //console.log("Nodo inicial: ", currentNode);
      }
    };
  
      fetchNodes();
      setLoading(false);
  
    }, []);

  /* Actualiza nuevos datos de supabase según lo seleccionado */
  useEffect(() => {
    if (currentNode)
    {
      if (selectedRange === "Último día")
      {
        const fetchNodeData = async () => {
            const greaterDate = DateTime.now().setZone("America/Guayaquil").minus({ days: 1 }).set({ hour: 18, minute: 59, second: 59 }).toUTC().toISO();
            const lessDate = DateTime.now().setZone("America/Guayaquil").set({ hour: 19, minute: 0o0, second: 0o0 }).toUTC().toISO();
    
            ////console.log("Límite (día) anterior:", greaterDate);
            ////console.log("Límite (día) posterior: ", lessDate);
  
          /*const currentDate = DateTime.now().setZone("America/Guayaquil");
          //console.log("Tiempo actual con desplazamiento: ", currentDate.toString());
  
          Crear un nuevo DateTime en UTC pero manteniendo la misma hora
          const currentUTCDate = DateTime.fromObject({
            year: currentDate.year,
            month: currentDate.month,
            day: currentDate.day,
            hour: currentDate.hour,
            minute: currentDate.minute,
            second: currentDate.second,
            millisecond: currentDate.millisecond
          }, { zone: 'UTC' });
          //console.log("Tiempo actual en UTC: ", currentUTCDate.toString()); */
  

            /* Consulta datos del día actual, en orden ascendente (del más antiguo al más nuevo) */
            const { data, error } = await supabaseClient
                                          .from('ttn_nodes_data')
                                          .select('*')
                                          .eq('node_id', currentNode[0].node_id)
                                          .gt('created_at', greaterDate)
                                          .lt('created_at', lessDate)
                                          .order('created_at', { ascending: true })

            if (!error) {
              //const currentNodeData = data.filter(node => node.node_id === 1);
              //console.log("Nuevos datos seleccionados: ", data);

              /* Poblar los array de datos */
              const temperatureArray = data.map(({ created_at, temperature }) => {
              const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC().toFormat('HH:mm');  
              return {
                created_at: dbTime,
                Temperatura: temperature
              };
              }     
              );

              const humidityArray = data.map(({ created_at, humidity }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC().toFormat('HH:mm');  
                return {
                  created_at: dbTime,
                  Humedad: humidity
                };
                }     
                );

              const co2Array = data.map(({ created_at, co2 }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC().toFormat('HH:mm');  
                return {
                  created_at: dbTime,
                  Co2: co2
                };
                }     
              );  

              const noiseArray = data.map(({ created_at, noise }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC().toFormat('HH:mm');  
                return {
                  created_at: dbTime,
                  Ruido: noise
                };
                }     
              );  

              const uvArray = data.map(({ created_at, uv }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC().toFormat('HH:mm');  
                return {
                  created_at: dbTime,
                  Radiación: uv
                };
                }     
              );  

              setCurrentTemperatureData(temperatureArray);
              setCurrentHumidityData(humidityArray);
              setCurrentCo2Data(co2Array);
              setCurrentNoiseData(noiseArray);
              setCurrentUvData(uvArray);
            }  
          
        }
        fetchNodeData();

      } else if (selectedRange === "Últimos 7 días")
      {
        const fetchNodeData = async () => {
            const greaterDate = DateTime.now().setZone("America/Guayaquil").minus({ days: 8 }).set({ hour: 18, minute: 59, second: 59 }).toUTC().toISO();
            const lessDate = DateTime.now().setZone("America/Guayaquil").set({ hour: 19, minute: 0o0, second: 0o0 }).toUTC().toISO();
    
            //console.log("Límite (día) anterior:", greaterDate);
            //console.log("Límite (día) posterior: ", lessDate);

            /* Consulta datos de los últimos 7 días, en orden ascendente (del más antiguo al más nuevo) */
            const { data, error } = await supabaseClient
                                          .from('ttn_nodes_data')
                                          .select('*')
                                          .eq('node_id', currentNode[0].node_id)
                                          .gt('created_at', greaterDate)
                                          .lt('created_at', lessDate)
                                          .order('created_at', { ascending: true })

            if (error) {
              //console.error('Error al recuperar nuevos datos:', error);
            } else {
              //const currentNodeData = data.filter(node => node.node_id === 1);
              //console.log("Nuevos datos seleccionados: ", data);

              /* Poblar los array de datos */
              const temperatureArray = data.map(({ created_at, temperature }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;  
                return {
                created_at: dbFormattedTime,
                Temperatura: temperature
                };
              }     
              );

              const filteredTemperatureArray = temperatureArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredTemperatureArray);

              const humidityArray = data.map(({ created_at, humidity }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`; 
                return {
                created_at: dbFormattedTime,
                Humedad: humidity
                };
              }     
              );

              const filteredHumidityArray = humidityArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredHumidityArray);

              const co2Array = data.map(({ created_at, co2 }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;  
                return {
                created_at: dbFormattedTime,
                Co2: co2
                };
              }     
              );

              const filteredCo2Array = co2Array.filter((_, index) => index % 2 === 0); 
              //console.log(filteredCo2Array);

              const noiseArray = data.map(({ created_at, noise }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`; 
                return {
                created_at: dbFormattedTime,
                Ruido: noise
                };
              }     
              );

              const filteredNoiseArray = noiseArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredNoiseArray);

              const uvArray = data.map(({ created_at, uv }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;   
                return {
                created_at: dbFormattedTime,
                Radiación: uv
                };
              }     
              );

              const filteredUvArray = uvArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredUvArray);

              setCurrentTemperatureData(filteredTemperatureArray);
              setCurrentHumidityData(filteredHumidityArray);
              setCurrentCo2Data(filteredCo2Array);
              setCurrentNoiseData(filteredNoiseArray);
              setCurrentUvData(filteredUvArray);
            }

            
        }
        fetchNodeData();

      } else if (selectedRange === "Últimas 2 semanas")
      {
        const fetchNodeData = async () => {
            const greaterDate = DateTime.now().setZone("America/Guayaquil").minus({ days: 15 }).set({ hour: 18, minute: 59, second: 59 }).toUTC().toISO();
            const lessDate = DateTime.now().setZone("America/Guayaquil").set({ hour: 19, minute: 0o0, second: 0o0 }).toUTC().toISO();
    
            //console.log("Límite (día) anterior:", greaterDate);
            //console.log("Límite (día) posterior: ", lessDate);

            /* Consulta datos de los últimos 7 días, en orden ascendente (del más antiguo al más nuevo) */
            const { data, error } = await supabaseClient
                                          .from('ttn_nodes_data')
                                          .select('*')
                                          .eq('node_id', currentNode[0].node_id)
                                          .gt('created_at', greaterDate)
                                          .lt('created_at', lessDate)
                                          .order('created_at', { ascending: true })

            if (error) {
              //console.error('Error al recuperar nuevos datos:', error);
            } else {
              //const currentNodeData = data.filter(node => node.node_id === 1);
              //console.log("Nuevos datos seleccionados: ", data);

              /* Poblar los array de datos */
              const temperatureArray = data.map(({ created_at, temperature }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;  
                return {
                created_at: dbFormattedTime,
                Temperatura: temperature
                };
              }     
              );

              const filteredTemperatureArray = temperatureArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredTemperatureArray);

              const humidityArray = data.map(({ created_at, humidity }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`; 
                return {
                created_at: dbFormattedTime,
                Humedad: humidity
                };
              }     
              );

              const filteredHumidityArray = humidityArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredHumidityArray);

              const co2Array = data.map(({ created_at, co2 }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;  
                return {
                created_at: dbFormattedTime,
                Co2: co2
                };
              }     
              );

              const filteredCo2Array = co2Array.filter((_, index) => index % 2 === 0); 
              //console.log(filteredCo2Array);

              const noiseArray = data.map(({ created_at, noise }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`; 
                return {
                created_at: dbFormattedTime,
                Ruido: noise
                };
              }     
              );

              const filteredNoiseArray = noiseArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredNoiseArray);

              const uvArray = data.map(({ created_at, uv }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;   
                return {
                created_at: dbFormattedTime,
                Radiación: uv
                };
              }     
              );

              const filteredUvArray = uvArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredUvArray);

              setCurrentTemperatureData(filteredTemperatureArray);
              setCurrentHumidityData(filteredHumidityArray);
              setCurrentCo2Data(filteredCo2Array);
              setCurrentNoiseData(filteredNoiseArray);
              setCurrentUvData(filteredUvArray);
            }

           
        }
        fetchNodeData();

      } else if (selectedRange === "Último mes")
      {
        const fetchNodeData = async () => {
            const greaterDate = DateTime.now().setZone("America/Guayaquil").minus({ days: 31 }).set({ hour: 18, minute: 59, second: 59 }).toUTC().toISO();
            const lessDate = DateTime.now().setZone("America/Guayaquil").set({ hour: 19, minute: 0o0, second: 0o0 }).toUTC().toISO();
    
            //console.log("Límite (día) anterior:", greaterDate);
            //console.log("Límite (día) posterior: ", lessDate);

            /* Consulta datos de los últimos 7 días, en orden ascendente (del más antiguo al más nuevo) */
            const { data, error } = await supabaseClient
                                          .from('ttn_nodes_data')
                                          .select('*')
                                          .eq('node_id', currentNode[0].node_id)
                                          .gt('created_at', greaterDate)
                                          .lt('created_at', lessDate)
                                          .order('created_at', { ascending: true })

            if (error) {
              //console.error('Error al recuperar nuevos datos:', error);
            } else {
              //const currentNodeData = data.filter(node => node.node_id === 1);
              //console.log("Nuevos datos seleccionados: ", data);

              /* Poblar los array de datos */
              const temperatureArray = data.map(({ created_at, temperature }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;  
                return {
                created_at: dbFormattedTime,
                Temperatura: temperature
                };
              }     
              );

              const filteredTemperatureArray = temperatureArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredTemperatureArray);

              const humidityArray = data.map(({ created_at, humidity }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`; 
                return {
                created_at: dbFormattedTime,
                Humedad: humidity
                };
              }     
              );

              const filteredHumidityArray = humidityArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredHumidityArray);

              const co2Array = data.map(({ created_at, co2 }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;  
                return {
                created_at: dbFormattedTime,
                Co2: co2
                };
              }     
              );

              const filteredCo2Array = co2Array.filter((_, index) => index % 2 === 0); 
              //console.log(filteredCo2Array);

              const noiseArray = data.map(({ created_at, noise }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`; 
                return {
                created_at: dbFormattedTime,
                Ruido: noise
                };
              }     
              );

              const filteredNoiseArray = noiseArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredNoiseArray);

              const uvArray = data.map(({ created_at, uv }) => {
                const dbTime = DateTime.fromISO(created_at).setZone("America/Guayaquil").toUTC();
                const dbFormattedTime = `${dbTime.toFormat('dd/MM/yy')} - ${dbTime.toFormat('HH:mm')}`;   
                return {
                created_at: dbFormattedTime,
                Radiación: uv
                };
              }     
              );

              const filteredUvArray = uvArray.filter((_, index) => index % 2 === 0); 
              //console.log(filteredUvArray);

              setCurrentTemperatureData(filteredTemperatureArray);
              setCurrentHumidityData(filteredHumidityArray);
              setCurrentCo2Data(filteredCo2Array);
              setCurrentNoiseData(filteredNoiseArray);
              setCurrentUvData(filteredUvArray);
            }

            
        }
        fetchNodeData();
      }
      }
  
    }, [currentNode, selectedRange]);

/* Iniciar el motor de tsParticles */
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
            distance: 400,
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
          distance: 100,
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
  <section className="LandingContainer h-dvh text-white"></section>;

  if (init) {
    return (
        <div className="LandingContainer text-white">  
          <Particles
          className="absolute w-full h-full"
          id="tsparticles"
          options={options}
          />
          <main className="w-4/5 pt-28 pb-10">
            <div className='SelectionContainer flex flex-col lg:flex-row justify-center items-center gap-5 mb-8'>
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-300">Filtrar por tiempo</span>
                </div>
                <select
                onChange={handleRange}
                className="bg-gray-800 select select-bordered shadow-md shadow-gray-900">
                  <option disabled>Seleccionar un rango</option>
                  <option key={1} value={1}>Último día</option>
                  <option key={2} value={2}>Últimos 7 días</option>
                  <option key={3} value={3}>Últimas 2 semanas</option>
                  <option key={4} value={4}>Último mes</option>
                </select>
                <div className="label">
                  <span className="label-text-alt text-gray-400">Rango de lectura</span>
                  <span className="label-text-alt">1-4</span>
                </div>
              </label>
            </div>
            <div className="ChartsContainer flex flex-col justify-center items-center bg-gray-800 rounded-lg shadow-lg shadow-gray-900 p-6 mb-8 hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-gray-950 hover:scale-101 transform transition duration-200">
                    <h2 className="text-2xl font-normal opacity-90">Registros de</h2>
                      <p className='text-center text-2xl mb-4 opacitz-90 font-semibold'>{currentNode[0] ? currentNode[0].location : ''}</p>
                    <p className="text-center text-gray-400 mb-6">
                        Mostrando <span className='font-semibold'>{selectedRange}</span> para el nodo seleccionado.
                    </p>
                    <AreaChart
                    className="h-80 mb-10"
                    data={currentTemperatureData}
                    index="created_at"
                    categories={['Temperatura']}
                    colors={['purple']}
                    valueFormatter={temperatureFormatter}
                    yAxisWidth={50}
                    showAnimation={true}
                    xAxisLabel='Hora - Fecha'
                    />
                    <AreaChart
                    className="h-80 mb-10"
                    data={currentHumidityData}
                    index="created_at"
                    categories={['Humedad']}
                    colors={['blue']}
                    valueFormatter={humidityFormatter}
                    yAxisWidth={50}
                    showAnimation={true}
                    xAxisLabel='Hora - Fecha'
                    
                    />
                    <AreaChart
                    className="h-80 mb-10"
                    data={currentUvData}
                    index="created_at"
                    categories={['Radiación']}
                    colors={['yellow']}
                    yAxisWidth={30}
                    showAnimation={true}
                    xAxisLabel='Hora - Fecha'
                    />
                    <AreaChart
                    className="h-80 mb-10"
                    data={currentNoiseData}
                    index="created_at"
                    categories={['Ruido']}
                    colors={['red']}
                    valueFormatter={noiseFormatter}
                    yAxisWidth={50}
                    showAnimation={true}
                    xAxisLabel='Hora - Fecha'
                    />
                    <AreaChart
                    className="h-80 mb-10"
                    data={currentCo2Data}
                    index="created_at"
                    categories={['Co2']}
                    colors={['green']}
                    valueFormatter={co2Formatter}
                    yAxisWidth={80}
                    showAnimation={true}
                    xAxisLabel='Hora - Fecha'
                    />
                </div>
            </main>
        </div>
    );
  }
}

export default ChartsPage;


