import React, { useEffect } from "react";
import styles from "./BarDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchProfilesHIndex } from '../../../redux/slices/profiles'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export function HIndexBars() {
    const dispatch = useDispatch()
    const { profilesHIndex } = useSelector(state => state.profiles)

    useEffect(() => {
        dispatch(fetchProfilesHIndex())
    }, [dispatch])
    
    let dataset = []
    profilesHIndex.items.forEach(item => {
        const found = dataset.find(obj => obj.hIndex === item.hIndex)
        found ? found.count++ : dataset.push({ hIndex: item.hIndex, count: 1 })
    })
    dataset = dataset.sort((a, b) => a.hIndex - b.hIndex)
    console.log(dataset)

    const data = {
        labels: dataset.map(item => item.hIndex),
        datasets: [{
            label: 'Количество сотрудников',
            data: dataset.map(item => item.count),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }
    
    const options = {
        plugins:{
            legend:{
                display:false,
            },
        },
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            y:{
                title:{
                    display:true,
                    text:"Количество сотрудников",
                    color: "rgb(33,47,92)",
                }
            },
            x:{
                title:{
                    display:true,
                    text:"h-индекс",
                    color: "rgb(33,47,92)",
                }
            },
          },
    }

    return (
        <div className={styles.hIndexBars}>
            <div className={styles.hIndexData}>
                <Bar data = {data} options={options} height={500}></Bar>
            </div>
        </div>
    )
}