import React from 'react'
import { TestData } from '../Top3.data'
import styles from './Table.module.css'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProfiles } from '../redux/slices/profiles'

/*const columns = [
    {heading: 'id', value: 'id'},
    {heading: 'ФИО', value: 'FIO'},
    {heading: 'Info', value: 'Info'},
    {heading: 'Кол-во цитирований', value: 'cited'},  
    {heading: 'h', value: 'h'}
]*/

const tableColumns = [
    {heading: 'ФИО', value: 'fullName'},
    {heading: 'Фото', value: 'imageLink'},
    {heading: 'Факультет', value: 'faculty'},
    {heading: 'Кафедра', value: 'department'},
    {heading: 'Должность', value: 'title'},
    {heading: 'Цитирование', value: 'cited'},  
    {heading: 'h-индекс', value: 'hIndex'},
    {heading: 'i10-индекс', value: 'i10Index'},
]

export const sample = [
    {
        //id: 1,
        fullName: 'Иванов Иван Иванович',
        imageLink: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        faculty: 'Факультет',
        department: 'Кафедра',
        title: 'Должность',
        cited: 100,
        hIndex: 10,
        i10Index: 2,
    },
]

export function Table() {
    /*const [dataTable, setDataTable] = useState([])
    console.log(dataTable)


    useEffect(()=>{
        const InfoArray = TestData()
        setDataTable(InfoArray)
    }, [])*/

    const dispatch = useDispatch()
    const { profiles } =useSelector(state => state.profiles)

    const isProfilesLoading = profiles.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchProfiles())
    }, [])

    return(
        <div className={styles.TableWrapper}>
            <table className={styles.BigTable}>
                <thead>
                    <tr>
                        {//{columns.map((item)=><TableHeadItem item={item}/>)}
                        }
                        {tableColumns.map(item => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {//{dataTable.map((item)=><TableRow item={item}/>)}
                    }
                    {/*{(isProfilesLoading ? [...Array(3)] : profiles.items).map(item => 
                        isProfilesLoading ? (

                        ) : (

                        )

                    )}*/}
                    {(isProfilesLoading ? sample : profiles.items).map(item => <TableRow item={item}/>)}
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

function TableRow({item}){
    return(
        <tr>
            <td>{item.fullName}</td>
            <td><img src = {item.imageLink} alt = "" /></td>
            <td>{item.faculty}</td>
            <td>{item.department}</td>
            <td>{item.title}</td>
            <td>{item.cited}</td>
            <td>{item.hIndex}</td>
            <td>{item.i10Index}</td>
        </tr>
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

// function TableRow({item}){
//     return(
//         <tr>
//             {/* <td>{item[`${item.id}`]}</td>
//             <td>{item[`${item.FIO}`]}</td>
//             <td>{item[`${item.Info}`]}</td>
//             <td>{item[`${item.h}`]}</td> */}
//             <td>{item.id}</td>
//             <td>{item.FIO}</td>
//             <td>{item.Info}</td>
//             <td>{item.cited}</td>
//             <td>{item.h}</td>
//         </tr>
//     )
// }