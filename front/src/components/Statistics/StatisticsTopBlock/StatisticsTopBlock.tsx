import {useDispatch} from "react-redux"
import React, {useCallback, useEffect, useState} from "react"

import style from "./statisticsTopBlock.module.css"
import TypeSurvey from "../../typeSurvey/TypeSurvey"
import {IStatisticsTopBlock} from "../../../store/types"
import {getSelectedSurveyThunk} from "../../../store/surveyArrayReducer"
import NameOfSurveySelect from "../../miscellaneous/nameOfSurveySelect/NameOfSurveySelect"


const StatisticsTopBlock: React.FC<IStatisticsTopBlock> = ({arrayOfSurvey, selectedSurveyData}) => {

    const dispatch = useDispatch()
    const [selectedSurvey, setSelectSurvey] = useState<number>(0.1)

    useEffect(() => {
        selectedSurvey !== 0.1 && dispatch(getSelectedSurveyThunk(selectedSurvey))
    }, [selectedSurvey, dispatch])

    const handleSetSelectedSurvey = useCallback((id: number) => {
        setSelectSurvey(id)
    }, [])

    return (
        <div className={style.preview_container}>
            <div className={style.selectSurveyContainer}>
                <NameOfSurveySelect arrayOfSurvey={arrayOfSurvey} setSelectSurvey={handleSetSelectedSurvey}
                                    selectedSurvey={selectedSurvey}/>
            </div>
            <div className={style.survey_preview}>
                <TypeSurvey surveyState={selectedSurveyData}/>
            </div>
        </div>
    )
}

const areEqual = (prevProps: IStatisticsTopBlock, nextProps: IStatisticsTopBlock) => {
    return prevProps.arrayOfSurvey.length === nextProps.arrayOfSurvey.length && prevProps.selectedSurveyData.id === nextProps.selectedSurveyData.id
}

export default React.memo(StatisticsTopBlock, areEqual)