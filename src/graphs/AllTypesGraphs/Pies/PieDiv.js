import React from "react";
import styles from "./PieDiv.module.css"
import { DepartmentPies } from "./DepartmentsPies";
import { FacultiesPies } from "./FacultiesPies";
import { TitlesPies } from "./TitlesPies";

export function PieDiv(){
    return(
        <div className={styles.PieDivs}>
            <div className={styles.FacultyPieDiv}>
            <h3>ПО ФАКУЛЬТЕТАМ</h3>
                <FacultiesPies/>
            </div>

            <h3>ПО КАФЕДРАМ</h3>
            <div className={styles.DepartmentPieDiv}>
                <DepartmentPies/>
            </div>

            <h3>ПО ДОЛЖНОСТЯМ</h3>
            <div className={styles.TitlesPieDiv}>
                <TitlesPies/>
            </div>
        </div>
    )
}