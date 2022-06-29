import React from "react"
import {useParams} from "react-router"
import {useDispatch, useSelector} from "react-redux"

import Loader from "../loader/Loader"
import style from "./thanksWidget.module.css"
import {IThanksWidget} from "../../../store/types"
import {setIsShowStatisticsPopUp} from "../../../store/appReducer"
import {getSelectedSurveyThunk} from "../../../store/surveyArrayReducer"
import {ReactComponent as Wave} from "../../../assets/images/thanks/Vector.svg"
import {getIsShowStatisticsButton, getIsShowStatisticsPopUp} from "../../../store/selectors/selectors"


const ThanksWidget: React.FC<IThanksWidget> = ({backgroundColor, surveyThanksText, waveColor}) => {

    const dispatch = useDispatch()
    const surveyId = Number(useParams()["*"])

    const showStatisticsPopUp = useSelector(getIsShowStatisticsPopUp)
    const isShowStatisticsButton = useSelector(getIsShowStatisticsButton)

    const handleShowStatisticsToggle = () => {
        if (!showStatisticsPopUp) {
            surveyId && dispatch(getSelectedSurveyThunk(surveyId))
        }
        dispatch(setIsShowStatisticsPopUp(!showStatisticsPopUp))
    }

    return (
        <>
            {
                backgroundColor
                    ? <div className={style.survey_thanks} style={{backgroundColor: `${backgroundColor}`}}>
                        <p className={style.survey_thanks_text}>{surveyThanksText}</p>
                        {/* <svg className={style.svg} viewBox="0 0 520 71" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                            d="M0 55.1805C0 53.865 0.646822 52.6336 1.72996 51.887L17.3333 41.1323C34.6667 29.1853 69.3333 5.29111 104 0.810958C138.667 -3.66919 173.333 11.2646 208 24.7051C242.667 38.1455 277.333 50.0926 312 44.1191C346.667 38.1456 381.333 14.2514 416 8.27788C450.667 2.30434 485.333 14.2514 502.667 20.2249L517.303 25.2691C518.917 25.8252 520 27.344 520 29.0508V67C520 69.2091 518.209 71 516 71H502.667C485.333 71 450.667 71 416 71C381.333 71 346.667 71 312 71C277.333 71 242.667 71 208 71C173.333 71 138.667 71 104 71C69.3333 71 34.6667 71 17.3333 71H4C1.79086 71 0 69.2091 0 67V55.1805Z"
                            fill={waveColor}/>
                        </svg>*/}
                        <Wave fill={waveColor}/>
                        {
                            isShowStatisticsButton && <button className={style.showStatistics}
                                                              onClick={handleShowStatisticsToggle}>{"УЗНАТЬ СТАТИСТИКУ"}</button>
                        }
                    </div>
                    : <Loader/>
            }
        </>
    )
}

export default ThanksWidget