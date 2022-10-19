import React from 'react'
import s from './Pagination.module.css'

export default function Pagination(props) {

    const { page, setPage, total } = props

    const handlerNext = (e) => {
        e.preventDefault();
        setPage(page + 1);
        if (page >= total) {
            setPage(total);
        }
    };
    const handlerPrev = (e) => {
        e.preventDefault();
        setPage(page - 1);
        if (page <= 1) {
            setPage(1);
        }
    };

    return (
        <div className={s.container}>
            {/* {page === 1 ? null : <button onClick={handlerPrev} className={s.buttonprev} >👈</button>} */}
            <button onClick={handlerPrev} className={s.button} disabled={page === 1 ? true : false} >❮</button>
            {/* Agregar un display none */}
            <span className={s.page}>Página {page} de {total}</span>
            {/* {page === total ? null : <button onClick={handlerNext} className={s.buttonnext} >👉</button>} */}
            <button onClick={handlerNext} className={s.button} disabled={page === total ? true : false} >❯</button>
        </div>
    )
}
