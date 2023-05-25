import React from "react";
import styles from "./PieDiv.module.css"
import { DepartmentPies } from "./DepartmentsPies";
import { FacultiesPies } from "./FacultiesPies";
import { TitlesPies } from "./TitlesPies";

export function PieDiv(){
    return(
        <div className={styles.PieDivs}>
            <div className={styles.FacultyPieDiv}>
                <FacultiesPies/>
            </div>

            <div className={styles.DepartmentPieDiv}>
                <DepartmentPies/>
            </div>

            <div className={styles.TitlesPieDiv}>
                <TitlesPies/>
            </div>
        </div>
    )
}