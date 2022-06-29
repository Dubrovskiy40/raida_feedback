import React from "react"

import {ITypeSurvey} from "../../store/types"
import Loader from "../widgets/loader/Loader"
import SmileSurvey from "../widgets/smile/SmileSurvey"
import FiveNumSurvey from "../widgets/fiveNumSurvey/FiveNumSurvey"
import SliderEvaluation from "../widgets/SliderEvaluation/SliderEvaluation"


const TypeSurvey: React.FC<ITypeSurvey> = ({
                                               surveyState,
                                               handlePostAnswer,
                                               answerIsGot,
                                           }) => {

    const {typeSurvey} = surveyState
    const handlePostAnswerToCallback = handlePostAnswer ? handlePostAnswer : () => {}

    return (
        <>
            {
                surveyState.id !== 0.1 ? <>
                        {
                            typeSurvey === 1
                                ?
                                <SmileSurvey state={surveyState} postAnswer={handlePostAnswerToCallback}
                                             answerIsGot={answerIsGot}/>
                                : typeSurvey === 2
                                    ? <FiveNumSurvey state={surveyState} postAnswer={handlePostAnswerToCallback}
                                                     answerIsGot={answerIsGot}/>
                                    : typeSurvey === 3
                                        ? <SliderEvaluation state={surveyState} postAnswer={handlePostAnswerToCallback}
                                                            answerIsGot={answerIsGot}/>
                                        : "Такого опроса нет ¯\\_(ツ)_/¯"
                        }
                    </>
                    : <Loader/>
            }

        </>
    )
}

export default React.memo(TypeSurvey)