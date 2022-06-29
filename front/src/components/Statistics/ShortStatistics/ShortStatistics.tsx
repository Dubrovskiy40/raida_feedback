import React from "react"

import InfoLine from "./InfoLine/InfoLine"
import style from "./shortStatistics.module.css"
import { IShortStatisticsProps } from "../../../store/types"


const ShortStatistics: React.FC<IShortStatisticsProps> = ({
                                                              criticsPercent,
                                                              neutralPercent,
                                                              promoterPercent
                                                          }) => (
    <ul className={style.wrapper}>
        <InfoLine brickColor={"#64C7FE"} text={"Критики"} percents={criticsPercent}/>
        <InfoLine brickColor={"#FAA846"} text={"Нейтрально"} percents={neutralPercent}/>
        <InfoLine brickColor={"#23B979"} text={"Промоутеры"} percents={promoterPercent}/>
    </ul>
)

export default ShortStatistics