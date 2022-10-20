export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const GET_ONE_POKEMON = 'GET_ONE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const CLEAR = 'CLEAR';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_STRENGTH = 'ORDER_BY_STRENGTH';
export const SEND_ONE_POKEMON = 'SEND_ONE_POKEMON';
export const ADD_POKEMON = 'ADD_POKEMON';
export const RESET = 'RESET';
const URL = 'https://proyecto-individual-production.up.railway.app'


export const getTypes = () => dispatch => {
    return fetch(`${URL}`)
            .then(r => r.json())
            .then(d => dispatch({
                type: GET_TYPES,
                payload: d
            }))
            .catch(e => e.message);
};

export const getPokemons = () => dispatch => {
    return fetch(`${URL}/pokemons`)
            .then(r => r.json())
            .then(d => dispatch({
                type: GET_POKEMONS,
                payload: d
            }))
            .catch(e => e.message);
};

export const sendOnePokemon = (pokemon) => dispatch => {
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(pokemon)
    }
    fetch(`${URL}/pokemons`, config)
        .then(r => r.json())
        .then(d => dispatch({
            type: SEND_ONE_POKEMON,
            payload: d
        }))
        .catch(e => e.message);
};

export const getOnePokemon = (name) => dispatch => {
    return fetch(`${URL}/pokemons?name=${name}`)
            .then(r => r.json())
            .then(d => dispatch ({
                type: GET_ONE_POKEMON,
                payload: d
            }))
            .catch(e => e.message);
};

export const getPokemonDetail = (id) => dispatch => {
    return fetch(`${URL}/pokemons/${id}`)
            .then(r => r.json())
            .then(d => dispatch ({
                type: GET_POKEMON_DETAIL,
                payload: d
            }))
            .catch(e => e.message);
};

export const clear = () => {
    return {
        type: CLEAR,
        payload: {}
    }
};

export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPE,
        payload,
    }
};

export const filterByOrigin = (payload) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload,
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export const orderByStrength = (payload) => {
    return {
        type: ORDER_BY_STRENGTH,
        payload
    }
};

export const addPokemon = (payload) => {
    return {
        type: ADD_POKEMON,
        payload
    }
};

export const reset = () => {
    return {
        type: RESET,
    }
}