import {
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_TYPES,
    GET_ONE_POKEMON,
    CLEAR,
    FILTER_BY_TYPE,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_STRENGTH,
    SEND_ONE_POKEMON,
    ADD_POKEMON,
    RESET,

} from '../actions/index.js';

const initialState = {
    pokemonFound: {},
    pokemons: [],
    pokemonDetail: {},
    types: [],
    copypokemons: [],
    responseDB : {},
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                copypokemons: action.payload,
            };
        case SEND_ONE_POKEMON:
            return {
                ...state,
                responseDB: action.payload
            };
        case ADD_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                copypokemons: [...state.copypokemons, action.payload],
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload,
            };
        case CLEAR:
            return {
                ...state,
                pokemonDetail: action.payload,
                pokemonFound: action.payload,
                responseDB: action.payload,
            };
        case GET_ONE_POKEMON:
            return {
                ...state,
                pokemonFound: action.payload,
            };
        case FILTER_BY_TYPE:
            const copypokemons = state.copypokemons;
            const pokemonsFiltered = action.payload === 'all' ? copypokemons : copypokemons.filter(el => {
                let data = el.types.map(el => el.name);
                if (data.includes(action.payload)) return el
            });
            return {
                ...state,
                pokemons: pokemonsFiltered
            };
        case FILTER_BY_ORIGIN:
            const copypokemons2 = state.copypokemons;
            const origin = action.payload === 'db' ?
                copypokemons2.filter(el => el.created)
                :
                copypokemons2.filter(el => !el.created)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.copypokemons : origin,
            };
        case ORDER_BY_NAME:
            const copypokemons3 = state.pokemons;
            const orderName = action.payload === 'az' ?
                copypokemons3.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
                :
                copypokemons3.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.pokemons : orderName,
            };
        case ORDER_BY_STRENGTH:
            const copypokemons4 = state.pokemons;
            const orderStrength = action.payload === 'sw' ?
                copypokemons4.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (a.attack < b.attack) {
                        return 1;
                    }
                    return 0;
                })
                :
                copypokemons4.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (a.attack < b.attack) {
                        return -1;
                    }
                    return 0;
                });
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.pokemons : orderStrength,
            };
        case RESET:
            return {
                ...state,
                pokemons: state.copypokemons,
            }
        default:
            return {
                ...state
            };
    };
};

