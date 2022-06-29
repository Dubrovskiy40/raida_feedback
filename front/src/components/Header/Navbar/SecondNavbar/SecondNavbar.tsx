import React from "react"
import {useDispatch, useSelector} from "react-redux"

import style from "../navbar.module.css"
import {ISecondNavbar} from "../../../../store/types"
import {setIsShowPopUp} from "../../../../store/appReducer"
import SecondNavbarItem from "./secondNavBarItem/SecondNavbarItem"
import {getVisitedPages} from "../../../../store/selectors/selectors"


const SecondNavbar: React.FC<ISecondNavbar> = ({numberActivePage}) => {

    const dispatch = useDispatch()
    const {visitedPage2, visitedPage3, visitedPage4} = useSelector(getVisitedPages)

    const handleSetIsShowPopUp = () => {
        dispatch(setIsShowPopUp(true))
    }

    return (
        <>
            <li className={style.listItem}>
                <SecondNavbarItem numberActivePage={numberActivePage} linkUrl={"/template"} linkText={"ШАБЛОН"}
                                  selectedPage={1} visitedPages={true} callback={handleSetIsShowPopUp}/>
            </li>
            <li className={style.listItem}>
                <SecondNavbarItem numberActivePage={numberActivePage} linkUrl={"/design"} linkText={"ДИЗАЙН"}
                                  selectedPage={2} visitedPages={visitedPage2}/>
            </li>
            <li className={style.listItem}>
                <SecondNavbarItem numberActivePage={numberActivePage} linkUrl={"/thanks"} linkText={"СПАСИБО"}
                                  selectedPage={3} visitedPages={visitedPage3}/>
            </li>
            <li className={style.listItem}>
                <SecondNavbarItem numberActivePage={numberActivePage} linkUrl={"/share_link"}
                                  linkText={"ПОДЕЛИТЬСЯ ССЫЛКОЙ"} selectedPage={4} visitedPages={visitedPage4}/>
            </li>
        </>
    )
}

export default SecondNavbar