import React, { useState, useEffect } from 'react'
//import { TestData } from '../Top3.data'
import styles from './Table.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProfiles, fetch20Profiles, sortProfiles } from '../redux/slices/profiles'

/*const columns = [
    {heading: 'id', value: 'id'},
    {heading: 'ФИО', value: 'FIO'},
    {heading: 'Info', value: 'Info'},
    {heading: 'Кол-во цитирований', value: 'cited'},  
    {heading: 'h', value: 'h'}
]*/

const tableColumns = [
    {heading: 'Номер', value: 'id', sortAvailable: false },
    {heading: 'ФИО', value: 'fullName', sortAvailable: true },
    {heading: 'Фото', value: 'imageLink', sortAvailable: false},
    {heading: 'Факультет', value: 'faculty', sortAvailable: false},
    {heading: 'Кафедра', value: 'department', sortAvailable: false},
    {heading: 'Должность', value: 'title', sortAvailable: false},
    {heading: 'Цитирование', value: 'cited', sortAvailable: true},  
    {heading: 'h-индекс', value: 'hIndex', sortAvailable: true},
    {heading: 'i10-индекс', value: 'i10Index', sortAvailable: false},
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
        dispatch(fetch20Profiles())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProfiles())
    }, [dispatch])
    /*const [isProfilesChanged, setIsProfilesChanged]=useState(false)
    useEffect(() => {
        setIsProfilesChanged(false)
    }, [profiles.changedItems.length])*/

    const [countOfPersons, setCountOfPersons]=useState(0)
    const [sumOfCited, setSumOfCited] = useState(0)
    const [sumOfH, setSumOfH] = useState(0)
    const [sumOfI10, setSumOfI10] = useState(0)

    useEffect(()=>{
        const newCount = profiles.items.length;
        setCountOfPersons(newCount);

        let newSumCited = 0;
        profiles.items.forEach((obj) => {
        newSumCited += obj.cited;});
        setSumOfCited(newSumCited);

        let newSumH = 0;
        profiles.items.forEach((obj) => {
        newSumH += obj.hIndex;});
        setSumOfH(newSumH);

        let newSumI10 = 0;
        profiles.items.forEach((obj) => {
        newSumI10 += obj.i10Index;});
        setSumOfI10(newSumI10);

    },[profiles])

    // console.log(countOfPersons)
    
    return(
        <>
            <div className={styles.DivWithSumInfo}>
                <div className={styles.SumInfo}>Сотрудников: {countOfPersons}</div>
                <div title='Индекс цитирования Google Scholar – это статистический инструмент для определения рейтинга ученых.' className={styles.SumInfo}>Суммарное цитирование: {sumOfCited}</div>
                <div title='h-индекс равняется количеству h статей, процитированных как минимум h раз.' className={styles.SumInfo}>Суммарный h-индекс: {sumOfH}</div>
                <div title='Индекс i-10 указывает на количество академических публикаций, написанных автором, которые цитировались по крайней мере в 10 источниках.' className={styles.SumInfo}>Суммарный i10-индекс: {sumOfI10}</div>
            </div>
            <h3>Таблица по сотрудникам</h3>
            <div className={styles.TableWrapper}>
            <table className={styles.BigTable}>
                <thead>
                    <tr>
                        {tableColumns.map(item => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {((isProfilesLoading ? sample : (profiles.filtered ? profiles.changedItems : profiles.items)).map((item, index) => <TableRow item={item} id={index}/>))}
                </tbody>
            </table>
        </div>
        </>
        
    )
}

function TableHeadItem({item}) {
    const [sortObject, setSortObject]=useState({field: '', seq: -1})
    const dispatch = useDispatch()

    function handleSort(column) {
        let newSeq = sortObject.seq
        if (column === sortObject.field) {
            newSeq = -sortObject.seq
        }
        setSortObject({...sortObject, field: column, seq: newSeq})
        dispatch(sortProfiles(Object({
            field: column,
            seq: newSeq,
        })))
    }

    return(
        <th onClick={() => { if(item.sortAvailable) handleSort(item.value)}}>{item.heading}</th>
    )
}

function TableRow(props) {
    return(
        <tr>
            <td>{props.id + 1}</td>
            <td ><a href = {props.item.profileLink} target="_blank" rel="noopener noreferrer">{props.item.fullName}</a></td>
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