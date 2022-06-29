import React from "react"

import style from "./statisticsBlock.module.css"
import { IStatisticsBlock } from "../../../store/types"
import smile1 from "../../../assets/images/smiles/smile-1.png"
import smile2 from "../../../assets/images/smiles/smile-2.png"
import smile3 from "../../../assets/images/smiles/smile-3.png"
import smile4 from "../../../assets/images/smiles/smile-4.png"
import smile5 from "../../../assets/images/smiles/smile-5.png"
import DoughnutChart from "../../Charts/DoughnutChart/DoughnutChart"
import VerticalChart from "../../Charts/VerticalChart/VerticalChart"
import ShortStatistics from "../../Statistics/ShortStatistics/ShortStatistics"
import NpsStatistics from "../../Statistics/NPSStatistics/NPSStatistics";


const StatisticsBlock: React.FC<IStatisticsBlock> = ({scale, typeSurvey, statistics, totalAnswersCount}) => {

    const criticsPercent = statistics[1] ? statistics[1][0] : ""
    const neutralPercent = statistics[1] ? statistics[1][1] : ""
    const promoterPercent = statistics[1] ? statistics[1][2] : ""
    const labelsSmiles = [smile1, smile2, smile3, smile4, smile5]

    return (
        <div className={style.statisticsModal}>
            <div className={style.doughnutChart}>
                <h2 className={style.total_answer}>
                    {`Всего ответов: `}
                    <span className={style.total_answer__count}>
                        {totalAnswersCount}
                    </span>
                </h2>
                {
                    typeSurvey <= 2
                        ? <DoughnutChart typeOfSurvey={typeSurvey} labelsSmiles={labelsSmiles}
                                         statistics={statistics}/>
                        : <NpsStatistics statistics={statistics}/>
                }
            </div>
            <div className={style.vertical_chart}>
                <VerticalChart scale={scale} typeSurvey={typeSurvey} labelsSmiles={labelsSmiles}
                               statistics={statistics[0]}/>
                <ShortStatistics criticsPercent={criticsPercent} neutralPercent={neutralPercent}
                                 promoterPercent={promoterPercent}/>
            </div>
        </div>
    )
}

export default StatisticsBlock