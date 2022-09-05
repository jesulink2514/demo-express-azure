const { Router } = require('express');
const { Types } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async(req, res)=>{
    res.status(201).json(await Types.findAll());
})


module.exports = router;