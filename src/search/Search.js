import styles from './Search.module.css'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { searchProfiles, setProfiles } from '../redux/slices/profiles'

export function Search () {
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

    if (isProfilesLoaded && !isCopiedAfterLoading) {
        /*console.log('Loaded')
        console.log(isProfilesLoaded)
        console.log(isCopied)*/
        setCopyProfiles(profiles.items)
        //copyProfiles = profiles.items.slice()
        setIsCopiedAfterLoading(true)
    }
    if (isProfilesFiltered && !isCopiedAfterFiltering) {
        /*console.log('Filtered')
        console.log(isProfilesFiltered)
        console.log(isCopied)*/
        setCopyProfiles(profiles.items)
        //console.log(copyProfiles)
        setIsCopiedAfterFiltering(true)
    }

    const handleInputChange = e => {
        setFullName(e.target.value)
    } 

    const handleApplyButtonClick = e => {
        e.preventDefault()
        /*console.log(`Apply\n${fullName}\ncopyProfiles\n`)
        console.log(copyProfiles)*/
        dispatch(searchProfiles(fullName))
        setIsOpen(true)
        // setFound(`Найдено: ${profiles.items.length}`)
    }

    
    useEffect(() => {
        let length = profiles.items.length
        setFound(`Найдено: ${length}`)
    }, [profiles.items])

    const handleCancelButtonClick = e => {
        e.preventDefault()
        //console.log(copyProfiles)
        setFullName('')
        dispatch(setProfiles(copyProfiles))
        setIsOpen(false)
    }

    //console.log(profiles)

    return(
        <form className={styles.form}>
            <input id='inp' placeholder="Кого хотите найти?" 
                onChange={handleInputChange}
                value = {fullName}    
            />
            <button href="#pn" className={styles.but} onClick={handleApplyButtonClick}>Поиск</button>
            <button className={styles.CancelFind} onClick={handleCancelButtonClick}>X</button>
            <div className={styles.break}></div>
            
            {isOpen&&(<p id="pn" className={styles.pp}>{found}</p>)}
        </form>
    )
}

// export default Search