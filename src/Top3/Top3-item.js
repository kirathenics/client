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

export function Top3Item (props) {
    const parts = props.item.fullName.split(' ')

    return(
        <div key={props.item._id} className={props.styles.item}>
            <div className={props.styles.topSection}>
                <img className={props.styles.ProfilePhoto} src={props.item.imageLink} alt="" />
                <div className={props.styles.FIO}>
                    <p className={props.styles.F}>{parts[0]}</p>  
                    <p className={props.styles.IO}>{parts[1] + ' ' + parts[2]}</p>  
                </div>
                
            </div>
            <p>Количество цитирований: {props.item.cited}</p>
            <button><a href = {props.item.profileLink}>Узнать больше</a></button>
        </div>
    )
}