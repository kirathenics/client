import React from 'react'
//import { TestData } from '../Top3.data'
import styles from './Table.module.css'
import { useEffect } from 'react'

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
    {heading: 'Номер', value: 'id'},
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
        id: 1,
        fullName: 'Иванов Иван Иванович',
        profileLink: 'https://scholar.google.ru/citations?view_op=search_authors&hl=ru&mauthors=bstu.by&btnG=',
        imageLink: 'https://scholar.google.com/citations/images/avatar_scholar_128.png',
        faculty: 'Факультет',
        department: 'Кафедра',
        title: 'Должность',
        cited: 100,
        hIndex: 10,
        i10Index: 2,
    },
]

export function ProfilesTable() {
    /*const [dataTable, setDataTable] = useState([])
    console.log(dataTable)


    useEffect(()=>{
        const InfoArray = TestData()
        setDataTable(InfoArray)
    }, [])*/

    const dispatch = useDispatch()
    const { profiles } = useSelector(state => state.profiles)

    const isProfilesLoading = profiles.status === 'loading'

    useEffect(() => {
        dispatch(fetchProfiles())
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
                    { !isProfilesLoading && profiles.items.map((item, index) => <TableRow item={item} id={index}/>)}
                </tbody>
            </table>
        </div>
    )
    /*return(
        <div className={styles.TableWrapper}>
            <table className={styles.BigTable}>
                <thead>
                    <tr>
                        {tableColumns.map(item => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {(isProfilesLoading ? sample : profiles.items).map((item, index) => <TableRow item={item} id={index}/>)}
                </tbody>
            </table>
        </div>
    )*/
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
            <td ><a href = {props.item.profileLink}>{props.item.fullName}</a></td>
            <td><img src = {props.item.imageLink} alt = "" /></td>
            <td>{props.item.faculty}</td>
            <td>{props.item.department}</td>
            <td>{props.item.title}</td>
            <td>{props.item.cited}</td>
            <td>{props.item.hIndex}</td>
            <td>{props.item.i10Index}</td>
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