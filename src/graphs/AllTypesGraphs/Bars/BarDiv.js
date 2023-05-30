import React from "react";
import styles from "./BarDiv.module.css"
import { HIndexBars } from "./HIndexBars";

export function BarDiv() {
    return(
        <div className={styles.BarDivs}>
            <div className={styles.hIndexBarDiv}>
                <HIndexBars/>
            </div>
        </div>
    )
}