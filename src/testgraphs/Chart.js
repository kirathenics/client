import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartmentsCharts } from '../redux/slices/departments'

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

export function Charts() {
    const dispatch = useDispatch()
    const { departmentsCharts } = useSelector(state => state.departments)

    const isDepartmentsChartsLoaded = departmentsCharts.status === 'loaded'

    useEffect(() => {
        dispatch(fetchDepartmentsCharts())
    }, [dispatch])

    const data = {
        labels: departmentsCharts.items.map(item => item.name),
        datasets: [{
            label: 'h-индекс',
            data: departmentsCharts.items.map(item => item.hIndex),
            backgroundColor: ['rgb(109,184,206)','rgb(0,108,182)','rgb(86,173,114)','rgb(146,205,196)','rgb(140,160,211)'],
            borderColor: ['rgb(109,184,206)','rgb(0,108,182)','rgb(86,173,114)','rgb(146,205,196)','rgb(140,160,211)'],
        }],
    }

    const options = {

    }
     
    return(
        <>
           <Pie data = {data} options={options}></Pie>
        </>
    )
}