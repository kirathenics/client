import React from 'react'
//import styles from './Top3-item.module.css'

// export function Top3Item ({top}){
//     return(
//         <div key={top.id} className={styles.item}>
//                 <h2>{top.FIO}</h2>
//                 <p>{top.Info}</p>
//                 <button>Узнать больше</button>
//             </div>
//     )
// }

export function Top3Item (props){
    return(
        <div key={props.top.id} className={props.styles.item}>
            <div >
                <img className={props.styles.ProfilePhoto} src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=LclhqW8AAAAJ&citpid=6" alt="Фото Schoolar" />
            </div>
            <h3>{props.top.FIO}</h3>
            <p>Процитрован(-а) {props.top.cited} раз</p>
            <button>Узнать больше</button>
        </div>
    )
}