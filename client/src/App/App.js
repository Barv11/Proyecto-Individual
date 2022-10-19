import './App.css';
import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import Home from '../components/Home/Home.jsx';
import InfoPokemon from '../components/InfoPokemon/InfoPokemon.jsx';
import CreatePokemon from '../components/CreatePokemon/CreatePokemon.jsx';
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes } from '../actions';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Route exact path={'/'} >
        <LandingPage />
      </Route>
      <Route path={'/home'} >
        <Home />
      </Route>
      <Route path={'/pokemons/:id'} >
        <InfoPokemon />
      </Route>
      <Route path={'/create'} >
        <CreatePokemon />
      </Route>
    </React.Fragment>
  );
};