import React from "react";
import styles from "./GraphApp.module.css"
import { PieDiv } from "./AllTypesGraphs/Pies/PieDiv";
import { LineDiv } from "./AllTypesGraphs/Lines/LineDiv";

export function GraphApp() {
    return(
    <div className={styles.Main}>
        {/* <PieDiv/> */}
        <LineDiv/>
    </div>
    )
}