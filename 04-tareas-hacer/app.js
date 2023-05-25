import 'colors';

import { 
    inquirerMenu,
    pausa ,
    leerInput
} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    do {
        // Esta opción imprime el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Crear opción
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;
            case '2':
                console.log( tareas.listadoArr );
            break;
        }
        
        await pausa();
    } while( opt !== '0');

};

main();