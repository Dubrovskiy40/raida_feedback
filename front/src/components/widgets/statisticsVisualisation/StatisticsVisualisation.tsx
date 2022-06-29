import React, {useState} from "react"

import style from "./statisticsVisualisation.module.css"
import smile1 from "../../../assets/images/smiles/smile-1.png"
import smile2 from "../../../assets/images/smiles/smile-2.png"
import smile3 from "../../../assets/images/smiles/smile-3.png"
import smile4 from "../../../assets/images/smiles/smile-4.png"
import smile5 from "../../../assets/images/smiles/smile-5.png"

const StatisticsVisualisation = () => {

    const [state, setState] = useState([
        {id: 1, name: "veryUnSatisfied", img: smile1, value: 10, className: style.smileItem},
        {id: 2, name: "unSatisfied", img: smile2, value: 5, className: `${style.second_result} ${style.smileItem}`},
        {id: 3, name: "neutral", img: smile3, value: 20, className: style.smileItem},
        {id: 4, name: "satisfied", img: smile4, value: 40, className: `${style.forth_result} ${style.smileItem}`},
        {id: 5, name: "verySatisfied", img: smile5, value: 25, className: style.smileItem},
    ])

    return (
        <div className={style.result_visualisation_block}>
            {
                state.map((item) => {
                    return (
                        <div key={item.id} className={item.className}>
                            <img src={item.img} alt="смайлик"/>
                            <p className={style.visualisation_value}>{item.value}%</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default StatisticsVisualisation