import React from 'react'
import s from './Spinner.module.css'

export default function Spinner() {
    return (
        <div className={s.spinner}>
            <span className={s.loader}></span>
        </div>
    )
}