import React, { useEffect, useState, useRef } from "react";
import styles from './FilterSort.module.css'

import { useDispatch } from 'react-redux'
import { sortProfiles, filterProfiles } from '../redux/slices/profiles'

import { FiFilter } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { BsSortAlphaDownAlt, BsSortAlphaDown, BsSortDownAlt, BsSortDown } from "react-icons/bs";

const arrDepartments = [
    {name:'Академический резерв кафедр', id: 1, flag: false},
    {name:'Кафедра автоматизации технологических процессов и производств', id: 2, flag: false},
    {name:'Кафедра архитектуры', id: 3, flag: false},
    {name:'Кафедра белорусского и русского языков', id: 4},
    {name:'Кафедра бухгалтерского учета, анализа и аудита', id: 5},
    {name:'Кафедра водоснабжения, водоотведения и охраны водных ресурсов', id: 6},
    {name:'Кафедра высшей математики', id: 7},
    {name:'Кафедра геотехники и транспортных коммуникаций', id: 8},
    {name:'Кафедра гуманитарных наук', id: 9},
    {name:'Кафедра инженерной экологии и химии', id: 10},
    {name:'Кафедра иностранных языков', id: 11},
    {name:'Кафедра интеллектуальных информационных технологий', id: 12},
    {name:'Кафедра информатики и прикладной математики', id: 13},
    {name:'Кафедра машиноведения', id: 14},
    {name:'Кафедра машиностроения и эксплуатации автомобилей', id: 15},
    {name:'Кафедра менеджмента', id: 16},
    {name:'Кафедра мировой экономики, маркетинга, инвестиций', id: 17},
    {name:'Кафедра начертательной геометрии и инженерной графики', id: 18},
    {name:'Кафедра прикладной механики', id: 19},
    {name:'Кафедра природообустройства', id: 20},
    {name:'Кафедра строительных конструкций', id: 21},
    {name:'Кафедра теплогазоснабжения и вентиляции', id: 22},
    {name:'Кафедра технологии бетона и строительных материалов', id: 23},
    {name:'Кафедра технологии строительного производства', id: 24},
    {name:'Кафедра физики', id: 25},
    {name:'Кафедра физического воспитания и спорта', id: 26},
    {name:'Кафедра экономики и организации строительства', id: 27},
    {name:'Кафедра экономической теории и логистики', id: 28},
    {name:'Кафедра электронных вычислительных машин и систем', id: 29}
]

const arrFaculties = [
    {name:'Академический резерв факультетов', id: 1, flag: false},
    {name:'Машиностроительный факультет', id: 2, flag: false},
    {name:'Строительный факультет', id: 3, flag: false},
    {name:'Факультет инженерных систем и экологии', id: 4},
    {name:'Факультет электронно-информационных систем', id: 5},
    {name:'Экономический факультет', id: 6},
]

const arrTitles = [
    {name:'Профессор', id: 1, flag: false},
    {name:'Доцент', id: 2, flag: false},
    {name:'Специалист', id: 3, flag: false},
]

const arrSort = [
    {text:'h-индекс возр.', field:'hIndex', seq:1, flag:false, icon:<BsSortDownAlt className={styles.SortButI}/>},
    {text:'h-индекс убыв.', field:'hIndex', seq:-1, flag:true, icon:<BsSortDown className={styles.SortButI}/>},
    {text:'ФИО возр.', field:'fullName', seq:1, flag:false, icon: <BsSortAlphaDown className={styles.SortButI}/>},
    {text:'ФИО убыв.', field:'fullName', seq:-1, flag:false, icon: <BsSortAlphaDownAlt className={styles.SortButI}/>},
    {text:'Цитирование возр.', field:'cited', seq:1, flag:false, icon:<BsSortDownAlt className={styles.SortButI}/>},
    {text:'Цитирование убыв.', field:'cited', seq:-1, flag:false, icon:<BsSortDownAlt className={styles.SortButI}/>}
]

export function FilSort(props) {
    const [object, setObject]=useState({arrDepartments:[],arrFaculties:[],arrTitles:[]})
    //const [sort, setSort] = useState({text:'ФИО возр.', field:'fullName', seq:1, flag:true})
    const RefButF = useRef(null)
    const RefButS = useRef(null)
    const RefF = useRef(null)
    const RefS = useRef(null)

    // props.Sort = sort

    const [isPressedF, setIsPressedF]=useState(false);
    const [isPressedS, setIsPressedS]=useState(false);
    const [dataDepartments, setData]=useState(arrDepartments);
    const [dataFaculties, setDataFaculties]=useState(arrFaculties);
    const [dataTitles, setDataTitles]=useState(arrTitles);
    const [dataSort, setDataSort] = useState(arrSort);

    const toggleDropdownF = () => {setIsPressedF(!isPressedF)}
    const toggleDropdownS = () => {setIsPressedS(!isPressedS)}

    const handleButtonClick = (key, e, index) => {
        
        if(key==='arrDepartments'){
            const newData = [...dataDepartments]
            newData[index].flag = !newData[index].flag
            setData(newData);
        }
        else if(key==='arrFaculties'){
            const newData = [...dataFaculties]
            newData[index].flag = !newData[index].flag
            setDataFaculties(newData);
        }
        else if(key==='arrTitles'){
            const newData = [...dataTitles]
            newData[index].flag = !newData[index].flag
            setDataTitles(newData);
        }


        const temp = e.target.innerText;
        const currentArr1 = object[key]; 
        if (currentArr1.includes(temp)) {
            setObject({ ...object, [key]: currentArr1.filter(item => item !== temp) });
        } 
        else {
            setObject({ ...object, [key]: [...currentArr1, temp] });
        }   
    }

    const handleButtonClickSearch = (e, index)=>{
        const newData = dataSort.map((item)=>{return{...item, flag:false};})
        newData[index].flag = true;
        setDataSort(newData);

        dispatch(sortProfiles(newData[index]))
    }

    const handleClickOutsideF = (event) => {
        if(RefF.current && RefButF.current && !RefF.current.contains(event.target) && !RefButF.current.contains(event.target)){
            setIsPressedF(false)
        }
    }

    const handleClickOutsideS = (event) => {
        if(RefS.current && RefButS.current && !RefS.current.contains(event.target) && !RefButS.current.contains(event.target)) {
            setIsPressedS(false) 
        }
    }
    
    const [clickedOnApplyButton, setClickedOnApplyButton] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (clickedOnApplyButton) {
            dispatch(filterProfiles(object))
            setClickedOnApplyButton(!clickedOnApplyButton)
        }
    }, [dispatch, clickedOnApplyButton, object])

    const handleClickApply = () => {
        setClickedOnApplyButton(true)
        dispatch(filterProfiles(object))
    }

    const handleClickDel = () => {
        setClickedOnApplyButton(true)
        
        setObject({arrDepartments:[],arrFaculties:[],arrTitles:[]})
        dataDepartments.forEach((obj)=>{obj.flag=false})
        dataFaculties.forEach((obj)=>{obj.flag=false})
        dataTitles.forEach((obj)=>{obj.flag=false})
    }

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideF); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideF);};},[RefF])

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideS); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideS);};},[])
    
    return(
        <div className={styles.FiltSort}>

            <div className={styles.FilDiv}>
                <button ref={RefButF} onClick={toggleDropdownF} className={isPressedF ? styles.FilterP : styles.Filter}>Фильтр<FiFilter className={styles.FilI}/></button>
                {isPressedF&&(<div ref={RefF} className={styles.DivWithFil}>
                    <div className={styles.AllFilters}>
                    <div className={styles.Cafed}>
                    <div className={styles.Str}>Кафедра</div>
                    <div className={styles.FilButs}>{dataDepartments.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arrDepartments', e, index)}}>{item.name}</button>))}</div>
                    </div>

                    <div className={styles.Facult}>
                    <div className={styles.Str}>Факультет</div>
                    <div className={styles.FilButs}>{dataFaculties.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arrFaculties', e, index)}}>{item.name}</button>))}</div>
                    </div>

                    <div className={styles.Spec}>
                    <div className={styles.Str}>Должность</div>
                    <div className={styles.FilButs}>{dataTitles.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arrTitles', e, index)}}>{item.name}</button>))}</div>
                    </div>
                    </div>
                    <div className={styles.ApplyDel}>
                        <button onClick={handleClickApply} className={styles.Apply}>Применить</button>
                        <button onClick={handleClickDel} className={styles.Del}>Очистить</button> 
                    </div>
                    

                </div>)}

                
                 <button ref={RefButS} onClick={toggleDropdownS} className={isPressedS ? styles.SortP : styles.Sort}>Сортировка<BiSort className={styles.SortI}/></button>
                    {isPressedS && (<div ref={RefS} className={styles.DivWithSort}>
                        {dataSort.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={index} onClick={(e, item)=>{handleButtonClickSearch(e, index)}}>{item.text}{item.icon}</button>))}
                    </div>)}

                
            </div>

        </div>
    )
}
