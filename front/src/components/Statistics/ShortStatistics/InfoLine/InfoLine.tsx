import React from "react"

import style from "./infoline.module.css"
import {IInfoLineProps} from "../../../../store/types"


const InfoLine: React.FC<IInfoLineProps> = ({brickColor, text, percents}) => {

    const percentString = percents ? `${percents}%` : "0%"

    return (
        <li className={style.info_line}>
            <div className={style.info_color_brick} style={{backgroundColor: brickColor}}/>
            <p className={style.info_text}>{text}</p>
            <p className={style.info_percents}>{percentString}</p>
        </li>
    )
}


export default InfoLine