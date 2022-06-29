import React from "react"
import {useDispatch} from "react-redux"

import style from "./thanksComponentTopBlock.module.css"
import {IThanksComponentTopBlock} from "../../../store/types"
import ThanksWidget from "../../widgets/thanksWidget/ThanksWidget"
import ColorInput from "../../miscellaneous/colorInput/ColorInput"
import {changeColorValueOfSurvey} from "../../../store/surveyReducer"
import NameOfSurvey from "../../miscellaneous/nameOfSurvey/NameOfSurvey"


const ThanksComponentTopBlock: React.FC<IThanksComponentTopBlock> = ({surveyState, handleChange}) => {

    const dispatch = useDispatch()
    const {nameOfSurvey, thanksBackgroundColor, surveyThanksText, thanksWaveColor} = surveyState

    const handleColorChange = (color: string, fieldName: string) => {
        dispatch(changeColorValueOfSurvey(color, fieldName))
    }

    return (
        <div className={style.preview_container}>
            <div className={style.surveyName_container}>
                <NameOfSurvey name={"nameOfSurvey"} value={nameOfSurvey} handleChange={handleChange}
                              placeholder={"Название опроса"}/>
            </div>
            <div className={style.survey_preview}>
                <h2 className={style.text}>Предварительный просмотр</h2>
                <ThanksWidget backgroundColor={thanksBackgroundColor} surveyThanksText={surveyThanksText}
                              waveColor={thanksWaveColor}/>
            </div>
            <div className={style.color_select_container}>
                <h3 className={style.color_header}>Цвет</h3>
                <div className={style.colorSelectWrapper}>
                    <ColorInput name={"thanksWaveColor"} color={thanksWaveColor}
                                handleColorSelectInDiv={handleColorChange}>{"Основной"}</ColorInput>
                    <ColorInput name={"thanksBackgroundColor"} color={thanksBackgroundColor}
                                handleColorSelectInDiv={handleColorChange}>{"Задний план"}</ColorInput>
                </div>
            </div>
        </div>
    )

}

export default ThanksComponentTopBlock