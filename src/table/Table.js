import React from "react";
import { TestData } from "../Top3.data";
import styles from './Table.module.css'
import { useEffect, useState } from "react";

const columns = [
    {heading: 'id', value: 'id'},
    {heading: 'ФИО', value: 'FIO'},
    {heading: 'Info', value: 'Info'},
    {heading: 'Кол-во цитирований', value: 'cited'},  
    {heading: 'h', value: 'h'}
]

export function Table(){
    const [dataTable, setDataTable] = useState([])
    console.log(dataTable)


    useEffect(()=>{
        const InfoArray = TestData()
        setDataTable(InfoArray)
    }, [])



    return(
        <div className={styles.TableWrapper}>
            <table className={styles.BigTable}>
                <thead>
                    <tr>
                        {columns.map((item)=><TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((item)=><TableRow item={item}/>)}
                </tbody>
            </table>
        </div>
    )
}

function TableHeadItem({item}){
    return(
        <th>{item.heading}</th>
    )
}

// function TableRow({item}){
//     return(
//         <tr>
//             {
//                 columns.map((columnItem, index) => {
//                     return(
//                         <td>{item[`${columnItem.value}`]}</td>
//                     )
//                 })
//             }
//         </tr>
//     )
// }

function TableRow({item}){
    return(
        <tr>
            {/* <td>{item[`${item.id}`]}</td>
            <td>{item[`${item.FIO}`]}</td>
            <td>{item[`${item.Info}`]}</td>
            <td>{item[`${item.h}`]}</td> */}
            <td>{item.id}</td>
            <td>{item.FIO}</td>
            <td>{item.Info}</td>
            <td>{item.cited}</td>
            <td>{item.h}</td>
        </tr>
    )
}