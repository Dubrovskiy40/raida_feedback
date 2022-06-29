import style from "./recommendations.module.css"
import {IAnswer} from "../../../store/surveyAnswerReducer"
import RecommendationItem from "./RecommendationItem/RecommendationItem"
import React, {MutableRefObject, useEffect, useRef, useState} from "react"
import {ReactComponent as Triangle} from "../../../assets/images/Recomendations/Triangle.svg"

interface IRecommendationProps {
    answers: IAnswer[]
}

const Recommendations: React.FC<IRecommendationProps> = ({answers}) => {

    const [textArray, setTextArray] = useState<string[]>([])

    const pagesCount = Math.ceil(answers.length / 6)

    const currentPage = useRef<number>(1)

    const handleShowMore = (answers: IAnswer[], pagesCount: number, setTextArray: React.Dispatch<React.SetStateAction<string[]>>, currentPage: MutableRefObject<number>) => () => {

        if (currentPage.current <= pagesCount) {
            const array: string[] = []
            const startIndex = (currentPage.current * 6) - 6
            const stopIndex = (currentPage.current * 6) > answers.length ? answers.length : (currentPage.current * 6)
            for (let i = startIndex; i <= stopIndex - 1; i++) {
                array.push(answers[i]?.wishes)
            }
            currentPage.current++
            setTextArray((prevState => prevState.concat(array)))
        }
    }

    useEffect(() => {
        if (answers.length) {
            const array: string[] = []
            const stopIndex = answers.length < 6 ? answers.length-1 : currentPage.current * 6
            for (let i = 0; i <= stopIndex; i++) {
                array.push(answers[i]?.wishes)
            }
            currentPage.current = 2
            setTextArray(array)
        }
    }, [answers])

    const conditionalToDisableButton = currentPage.current-1 === pagesCount


    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {
                    textArray.map((item, index) => <RecommendationItem key={index} isShow={undefined}
                                                                       text={item}/>)
                }
            </div>
            <button className={style.showMore} disabled={conditionalToDisableButton} onClick={handleShowMore(answers, pagesCount, setTextArray, currentPage)}>
                <p>Показать еще</p>
                <Triangle fill={`${conditionalToDisableButton?"rgba(84, 84, 84, 0.6)":"#7C74D5"}`}/>
            </button>
        </div>
    )
}

export default Recommendations