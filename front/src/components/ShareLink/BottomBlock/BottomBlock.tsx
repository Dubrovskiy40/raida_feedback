import React from "react"

import style from "./BottomBlock.module.css"
import {IBottomBlock} from "../../../store/types"
import CopyBtn from "../../buttons/copyBtn/CopyBtn"
import MyInput from "../../miscellaneous/myInputs/MyInput"
import StatisticsBtn from "../../buttons/statisticsBtn/StatisticsBtn"
import SocialNetwork from "../../miscellaneous/socialNetwork/SocialNetwork"

const BottomBlock: React.FC<IBottomBlock> = ({urlToShare, handleCopyToClipboard, isCopiedToClipBoard, surveyId}) => (
    <div className={style.bottomContainer}>
        <h1 className={style.header}>Ваш опрос готов к работе!</h1>
        <p className={style.label}>Поделитесь этой ссылкой, чтобы распространить свой опрос</p>
        <div className={style.url_container}>
            <MyInput name={"urlToShare"} value={urlToShare} isForUrl={true}/>
            <CopyBtn isCopied={isCopiedToClipBoard} callBack={handleCopyToClipboard}/>
        </div>
        <div className={style.social_container}>
            <SocialNetwork id={surveyId}/>
        </div>
        <div className={style.buttonContainer}>
            <StatisticsBtn/>
        </div>
    </div>
)

export default BottomBlock