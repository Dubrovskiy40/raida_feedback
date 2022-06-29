import React from "react"
import {useDispatch} from "react-redux"

import style from "./setScale.module.css"
import {ISetScaleProps} from "../../../store/types"
import {changeValueOfSurvey} from "../../../store/surveyReducer"


const SetScale:React.FC<ISetScaleProps> = ({scale}) => {

    const dispatch = useDispatch()

    const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeValueOfSurvey(event))
    }

    return (
        <div className={style.setScale__container}>
            <h3 className={style.setScale__header}>{"Тип шкалы"}</h3>
            <div className={style.setScale__control}>
                <label className={style.setScale__label}>
                                        <span
                                            className={`${style.fake_radio_btn} ${scale === "5" ? style.fake_radio_btn_active : ""}`}/>
                    <input className={style.hidden_radio_btn} type="radio" value={"5"}
                           name={"scale"} checked={scale === "5"}
                           onChange={handleScaleChange}/>
                    {"От 1 до 5"}
                </label>
                <label className={style.setScale__label}>
                                        <span
                                            className={`${style.fake_radio_btn} ${scale === "10" ? style.fake_radio_btn_active : ""}`}/>
                    <input className={style.hidden_radio_btn} type="radio" value={"10"}
                           name={"scale"} checked={scale === "10"}
                           onChange={handleScaleChange}/>
                    {"От 1 до 10"}
                </label>
            </div>
        </div>
    )
}

export default SetScale