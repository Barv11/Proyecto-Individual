import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Nav from '../Nav/Nav.jsx';
import Pokemons from '../Pokemons/Pokemons.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Filters from '../Filters/Filters.jsx';
import s from './Home.module.css'

export default function Home() {
    const types = useSelector(state => state.types);
    const pokemons = useSelector(state => state.pokemons);
    // Filters
	const [render, setRender] = useState();
    // Pagination
    const current = 10;
    const [page, setPage] = useState(1);
    const total = Math.ceil(pokemons.length / current);

    useEffect(() => {
		setRender(pokemons)
	}, [pokemons])
    console.log(pokemons)
    return (
        <React.Fragment>
            
            <Nav />

            <main className={s.container}>
                <Filters
                    pokemons={pokemons}
                    types={types}
                    setPage={setPage}
                    setRender={setRender}
                />

                <SearchBar />

                <Pagination
                    page={page}
                    setPage={setPage}
                    total={total}
                />

                {!pokemons.length ? <Spinner /> :
                    <Pokemons
                        pokemons={pokemons}
                        page={page}
                        current={current}
                    />
                }
                <Pagination
                    page={page}
                    setPage={setPage}
                    total={total}
                />
            </main>
        </React.Fragment>
    );
};

