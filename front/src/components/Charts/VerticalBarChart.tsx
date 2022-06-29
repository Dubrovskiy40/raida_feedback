import React from "react"

import style from "./verticalBarChart.module.css"
import {IVerticalBarChartProps} from "../../store/types"
import DoughnutChart from "./DoughnutChart/DoughnutChart"
import VerticalChart from "./VerticalChart/VerticalChart"
import smile1 from "../../assets/images/smiles/smile-1.png"
import smile2 from "../../assets/images/smiles/smile-2.png"
import smile3 from "../../assets/images/smiles/smile-3.png"
import smile4 from "../../assets/images/smiles/smile-4.png"
import smile5 from "../../assets/images/smiles/smile-5.png"
import NpsStatistics from "../Statistics/NPSStatistics/NPSStatistics";


const VerticalBarChart: React.FC<IVerticalBarChartProps> = ({
                                                                statistics,
                                                                selectedSurveyData
                                                            }) => {

    const {typeSurvey, scale} = selectedSurveyData
    const labelsSmiles = [smile1, smile2, smile3, smile4, smile5]
    const criticsPercent = statistics[1] ? statistics[1][0] : ""
    const neutralPercent = statistics[1] ? statistics[1][1] : ""
    const promoterPercent = statistics[1] ? statistics[1][2] : ""

    return (
        <>
            <div className={style.barCharts}>
                <VerticalChart statistics={statistics[0]} labelsSmiles={labelsSmiles} typeSurvey={typeSurvey}
                               scale={scale}/>
                <ul className={style.staticBar}>
                    <li className={`${style.staticBar__item_one} ${style.staticBar__item}`}>
                        Критики
                        <span className={style.staticBar__count}>
                            {statistics[1] ? criticsPercent : ""}%
                        </span>
                    </li>
                    <li className={`${style.staticBar__item_two} ${style.staticBar__item}`}>
                        Нейтрально
                        <span className={style.staticBar__count}>
                            {statistics[1] ? neutralPercent : ""}%
                        </span>
                    </li>
                    <li className={`${style.staticBar__item_three} ${style.staticBar__item}`}>
                        Промоутеры
                        <span className={style.staticBar__count}>
                            {statistics[1] ? promoterPercent : ""}%
                        </span>
                    </li>
                </ul>
                <div className={style.pieBar}>
                    {
                        typeSurvey <= 2
                            ? <DoughnutChart typeOfSurvey={typeSurvey} labelsSmiles={labelsSmiles}
                                             statistics={statistics}/>
                            : <NpsStatistics statistics={statistics}/>
                    }

                </div>
            </div>
        </>
    )
}

export default React.memo(VerticalBarChart)