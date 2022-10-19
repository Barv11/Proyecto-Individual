const { Router } = require('express');
const { Pokemon, conn, Type } = require('../db/db.js');
const router = Router();
const { getPokemonsApi, getPokemonByName, getPokemonById, getNames, validateRange } = require('./controllers/index.js');

router.get('/', async (req, res) => {
    const { name } = req.query
    try {
        if (!name) {
            const allPokemons = await getPokemonsApi();
            const allPokemonsDB = await Pokemon.findAll({
                include: Type,
            });
            res.status(200).json([...allPokemons, ...allPokemonsDB]);
        } else {
            const names = await getNames();
            const namesDB = await Pokemon.findAll();
            let allNames = [...names];
            namesDB.map((el) => allNames.push(el.name));

            if (!allNames.includes(name)) throw new Error('El pokemon ingresado no existe.');

            const detailPokemon = await Pokemon.findAll({
                where: { name },
                include: Type,
            });
            if (detailPokemon.length > 0) {
                return res.status(200).send(detailPokemon[0])
            };
            const detailPokemonApi = await getPokemonByName(name);
            if (detailPokemonApi) {
                return res.status(200).send(detailPokemonApi)
            };
        }

    } catch (err) {
        res.status(404).send({
            error: err.code,
            description: err.message,
        })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
       
        if (id.includes('-')) {
            const detailPokemon = await Pokemon.findByPk(id, {
                include: Type,
            })
            res.status(200).json(detailPokemon)
        } else {
            const detailPokemonApi = await getPokemonById(parseInt(id));
            res.status(200).send(detailPokemonApi)
        }
    } catch (err) {
        res.status(404).send({
            error: err.code,
            description: err.message,
        })
    }
});

router.post('/', async (req, res) => {
    const { id, name, img, hp, defense, speed, height, types, attack, weight } = req.body
    try {
        if (!id || !name || !hp || !defense || !speed || !height || !types || !attack || !weight) {
            throw new Error('Faltan datos necesarios.');
        } else {
            const names = await getNames();
            const namesDB = await Pokemon.findAll();
            let allNames = [...names];
            namesDB.map((el) => allNames.push(el.name));
            // si trabajara con mi db usaría findorcreate

            if (allNames.includes(name)) throw new Error('El pokemon ya existe.');
            if (!/^[a-zA-Zñ\s]{1,20}$/.test(name)) throw new Error('Ingrese un nombre válido con un máximo de 20 caracteres.');
            validateRange(req.body);

            const newPokemon = await Pokemon.create({ id, name, img, hp, defense, speed, height, weight, attack });
            await newPokemon.addTypes(types);
            res.send({ description: 'Pokemon creado con éxito.' });
        }
    } catch (err) {
        res.status(404).send({
            error: err.code,
            description: err.message,
        })
    }
});

module.exports = router;