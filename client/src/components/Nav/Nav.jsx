import React from 'react';
import { NavLink } from 'react-router-dom';
import PokeApi from '../../Images/Nav/pokeapi.png'
import s from './Nav.module.css'

export default function Nav(props) {
    return (
        <React.Fragment>
            <nav className={s.container}>
                <NavLink exact to={'/home'} >
                    <img src={PokeApi} alt='logo-pokeapi' className={s.poke} />
                </NavLink>
                <ul className={s.list}>
                    <li>
                        <NavLink exact to={'/home'} className={s.link} activeClassName={s.activeLink} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/create'} className={s.link} activeClassName={s.activeLink} >Create Pokemon</NavLink>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}