import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux'

import filterStyles from "../FilterSort/FilterSort.module.css"
//import { arrDepartments } from "../FacDepTitlesNames"
import { FiFilter } from "react-icons/fi";
import styles from "./GraphApp.module.css"

export function GraphFilter(props) {
    const [object, setObject]=useState({filterArr:[],arrFaculties:[],arrTitles:[]})
    const RefButF = useRef(null)
    const RefF = useRef(null)

    const [isPressedF, setIsPressedF]=useState(false);
    const [dataDepartments, setData]=useState(props.array);

    const toggleDropdownF = () => {setIsPressedF(!isPressedF)}

    const dispatch = useDispatch()

    const handleButtonClick = (key, e, index) => {
        
        const newData = [...dataDepartments]
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

    const handleClickOutsideF = (event) => {
        if(RefF.current && RefButF.current && !RefF.current.contains(event.target) && !RefButF.current.contains(event.target)){
            setIsPressedF(false)
        }
    }

    const [clickedOnApplyButton, setClickedOnApplyButton] = useState(false)

    useEffect(() => {
        if (clickedOnApplyButton) {
            dispatch(props.filter(object))
            setClickedOnApplyButton(!clickedOnApplyButton)
        }
    }, [clickedOnApplyButton])

    const handleClickApply = () => {
        setClickedOnApplyButton(true)
        console.log(object)
    }

    const handleClickDel = () => {
        setClickedOnApplyButton(true)

        setObject({filterArr:[],arrFaculties:[],arrTitles:[]})
        dataDepartments.forEach((obj)=>{obj.flag=false})
    }

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideF); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideF);};},[RefF])

    
    
    return(
        <>
         
        <button ref={RefButF} onClick={toggleDropdownF} className={isPressedF ? styles.FilterPG : styles.FilterG} id={props.cid}>Фильтр<FiFilter className={styles.FilI}/></button>
        {isPressedF&&(<div ref={RefF} className={styles.DivWithFilG} id={props.cid}>
            <div className={styles.AllFilters} id={props.cid}>
            <div className={filterStyles.CafedG}>
            {/* <div className={filterStyles.Str}>Кафедра</div> */}
            <div className={filterStyles.FilButs}>{dataDepartments.map((item, index)=>(<button className={item.flag ? filterStyles.Choose : filterStyles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('filterArr', e, index)}}>{item.name}</button>))}</div>
            </div>

            </div>
            <div className={styles.ApplyDel} id={props.cid}>
                <button onClick={handleClickApply} className={styles.Apply} id={props.cid}>Применить</button>
                <button onClick={handleClickDel} className={styles.Del} id={props.cid}>Очистить</button> 
            </div>
                    
        </div>)}
            
        </>
    )        
}