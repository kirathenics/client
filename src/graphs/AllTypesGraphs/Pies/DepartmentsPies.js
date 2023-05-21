import React, { useEffect } from "react";
import styles from "./PieDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartmentsCharts } from '../../../redux/slices/departments'

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
    const { departmentsCharts } = useSelector(state => state.departments)

    useEffect(() => {
        dispatch(fetchDepartmentsCharts())
    }, [dispatch])

    const dataHIndex = {
        labels: departmentsCharts.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: departmentsCharts.items.map(item => item.hIndex),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const dataCited = {
        labels: departmentsCharts.items.map(item => item.name),
        datasets: [{
            label: 'Цитирование',
            data: departmentsCharts.items.map(item => item.cited),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const options = {

    }

    return(
        <div className={styles.DepartmentPies}>
            <div className={styles.DepartmentH}>
                <Pie data = {dataHIndex} options={options}></Pie>
            </div>
                
            <div className={styles.DepartmentCited}>
                <Pie data = {dataCited} options={options}></Pie>
            </div>
        </div>
    )
}