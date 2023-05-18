/* setTimeout(() => {
    console.log("Hola Mundo");
}, 1000); */

const getUsuarioById = ( id, callback ) => {
    const usuario = {
        id,
        nombre: 'Luis'
    };
    setTimeout( () => {
        callback(usuario);
    }, 1500);
};

getUsuarioById( 10, ( usr ) => {
    console.log( usr.id );
    console.log( usr.nombre.toUpperCase() );
});