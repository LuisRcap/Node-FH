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

    constructor(accid, acctk) {
        this._listado = {};
        this.api = dragionApi()
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }
}