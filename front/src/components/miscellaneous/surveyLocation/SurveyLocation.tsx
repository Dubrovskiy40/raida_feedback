import {useDispatch} from "react-redux"
import style from "./surveyLocation.module.css"
import React, {useEffect, useState} from "react"
import {ISurveyLocation} from "../../../store/types"
import {setPositionOfSurvey} from "../../../store/surveyReducer"


const SurveyLocation: React.FC<ISurveyLocation> = ({positionOfSurvey}) => {

    const dispatch = useDispatch()
    const [location, setLocation] = useState([
        {id: '1', positionName: "topLeft", isSelected: false},
        {id: '2', positionName: "topCenter", isSelected: false},
        {id: '3', positionName: "topRight", isSelected: false},
        {id: '4', positionName: "centerLeft", isSelected: false},
        {id: '5', positionName: "center", isSelected: false},
        {id: '6', positionName: "centerRight", isSelected: false},
        {id: '7', positionName: "bottomLeft", isSelected: false},
        {id: '8', positionName: "bottomCenter", isSelected: false},
        {id: '9', positionName: "bottomRight", isSelected: false},
    ])

    useEffect(() => {
        setLocation(prevState => prevState.map((item) => {
            if (item.positionName === positionOfSurvey) {
                return {...item, isSelected: true}
            } else {
                return {...item, isSelected: false}
            }
        }))
    }, [positionOfSurvey])

    const handleSetPosition = (positionName: string) => () => {
        dispatch(setPositionOfSurvey(positionName))
    }

    return (
        <div className={style.surveyLocation}>
            <h2 className={style.surveyLocation__title}>Расположение опроса</h2>
            <ul className={style.surveyLocation__list}>
                {
                    location.map((square) => (<li
                            className={`${style.surveyLocation__item} ${square.isSelected ? style.surveyLocation__item_active : ""}`}
                            id={square.id}
                            key={square.id}
                            onClick={handleSetPosition(square.positionName)}>
                        </li>)
                    )
                }
            </ul>
        </div>
    )
}

export default SurveyLocation
