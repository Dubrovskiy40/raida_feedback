import React, {useState} from "react"

import style from "./recommendationItem.module.css"
import {ReactComponent as Show} from "../../../../assets/images/Recomendations/Show.svg"
import {ReactComponent as Hide} from "../../../../assets/images/Recomendations/Hide.svg"
import {ReactComponent as Settings} from "../../../../assets/images/Recomendations/Settings.svg"

export interface IRecommendationItemProps {
    isShow: boolean | undefined
    text: string
}

const RecommendationItem: React.FC<IRecommendationItemProps> = ({isShow, text}) => {

    const [hide, setHide] = useState<boolean>(false)

    const handleHideAnswer = (setHide: React.Dispatch<React.SetStateAction<boolean>>, isShow: boolean | undefined) => () => {
        (isShow === undefined) && setHide((prevState) => !prevState)
        return (isShow !== undefined) && "need to add dispatch Hide/Show action"
    }

    return (
        <div className={`${isShow || hide ? `${style.wrapper} ${style.wrapper__hidden}` : style.wrapper}`}>
            <span className={style.text}>{text}</span>
            <button className={style.button}><Settings/></button>
            {
                hide || isShow
                    ? <button className={style.button}><Show onClick={handleHideAnswer(setHide, isShow)}/></button>
                    : <button className={style.button}><Hide onClick={handleHideAnswer(setHide, isShow)}/></button>
            }
        </div>
    )
}

export default RecommendationItem