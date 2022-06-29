import React, {useState} from "react"
import {useSelector} from "react-redux"

import style from "./statisticsBottomBlock.module.css"
import PeriodSelect from "../PeriodSelect/PeriodSelect"
import {IStatisticsBottomBlock} from "../../../store/types"
import VerticalBarChart from "../../Charts/VerticalBarChart"
import DownloadBtn from "../../buttons/downloadBtn/DownloadBtn"
import SettingsBtn from "../../buttons/settingsBtn/SettingsBtn"
import Recommendations from "../Recommendations/Recommendations"
import {getAnswerArray1, getAnswerArray2} from "../../../store/selectors/selectors"
import {getStatistics, getSurveyName, getTotalAnswersCount} from "../../../helpers/helpers"
import {ReactComponent as InfoIcon} from "../../../assets/images/statistics/InfoSquare.svg"


const StatisticsBottomBlock: React.FC<IStatisticsBottomBlock> = ({selectedSurveyData}) => {

    const {typeSurvey, questionName0, questionName1, scale} = selectedSurveyData

    const answersArray1 = useSelector(getAnswerArray1)
    const answersArray2 = useSelector(getAnswerArray2)
    const statistics = getStatistics(answersArray1, scale, typeSurvey)
    const totalAnswer = getTotalAnswersCount(typeSurvey, answersArray1.length, answersArray2.length)

    const [showInfoText, setShowInfoText] = useState(false)

    const showInfo = () => {
        setShowInfoText(prevState => !prevState)
    }

    return (
        <div className={style.bottom_container}>
            <div className={style.bottom_container__top}>
                <h1 className={style.header}>{"Статистика"}</h1>
                <InfoIcon onClick={showInfo} style={{cursor:"pointer", height: 19,width: 30}}/>
                <p className={`${style.text} ${showInfoText ? style.showText : ""}`}>
                    {"Статистика позволяет выявить проблемы и слабые стороны организации. Данный инструмент активно применяется для исследований как отдельных субъектов предпринимательской деятельности, так и рынков в целом."}
                </p>
                <div className={style.periodSelectWrapper}>
                    <PeriodSelect/>
                </div>
                <div className={style.buttonContainer}>
                    <SettingsBtn/>
                    <DownloadBtn/>
                </div>
            </div>
            <p className={style.label}>{getSurveyName(typeSurvey)}</p>
            <p className={style.label}>{questionName0}</p>
            <p className={style.label}>Всего ответов: {totalAnswer}</p>
            <VerticalBarChart selectedSurveyData={selectedSurveyData} statistics={statistics}/>
            {
                typeSurvey === 3 && (
                    <div className={style.recommendationBlock}>
                        <p className={style.label}>{questionName1}</p>
                        <p className={style.label}>{`Всего ответов: ${answersArray2.length}`}</p>
                        <Recommendations answers={answersArray2}/>
                    </div>
                )
            }
        </div>
    )
}

export default React.memo(StatisticsBottomBlock)