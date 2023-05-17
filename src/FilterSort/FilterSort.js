import React, { useEffect, useState, useRef } from "react";
import styles from './FilterSort.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProfilesFiltered } from '../redux/slices/profiles'

export function FilSort() {

    // const arrDepartments = [
    //     {name:'Кафедра такая-то', id: 1, flag: false},
    //     {name:'Кафедра такая-то111', id: 2, flag: false},
    //     {name:'аааааа3аааааааа ааааааа', id: 3, flag: false},
    //     {name:'авмфва', id: 4},
    //     {name:'мфаввввв', id: 5},
    //     {name:'фмавссысчысыф', id: 6},
    //     {name:'ыфвфывывыфв', id: 7},
    //     {name:'фывсвывыфсыфвсыв', id: 8},
    //     {name:'свысвыфыфсв ыфсвыфвысывфсыв', id: 9},
    //     {name:'ысвывсы сысвсывсывсывсвысвы', id: 10},
    //     {name:'епкркртепаав', id: 11},
    //     {name:'1324к5675454322', id: 12},
    //     {name:'ыаыам', id: 13},
    //     {name:'00000000000000000000000 000000000 00000000', id: 14}
    // ]

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

    // const arrDepartments = [
    //     {name:'Кафедра такая-то', id: 1, flag: false},
    //     {name:'Кафедра такая-то111', id: 2, flag: false},
    //     {name:'аааааа3аааааааа ааааааа', id: 3, flag: false},
    //     {name:'авмфва', id: 4},
    //     {name:'мфаввввв', id: 5},
    //     {name:'фмавссысчысыф', id: 6},
    //     {name:'ыфвфывывыфв', id: 7},
    //     {name:'фывсвывыфсыфвсыв', id: 8},
    //     {name:'свысвыфыфсв ыфсвыфвысывфсыв', id: 9},
    //     {name:'ысвывсы сысвсывсывсывсвысвы', id: 10},
    //     {name:'епкркртепаав', id: 11},
    //     {name:'1324к5675454322', id: 12},
    //     {name:'ыаыам', id: 13},
    //     {name:'00000000000000000000000 000000000 00000000', id: 14}
    // ]

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
        {text:'h-индекс возр.', field:'h', seq:1, flag:false,},
        {text:'h-индекс убыв.', field:'h', seq:-1, flag:true,},
        {text:'ФИО возр.', field:'fio', seq:1, flag:false,},
    const arrSort = [
        {text:'h-индекс возр.', field:'h', seq:1, flag:false,},
        {text:'h-индекс убыв.', field:'h', seq:-1, flag:true,},
        {text:'ФИО возр.', field:'fio', seq:1, flag:false,},
        {text:'ФИО убыв.', field:'fio', seq:-1, flag:false,},
        {text:'Цитирование возр.', field:'cited', seq:1, flag:false,},
        {text:'Цитирование убыв.', field:'cited', seq:-1, flag:false,}
        {text:'Цитирование убыв.', field:'cited', seq:-1, flag:false,}
    ]

    const [object, setObject]=useState({arrDepartments:[],arrFaculties:[],arrTitles:[]})
    const [object, setObject]=useState({arrDepartments:[],arrFaculties:[],arrTitles:[]})
    const [sort, setSort] = useState({text:'ФИО возр.', field:'fio', seq:1, flag:true})
    const RefButF = useRef(null)
    const RefButS = useRef(null)
    const RefF = useRef(null)
    const RefS = useRef(null)

    const [isPressedF, setIsPressedF]=useState(false);
    const [isPressedS, setIsPressedS]=useState(false);
    const [dataDepartments, setData]=useState(arrDepartments);
    const [dataFaculties, setDataFaculties]=useState(arrFaculties);
    const [dataTitles, setDataTitles]=useState(arrTitles);
    const [dataSort, setDataSort] = useState(arrSort);
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

    const handleButtonClickS=(e, index)=>{
        const newData = dataSort.map((item)=>{return{...item, flag:false};})
        newData[index].flag = true;
        setDataSort(newData);
        setSort(newData[index])
    }

    const handleClickOutsideF = (event) => {
        if(RefF.current && RefButF.current && !RefF.current.contains(event.target) && !RefButF.current.contains(event.target)){
            setIsPressedF(false)}
    }

    const handleClickOutsideS = (event) => {
        if(RefS.current && RefButS.current && !RefS.current.contains(event.target) && !RefButS.current.contains(event.target)){
            setIsPressedS(false)}
    }
    
    const [clickedOnApplyButton, setClickedOnApplyButton] = useState(false);

    const dispatch = useDispatch()
    const { profiles } = useSelector(state => state.profiles)

    //const isProfilesLoading = profiles.status === 'loading'
    useEffect(() => {
        if (clickedOnApplyButton) {
            //console.log(JSON.stringify(object))
            dispatch(fetchProfilesFiltered(object))
        }
    }, [dispatch, clickedOnApplyButton])

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideF); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideF);};},[RefF])

    useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideS); 
    return()=>{document.removeEventListener('mousedown', handleClickOutsideS);};},[])

    /*console.log(object)
    console.log(sort)
    console.log(dataSort)*/
    // console.log(data)
    return(
        <div className={styles.FiltSort}>

            <div className={styles.FilDiv}>
                <button ref={RefButF} onClick={toggleDropdownF} className={isPressedF ? styles.FilterP : styles.Filter}>Фильтр</button>
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
                    <div className={styles.Str}>Звание</div>
                    <div className={styles.FilButs}>{dataTitles.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arrTitles', e, index)}}>{item.name}</button>))}</div>
                    </div>
                    </div>
                    <div className={styles.ApplyDel}>
                        <button onClick={() => setClickedOnApplyButton(true)} className={styles.Apply}>Применить</button>
                        <button className={styles.Del}>Очистить</button> 
                    </div>
                    

                </div>)}

                
                 <button ref={RefButS} onClick={toggleDropdownS} className={isPressedS ? styles.SortP : styles.Sort}>Сортировка</button>
                    {isPressedS&&(<div ref={RefS} className={styles.DivWithSort}>
                        {dataSort.map((item, index)=>(<button className={item.flag ? styles.Choose : styles.NotChoose} key={index} onClick={(e, item)=>{handleButtonClickS(e, index)}}>{item.text}</button>))}
                        {/* <button onClick={()=>handleButtonClickS('fio', 1)}>ФИО возр.</button>
                        <button onClick={()=>handleButtonClickS('fio', -1)}>ФИО убыв.</button>
                        <button onClick={()=>handleButtonClickS('cited', 1)}>Цитирование возр</button>
                        <button onClick={()=>handleButtonClickS('cited', -1)}>Цитирование убыв.</button>
                        <button onClick={()=>handleButtonClickS('h', 1)}>Индекс-h возр.</button>
                        <button onClick={()=>handleButtonClickS('h', -1)}>Индекс-hё убыв.</button> */}
                    </div>)}

                
            </div>

        </div>
    )
}

// export {object, sort}