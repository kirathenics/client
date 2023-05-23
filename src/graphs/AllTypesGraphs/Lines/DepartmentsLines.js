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
        let arrCited = Array(labels.length - item.citationArray.length)
        arrCited = arrCited.concat(item.citationArray.map(obj => obj.cited))
        return Object({
            label: item.name,
            data: arrCited,
            backgroundColor: FacultiesColors[index % FacultiesColors.length],
            borderColor: FacultiesColors[index % FacultiesColors.length],
        })
    })

    const data = {
        labels: labels,
        datasets: datasets,
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y:{
                title:{
                    display:true,
                    text:"h-индекс",
                    color: "rgb(33,47,92)",
                }
            },
            x:{
                title:{
                    display:true,
                    text:"Год",
                    color: "rgb(33,47,92)",
                }
            },
          },
        plugins: {
            legend:{
                display:false,
            },
        }   

    }

    return(
        <div className={styles.DepartmentLines}>
        <h3>ПО КАФЕДРАМ</h3>
            <div className={styles.DepartmentData}>
                <Line data = {data} options={options} height={500}></Line>
            </div>
        </div>
    )
}