import React, {useEffect, useState} from "react"

import style from "./nameOfSurveySelect.module.css"
import {INameOfSurveySelect} from "../../../store/types"
import {getSelectedSurveyName} from "../../../helpers/helpers"


const NameOfSurveySelect: React.FC<INameOfSurveySelect> = ({
                                                               arrayOfSurvey = [],
                                                               selectedSurvey,
                                                               setSelectSurvey
                                                           }) => {

    const [isOpen, setIsOpen] = useState(false)
    const nameOfSurvey = getSelectedSurveyName(arrayOfSurvey, selectedSurvey)

    const openToggle = () => {
        setIsOpen(prevState => !prevState)
    }

    const handleSurveySelect = (id: number) => () => {
        setSelectSurvey(id)
    }

    useEffect(() => {
        arrayOfSurvey[0] && setSelectSurvey(arrayOfSurvey[0].id)
    }, [arrayOfSurvey, setSelectSurvey])

    return (
        <>
            <div className={style.window_close_layer} style={{display: isOpen? "block": "none"}} onClick={openToggle}/>
            <div className={style.fakeSelect} onClick={openToggle}>
                {nameOfSurvey[0] ? nameOfSurvey[0].name : "Нет опросов"}
                <div
                    className={isOpen ? `${style.dropDownList} ${style.dropDownList_open}` : style.dropDownList}>
                    {
                        arrayOfSurvey.reverse().map((item) => (
                            <div className={style.dropDownList__item} key={item.id}
                                 onClick={handleSurveySelect(item.id)}>
                                {item.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default React.memo(NameOfSurveySelect)