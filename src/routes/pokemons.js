const { Router } = require('express');
const { Pokemon, Types } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {

    res.status(201).json(await Pokemon.findAll({
        include: Types
    }));
})

router.get('/search', async (req, res) => {

    const { name } = req.query;

    if (!name) return res.status(400).send('Pokemon not found');

    const pokemons = await Pokemon.findAll({
        where: { name: name },
        include: Types
    });

    res.status(201).json(pokemons);
});

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    if (!id) return res.status(400).send('Pokemon id not found');

    const pokemon = await Pokemon.findByPk(id, { include: Types });

    res.status(201).json(pokemon);
})


module.exports = router;
