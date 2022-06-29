import React from "react"

import style from "./downloadBtn.module.css"
import {IDownloadBtn} from "../../../store/types"


const DownloadBtn: React.FC<IDownloadBtn> = ({disabled = false}) => (
    <button className={`${style.downloadBtn} ${disabled ? style.downloadBtn_disabled : ""}`}>{"СКАЧАТЬ ОТЧЕТ"}</button>
)

export default React.memo(DownloadBtn)
