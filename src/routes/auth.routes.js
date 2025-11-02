import {Router} from 'express';
import {register,login,getProfile} from '../controllers/authController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.post('/register',register);
router.post('/login',login);
router.get("/profile", verifyToken, getProfile);

export default router;

/* for register
{
    "nombre": "Andy Quiroz",
    "email": "holaquehace@email.com",
    "contrasena": "micontrasena"
}

    for login
{
    "email": "holaquehace@email.com",
    "contrasena": "micontrasena"
}
*/