import React from "react"
import {Slider} from "antd"

import Numbers from "../../numbers/numbers"
import style from "./getGradeSliderPage1.module.css"
import {IGetGradeSliderPage1Props} from "../../../../../store/types"
import GetGradeSliderPaginator from "../getGradeSliderPaginator/getGradeSliderPaginator"


const GetGradeSliderPage1: React.FC<IGetGradeSliderPage1Props> = ({
                                                                      page,
                                                                      range,
                                                                      state,
                                                                      setPage,
                                                                      isDisable,
                                                                      evaluation,
                                                                      setEvaluation
                                                                  }) => {

    const {backgroundColor, angry, happy, mainColor, questionName0} = state

    const marks = {
        1: " ",
        2: " ",
        3: " ",
        4: " ",
        5: " ",
        6: " ",
        7: " ",
        8: " ",
        9: " ",
        10: " ",
    }

    const root = document.documentElement
    root.style.setProperty("--customerSelectedColor", mainColor)
    root.style.setProperty("--customerSelectedColorLighter", "#FFFFFF90")
    root.style.setProperty("--customerSelectedColorBrighten", `${mainColor}80`)

    return (
        <div className={style.wrapper} style={{backgroundColor: backgroundColor}}>
            <GetGradeSliderPaginator page={page} setPage={setPage} mainColor={mainColor}/>
            <h3 className={style.header}>{questionName0}</h3>
            <div className={style.numberBlock}>
                <Numbers range={range} selectedNumber={evaluation}/>
                <Slider trackStyle={{backgroundColor: mainColor}} defaultValue={1} value={evaluation} handleStyle={{backgroundColor: mainColor}} marks={marks} min={1} max={10}
                        onChange={(value => setEvaluation(value))}/>
            </div>
            <div className={style.label}>
                <span>{angry}</span>
                <span>{happy}</span>
            </div>
            <button disabled={isDisable} onClick={setPage(2)} className={style.button}
                    style={{backgroundColor: mainColor}}>
                ДАЛЕЕ
            </button>
        </div>
    )
}

export default GetGradeSliderPage1