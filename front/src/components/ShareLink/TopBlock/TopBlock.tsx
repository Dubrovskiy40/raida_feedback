import React from "react"

import style from "./TopBlock.module.css"
import {ITopBlock} from "../../../store/types"
import TypeSurvey from "../../typeSurvey/TypeSurvey"


const TopBlock: React.FC<ITopBlock> = ({state}) => (
    <div className={style.success_container}>
        <div className={style.success_preview}>
            <h3 className={style.text}>Успешно!</h3>
            <TypeSurvey surveyState={state}/>
        </div>
    </div>
)

export default TopBlock