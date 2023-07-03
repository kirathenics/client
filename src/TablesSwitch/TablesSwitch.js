import { useState } from 'react'
import styles from './TablesSwitch.module.css'

export function TablesSwitch (){

    const[pressSwitchItem, setPressSwitchItem] = useState('scholar')

    const handleClickItem = (name) =>{
        setPressSwitchItem(name)
    }

    // useEffect(() => {
        
    // }, []);


    return(
        <div className={styles.ForSwitch}>
            <h3>Выберите базу данных:</h3>
            <div id={pressSwitchItem === 'scholar' ? styles.Pressed : styles.NotPressed} className={styles.SwitchItem1} onClick={()=>handleClickItem("scholar")}><img src={require("./pic/GoogleScholar.jpg")}  alt="" /></div>
            <div id={pressSwitchItem === 'scopus' ? styles.Pressed : styles.NotPressed} className={styles.SwitchItem2} onClick={()=>handleClickItem("scopus")}><img src={require("./pic/Scopus.jpg")}  alt="" /></div>
            <div id={pressSwitchItem === 'web' ? styles.Pressed : styles.NotPressed} className={styles.SwitchItem3} onClick={()=>handleClickItem("web")}><img src={require("./pic/WebOfScience.jpg")}  alt="" /></div>            
        </div>
    )
}