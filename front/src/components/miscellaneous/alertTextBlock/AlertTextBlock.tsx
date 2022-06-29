import React from "react"

import style from "./alertTextBlock.module.css"
import {ReactComponent as AlertSign} from "../../../assets/images/btns/alertSign.svg"


const AlertTextBlock: React.FC = () => (
    <div className={style.alert_text_wrapper}><AlertSign/>
        <p className={style.alert_text}>Заполнены не все текстовые поля</p>
    </div>
)

export default AlertTextBlock