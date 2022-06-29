import React from "react"

import style from "./nameOfSurvey.module.css"
import {INameOfSurvey} from "../../../store/types"


const NameOfSurvey: React.FC<INameOfSurvey> = ({name, value, placeholder, handleChange}) => {

    const renderAlertText = value === "" && <p className={style.alertText}>{"Укажите название опроса."}</p>

    return (
        <>
            <input className={`${style.input} ${value === "" ? style.input_alert : ""}`}
                   name={name}
                   value={value}
                   onChange={handleChange}
                   placeholder={placeholder}/>
            {
                renderAlertText
            }
        </>
    )
}

export default NameOfSurvey;
