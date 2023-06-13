import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartmentsLines, filterDepartmentsLines } from '../../../redux/slices/departments'

import styles from "./LineDiv.module.css"
import { arrDepartments } from "../../../FacDepTitlesNames";
// import { FiFilter } from "react-icons/fi";
import { FacultiesColors } from "../../Colors";
import { GraphFilter } from "../../GraphFilter";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

export function DepartmentLines(props) {
    // const [object, setObject]=useState({arrDepartments:[],arrFaculties:[],arrTitles:[]})
    // const RefButF = useRef(null)
    // const RefButS = useRef(null)
    // const RefF = useRef(null)
    // const RefS = useRef(null)

    // const [isPressedF, setIsPressedF]=useState(false);
    // const [isPressedS, setIsPressedS]=useState(false);
    // const [dataDepartments, setData]=useState(arrDepartments);

    // const toggleDropdownF = () => {setIsPressedF(!isPressedF)}
    // const toggleDropdownS = () => {setIsPressedS(!isPressedS)}

    // const handleButtonClick = (key, e, index) => {
        
    //     if (key==='arrDepartments') {
    //         const newData = [...dataDepartments]
    //         newData[index].flag = !newData[index].flag
    //         setData(newData);
    //     }

    //     const temp = e.target.innerText;
    //     const currentArr1 = object[key]; 
    //     if (currentArr1.includes(temp)) {
    //         setObject({ ...object, [key]: currentArr1.filter(item => item !== temp) });
    //     } 
    //     else {
    //         setObject({ ...object, [key]: [...currentArr1, temp] });
    //     }   
    // }

    // const handleClickOutsideF = (event) => {
    //     if(RefF.current && RefButF.current && !RefF.current.contains(event.target) && !RefButF.current.contains(event.target)){
    //         setIsPressedF(false)
    //     }
    // }

    // const handleClickOutsideS = (event) => {
    //     if(RefS.current && RefButS.current && !RefS.current.contains(event.target) && !RefButS.current.contains(event.target)) {
    //         setIsPressedS(false) 
    //     }
    // }
    
    // const [clickedOnApplyButton, setClickedOnApplyButton] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (clickedOnApplyButton) {
    //         dispatch(filterDepartmentsLines(object))
    //         setClickedOnApplyButton(!clickedOnApplyButton)
    //     }
    // }, [clickedOnApplyButton])

    // const handleClickApply = () => {
    //     setClickedOnApplyButton(true)
    //     console.log(object)
    // }

    // const handleClickDel = () => {
    //     setClickedOnApplyButton(true)

    //     setObject({arrDepartments:[],arrFaculties:[],arrTitles:[]})
    //     dataDepartments.forEach((obj)=>{obj.flag=false})
    // }

    // useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideF); 
    // return()=>{document.removeEventListener('mousedown', handleClickOutsideF);};},[RefF])

    // useEffect(()=>{document.addEventListener('mousedown', handleClickOutsideS); 
    // return()=>{document.removeEventListener('mousedown', handleClickOutsideS);};},[])

    const { departmentsLines } = useSelector(state => state.departments)

    useEffect(() => {
        dispatch(fetchDepartmentsLines())
    }, [dispatch])

    // const labels = departmentsLines.items.reduce((prev, curr) => {
    let labels = (departmentsLines.filtered ? departmentsLines.changedItems : departmentsLines.items).reduce((prev, curr) => {
        curr.citationArray.forEach(item => {
            if (!prev.includes(item.year)) {
                prev.push(item.year)
            }
        })
        return prev
    }, []).sort()

    let index = -1;
    // const datasets = departmentsLines.items.map(item => {
    let datasets = (departmentsLines.filtered ? departmentsLines.changedItems : departmentsLines.items).map(item => {
        index++
        let arrCited = Array(labels.length - item.citationArray.length)
        arrCited = arrCited.concat(item.citationArray.map(obj => obj.cited))
        return Object({
            label: item.name,
            data: arrCited,
            backgroundColor: FacultiesColors[index % FacultiesColors.length],
            borderColor: FacultiesColors[index % FacultiesColors.length],
        })
    })

    const data = {
        labels: labels,
        datasets: datasets,
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y:{
                title:{
                    display:true,
                    text:"h-индекс",
                    color: "rgb(33,47,92)",
                }
            },
            x:{
                title:{
                    display:true,
                    text:"Год",
                    color: "rgb(33,47,92)",
                }
            },
          },
        plugins: {
            legend:{
                display:false,
            },
        }   

    }

    return(
        <div className={styles.DepartmentLines}>
            
        {/* <button ref={RefButF} onClick={toggleDropdownF} className={isPressedF ? filterStyles.FilterPG : filterStyles.FilterG}>Фильтр<FiFilter className={filterStyles.FilI}/></button>
        {isPressedF&&(<div ref={RefF} className={filterStyles.DivWithFilG}>
            <div className={filterStyles.AllFilters}>
            <div className={filterStyles.CafedG}>
            <div className={filterStyles.Str}>Кафедра</div>
            <div className={filterStyles.FilButs}>{dataDepartments.map((item, index)=>(<button className={item.flag ? filterStyles.Choose : filterStyles.NotChoose} key={item.id} onClick={(e, item)=>{handleButtonClick('arrDepartments', e, index)}}>{item.name}</button>))}</div>
            </div>

            </div>
            <div className={filterStyles.ApplyDel}>
                <button onClick={handleClickApply} className={filterStyles.Apply}>Применить</button>
                <button onClick={handleClickDel} className={filterStyles.Del}>Очистить</button> 
            </div>
                    
        </div>)} */}
        <GraphFilter filter={filterDepartmentsLines} array={arrDepartments}/>

        <h3>ПО КАФЕДРАМ</h3>
        <div className={styles.DL}>
           <div className={styles.DepartmentData}>
                <Line data = {data} options={options} width={600} height={100}></Line>
            </div> 
        </div>
            
        </div>
    )
}