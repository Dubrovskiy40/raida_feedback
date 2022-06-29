import React from "react"

import style from "./getGradeSliderPage2.module.css"
import BackIcon from "./backIcon/BackIcon"
import {IGetGradeSliderPage2Props} from "../../../../../store/types"
import GetGradeSliderPaginator from "../getGradeSliderPaginator/getGradeSliderPaginator"


const GetGradeSliderPage2: React.FC<IGetGradeSliderPage2Props> = ({
                                                                      page,
                                                                      state,
                                                                      setPage,
                                                                      isDisable,
                                                                      evaluation2,
                                                                      handleSubmit,
                                                                      setEvaluation2
                                                                  }) => {

    const {backgroundColor, questionName1, mainColor} = state

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEvaluation2(event.currentTarget.value)
    }

    return (
        <div className={style.wrapper} style={{backgroundColor: backgroundColor}}>
            <GetGradeSliderPaginator page={page} setPage={setPage} mainColor={mainColor}/>
            <h3 className={style.header}>{questionName1}</h3>
            <div className={style.proposeBlock}>
                <textarea className={style.texArea} placeholder={"Введите текст"} value={evaluation2}
                          onChange={handleChange}/>
            </div>
            <div className={style.button_block}>
                <button className={style.back_button} onClick={setPage(1)}>
                    <BackIcon mainColor={mainColor}/>
                </button>
                <button disabled={isDisable} onClick={handleSubmit} className={style.button}
                        style={{backgroundColor: mainColor}}>
                    ОТПРАВИТЬ
                </button>
            </div>
        </div>
    )
}

export default GetGradeSliderPage2