import React, { useState } from 'react'
// import styles1 from './styles.css'
import styles from './App.module.css'
//import { top3it } from './Top3.data';

//import {Top3Item} from './Top3/Top3-item';
import { Top3Profiles } from './Top3/Top3Profiles'
import NewTopIt from './search/Search'
import { ProfilesTable } from './tables/ProfilesTable'
import { FacultiesTable } from './tables/FacultiesTable'
import { DepartmentsTable } from './tables/DepartmentsTable'
import { FilSort } from './FilterSort/FilterSort'
//import styles1 from './Top3-item/Top3-item.module.css'

function App() {
  const [isOpen, setIsPressed] = useState(false)

  function handleButtonClick(){ 
    setIsPressed(!isOpen)
  }


  return (
    <div className={styles.MainDiv}>
      <div className={styles.divb} >
      <button onClick={()=>{handleButtonClick()}} className={!isOpen ? styles.butt : styles.Disable}  id={styles.left}>Таблицы</button>
      <button onClick={()=>{handleButtonClick()}} className={isOpen ? styles.butt : styles.Disable} id={styles.right}>Графики</button>
      </div>

      {isOpen && (<div className={styles.Graph}>

      </div>)}

      { /* <div className={styles.DivForTop3}>
        <h3 className={styles.Top3Header}>ТОП 3 СОТРУДНИКА ПО ЦИТИРОВАНИЮ</h3>
        <div className={styles.blockIt}>
        {top3it.length ? (top3it.map(top => <Top3Item styles={styles} key={top.id} top={top} /> ) ) 
        : <p>Отсутствуют данные по цитированию</p> }           
        </div>
      </div> */ }
      <Top3Profiles styles={styles} />
      <NewTopIt/>
      <FilSort/>
      
      <ProfilesTable/>
      <FacultiesTable/>
      <DepartmentsTable/>
    </div>
  );
}

export default App;