
const Features = () => {

    return (
      <section id="Características" className='FeaturesSection px-4 mx-auto w-full lg:pt-20 lg:pb-0 lg:px-6 flex flex-col justify-center items-center'>
            <div className="w-4/5 mb-8 lg:mb-16 pt-14 lg:pt-0">
                <div className="h-2 bg-gray-300 rounded overflow-hidden pb-1">
                    <div className="w-2/6 h-full pb-2 bg-blue-400"></div>
                </div>
                <h2 className="mb-2 text-3xl lg:text-4xl font-bold opacity-90 text-white text-center pt-10">Esto es para ti</h2>
                <p className=" text-lg lg:text-xl font-medium opacity-70 text-white text-center">Monitoreamos variables climáticas que afectan tu día a día.</p>
            </div>
            <div className="w-4/5 md:grid md:grid-cols-2 lg:grid-cols-6 md:gap-10 text-center">
                <div className="lg:col-start-1 lg:col-end-3 mb-10">
                    <div className="flex flex-col justify-center items-center">
                        <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#ffffffce"><path d="M480-80q-83 0-141.5-58.5T280-280q0-48 21-89.5t59-70.5v-320q0-50 35-85t85-35q50 0 85 35t35 85v320q38 29 59 70.5t21 89.5q0 83-58.5 141.5T480-80Zm-40-440h80v-40h-40v-40h40v-80h-40v-40h40v-40q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240Z"/></svg>
                        <h3 className="mb-2 text-xl font-bold text-gray-100 opacity-90 text-center">Temperatura</h3>
                        <p className="text-gray-200 text-opacity-90 text-center">Determinamos el nivel térmico del ambiente.</p>
                    </div>
                </div>
                <div className="lg:col-start-3 lg:col-end-5 mb-10">
                    <div className="flex flex-col justify-center items-center">
                    <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#ffffffce"><path d="M580.12-250q20.88 0 35.38-14.62 14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5ZM378-256l246-246-42-42-246 246 42 42Zm2.12-194q20.88 0 35.38-14.62 14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5ZM480-80q-137 0-228.5-94T160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80Zm0-60q112 0 186-76.5t74-191.82q0-78.68-66.5-179.18T480-800Q353-688 286.5-587.5T220-408.32Q220-293 294-216.5T480-140Zm0-340Z"/></svg>
                    <h3 className="mb-2 text-xl font-bold text-white opacity-90">Humedad</h3>
                    <p className="text-gray-200 text-opacity-90">Conoce el procentaje de humedad del entorno.</p>
                    </div>
                    
                </div>
                <div className="lg:col-start-5 lg:col-end-7 mb-10">
                    <div className="flex flex-col justify-center items-center">
                    <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#ffffffce"><path d="M450-810v-110h60v110h-60Zm0 770v-110h60v110h-60Zm360-410v-60h110v60H810Zm-770 0v-60h110v60H40Zm702-250-43-43 66-66 43 43-66 66ZM195-151l-43-43 66-66 43 43-66 66Zm570 0-66-66 43-43 66 66-43 43ZM218-700l-66-66 43-43 66 66-43 43Zm261.82 445Q386-255 320.5-320.68 255-386.35 255-480.18q0-93.82 65.68-159.32 65.67-65.5 159.5-65.5 93.82 0 159.32 65.68 65.5 65.67 65.5 159.5 0 93.82-65.68 159.32-65.67 65.5-159.5 65.5Zm.11-60Q549-315 597-362.93q48-47.94 48-117Q645-549 597.07-597q-47.94-48-117-48Q411-645 363-597.07q-48 47.94-48 117Q315-411 362.93-363q47.94 48 117 48Zm.07-165Z"/></svg>
                    <h3 className="mb-2 text-xl font-bold text-white opacity-90">Radiación</h3>
                    <p className="text-gray-200 text-opacity-90">Revisamos el nivel de radiación proveniente del sol. </p>
                    </div>
                </div>
                <div className="lg:row-start-2 lg:col-start-2 lg:col-end-4 mb-10">
                    <div className="flex flex-col justify-center items-center">
                    <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#ffffffce"><path d="M465-160q-54 0-85.5-28T348-273h68q0 26 11.5 39.5T465-220q27 0 38.5-12t11.5-41q0-29-11.5-42.5T465-329H80v-60h385q54 0 82 28t28 88q0 57-28 85t-82 28ZM80-568v-60h548q37 0 54-17.5t17-58.5q0-41-17-58.5T628-780q-38 0-55 20.5T556-708h-60q0-58 35-95t97-37q61 0 96 35.5T759-704q0 65-35 100.5T628-568H80Zm672 330v-60q35 0 51.5-19.5T820-374q0-38-18.5-55T748-446H80v-60h668q62 0 97 35t35 97q0 64-33 100t-95 36Z"/></svg>
                    <h3 className="mb-2 text-xl font-bold text-white opacity-90">Calidad del aire</h3>
                    <p className="text-gray-200 text-opacity-90">Medimos los niveles de Co2 en el aire.</p>
                    </div>
                   
                </div>
                <div className="lg:row-start-2 lg:col-start-4 lg:col-end-6 mb-10">
                    <div className="flex flex-col justify-center items-center">
                    <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#ffffffce"><path d="M447-879q8-1 16.5-1H497q9 0 17 1l-5 60q-8-1-14.5-1h-28q-6.5 0-13.5 1l-6-60Zm-169 54q14-8 29-15.5t31-13.5l22 56q-14 5-26.5 10.5T309-774l-31-51Zm375 52q-12-8-24.5-13.5T602-797l21-57q16 6 31 13.5t29 15.5l-30 52Zm109 103q-8-12-16.5-22.5T727-714l43-42q11 12 22 25t20 27l-50 34Zm-614-32q9-14 19.5-27t21.5-25l44 41q-10 11-18.5 21.5T198-669l-50-33ZM84-539q2-17 6.5-33t9.5-32l57 19q-5 14-8 27.5t-5 27.5l-60-9Zm733 11q-2-14-5-27.5t-8-27.5l57-18q5 16 9 32t6 33l-59 8Zm-13 152q5-14 8-27.5t5-27.5l59 9q-2 17-6 32.5t-9 31.5l-57-18Zm-660-54q2 14 5 27.5t8 27.5l-57 18q-5-16-9.5-32T84-422l60-8Zm585 182q10-11 18.5-22t16.5-23l49 34q-9 14-19.5 27T772-207l-43-41Zm-539 43q-11-12-21.5-25T148-257l50-33q8 12 17 22.5t19 21.5l-44 41Zm413 42q14-5 26.5-11t24.5-14l30 52q-14 8-29 15.5T624-107l-21-56Zm-265 57q-16-6-30.5-13.5T279-135l30-51q12 7 24.5 13t26.5 11l-22 56Zm142 26h-16.5q-8.5 0-16.5-1l6-60q9 1 27 1h14.5q6.5 0 14.5-1l5 60q-8 1-17 1h-17Zm40-170q-35 0-64-21t-40-55q-4-10-8-19t-12-17l-54-55q-25-25-38.5-56.5T290-540q0-71 50-120.5T460-710q65 0 113.5 42T629-562h-61q-8-39-38-63.5T460-650q-45 0-77.5 32T350-540q0 23 8.5 43.5T384-459l54 54q13 13 21 28.5t14 32.5q5 15 18 24.5t29 9.5q21 0 35.5-15t14.5-35h60q0 45-32 77.5T520-250Zm20-160q-20 0-35-15t-15-35q0-21 15-35.5t35-14.5q21 0 35.5 14.5T590-460q0 20-14.5 35T540-410Z"/></svg>
                    <h3 className="mb-2 text-xl font-bold text-white opacity-90">Ruido ambiental</h3>
                    <p className="text-gray-200 text-opacity-90">Determinamos el nivel de rudio de las calles.</p>
                    </div>            
                </div>
            </div>
        </section>
    );
}

export default Features;