import React from "react";
import styles from "./GraphApp.module.css"
import { PieDiv } from "./AllTypesGraphs/Pies/PieDiv";
import { LineDiv } from "./AllTypesGraphs/Lines/LineDiv";
import { BarDiv } from "./AllTypesGraphs/Bars/BarDiv";

export function GraphApp() {
    return(
    <div className={styles.Main}>
        <PieDiv/>
        <h2>ЛИНЕЙНЫЕ ГРАФИКИ</h2>
        <h4>Данные линейные графики показывают динамику изменения суммарного h-индекса на каждый год для факультетов, кафедр и должностей.</h4>
        <LineDiv/>
        <h2>ГИСТОГРАММА</h2>
        <h4>Данная гистограмма показывает, сколько сотрудников имеют определённый h-индекс на данный момент.</h4>
        <BarDiv/>
        <div className={styles.hideLink}> <a href="https://www.youtube.com/watch?v=VCBVLFyv5es#t=0m24s" target="_blank">||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</a></div>
       
    </div>
    )
}