import React from "react"

import style from "./myInput.module.css"
import {IMyTextarea} from "../../../store/types"
import TextareaAutosize from 'react-textarea-autosize'


const MyTextarea: React.FC<IMyTextarea> = ({
                                               name = "",
                                               value = "",
                                               placeholder,
                                               isForUrl = false,
                                               changeActiveSurveyPage=()=>{},
                                               handleChange
                                           }) => {

    const renderAlertText = value === "" && <p className={style.alert_text}>{"Пусто! Пожалуйста введите текст."}</p>

    return (
        <>
            <TextareaAutosize rows={5} name={name}
                              className={isForUrl ? `${style.input_text} ${style.forUrl}` : `${style.input_text} ${style.textareaScale} ${value === "" ? style.input_text_alert : ""}`}
                              value={value} onChange={handleChange} placeholder={placeholder}
                              onFocus={changeActiveSurveyPage}/>
            {
                renderAlertText
            }
        </>
    )
}

export default MyTextarea
