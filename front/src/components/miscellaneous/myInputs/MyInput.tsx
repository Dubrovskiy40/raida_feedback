import React from "react"

import style from "./myInput.module.css"
import {IMyInput} from "../../../store/types"


const MyInput: React.FC<IMyInput> = ({
                                         name = "",
                                         value = "",
                                         placeholder,
                                         isForUrl = false,
                                         handleChange = () => {
                                         }
                                     }) => {

    const renderAlertText = (value === "") && <p className={style.alert_text}>{"Пусто! Пожалуйста введите текст."}</p>

    return (
        <>
            <input name={name}
                   className={isForUrl ? `${style.input_text} ${style.forUrl}` : `${style.input_text} ${value === "" ? style.input_text_alert : ""}`}
                   value={value} onChange={handleChange} placeholder={placeholder}/>
            {
                renderAlertText
            }
        </>
    )
}

export default MyInput