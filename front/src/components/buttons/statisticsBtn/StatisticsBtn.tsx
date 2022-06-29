import React from "react"
import {NavLink} from "react-router-dom"

import style from "./statisticsBtn.module.css"
import {IStatisticsBtnProps} from "../../../store/types"


const StatisticsBtn: React.FC<IStatisticsBtnProps> = ({disabled = false}) => (
    <NavLink to={"/statistics"} className={`${style.statisticsBtn} ${disabled ? style.statisticsBtn_disabled : ""}`}>
        {"ПЕРЕЙТИ К СТАТИСТИКЕ"}
    </NavLink>
)

export default StatisticsBtn