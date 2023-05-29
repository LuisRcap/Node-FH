import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";
import { config } from 'dotenv';
config();

const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput( 'Ciudad: ' );

                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                
                // Seleccionar el lugar
                const id = await listarLugares( lugares );

                if ( id === '0' ) continue;

                
                const { nombre, lat, lng } = lugares.find( l => l.id === id );
                
                // Guardar en DB
                busquedas.agregarHistorial( nombre );

                // Clima
                const { desc, min, max, temp } = await busquedas.climaLugar( lat, lng );

                // Mostrar resultados
                console.clear();
                console.log( '\nInformación de la ciudad \n'.green );
                console.log( 'Ciudad:', nombre.green );
                console.log( 'Lat: ', lat );
                console.log( 'Lng: ', lng );
                console.log( 'Temperatura: ', temp );
                console.log( 'Mínima: ', min );
                console.log( 'Máxima: ', max );
                console.log( 'Clima actual: ', desc.green );
            break;

            case 2:
                busquedas.historialCapitalizado.forEach( ( lugar, i ) => {
                //busquedas.historial.forEach( ( lugar, i ) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar }` );
                });

            break;
        }

        if( opt !== 0 ) await pausa();
    } while( opt !== 0 )
};

main()