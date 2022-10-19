import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getOnePokemon, clear } from '../../actions/index.js'
import CardSearched from '../CardSearched/CardSearched.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import s from './SearchBar.module.css'

export default function SearchBar(props) {

    const [input, setInput] = useState('');
    const pokemonFound = useSelector(state => state.pokemonFound);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);


    const handleOnChange = (e) => {
        setInput(e.target.value)
        setLoading(true)
        dispatch(clear())
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(false)
        dispatch(getOnePokemon(input))
        setInput('')
    };
    const handlerOnDelete = () => {
        dispatch(clear())
        setLoading(true)
    }

    return (
        <div className={s.container}>
            <div className={s.search}>
                <form onSubmit={handleOnSubmit}>
                    <input
                        placeholder='Buscar pokemon...'
                        onChange={handleOnChange}
                        type="text"
                        autoComplete="off"
                        value={input}
                        className={s.input}
                    />
                    <input type="submit" value="Buscar" className={s.button} />
                </form>
            </div>
            {loading ?
                null
                :
                (Object.entries(pokemonFound).length === 0 ?
                    <Spinner />
                    :
                    Object.entries(pokemonFound).length === 1 ?
                        <span className={s.error}>{pokemonFound.description}</span>
                        :
                        <div className={s.rendercard}>
                            <CardSearched
                                key={pokemonFound.id}
                                id={pokemonFound.id}
                                name={pokemonFound.name}
                                img={pokemonFound.img}
                                types={pokemonFound.types}
                            />
                            <button onClick={handlerOnDelete} className={s.exit} >Cerrar búsqueda</button>
                        </div>
                )
            }
        </div>
    )
}