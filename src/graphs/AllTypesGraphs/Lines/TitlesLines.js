import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchTitlesLines, filterTitlesLines } from '../../../redux/slices/titles'

import Gstyles from "../../GraphApp.module.css"
import styles from "./LineDiv.module.css"
import { arrTitles } from "../../../FacDepTitlesNames";
import { FacultiesColors } from "../../Colors";
import { GraphFilter } from "../../GraphFilter";

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

export function TitlesLines(props) {
    const dispatch = useDispatch()
    const { titlesLines } = useSelector(state => state.titles)

    useEffect(() => {
        dispatch(fetchTitlesLines())
    }, [dispatch])

    // const labels = titlesLines.items.reduce((prev, curr) => {
    let labels = (titlesLines.filtered ? titlesLines.changedItems : titlesLines.items).reduce((prev, curr) => {
        curr.citationArray.forEach(item => {
            if (!prev.includes(item.year)) {
                prev.push(item.year)
            }
        })
        return prev
    }, []).sort()

    let index = -1;
    // const datasets = titlesLines.items.map(item => {
    let datasets = (titlesLines.filtered ? titlesLines.changedItems : titlesLines.items).map(item => {
        index++
        let arrCited = Array(labels.length - item.citationArray.length)
        arrCited = arrCited.concat(item.citationArray.map(obj => obj.cited))
        return Object({
            label: item.name,
            data: arrCited,
            backgroundColor: FacultiesColors[index % FacultiesColors.length],
            borderColor: FacultiesColors[index % FacultiesColors.length],
        })
    }).sort()
    console.log(datasets)

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
        <div className={styles.TitlesLines}>

        <GraphFilter filter={filterTitlesLines} array={arrTitles} cid={Gstyles.trd}/>

        <h3>ПО ДОЛЖНОСТЯМ</h3>
        <div className={styles.TL}>
            <div className={styles.TitlesData}>
            <Line data = {data} options={options} width={600} height={100}></Line>
            </div>
        </div>
            
        </div>
    )
}