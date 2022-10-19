import React from "react";
import { NavLink } from 'react-router-dom';
import s from './LandingPage.module.css'
import Poke from "../../Images/LandingPage/pikachu-5.gif";

export default function LandingPage () {

    return (
        <div className={`${s.container} ${s.center}`}>
            <div className={`${s.card} ${s.center}`}>
                <h1>BUSCA Y CREA</h1>
                <p>POKEMONS</p>
                <img src={Poke} alt="pikachu" />
                <NavLink to={'/home'} className={s.link}><span>Comenzar</span></NavLink>
            </div>
        </div>
    )
}