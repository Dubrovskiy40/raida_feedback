import React from "react"

import style from "./sendBtn.module.css"
import {ISendBtn} from "../../../store/types"


const SendBtn: React.FC<ISendBtn> = ({disabled = false, mainColor, showMeThanks}) => (
    <button className={`${style.sendBtn} ${disabled ? style.sendBtn_disabled : ""}`}
            style={{backgroundColor: mainColor}}
            onClick={showMeThanks}>ОТПРАВИТЬ</button>
)

export default SendBtn