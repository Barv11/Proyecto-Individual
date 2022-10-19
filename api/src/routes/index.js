const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonMiddleware = require('./../middlewares/pokemon.js');
const typeMidddleware = require('./../middlewares/type.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonMiddleware);
router.use('/types', typeMidddleware);

router.get('/', (req, res) => {
    res.send('Pokemon DB');
  });

module.exports = router;
