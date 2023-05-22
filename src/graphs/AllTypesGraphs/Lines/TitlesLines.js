import React, { useEffect } from "react";
import styles from "./LineDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchTitlesLines } from '../../../redux/slices/titles'

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

export function TitlesLines() {
    const dispatch = useDispatch()
    const { titlesLines } = useSelector(state => state.titles)

    useEffect(() => {
        dispatch(fetchTitlesLines())
    }, [dispatch])

    const labels = titlesLines.items.reduce((prev, curr) => {
        curr.citationArray.forEach(item => {
            if (!prev.includes(item.year)) {
                prev.push(item.year)
            }
        })
        return prev
    }, [])

    let index = -1;
    const datasets = titlesLines.items.map(item => {
        index++
        return Object({
            label: item.name,
            data: item.citationArray.map(obj => obj.cited),
            backgroundColor: FacultiesColors[index % FacultiesColors.length],
            borderColor: FacultiesColors[index % FacultiesColors.length],
        })
    }).sort()

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
        <div className={styles.TitlesLines}>
            <div className={styles.TitlesData}>
            <Line data = {data} options={options}></Line>
            </div>
        </div>
    )
}