import styles from './Search.module.css'
import { useState } from 'react'

export function NewTopIt () {
    const [getv, setGet] = useState('')
    const [FIO, setFIO] = useState('')

    const handleInputChange = e =>{
        setGet(e.target.value)
    } 

    const handleButtonClick = e =>{
        e.preventDefault()
        setFIO(`Find: ${getv}`)
    }

    return(
        <form className={styles.form}>
            <input id='inp' placeholder="Кого хотите найти?" 
                onChange={handleInputChange}
                value = {getv}    
            />
            <button href="#pn" className={styles.but} onClick={handleButtonClick}>Поиск</button>
            <button className={styles.CancelFind}>X</button>
            <div className={styles.break}></div>
            
            <p id="pn" className={styles.pp}>{FIO}</p>
        </form>
    )
}

//export default NewTopIt