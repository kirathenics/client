import React from 'react'
import styles from './Top3-item.module.css'

export function Top3Item ({top}){
    return(
        <div key={top.id} className={styles.item}>
                <h2>{top.FIO}</h2>
                <p>{top.Info}</p>
                <button>Узнать больше</button>
            </div>
    )
}
