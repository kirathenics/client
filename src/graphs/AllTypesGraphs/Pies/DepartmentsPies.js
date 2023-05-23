import React, { useEffect } from "react";
import styles from "./PieDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartmentsPies } from '../../../redux/slices/departments'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

export function DepartmentPies() {
    const dispatch = useDispatch()
    const { departmentsPies } = useSelector(state => state.departments)

    useEffect(() => {
        dispatch(fetchDepartmentsPies())
    }, [dispatch])

    const dataHIndex = {
        labels: departmentsPies.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: departmentsPies.items.map(item => item.hIndex),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const dataCited = {
        labels: departmentsPies.items.map(item => item.name),
        datasets: [{
            label: 'Цитирование',
            data: departmentsPies.items.map(item => item.cited),
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
            },
            title: {
                display: true,
                text: 'h-индекс',
                position: 'bottom',
                color: 'rgb(33,47,92)',
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
                text: 'h-индекс',
                position: 'bottom',
                color: 'rgb(33,47,92)',
            },
            
        },
        responsive:true,
        maintainAspectRatio: false,
        
    };

    let sumH = 0;
    let sumC = 0;
    departmentsPies.items.forEach((obj) => {
    sumH += obj.hIndex;
    sumC += obj.cited;
    });

    return(
        <div className={styles.DepartmentPies}>
            <div className={styles.DepartmentH}>
                <Pie data = {dataHIndex} options={optionsH}></Pie>
            </div>
            <div className={styles.forh4}>
                <h4>Суммарные значения</h4>
                <h4>Кафедр: {departmentsPies.items.length}</h4>
                <h4>h-индекс: {sumH}</h4>
                <h4>Цитирование: {sumC}</h4>
            </div>
            <div className={styles.DepartmentCited}>
                <Pie data = {dataCited} options={optionsC}></Pie>
            </div>
        </div>
    )
}