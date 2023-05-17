import React from 'react'
import styles from './Table.module.css'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchFaculties } from '../redux/slices/faculties'

const tableColumns = [
    {heading: 'Номер', value: 'id'},
    {heading: 'Название', value: 'name'},
    {heading: 'Количество сотрудников', value: 'amount'},
    {heading: 'Цитирование', value: 'cited'},  
    {heading: 'h-индекс', value: 'hIndex'},
    {heading: 'i10-индекс', value: 'i10Index'},
]

export const sample = [
    {
        id: 0,
        name: 'Факультет',
        amount: 33,
        cited: 100,
        hIndex: 10,
        i10Index: 2,
    },
]

export function FacultiesTable() {
    const dispatch = useDispatch()
    const { faculties } = useSelector(state => state.faculties)

    const isFacultiesLoading = faculties.status === 'loading'

    useEffect(() => {
        dispatch(fetchFaculties())
    }, [dispatch])

    return(
        <div className={styles.TableWrapper}>
            <table className={styles.BigTable}>
                <thead>
                    <tr>
                        {tableColumns.map(item => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {(isFacultiesLoading ? sample : faculties.items).map((item, index) => <TableRow item={item} id={index}/>)}
                </tbody>
            </table>
        </div>
    )
}

function TableHeadItem({item}) {
    return(
        <th>{item.heading}</th>
    )
}

function TableRow(props) {
    return(
        <tr>
            <td>{props.id + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.amount}</td>
            <td>{props.item.cited}</td>
            <td>{props.item.hIndex}</td>
            <td>{props.item.i10Index}</td>
        </tr>
    )
}