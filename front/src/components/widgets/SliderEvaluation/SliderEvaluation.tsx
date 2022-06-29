import React, {useEffect, useState} from "react"

import Loader from "../loader/Loader"
import {ISliderEvaluation} from "../../../store/types"
import ThanksWidget from "../thanksWidget/ThanksWidget"
import GetGradeSliderContainer from "./getGrade/getGradeSliderContainer"


const SliderEvaluation: React.FC<ISliderEvaluation> = ({range = 10, state, postAnswer, answerIsGot}) => {

    const [evaluation, setEvaluation] = useState(1)
    const [evaluation2, setEvaluation2] = useState("")
    const [isDisable, setIsDisable] = useState(false)

    const [flag, setFlag] = useState(true)

    useEffect(()=>{
        answerIsGot && setFlag(false)
    },[answerIsGot])

    const showMeThanks = () => {
        setFlag(prevState => !prevState)
        postAnswer([1, 2], evaluation, evaluation2)
    }

    return (
        state
            ? flag
                ? <GetGradeSliderContainer state={state}
                                           range={range}
                                           evaluation={evaluation}
                                           evaluation2={evaluation2}
                                           setEvaluation={setEvaluation}
                                           setEvaluation2={setEvaluation2}
                                           isDisable={isDisable}
                                           setIsDisable={setIsDisable}
                                           showMeThanks={showMeThanks}
                />
                : <ThanksWidget backgroundColor={state.thanksBackgroundColor} surveyThanksText={state.surveyThanksText}
                                waveColor={state.thanksWaveColor}/>
            : <Loader/>

    )
}

export default SliderEvaluation