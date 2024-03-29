import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async ( req: Request, res: Response ) => {

    try {
        const usuarios = await Usuario.findAll();
    
        return res.json({ usuarios });
    } catch ( error ) {
        console.error( error );
        return res.status(500).json({ 
            msg: 'Ocurrió un error al buscar usuarios'
         });
    }
}

export const getUsuario = async ( req: Request, res: Response ) => {  
    const { id } = req.params;
    
    try {
        const usuario = await Usuario.findByPk( id );

        if( usuario ) {
            return res.json({ usuario });
        } else {
            return res.status(404).json({ 
                msg: `No existe un usuario con el id ${ id }`
            });
        }

    } catch( error ) {
        console.error( error );
        return res.status(500).json({ 
            msg: 'Ocurrió un error al buscar usuario'
        });
    }
}

export const postUsuario = async ( req: Request, res: Response ) => {
    
    const { body } = req;

    try{

        const existEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if( existEmail ) {
            return res.status(400).json({ 
                msg: `Ya existe un usuario con el email ${ body.email }`
            });
        }

        const usuario = Usuario.build( body );
        await usuario.save()
        return res.json(usuario);
    } catch( error ) {

        console.error( error );
        res.status(500).json({ 
            msg: 'Ocurrió un error al crear el usuario'
        });
    }
}

export const putUsuario = async ( req: Request, res: Response ) => {
    
    const { id } = req.params;
    const { body } = req;
    
    try{

        const usuario = await Usuario.findByPk( id );

        if( !usuario ) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${ id }`
            });
        }

        await usuario.update( body );

        return res.json(usuario);
    } catch( error ) {

        console.error( error );
        res.status(500).json({ 
            msg: 'Ocurrió un error al crear el usuario'
        });
    }
}

export const deleteUsuario = async ( req: Request, res: Response ) => {
    
    const { id } = req.params;

    try{

        const usuario = await Usuario.findByPk( id );

        if( !usuario ) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${ id }`
            });
        }

        await usuario.update({ estado: false });
        return res.json(usuario);
    } catch( error ) {

        console.error( error );
        res.status(500).json({ 
            msg: 'Ocurrió un error al crear el usuario'
        });
    }
}