import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Pokemon.module.css'
import getTypeColor from '../functions/index.js'

export default function Pokemon(props) {

    const { id, name, img, types } = props;



    return (
        <div className={s.card}>
            <img src={img} alt={name} className={s.pokeimg} />
            <NavLink to={`/pokemons/${id}`} className={s.link} ><span>{name}</span></NavLink>
            <div className={s.type}>
                {types?.map(el => {
                    let nameSplit = el.name.split('')
                    let first = nameSplit.shift().toUpperCase();
                    nameSplit.unshift(first);
                    let nameUpper = nameSplit.join('');
                    if (el.name === 'unknown') {
                        return (
                            <div className={s.typechild}>
                                <img src={require(`./../../Images/Pokemon/${el.name}.png`).default} alt={el.name} className={s.unknown} />
                            </div>
                        )
                    } else {
                        return (
                            <div className={s.typechild}>
                                <p key={nameUpper} style={getTypeColor(el.name)}>{nameUpper}</p>
                                <img src={require(`./../../Images/Pokemon/${el.name}.png`).default} alt={el.name} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}