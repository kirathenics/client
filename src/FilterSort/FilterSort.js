import React, { useEffect, useState, useRef } from "react";
import styles from './FilterSort.module.css'

export function FilSort(){

    const MassKaf = [
        {name:'Кафедра такая-то', id: 1, flag: false},
        {name:'Кафедра такая-то111', id: 2, flag: false},
        {name:'аааааа3аааааааа ааааааа', id: 3, flag: false},
        {name:'авмфва', id: 4},
        {name:'мфаввввв', id: 5},
        {name:'фмавссысчысыф', id: 6},
        {name:'ыфвфывывыфв', id: 7},
        {name:'фывсвывыфсыфвсыв', id: 8},
        {name:'свысвыфыфсв ыфсвыфвысывфсыв', id: 9},
        {name:'ысвывсы сысвсывсывсывсвысвы', id: 10},
        {name:'епкркртепаав', id: 11},
        {name:'1324к5675454322', id: 12},
        {name:'ыаыам', id: 13},
        {name:'00000000000000000000000 000000000 00000000', id: 14}
    ]

    const [object, setObject]=useState({arr1:[],arr2:[]})
    const [sort, setSort] = useState({field:'cited',sequence:1})
    const RefButF = useRef(null)
    const RefButS = useRef(null)
    const RefF = useRef(null)
    const RefS = useRef(null)

    const [isPressedF, setIsPressedF]=useState(false);
    const [isPressedS, setIsPressedS]=useState(false);
    const [data, setData]=useState(MassKaf);

    const toggleDropdownF = () => {setIsPressedF(!isPressedF)}
    const toggleDropdownS = () => {setIsPressedS(!isPressedS)}

    const handleButtonClick = (key, e, index) => {
        const newData = [...data]
        newData[index].flag = !newData[index].flag
        setData(newData);

        const temp = e.target.innerText;
        const currentArr1 = object[key]; 
        if (currentArr1.includes(temp)) {
            setObject({ ...object, [key]: currentArr1.filter(item => item !== temp) });
        } 
        else {
            setObject({ ...object, [key]: [...currentArr1, temp] });
        }   
    }

    const handleButtonClickS=(field, seq)=>{
        setSort({field, seq})
    }

    const handleClickOutsideF = (event) => {
        if(RefF.current && RefButF.current && !RefF.current.contains(event.target) && !RefButF.current.contains(event.target)){
            setIsPressedF(false)}
    }

    const handleClickOutsideS = (event) => {
        if(RefS.current && RefButS.current && !RefS.current.contains(event.target) && !RefButS.current.contains(event.target)){
            setIsPressedS(false)}
    }

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideF); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideF);};},[RefF])

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideS); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideS);};},[])

    console.log(object)
    console.log(sort)
    console.log(data)
    return(
        <div className={styles.FiltSort}>

            <div className={styles.FilDiv}>
                <button ref={RefButF} onClick={toggleDropdownF} className={isPressedF ? styles.FilterP : styles.Filter}>Фильтр</button>
                {isPressedF&&(<div ref={RefF} className={styles.DivWithFil}>

                    <div className={styles.Cafed}>
                    <div className={styles.Str}>Кафедра</div>
                    <div className={styles.FilButs}>{data.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arr1', e, index)}}>{item.name}</button>))}</div>
                    </div>

                    <div className={styles.Facult}>
                    <div className={styles.Str}>Факультет</div>
                    <div className={styles.FilButs}>{data.map((item)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arr1', e, item)}}>{item.name}</button>))}</div>
                    </div>

                    <div className={styles.Spec}>
                    <div className={styles.Str}>Звание</div>
                    <div className={styles.FilButs}>{data.map((item)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arr1', e, item)}}>{item.name}</button>))}</div>
                    </div>

                </div>)}

                <button ref={RefButS} onClick={toggleDropdownS} className={isPressedS ? styles.SortP : styles.Sort}>Сортировка</button>
                    {isPressedS&&(<div ref={RefS} className={styles.DivWithSort}>
                        <button onClick={()=>handleButtonClickS('fio', 1)}>ФИО возр.</button>
                        <button onClick={()=>handleButtonClickS('fio', -1)}>ФИО убыв.</button>
                        <button onClick={()=>handleButtonClickS('cited', 1)}>Цитирование возр</button>
                        <button onClick={()=>handleButtonClickS('cited', -1)}>Цитирование убыв.</button>
                        <button onClick={()=>handleButtonClickS('h', 1)}>Индекс-h возр.</button>
                        <button onClick={()=>handleButtonClickS('h', -1)}>Индекс-hё убыв.</button>
                    </div>)}
            </div>

        </div>
    )
}

// export {object, sort}
