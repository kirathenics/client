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

    function handleClick() {
        window.open(props.item.profileLink)
        // window.location.href = props.item.profileLink
    }

    console.log(props.img)

    return(
        <div key={props.item._id} className={props.styles.item}>
            <div className={props.styles.topSection}>
                <img className={props.styles.ProfilePhoto} src={props.img} alt="вв" />
                <div className={props.styles.FIO}>
                    <p className={props.styles.F}>{parts[0]}</p>  
                    <p className={props.styles.IO}>{parts[1] + ' ' + parts[2]}</p>  
                </div>
            </div>
            <p>Количество цитирований: {props.item.cited}</p>
        </div>
    )
}
// src={require("./backgroundForTop/bronzebstu.jpg")}