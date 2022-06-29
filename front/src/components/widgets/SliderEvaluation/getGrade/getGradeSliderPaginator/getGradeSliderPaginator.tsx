import React from "react"

import style from "./getGradeSliderPaginator.module.css"
import {IGetGradeSliderPaginator} from "../../../../../store/types"


const GetGradeSliderPaginator: React.FC<IGetGradeSliderPaginator> = ({page, setPage, mainColor}) => (
    <div>
        <span className={`${style.text} ${style.pageButton}`}
              onClick={setPage(1)}
              style={{color: mainColor}}>1</span>
        <span className={style.text}
              style={{color: mainColor}}>/</span>
        <span className={`${style.text} ${style.pageButton}`}
              onClick={setPage(2)}
              style={{color: mainColor, opacity: page !== 2 ? 0.5 : 1}}>2</span>
        <div className={style.statusBar}>
            <div className={style.statusBarRail} style={{backgroundColor: `${mainColor}80`}}/>
            <div className={`${style.statusBarTrack} ${page === 2 && style.statusBarTrack__full}`}
                 style={{backgroundColor: mainColor}}/>
        </div>
    </div>
)

export default GetGradeSliderPaginator