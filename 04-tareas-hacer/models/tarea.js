import { v4 } from 'uuid';

const uuidv4 = v4;

export default class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null
    }
}