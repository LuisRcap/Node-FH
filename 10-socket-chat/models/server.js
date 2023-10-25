import express from 'express';
import cors from 'cors';
import { Server as io } from 'socket.io'
import { createServer } from 'http'
import fileUpload from 'express-fileupload'

import {
    authRouter,
    buscarRouter,
    categoryRouter,
    productsRouter,
    uploadsRouter,
    userRouter
} from '../routes/index.js'
import { dbConnection } from '../database/config.js';
import { socketController } from '../sockets/controller.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        this.io = new io(this.server)

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads'
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi alicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        // CORS
        this.app.use( cors() );

        // Lectura y Parseo del body
        this.app.use( express.json() );
        
        // Directorio público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    sockets() {
        this.io.on("connection", ( socket ) => socketController( socket, this.io ) );
    }

    routes() {

        // User Routes
        this.app.use( this.paths.auth, authRouter );
        this.app.use( this.paths.buscar, buscarRouter );
        this.app.use( this.paths.categorias, categoryRouter );
        this.app.use( this.paths.productos, productsRouter );
        this.app.use( this.paths.usuarios, userRouter );
        this.app.use( this.paths.uploads, uploadsRouter );

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log( "Servidor corriendo en puerto", this.port );
        });
    }

}

export default Server;