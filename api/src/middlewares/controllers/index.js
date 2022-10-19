const axios = require('axios').default;

async function getPokemonByName(name) {
    const dataPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(r => r.data)
        .then(r => {
            return {
                id: r.id,
                name: r.name,
                img: r.sprites.other.dream_world.front_default,
                hp: r.stats[0].base_stat,
                attack: r.stats[1].base_stat,
                defense: r.stats[2].base_stat,
                speed: r.stats[5].base_stat,
                height: r.height,
                weight: r.weight,
                types: r.types.map(el => {
                    return { name: el.type.name }
                }),
                created: false,
            }
        })
        .catch(e => { throw new Error('Hubo un problema al obtener el dato por nombre en la Api.') })

    return dataPokemon;
};

async function getPokemonById(id) {
    const dataPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(r => r.data)
        .then(r => {
            return {
                id: r.id,
                name: r.name,
                img: r.sprites.other.dream_world.front_default,
                hp: r.stats[0].base_stat,
                attack: r.stats[1].base_stat,
                defense: r.stats[2].base_stat,
                speed: r.stats[5].base_stat,
                height: r.height,
                weight: r.weight,
                types: r.types.map(el => {
                    return { name: el.type.name }
                }),
                created: false,
            }
        })
        .catch(e => { throw new Error('Hubo un problema al obtener el dato por id en la Api.') })
    return dataPokemon;
};

async function getPokemonsApi() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20`
    const pokemonsApi = await axios.get(url)
        .then(r => r.data.results)
        .then(r => {
            return r.map(async (el) => await getPokemonByName(el.name))
        })
        .catch(e => { throw new Error('Hubo un problema al obtener los pokemons en la Api.') })

    const results = Promise.all(pokemonsApi).then(data => {
        return data
    }); 
    return results;
};

async function getNames() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20`
    const names = await axios.get(url)
        .then(r => r.data.results)
        .then(r => {
            let arr = [];
            r.map(el => arr.push(el.name))
            return arr;
        })
        .catch(e => { throw new Error('Hubo un problema al obtener los nombres en la Api.') })

    return names; 
};

function validateRange(obj) {
    const { hp, defense, speed, height, attack, weight } = obj;
    if (hp < 0 || hp > 200) {
        throw new Error('El rango de Health es 0 - 200')
    };
    if (attack < 0 || attack > 200) {
        throw new Error('El rango de Attack es 0 - 200')
    };
    if (defense < 0 || defense > 200) {
        throw new Error('El rango de Defense es 0 - 200')
    };
    if (speed < 0 || speed > 200) {
        throw new Error('El rango de Speed es 0 - 200')
    };
    if (height < 0 || height > 200) {
        throw new Error('El rango de Height es 0 - 200')
    };
    if (weight < 0 || weight > 10000) {
        throw new Error('El rango de Weight es 0 - 10000')
    };
};

module.exports = {
    getPokemonsApi,
    getPokemonByName,
    getPokemonById,
    getNames,
    validateRange,
};