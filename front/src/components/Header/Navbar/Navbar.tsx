import React from "react"
import {useDispatch, useSelector} from "react-redux"

import style from "./navbar.module.css"
import {INavbarProps} from "../../../store/types"
import FirstNavbar from "./FirstNavbar/FirstNavbar"
import DraftBtn from "../../buttons/draftBtn/DraftBtn"
import SecondNavbar from "./SecondNavbar/SecondNavbar"
import {addSurveyToDraft} from "../../../store/draftSurveyReducer"
import {getActivePage, getIsAdmin} from "../../../store/selectors/selectors"


const Navbar: React.FC<INavbarProps> = ({surveyState}) => {

    const dispatch = useDispatch()
    const isAdmin = useSelector(getIsAdmin)
    const numberActivePage = useSelector(getActivePage)

    const handleAddSurveyToDraft = () => {
        dispatch(addSurveyToDraft(surveyState))
    }

    const conditionalRenderForNavbar =
        isAdmin && numberActivePage === 5
            ? <FirstNavbar/>
            : isAdmin && numberActivePage !== 6
                ? <SecondNavbar numberActivePage={numberActivePage}/>
                : undefined

    const conditionalRenderForDraftButton =
        isAdmin && (numberActivePage < 4)
            ? <DraftBtn handleAddSurveyToDraft={handleAddSurveyToDraft}/>
            : undefined

    return (
        <nav className={style.nav}>
            <ul className={style.wrapper}>
                {conditionalRenderForNavbar}
            </ul>
            {conditionalRenderForDraftButton}
        </nav>
    )
}

export default React.memo(Navbar)