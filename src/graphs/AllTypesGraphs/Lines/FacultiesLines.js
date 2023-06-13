import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchFacultiesLines, filterFacultiesLines } from '../../../redux/slices/faculties'

import styles from "./LineDiv.module.css"
import { arrFaculties } from "../../../FacDepTitlesNames";
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

export function FacultiesLines(props) {
    const dispatch = useDispatch()
    const { facultiesLines } = useSelector(state => state.faculties)

    useEffect(() => {
        dispatch(fetchFacultiesLines())
    }, [dispatch])

    // let labels = facultiesLines.items.reduce((prev, curr) => {
    let labels = (facultiesLines.filtered ? facultiesLines.changedItems : facultiesLines.items).reduce((prev, curr) => {
        curr.citationArray.forEach(item => {
            if (!prev.includes(item.year)) {
                prev.push(item.year)
            }
        })
        return prev
    }, []).sort()

    let index = -1;
    // let datasets = facultiesLines.items.map(item => {
    let datasets = (facultiesLines.filtered ? facultiesLines.changedItems : facultiesLines.items).map(item => {
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

    // console.log(props.winSize)
    const[widthOfGraph, setWidthOfGraph] = useState(0)
    const [heightOfGraph, setHeighOfGraph] = useState(0)
    useEffect(()=>{
       if(props.winSize < 600){
        setWidthOfGraph(800)
        setHeighOfGraph(100)
    }
    else{
        setWidthOfGraph(1200)
        setHeighOfGraph(500)
    } 
    },[props.winSize])
    
    return(
        <div className={styles.FacultiesLines}>

        {/* <GraphFilter filter={filterFacultiesLines} array={arrFaculties}></GraphFilter> */}
            
        <h3>ПО ФАКУЛЬТЕТАМ</h3>
        <div className={styles.FL}>
            <div className={styles.FacultiesData}>
                <Line data = {data} options={options} width={600} height={100}></Line>
            </div>
        </div>
            
        </div>
    )
}