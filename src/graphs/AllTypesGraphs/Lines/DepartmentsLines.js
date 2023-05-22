import React, { useEffect } from "react";
import styles from "./LineDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartmentsLines } from '../../../redux/slices/departments'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

export function DepartmentLines() {
    const dispatch = useDispatch()
    const { departmentsLines } = useSelector(state => state.departments)

    useEffect(() => {
        dispatch(fetchDepartmentsLines())
    }, [dispatch])

    const labels = departmentsLines.items.reduce((prev, curr) => {
        curr.citationArray.forEach(item => {
            if (!prev.includes(item.year)) {
                prev.push(item.year)
            }
        })
        return prev
    }, []).sort()

    let index = -1;
    const datasets = departmentsLines.items.map(item => {
        index++
        return Object({
            label: item.name,
            data: item.citationArray.map(obj => obj.cited),
            backgroundColor: FacultiesColors[index % FacultiesColors.length],
            borderColor: FacultiesColors[index % FacultiesColors.length],
        })
    })

    const data = {
        labels: labels,
        datasets: datasets,
    }

    const options = {
        plugins: {
            responsive: true,
            maintainAspectRatio: false,
        }   
    }

    return(
        <div className={styles.DepartmentLines}>
            <div className={styles.DepartmentData}>
                <Line data = {data} options={options}></Line>
            </div>
        </div>
    )
}