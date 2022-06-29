import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import style from "./demoPage.module.css"
import TypeSurvey from "../typeSurvey/TypeSurvey"
import StatisticsBlock from "./StatisticBlock/StatisticsBlock"
import {handleSetAnswerThunk} from "../../store/surveyAnswerReducer"
import {getSelectedSurveyThunk} from "../../store/surveyArrayReducer"
import {setActivePage, setIsShowStatisticsButton, setIsShowStatisticsPopUp} from "../../store/appReducer"
import {getAnswerIsGot, getPositionStyle, getStatistics, getTotalAnswersCount} from "../../helpers/helpers"
import {
    getAnswerArray1,
    getAnswerArray2,
    getIsShowStatisticsPopUp,
    getSelectedSurvey
} from "../../store/selectors/selectors"


const DemoPage: React.FC = () => {

    const urlParams = useParams()
    const surveyId = Number(urlParams["*"]) && Number(urlParams["*"])

    const selectedSurvey = useSelector(getSelectedSurvey)
    const {scale, typeSurvey, position} = selectedSurvey

    const dispatch = useDispatch()
    const answerIsGot = getAnswerIsGot(surveyId)
    const answer1 = useSelector(getAnswerArray1)
    const answer2 = useSelector(getAnswerArray2)
    const statistics = getStatistics(answer1, scale, typeSurvey)
    const isShowStatisticsPopUp = useSelector(getIsShowStatisticsPopUp)
    const totalAnswersCount = getTotalAnswersCount(typeSurvey, answer1.length, answer2.length)

    const surveyPosition = position ? position : "center"
    const styleObj = getPositionStyle(surveyPosition)

    const handlePostAnswer = (questionNumber: number[], grade1: number, grade2: string = "") => {
        dispatch(handleSetAnswerThunk(questionNumber, grade1, grade2))
    }

    const handleStatisticsClose = () => {
        dispatch(setIsShowStatisticsPopUp(false))
    }

    window.onload = (() => handleStatisticsClose())

    useEffect(() => {
        dispatch(setActivePage(6))
        dispatch(setIsShowStatisticsButton(true))
        surveyId && dispatch(getSelectedSurveyThunk(surveyId))
    }, [dispatch, surveyId])

    return (
        <div className={style.wrapper}>
            <div className={`${isShowStatisticsPopUp ? style.positioned_container_static : style.positioned_container}`}
                 style={isShowStatisticsPopUp ? {} : styleObj}>
                <TypeSurvey surveyState={selectedSurvey} handlePostAnswer={handlePostAnswer}
                            answerIsGot={answerIsGot}/>
            </div>
            {
                isShowStatisticsPopUp && <StatisticsBlock scale={scale} typeSurvey={typeSurvey} statistics={statistics}
                                                        totalAnswersCount={totalAnswersCount}/>
            }
        </div>
    )
}

export default DemoPage