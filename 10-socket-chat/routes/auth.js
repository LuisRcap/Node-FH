import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login, renovarToken } from '../controllers/auth.js';
import { validarCampos, validarJWT } from '../middlewares/index.js';

const router = Router();

router.post('/login', [
    check( 'correo', 'El correo es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check( 'id_token', 'id_token es necesatio' ).not().isEmpty(),
    validarCampos
], googleSignIn  );

router.get('/', validarJWT, renovarToken );

export default router;