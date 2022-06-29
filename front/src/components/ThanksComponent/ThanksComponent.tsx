import React, {useEffect} from "react"
import {useDispatch} from "react-redux"

import style from "./thanksComponent.module.css"
import {IThanksComponent} from "../../store/types"
import {setActivePage, setIsVisited} from "../../store/appReducer"
import {changeValueOfSurvey, saveSurveyToBack} from "../../store/surveyReducer"
import ThanksComponentTopBlock from "./ThanksComponentTopBlock/ThanksComponentTopBlock"
import ThanksComponentBottomBlock from "./ThanksComponentBottomBlock/ThanksComponentBottomBlock"


const ThanksComponent: React.FC<IThanksComponent> = ({surveyState}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setActivePage(3))
        dispatch(setIsVisited('visitedPage3', true))
    }, [dispatch])

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeValueOfSurvey(event))
    }

    const handleCreateSurvey = () => {
        dispatch(saveSurveyToBack())
    }

    return (
        <main>
            <div className={style.survey_container}>
                <ThanksComponentTopBlock surveyState={surveyState} handleChange={handleChangeValue}/>
                <ThanksComponentBottomBlock surveyState={surveyState} handleChange={handleChangeValue}
                                            handlePostSurvey={handleCreateSurvey}/>
            </div>
        </main>
    )
}

export default React.memo(ThanksComponent)