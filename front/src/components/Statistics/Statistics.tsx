import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import style from "./statistics.module.css"
import {IStatisticsProps} from "../../store/types"
import {setActivePage} from "../../store/appReducer"
import {getSurveyIds} from "../../store/surveyArrayReducer"
import {getSurveysId} from "../../store/selectors/selectors"
import StatisticsTopBlock from "./StatisticsTopBlock/StatisticsTopBlock"
import StatisticsBottomBlock from "./StatisticsBottomBlock/StatisticsBottomBlock"


const Statistics: React.FC<IStatisticsProps> = ({selectedSurveyData}) => {

    const dispatch = useDispatch()
    const surveysId = useSelector(getSurveysId)

    useEffect(() => {
        dispatch(getSurveyIds())
        dispatch(setActivePage(5))
    }, [dispatch])

    return (
        <div className={style.container}>
            <StatisticsTopBlock arrayOfSurvey={surveysId}
                                selectedSurveyData={selectedSurveyData}/>
            <StatisticsBottomBlock selectedSurveyData={selectedSurveyData}/>
        </div>
    )
}

export default React.memo(Statistics)