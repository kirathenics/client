import React from 'react'
import styles from '../App.module.css'
import { Top3Item } from './Top3-item'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchTop3 } from '../redux/slices/top3'

export const sample = [
    {
        fullName: 'Иванов Иван Иванович',
        profileLink: 'https://scholar.google.ru/citations?view_op=search_authors&hl=ru&mauthors=bstu.by&btnG=',
        imageLink: 'https://scholar.google.com/citations/images/avatar_scholar_128.png',
        cited: 100,
    }
]

export function Top3Profiles() {
    const dispatch = useDispatch()
    const { top3 } = useSelector(state => state.top3)

    const isTop3Loading = top3.status === 'loading'

    useEffect(() => {
        dispatch(fetchTop3())
    }, [])

    return(
        <div className={styles.DivForTop3}>
            <h3 className={styles.Top3Header}>ТОП 3 СОТРУДНИКА ПО ЦИТИРОВАНИЮ</h3>
            <div className={styles.blockIt}>
            {(isTop3Loading ? sample : top3.items).map(item => <Top3Item styles={styles} key={item.id} item={item} />)} 
            {/*  {props.top3it.length ? (props.top3it.map(top => <Top3Item styles={props.styles} key={top.id} top={top} /> ) ) 
            : <p>Отсутствуют данные по цитированию</p> }  */}       
        </div>
      </div>
    )
}