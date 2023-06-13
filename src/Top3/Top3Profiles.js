import React from 'react'
import styles from '../App.module.css'
import { Top3Item } from './Top3-item'
import { useEffect } from 'react'

// import a from 'D:\Учёба\Веб\v2\client\backgroundForTop\silverbstu.jpg'



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
            {/* <div className={styles.blockIt}>
            {(isTop3Loading ? sample : top3.items).map(item => <Top3Item styles={styles} key={item.id} item={item} />)}     
            </div> */}

            {!isTop3Loading&&(<div className={styles.NewTop3}>
                <div className={styles.ForColumns}>
                    <div className={styles.Columns}><img src={require("./backgroundForTop/silverbstu1.png")} alt="dd" /><div className={styles.T2}>{isTop3Loading ? <Top3Item styles={styles} item={sample[0]}/> : <Top3Item styles={styles} item={top3.items[1]} img={require("./backgroundForTop/silverbstu1.png")}/>}</div></div>
                    <div className={styles.Columns}><img src={require("./backgroundForTop/goldbstu1.png")} alt="dd" /><div className={styles.invisibleGold}></div><div className={styles.T1}>{isTop3Loading ? <Top3Item styles={styles} item={sample[0]}/> : <Top3Item styles={styles} item={top3.items[0]} img={require("./backgroundForTop/goldbstu1.png")}/>}</div></div>
                    <div className={styles.Columns}>
                        <img src={require("./backgroundForTop/bronzebstu1.png")} alt="dd" />
                        
                        <div className={styles.T3}>{isTop3Loading ? <Top3Item styles={styles} item={sample[0]}/> : <Top3Item styles={styles} item={top3.items[2]} img={require("./backgroundForTop/bronzebstu1.png")}/>}</div>
                    </div>
                </div>
                <div className={styles.bottomLine}></div>
            </div>)} 

        </div>
    )
}