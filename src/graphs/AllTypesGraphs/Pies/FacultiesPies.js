import React, { useEffect } from "react";
import styles from "./PieDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchFacultiesPies } from '../../../redux/slices/faculties'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
)

export function FacultiesPies() {
    const dispatch = useDispatch()
    const { facultiesPies } = useSelector(state => state.faculties)

    useEffect(() => {
        dispatch(fetchFacultiesPies())
    }, [dispatch])

    const dataHIndex = {
        labels: facultiesPies.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: facultiesPies.items.map(item => item.hIndex),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const dataCited = {
        labels: facultiesPies.items.map(item => item.name),
        datasets: [{
            label: 'Цитирование',
            data: facultiesPies.items.map(item => item.cited),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const optionsH = {
        
        plugins:{
            title: {
                display: true,
                text: 'h-индекс',
                position: 'bottom',
                color: 'rgb(33,47,92)',
            },

            legend:{
                display:false,
                position: 'right',
                
                labels:{
                    boxWidth: 10,
                    padding: 15,
                    overflow: 'auto',
                }
            },
        },
        responsive:true,
        maintainAspectRatio: false,       
    };
    const optionsC = {
        plugins:{
            legend:{
                display:false,
            },
            title: {
                display: true,
                text: 'Цитирование',
                position: 'bottom',
                color: 'rgb(33,47,92)',
            },
            
        },
        responsive:true,
        maintainAspectRatio: false,
        
    };

    let sumH = 0;
    let sumC = 0;
    facultiesPies.items.forEach((obj) => {
    sumH += obj.hIndex;
    sumC += obj.cited;
    });

    return(
        <div className={styles.FacultiesPies}>
            <h3 className={styles.Pieh3}>ПО ФАКУЛЬТЕТАМ</h3>
            <div className={styles.bottom}>
                <div className={styles.FacultiesH}>
            
                    <Pie data = {dataHIndex} options={optionsH}></Pie>
            
                </div>

                <div className={styles.forh4}>
                    <h4>Суммарные значения</h4>
                    <h4>Факультетов: {facultiesPies.items.length}</h4>
                    <h4>h-индекс: {sumH}</h4>
                    <h4>Цитирование: {sumC}</h4>
                </div>
                <div className={styles.FacultiesCited}>
                    <Pie data = {dataCited} options={optionsC} ></Pie>
                </div>
            </div>
            
        </div>
    )
}