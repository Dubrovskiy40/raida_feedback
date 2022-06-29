import React from "react"
import {useDispatch, useSelector} from "react-redux"

import {IGetGradeSlider} from "../../../../store/types"
import {setSurveyActivePage} from "../../../../store/appReducer"
import {getSurveyActivePage} from "../../../../store/selectors/selectors"
import GetGradeSliderPage1 from "./getGradeSliderPage1/getGradeSliderPage1"
import GetGradeSliderPage2 from "./getGradeSliderPage2/getGradeSliderPage2"


const GetGradeSliderContainer: React.FC<IGetGradeSlider> = ({
                                                                state,
                                                                range = 10,
                                                                isDisable,
                                                                evaluation,
                                                                evaluation2,
                                                                setIsDisable,
                                                                showMeThanks,
                                                                setEvaluation,
                                                                setEvaluation2,
                                                            }) => {

    const dispatch = useDispatch()
    const surveyActivePage = useSelector(getSurveyActivePage)

    const handleSubmit = () => {
        setIsDisable(true)
        showMeThanks()
    }

    const handleChangePage = (pageNumber:number) => () => {
        dispatch(setSurveyActivePage(pageNumber))
    }

    return (
        <>
            {
                surveyActivePage === 1 &&
                <GetGradeSliderPage1 page={surveyActivePage} range={range} evaluation={evaluation} isDisable={isDisable}
                                     showMeThanks={showMeThanks} state={state} setPage={handleChangePage}
                                     setEvaluation={setEvaluation}/>
            }
            {
                surveyActivePage === 2 &&
                <GetGradeSliderPage2 page={surveyActivePage} isDisable={isDisable} handleSubmit={handleSubmit} state={state}
                                     evaluation2={evaluation2} setEvaluation2={setEvaluation2}
                                     setPage={handleChangePage}/>
            }
        </>
    )
}

export default GetGradeSliderContainer