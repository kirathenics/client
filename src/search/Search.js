import styles from './Search.module.css'
import { useEffect, useState, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { searchProfiles, setProfiles } from '../redux/slices/profiles'

export function Search() {
    const [found, setFound] = useState('')
    const [fullName, setFullName] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const { profiles } = useSelector(state => state.profiles)
    const isProfilesLoaded = profiles.status === 'loaded'
    const isProfilesFiltered = profiles.filtered === 'true'

    const [isCopiedAfterLoading, setIsCopiedAfterLoading] = useState(false)
    const [isCopiedAfterFiltering, setIsCopiedAfterFiltering] = useState(false)
    const [copyProfiles, setCopyProfiles] = useState([])

    const [showCancel, setShowCancel] = useState(false)

    //const buttonC = document.getElementById("CancelButton");
    

    if (isProfilesLoaded && !isCopiedAfterLoading) {
        setCopyProfiles(profiles.items)
        setIsCopiedAfterLoading(true)
    }
    if (isProfilesFiltered && !isCopiedAfterFiltering) {
        setCopyProfiles(profiles.items)
        setIsCopiedAfterFiltering(true)
    }

    const handleInputChange = e => {
        setFullName(e.target.value)
        if(e.target.value!==""){
            setShowCancel(true)
        }
        else{
            setShowCancel(false)
        }
    } 

    const handleApplyButtonClick = e => {
        e.preventDefault()
        dispatch(searchProfiles(fullName))
        setIsOpen(true)
    }

    useEffect(()=>{
        if(!isOpen){
            dispatch(setProfiles(copyProfiles))
        }
    },[isOpen])

    useEffect(() => {
        let length = profiles.items.length
        setFound(`Найдено: ${length}`)
    }, [profiles.items])

    const RefC = useRef(null)

    const handleClickC = () => {
        setIsOpen(false)
    }
    
    // useEffect(()=>{if(buttonC){buttonC.addEventListener('click', handleClickC); 
    // return()=>{buttonC.removeEventListener('click', handleClickC);};}},[buttonC])
    
    const button = RefC.current;
    useEffect(() => {
        if (button) {
          button.addEventListener('click', handleClickC);
          return () => {
            button.removeEventListener('click', handleClickC);
          };
        }
      }, [button]);
    // useEffect(()=>{document.addEventListener('mousedown', handleClickC); 
    // return()=>{document.removeEventListener('mousedown', handleClickC);};},[RefC])

    // useEffect(()=>{document.addEventListener('mousedown', handleClickC); 
    // return()=>{document.removeEventListener('mousedown', handleClickC);};},[])

    const handleCancelButtonClick = e => {
        e.preventDefault()
        setFullName('')
        setShowCancel(false)
    }

    const buttonRef = useRef(null);
      
    function handleMouseMove(e) {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        buttonRef.current.style.setProperty('--mouse-x', x + 'px');
        buttonRef.current.style.setProperty('--mouse-y', y + 'px');
    }

    return(
        <form className={styles.form}>
            <input id='inp' placeholder="Кого хотите найти?" 
                onInput={handleInputChange}
                value = {fullName}    
            />
            <button href="#pn" ref={buttonRef} onMouseMove={handleMouseMove} className={styles.but} onClick={handleApplyButtonClick}>Поиск</button>
            {showCancel&&(<button ref={RefC} className={styles.CancelFind} onClick={handleCancelButtonClick}>X</button>)}
            
            <div className={styles.break}></div>
            
            {isOpen&&(<p id="pn" className={styles.pp}>{found}</p>)}
        </form>
    )
}

