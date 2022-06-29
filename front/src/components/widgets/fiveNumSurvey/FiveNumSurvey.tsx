import React, {useEffect, useState} from "react"

import Loader from "../loader/Loader"
import style from "./fiveNumSurvey.module.css"
import SendBtn from "../../buttons/sendBtn/SendBtn"
import {IFiveNumSurvey} from "../../../store/types"
import ThanksWidget from "../thanksWidget/ThanksWidget"
import {fakeHoverOff, fakeHoverOn} from "../../../helpers/helpers";

interface IFiveNumSurveyLocalStateItem {
    id: number,
    path: number,
    isSelected: boolean
}

const FiveNumSurvey: React.FC<IFiveNumSurvey> = ({state, postAnswer, answerIsGot}) => {

    const {
        angry,
        happy,
        scale,
        mainColor,
        questionName0,
        backgroundColor,
        thanksWaveColor,
        surveyThanksText,
        thanksBackgroundColor
    } = state

    const [fiveNumbers, setFiveNumbers] = useState<IFiveNumSurveyLocalStateItem[]>([
        {id: 1, path: 1, isSelected: false},
        {id: 2, path: 2, isSelected: false},
        {id: 3, path: 3, isSelected: false},
        {id: 4, path: 4, isSelected: false},
        {id: 5, path: 5, isSelected: false},
    ]);

    const [tenNumbers, setTenNumbers] = useState<IFiveNumSurveyLocalStateItem[]>([
        {id: 1, path: 1, isSelected: false},
        {id: 2, path: 2, isSelected: false},
        {id: 3, path: 3, isSelected: false},
        {id: 4, path: 4, isSelected: false},
        {id: 5, path: 5, isSelected: false},
        {id: 6, path: 6, isSelected: false},
        {id: 7, path: 7, isSelected: false},
        {id: 8, path: 8, isSelected: false},
        {id: 9, path: 9, isSelected: false},
        {id: 10, path: 10, isSelected: false},
    ])

    const [flag, setFlag] = useState(true)

    const handleActive = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const id = Number(event.currentTarget.id)
        if (scale === "5") {
            setFiveNumbers(prevState => prevState.map((item) => {
                if (item.id === id) {
                    return {...item, isSelected: true}
                } else {
                    return {...item, isSelected: false}
                }
            }))
        } else if (scale === "10") {
            scale === "10" && setTenNumbers(prevState => prevState.map((item) => {
                if (item.id === id) {
                    return {...item, isSelected: true}
                } else {
                    return {...item, isSelected: false}
                }
            }))
        }
    }

    const showMeThanks = (scale: string, tenNumbers: IFiveNumSurveyLocalStateItem[], fiveNumbers: IFiveNumSurveyLocalStateItem[]) => () => {
        let activeNumber: IFiveNumSurveyLocalStateItem[]
        if (scale === "10") {
            activeNumber = tenNumbers.filter(number => number.isSelected)
        } else {
            activeNumber = fiveNumbers.filter(number => number.isSelected)
        }
        activeNumber[0] && setFlag(prevState => !prevState)
        activeNumber[0] && postAnswer([1], activeNumber[0].id)
    }

    useEffect(() => {
        answerIsGot && setFlag(false)
    }, [answerIsGot])

    return (
        state
            ? flag
                ? <div className={style.fiveNumSurvey} style={{backgroundColor: backgroundColor}}>
                    <h2 className={style.fiveNumSurvey__title}>{questionName0}</h2>
                    <ul className={style.fiveNumSurvey__list}>
                        {
                            scale === "10"
                                ? tenNumbers.map((number) => {
                                    return <li
                                        style={{backgroundColor: number.isSelected ? mainColor : ""}}
                                        className={`${style.fiveNumSurvey__item} ${number.isSelected ? style.fiveNumSurvey__item_active : ""}`}
                                        onClick={handleActive}
                                        onMouseOver={fakeHoverOn(mainColor)}
                                        onMouseLeave={fakeHoverOff(mainColor, number.isSelected)}
                                        id={number.id.toString()}
                                        key={number.id}>{number.path}
                                    </li>
                                })
                                : fiveNumbers.map((number) => {
                                    return <li
                                        style={{backgroundColor: number.isSelected ? mainColor : ""}}
                                        className={`${style.fiveNumSurvey__item} ${number.isSelected ? style.fiveNumSurvey__item_active : ""}`}
                                        onClick={handleActive}
                                        onMouseOver={fakeHoverOn(mainColor)}
                                        onMouseLeave={fakeHoverOff(mainColor, number.isSelected)}
                                        id={number.id.toString()}
                                        key={number.id}>{number.path}
                                    </li>
                                })
                        }
                    </ul>
                    <div className={style.fiveNumSurvey__text_wrap}>
                        <p className={style.fiveNumSurvey__text}>{angry}</p>
                        <p className={style.fiveNumSurvey__text}>{happy}</p>
                    </div>
                    <div className={style.fiveNumSurvey__btn_wrap}>
                        <SendBtn mainColor={mainColor} showMeThanks={showMeThanks(scale, tenNumbers, fiveNumbers)}/>
                    </div>
                </div>
                : <ThanksWidget
                    backgroundColor={thanksBackgroundColor}
                    surveyThanksText={surveyThanksText}
                    waveColor={thanksWaveColor}
                />
            : <Loader/>
    )
}

export default React.memo(FiveNumSurvey)
