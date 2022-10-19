import React from 'react';
import Spinner from '../Spinner/Spinner.jsx'
import Pokemon from '../Pokemon/Pokemon.jsx'
import s from './Pokemons.module.css';

export default function Pokemons(props) {

    const { pokemons, page, current } = props;

    return (
        <React.Fragment>
            <div className={s.pokemon}>
                {!pokemons.length ?
                    <Spinner />
                    :
                    pokemons
                        .slice((page - 1) * current, (page - 1) * current + current)
                        .map(el => (
                            <Pokemon
                                key={el.name}
                                id={el.id}
                                name={el.name}
                                img={el.img}
                                types={el.types}
                            />
                        ))}
            </div>
        </React.Fragment>
    )
}