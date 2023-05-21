import React, { useEffect } from "react";
import styles from "./PieDiv.module.css"
import { FacultiesColors } from "../../Colors";

import { useDispatch, useSelector } from 'react-redux'
import { fetchFacultiesCharts } from '../../../redux/slices/faculties'

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

export function FacultiesPies() {
    const dispatch = useDispatch()
    const { facultiesCharts } = useSelector(state => state.faculties)

    const isFacultiesChartsLoaded = facultiesCharts.status === 'loaded'

    useEffect(() => {
        dispatch(fetchFacultiesCharts())
    }, [dispatch])

    const dataHIndex = {
        labels: facultiesCharts.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: facultiesCharts.items.map(item => item.hIndex),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const dataCited = {
        labels: facultiesCharts.items.map(item => item.name),
        datasets: [{
            label: 'Цитирование',
            data: facultiesCharts.items.map(item => item.cited),
            backgroundColor: FacultiesColors,
            borderColor: FacultiesColors,
        }],
    }

    const options = {

    }

    return(
        <div className={styles.FacultiesPies}>
            <div className={styles.FacultiesH}>
                <Pie data = {dataHIndex} options={options}></Pie>
            </div>

            <div className={styles.FacultiesCited}>
                <Pie data = {dataCited} options={options}></Pie>
            </div>
        </div>
    )
}