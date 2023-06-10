import React, { useState } from 'react'
// import styles1 from './styles.css'
import styles from './App.module.css'
//import { top3it } from './Top3.data';

//import {Top3Item} from './Top3/Top3-item';
import { Top3Profiles } from './Top3/Top3Profiles'
import { Search } from './search/Search'
import { ProfilesTable } from './tables/ProfilesTable'
import { FacultiesTable } from './tables/FacultiesTable'
import { DepartmentsTable } from './tables/DepartmentsTable'
import { FilSort } from './FilterSort/FilterSort'
import { GraphApp } from './graphs/GraphApp'
//import styles1 from './Top3-item/Top3-item.module.css'

import { VscTable } from "react-icons/vsc";
import { AiOutlineLineChart } from "react-icons/ai";

function App() {
  const [isOpen, setIsPressed] = useState(false)

  function handleButtonClick(){ 
    setIsPressed(!isOpen)
  }

  return (
    <div className={styles.MainDiv}>
      <div className={styles.divb} >
      <button onClick={()=>{handleButtonClick()}} className={!isOpen ? styles.butt : styles.Disable}  id={styles.left}><VscTable className={styles.Icon}/> Таблицы</button>
      <button onClick={()=>{handleButtonClick()}} className={isOpen ? styles.butt : styles.Disable} id={styles.right}>Графики <AiOutlineLineChart className={styles.Icon}/></button>
      </div>
      
      <div className={isOpen ? styles.Graph : styles.NotOpenGraph}>
        <GraphApp/>
      </div>

      <Top3Profiles styles={styles} />
      <Search/>
      <FilSort/>
      
      <ProfilesTable/>
      <FacultiesTable/>
      <DepartmentsTable/>
      <p className={styles.H4Footer}>Данные для страницы взяты из сервиса Google Scholar(Академия Google) — бесплатная поисковая система по научным публикациям. На данной странице можно посмотреть цитируемость сотрудника, его активность в написании научных работ, а также увидеть общие данные по кафедрам и факультетам и оценить динамику измененния показателей.</p>
    </div>
  );
}

export default App;