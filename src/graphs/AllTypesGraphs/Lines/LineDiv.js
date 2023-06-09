import React, {useState, useEffect} from "react";
import styles from "./LineDiv.module.css"
import { DepartmentLines } from "./DepartmentsLines";
import { FacultiesLines } from "./FacultiesLines";
import { TitlesLines } from "./TitlesLines";

export function LineDiv(){

    const [windowSize, setWindowSize] = useState(0);
      useEffect(() => {
        function handleResize() {
          setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [window.innerWidth]);
      

    return(
        
        <div className={styles.LineDivs}>
            <div className={styles.FacultyLineDiv}>
                <FacultiesLines winSize={windowSize}/>
            </div>

            <div className={styles.DepartmentLineDiv}>
                <DepartmentLines winSize={windowSize}/>
            </div>

            <div className={styles.TitlesLineDiv}>
                <TitlesLines winSize={windowSize}/>
            </div>
        </div>
    )
}