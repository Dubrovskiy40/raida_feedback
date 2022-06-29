import {useDispatch} from "react-redux"
import React, {useEffect, useState} from "react"

import style from "./templateBlock.module.css"
import { ITemplateBlock } from "../../../store/types"
import {setTypeOfSurvey} from "../../../store/surveyReducer"


const TemplateBlock: React.FC<ITemplateBlock> = ({surveyType}) => {

    const dispatch = useDispatch()
    const [templateData, setTemplateData] = useState([
        {id: 1, title: "Опрос CSAT", subTitle: "Измеряйте удовлетворенность клиента", isSelected: true},
        {id: 2, title: "Опрос CES", subTitle: "Измеряйте усилия клиентов для конкретных действий", isSelected: false},
        {id: 3, title: "Опрос NPS", subTitle: "Измерьте общее качество обслуживания клиентов", isSelected: false},
        {id: 4, title: null, subTitle: null, isSelected: false},
    ])

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        let id = Number(event.currentTarget.id)
        setTemplateData(prevState => prevState.map((item) => {
            if (item.id === id) {
                dispatch(setTypeOfSurvey(id))
                return {...item, isSelected: true}
            } else {
                return {...item, isSelected: false}
            }
        }))
    }

       useEffect(() => {
            if (surveyType) {
                setTemplateData((prevState) => prevState.map((item) => {
                    if (item.id === surveyType) {
                        return {...item, isSelected: true}
                    } else {
                        return {...item, isSelected: false}
                    }
                }))
            }
        },[surveyType, setTemplateData])

    const handleBtn = () => {
        console.log('клик по кнопке добавить');
    }

    return (
        <div className={style.templateBlock_wrap}>
            {
                templateData.map((item) => {
                    return item.title === null && item.subTitle === null
                        ? <div className={[style.templateBlock, style.templateBlock__empty].join(' ')}
                               onClick={handleBtn} id={item.id.toString()} key={item.id}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0V30" stroke="#545454" strokeWidth="1.5"/>
                                <path d="M0 15L30 15" stroke="#545454" strokeWidth="1.5"/>
                            </svg>
                        </div>
                        : <div className={`${style.templateBlock} ${item.isSelected ? style.templateBlock_active : ""}`}
                               onClick={handleClick} id={item.id.toString()} key={item.id}><h3
                            className={style.templateBlock__title}>{item.title}</h3><p
                            className={style.templateBlock__subtitle}>{item.subTitle}</p></div>
                })
            }
        </div>
    )
}

export default React.memo(TemplateBlock)