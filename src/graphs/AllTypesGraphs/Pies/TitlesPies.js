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