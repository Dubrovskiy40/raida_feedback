import React from "react"
import {NavLink} from "react-router-dom"

import style from "./savePopUp.module.css"
import {useDispatch, useSelector} from "react-redux"
import {createNewSurvey} from "../../../store/surveyReducer"
import {getSurveyState} from "../../../store/selectors/selectors"
import {addSurveyToDraft} from "../../../store/draftSurveyReducer"
import {setInitialAppState, setIsShowPopUp} from "../../../store/appReducer"
import {ReactComponent as Flag} from "../../../assets/images/savePopUp/Flag.svg"


const SavePopUp: React.FC = () => {

    const dispatch = useDispatch()
    const state = useSelector(getSurveyState)

    const handleNewSurvey = () => {
        dispatch(createNewSurvey(1))
        dispatch(setInitialAppState())
    }

    const handleAddSurveyToDraft = () => {
        dispatch(addSurveyToDraft(state))
        dispatch(setIsShowPopUp(false))
    }

    return (
        <div className={style.wrapper}>
            <div className={style.flag_wrapper}>
                <Flag/>
                <Flag/>
                <Flag/>
            </div>
            <h3 className={style.text}>{"Если Вы перейдете на страницу шаблонов, Ваш черновик удалиться!"}</h3>
            <div className={style.buttons_block}>
                <NavLink to={"/template"} className={style.new_template_button} onClick={handleNewSurvey}>
                    {"НОВЫЙ ШАБЛОН"}
                </NavLink>
                <NavLink to={"/statistics"} className={style.save_draft_button} onClick={handleAddSurveyToDraft}>
                    {"СОХРАНИТЬ"}
                </NavLink>
            </div>
        </div>
    )
}

export default SavePopUp