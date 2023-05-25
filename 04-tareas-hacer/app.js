import 'colors';

import { inquirerMenu, pausa } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

const main = async () => {
    console.log('Hola Mundo');
    let opt = '';
    do {
        opt = await inquirerMenu();
        console.log({ opt });
        const tareas = new Tareas();
        const tarea = new Tarea('Comprar comida');
        
        tareas._listado[tarea.id] = tarea
        console.log( tareas )
        await pausa();
    } while( opt !== '0');

};

main();