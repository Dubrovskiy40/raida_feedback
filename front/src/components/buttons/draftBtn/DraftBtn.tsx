import React from "react"
import {NavLink} from "react-router-dom"

import style from "./draftBtn.module.css"
import {IDraftBtn} from "../../../store/types"


const DraftBtn: React.FC<IDraftBtn> = ({handleAddSurveyToDraft}) => (
    <NavLink className={style.draftBtn} to={"/statistics"} onClick={handleAddSurveyToDraft}>СОХРАНИТЬ
        ЧЕРНОВИК</NavLink>
)

export default React.memo(DraftBtn)
