import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clear, getPokemonDetail } from '../../actions/index.js'
import Spinner from '../Spinner/Spinner.jsx';
import s from './InfoPokemon.module.css'
import getTypeColor from '../functions/index.js'
import StatBar from '../StatBar/StatBar.jsx';
import Nav from '../Nav/Nav.jsx';

export default function InfoPokemon(props) {


    const { id } = useParams();
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail)

    useEffect(() => {
        dispatch(getPokemonDetail(id));
        return dispatch(clear());
    }, [dispatch]);
    
    console.log(pokemonDetail)
    const { name, img, hp, attack, defense, speed, height, weight, types } = pokemonDetail;

    return (
        <React.Fragment>
            <Nav />

            {Object.entries(pokemonDetail).length === 0 ? <Spinner /> : (
                <main className={s.container}>

                    <div className={s.containerchild}></div>
                    <img src={img} alt={name} className={s.img} />
                    <div className={s.stats}>
                        <h1>{name}</h1>
                        <h3>Salud:</h3>
                        <div className={s.stat}>
                            <img src={require(`./../../Images/InfoPokemon/hp.png`).default} alt={`hp de ${name}`} />
                            <StatBar
                                color={'rgb(207, 58, 58)'}
                                percentage={hp}
                                total={200}
                            />
                        </div>
                        <h3>Ataque:</h3>
                        <div className={s.stat}>
                            <img src={require(`./../../Images/InfoPokemon/attack.png`).default} alt={`attack de ${name}`} />
                            <StatBar
                                color={'rgb(38, 231, 70)'}
                                percentage={attack}
                                total={200}
                            />
                        </div>
                        <h3>Defensa:</h3>
                        <div className={s.stat}>
                            <img src={require(`./../../Images/InfoPokemon/defense.png`).default} alt={`defense de ${name}`} />
                            <StatBar
                                color={'rgb(65, 28, 199)'}
                                percentage={defense}
                                total={200}
                            />
                        </div>
                        <h3>Velocidad:</h3>
                        <div className={s.stat}>
                            <img src={require(`./../../Images/InfoPokemon/speed.png`).default} alt={`speed de ${name}`} />
                            <StatBar
                                color={'rgb(0, 177, 201)'}
                                percentage={speed}
                                total={200}
                            />
                        </div>
                        <div className={s.nostatbar}>
                            <div className={`${s.stat}`}>
                                <img src={require(`./../../Images/InfoPokemon/height.png`).default} alt={`height de ${name}`} />
                                <h3>Tamaño:</h3>
                                <span>{height} cm.</span>
                            </div>
                            <div className={`${s.stat}`}>
                                <img src={require(`./../../Images/InfoPokemon/weight.png`).default} alt={`weight de ${name}`} />
                                <h3>Peso:</h3>
                                <span>{weight} kg.</span>
                            </div>
                        </div>
                        <div className={s.type}>
                            {types?.map(el => {
                                let nameSplit = el.name.split('')
                                let first = nameSplit.shift().toUpperCase();
                                nameSplit.unshift(first);
                                let nameUpper = nameSplit.join('');
                                return (
                                    <div className={s.typechild}>
                                        <p key={nameUpper} style={getTypeColor(el.name)}>{nameUpper}</p>
                                        <img src={require(`./../../Images/Pokemon/${el.name}.png`).default} alt={el.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </main>
            )}
        </React.Fragment>
    )
}