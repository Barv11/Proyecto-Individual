import React from 'react'
import s from './StatBar.module.css'

export default function StatBar(props) {
    const { color, percentage, total } = props;

    let newPercentage = percentage / (total / 100)

    const child = {
        width: `${newPercentage}%`,
        backgroundColor: color,
    }

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <div className={s.percentage} style={child}><span className={s.span}>{`${percentage}/${total}`}</span></div>
            </div>
        </div>
    )
}
