import React, { useEffect } from "react";
import styles from "./PieDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchTitlesPies } from '../../../redux/slices/titles'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
)

export function TitlesPies() {
    const dispatch = useDispatch()
    const { titlesPies } = useSelector(state => state.titles)

    useEffect(() => {
        dispatch(fetchTitlesPies())
    }, [dispatch])

    const dataHIndex = {
        labels: titlesPies.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: titlesPies.items.map(item => item.hIndex),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const dataCited = {
        labels: titlesPies.items.map(item => item.name),
        datasets: [{
            label: 'Цитирование',
            data: titlesPies.items.map(item => item.cited),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const optionsH = {
        plugins:{
            legend:{
                display:false,
                position: 'right',
                
                labels:{
                    boxWidth: 10,
                    padding: 15,
                    overflow: 'auto',
                }
            }
        },
        responsive:true,
        maintainAspectRatio: false,
        
    };
    const optionsC = {
        plugins:{
            legend:{
                display:false,
            },
            
        },
        responsive:true,
        maintainAspectRatio: false,
        
    };

    let sumH = 0;
    let sumC = 0;
    titlesPies.items.forEach((obj) => {
    sumH += obj.hIndex;
    sumC += obj.cited;
    });

    return(
        <div className={styles.TitlesPies}>
            <div className={styles.TitlesH}>
            <Pie data = {dataHIndex} options={optionsH}></Pie>
            </div>
            <div className={styles.forh4}>
                <h4>Суммарные значения</h4>
                <h4>Должностей: {titlesPies.items.length}</h4>
                <h4>h-индекс: {sumH}</h4>
                <h4>Цитирование: {sumC}</h4>
            </div>
            <div className={styles.TitlesCited}>
                <Pie data = {dataCited} options={optionsC}></Pie>
            </div>
        </div>
    )
}