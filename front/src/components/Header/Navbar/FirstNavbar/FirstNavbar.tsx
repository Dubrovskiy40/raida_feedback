import React from "react"
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import style from "../navbar.module.css"
import {setInitialAppState} from "../../../../store/appReducer"
import {getDraftSurvey} from "../../../../store/selectors/selectors"
import {clearDraftSurvey} from "../../../../store/draftSurveyReducer"
import {createNewSurvey, createSurveyFromDraft} from "../../../../store/surveyReducer"


const FirstNavbar: React.FC = () => {

    const dispatch = useDispatch()
    const draftSurvey = useSelector(getDraftSurvey)

    const handleNewSurvey = () => {
        dispatch(setInitialAppState())
        dispatch(createNewSurvey(0))
    }

    const handleMoveDraftToSurvey = () => {
        if (draftSurvey) {
            createSurveyFromDraft(0, draftSurvey)
            clearDraftSurvey()
            dispatch(setInitialAppState())
        }
    }

    return (
        <>
            <li className={style.listItem}>
                <NavLink className={({isActive}) => (isActive ? `${style.item} ${style.active}` : style.item)}
                         to={"/statistics"}>{"МОИ ОПРОСЫ"}</NavLink>
            </li>
            <li className={style.listItem}>
                <NavLink className={({isActive}) => (isActive ? `${style.item} ${style.active}` : style.item)}
                         to={"/template"} onClick={handleNewSurvey}>{"СОЗДАТЬ НОВЫЙ ОПРОС"}</NavLink>
            </li>
            <li className={style.listItem}>
                <div onClick={handleMoveDraftToSurvey}>
                    {
                        draftSurvey
                            ? <NavLink className={draftSurvey ? `${style.item} ${style.active}` : style.item}
                                       to={"/template"}>{"ЧЕРНОВИК"}</NavLink>
                            : <span className={style.item}>{"ЧЕРНОВИК"}</span>
                    }
                </div>
            </li>
        </>
    )
}

export default FirstNavbar