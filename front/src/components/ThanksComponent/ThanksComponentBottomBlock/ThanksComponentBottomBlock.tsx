import React from "react"

import MyInput from "../../miscellaneous/myInputs/MyInput"
import CreateBtn from "../../buttons/createBtn/CreateBtn"
import style from "./thanksComponentBottomBlock.module.css"
import {IThanksComponentBottomBlock} from "../../../store/types"


const ThanksComponentBottomBlock: React.FC<IThanksComponentBottomBlock> = ({
                                                                               surveyState,
                                                                               handleChange,
                                                                               handlePostSurvey,
                                                                           }) => {

    const {nameOfSurvey, surveyThanksText} = surveyState

    const conditionalDisableButton = nameOfSurvey === "" || surveyThanksText === ""

    return (
        <div className={style.wrapper}>
            <div>
                <h1 className={style.header}>{"Выберите сообщение с благодарностью"}</h1>
                <p className={style.text}>{"Выразите благодарность за полученный отзыв.Что бы вы хотели сказать в конце опроса."}</p>
                <p className={style.label}>{`Текст сообщения${surveyThanksText === "" ? "*" : ""}`}</p>
                <MyInput name={"surveyThanksText"} value={surveyThanksText} handleChange={handleChange}/>
            </div>
            <div className={style.bottomContainer}>
                <div className={style.buttonContainer}>
                    <CreateBtn isLink={true} disabled={conditionalDisableButton} path={"/share_link"}
                               handleClick={handlePostSurvey}
                               isShowAlert={conditionalDisableButton}>
                        {"ПРОДОЛЖИТЬ"}
                    </CreateBtn>
                </div>
            </div>
        </div>
    )
}

export default ThanksComponentBottomBlock