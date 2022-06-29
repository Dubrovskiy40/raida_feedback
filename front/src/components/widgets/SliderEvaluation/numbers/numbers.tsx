import React from "react"
import style from "./numbers.module.css"
import {INumbers} from "../../../../store/types"


let Numbers: React.FC<INumbers> = ({range = 10, selectedNumber}) => {

    const positionArray = [0.3, 11.1111, 22.2222, 33, 44, 54.5, 65.27, 76.18, 86.9, 97.2]

    let numbersArray = []
    for (let i = 1; i <= range; i++) {
        numbersArray.push(i)
    }

    const ratingNumbers = numbersArray.map((element, index) => (
            <span key={element}
                  className={`${style.number} ${(index + 1) === selectedNumber ? style.number_selected : ""} ${selectedNumber !== 0 ? style.number_unselected : ""}`}
                  style={{left: `${positionArray[element - 1]}%`}}>{element}</span>
        )
    )

    return (
        <>
            {ratingNumbers}
        </>
    )
}

export default Numbers