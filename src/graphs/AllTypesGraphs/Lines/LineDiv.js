import React from "react";
import styles from "./LineDiv.module.css"
import { DepartmentLines } from "./DepartmentsLines";
import { FacultiesLines } from "./FacultiesLines";
import { TitlesLines } from "./TitlesLines";

export function LineDiv(){
    return(
        
        <div className={styles.LineDivs}>
            <div className={styles.FacultyLineDiv}>
                <FacultiesLines/>
            </div>

            <div className={styles.DepartmentLineDiv}>
                <DepartmentLines/>
            </div>

            <div className={styles.TitlesLineDiv}>
                <TitlesLines/>
            </div>
        </div>
    )
}