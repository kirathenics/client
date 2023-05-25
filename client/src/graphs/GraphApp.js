import React from "react";
import styles from "./GraphApp.module.css"
import { PieDiv } from "./AllTypesGraphs/Pies/PieDiv";
import { LineDiv } from "./AllTypesGraphs/Lines/LineDiv";
import { BarDiv } from "./AllTypesGraphs/Bars/BarDiv";

export function GraphApp() {
    return(
    <div className={styles.Main}>
        <PieDiv/>
        <LineDiv/>
        <BarDiv/>
    </div>
    )
}