import React, {useEffect, useState} from "react"

import Loader from "../loader/Loader"
import style from "./smileSurvey.module.css"
import {ISmileSurvey} from "../../../store/types"
import SendBtn from "../../buttons/sendBtn/SendBtn"
import ThanksWidget from "../thanksWidget/ThanksWidget"
import smile1 from "../../../assets/images/smiles/smile-1.png"
import smile2 from "../../../assets/images/smiles/smile-2.png"
import smile3 from "../../../assets/images/smiles/smile-3.png"
import smile4 from "../../../assets/images/smiles/smile-4.png"
import smile5 from "../../../assets/images/smiles/smile-5.png"
import {fakeHoverOff, fakeHoverOn} from "../../../helpers/helpers"

export interface ISmileSurveyLocalStateItem {
    id: number,
    path: string,
    isSelected: boolean
}


const SmileSurvey: React.FC<ISmileSurvey> = ({state, postAnswer, answerIsGot}) => {

    const {
        angry,
        happy,
        mainColor,
        questionName0,
        backgroundColor,
        thanksWaveColor,
        surveyThanksText,
        thanksBackgroundColor
    } = state

    const [smiles, setSmiles] = useState<ISmileSurveyLocalStateItem[]>([
        {id: 1, path: smile1, isSelected: false},
        {id: 2, path: smile2, isSelected: false},
        {id: 3, path: smile3, isSelected: false},
        {id: 4, path: smile4, isSelected: false},
        {id: 5, path: smile5, isSelected: false},
    ])

    const [flag, setFlag] = useState<boolean>(true)

    function handleColor(event: React.MouseEvent<HTMLLIElement>) {
        const id = Number(event.currentTarget.id)
        setSmiles(prevState => prevState.map((item) => {
            if (item.id === id) {
                return {...item, isSelected: true}
            } else {
                return {...item, isSelected: false}
            }
        }))
    }

    const showMeThanks = (smiles: ISmileSurveyLocalStateItem[], setFlag: React.Dispatch<React.SetStateAction<boolean>>, postAnswer: (questionNumber: number[], garde1: number, grade2?: string) => void) => () => {
        const activeSmile = smiles.filter(smile => smile.isSelected)
        activeSmile[0] && setFlag(prevState => !prevState)
        activeSmile[0] && postAnswer([1], activeSmile[0].id)
    }

    useEffect(() => {
        answerIsGot && setFlag(false)
    }, [answerIsGot])

    return (
        state
            ? flag
                ? <div className={style.smileSurvey} style={{backgroundColor: backgroundColor}}>
                    <h2 className={style.smileSurvey__title}>{questionName0}</h2>
                    <ul className={style.smileSurvey__list}>
                        {
                            smiles.map((smile) => (
                                <li
                                    style={{backgroundColor: smile.isSelected? mainColor : ""}}
                                    className={`${style.smileSurvey__item} ${smile.isSelected ? style.smileSurvey__item_active : ""}`}
                                    id={smile.id.toString()}
                                    key={smile.id}
                                    onClick={handleColor}
                                    onMouseOver={fakeHoverOn(mainColor)}
                                    onMouseLeave={fakeHoverOff(mainColor, smile.isSelected)}>
                                    <img src={smile.path} alt="smile"/>
                                </li>
                            ))
                        }
                    </ul>
                    <div className={style.smileSurvey__text_wrap}>
                        <p className={style.smileSurvey__text}>{angry}</p>
                        <p className={style.smileSurvey__text}>{happy}</p>
                    </div>
                    <div className={style.smileSurvey__btn_wrap}>
                        <SendBtn mainColor={mainColor} showMeThanks={showMeThanks(smiles, setFlag, postAnswer)}/>
                    </div>
                </div>
                : <ThanksWidget backgroundColor={thanksBackgroundColor} surveyThanksText={surveyThanksText}
                                waveColor={thanksWaveColor}/>
            : <Loader/>

    )
}

export default React.memo(SmileSurvey)
