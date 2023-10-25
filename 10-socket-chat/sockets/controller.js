import { Socket } from "socket.io";
import { comprobarJWT } from "../helpers/index.js";
import { ChatMensajes } from "../models/index.js";

const chatMensajes = new ChatMensajes();

export const socketController = async ( socket = new Socket, io ) => {
    const { handshake: { headers } } = socket;

    const usuario = await comprobarJWT( headers['x-token'] );

    if( !usuario ) {
        return socket.disconnect();
    }

    // Agregar al usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit( 'usuarios-activos', chatMensajes.usuariosArr );

    // Conectarlo a una sala especial
    socket.join( usuario.id ); // global, socket.id, usuario.id

    // Limpiar cuando alguien se desconecta
    socket.on( 'disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit( 'usuarios-activos', chatMensajes.usuariosArr );
    });

    socket.on( 'enviar-mensaje', ({ uid, mensaje }) => {
        
        if( uid ) {
            // Mensaje privado
            socket.to( uid ).emit( 'mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje );
            io.emit( 'recibir-mensaje', chatMensajes.ultimos10 );
        }

    })
}