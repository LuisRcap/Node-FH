import Tarea from "./tarea.js";

export default class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if( this._listado[ id ] ) {
            delete this._listado[ id ];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        this.listadoArr.forEach( (tarea, i) => {

            const { desc, completadoEn } = tarea;
            const estado = completadoEn 
                    ? 'Completada'.green 
                    : 'Pendiente'.red;
            console.log( `${ i + 1 }`.green + `. ${ desc } :: ${ estado }`);
        });
    }

    listarPendientesCompletadas( completadas = true ) {
        let i = 0;
        this.listadoArr.forEach( ( tarea ) => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn 
                    ? `${ completadoEn }`.green 
                    : 'Pendiente'.red;
            if( completadas && completadoEn ) {
                i++;
                console.log(`${ i }.`.green + ` ${ desc } :: ${ estado }` );
            } else if( !completadas && !completadoEn ) {
                i++;
                console.log(`${ i }.`.green + ` ${ desc } :: ${ estado }` );
            }
        })

    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[ id ];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes( tarea.id ) ) {
                // Al tener la referencia del objeto, este también se actualiza en el listado
                tarea.completadoEn = null;
            }
        })
    }
}