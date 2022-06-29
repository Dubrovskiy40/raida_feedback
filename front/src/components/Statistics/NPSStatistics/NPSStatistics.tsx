import React from "react"
import style from "./npsStatistics.module.css"

interface INPSStatistics {
    statistics: number[][]
}

const NpsStatistics: React.FC<INPSStatistics> = ({statistics}) => {

    const rating = statistics[3]? statistics[3][0] : 0

    const getJudgment = (rating:number) => {
        if (rating <= 0) {
            return "Индекс низкий"
        }
        if (rating >= 1 && rating < 50) {
            return "Индекс нормальный"
        }
        if (rating >= 50) {
            return "Индекс высокий"
        }
    }

    const getClassName = (rating:number) => {
        if (rating <= 0) {
            return style.low
        }
        if (rating >= 1 && rating < 50) {
            return style.normal
        }
        if (rating >= 50) {
            return style.high
        }
    }

    const className = getClassName(rating)

    return (
        <div className={style.wrapper}>
            <h2 className={style.text}>Индекс<span className={style.violet_text}> NPS</span></h2>
            <div className={style.indicator}>
                <p className={`${style.percent} ${className}`}>{rating}%</p>
                <p className={`${style.judgment} ${className}`}>{getJudgment(rating)}</p>
            </div>
        </div>
    )
}

export default NpsStatistics