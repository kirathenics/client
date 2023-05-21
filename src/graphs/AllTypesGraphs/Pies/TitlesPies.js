import React, { useEffect } from "react";
import styles from "./PieDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchTitlesCharts } from '../../../redux/slices/titles'

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

export function TitlesPies() {
    const dispatch = useDispatch()
    const { titlesCharts } = useSelector(state => state.titles)

    useEffect(() => {
        dispatch(fetchTitlesCharts())
    }, [dispatch])

    const dataHIndex = {
        labels: titlesCharts.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: titlesCharts.items.map(item => item.hIndex),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const dataCited = {
        labels: titlesCharts.items.map(item => item.name),
        datasets: [{
            label: 'Цитирование',
            data: titlesCharts.items.map(item => item.cited),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const options = {

    }

    return(
        <div className={styles.TitlesPies}>
            <div className={styles.TitlesH}>
            <Pie data = {dataHIndex} options={options}></Pie>
            </div>

            <div className={styles.TitlesCited}>
                <Pie data = {dataCited} options={options}></Pie>
            </div>
        </div>
    )
}