import React from "react"

import {apiLocal} from "../api/apiLocal"
import {IAnswer} from "../store/surveyAnswerReducer"
import {IProjectItem} from "../store/surveyArrayReducer"
import {IDataObj} from "../components/Charts/VerticalChart/VerticalChart"

/**NameOfSurveySelect**/

export const getSelectedSurveyName = (namesArray: Array<IProjectItem>, id: number) => {
    return namesArray.filter((item) => item.id === id)
}

/****/

/**DemoPage**/

export const getAnswerIsGot = (surveyId: number) => {
    const projectId = apiLocal.getIsAnswerFromLocalStorage(surveyId)
    return Number(projectId) === surveyId
}

export const getPositionStyle = (position: string) => {
    switch (position) {
        case "topLeft": {
            return {
                top: "10px",
                left: "10px"
            }
        }
        case "topCenter": {
            return {
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)"
            }
        }
        case "topRight": {
            return {
                top: "10px",
                right: "10px"
            }
        }
        case "centerLeft": {
            return {
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)"
            }
        }
        case "center": {
            return {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }
        }
        case "centerRight": {
            return {
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
            }
        }
        case "bottomLeft": {
            return {
                bottom: "10px",
                left: "10px"
            }
        }
        case "bottomCenter": {
            return {
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)"
            }
        }
        case "bottomRight": {
            return {
                bottom: "10px",
                right: "10px"
            }
        }
    }
}

/***StatisticsBottomBlock***/

export const getStatistics = (answer1: IAnswer[], selectedSurveyScale: string, typeOfSurvey: number): Array<number[]> => {

    if (answer1.length === 0) {
        return []
    }

    if (typeOfSurvey <= 2) {

        const sizeOfScale: number = parseInt(selectedSurveyScale)

        const sortedAnswers: number[] = getSortedAnswerArray(answer1, sizeOfScale)

        const answerAverageRating: number = getAnswerAverageRating(answer1)

        const percents: number[] = getPercentArrayForChart(sortedAnswers, answer1.length)

        const shortStatistics: number[] = getShortStatisticsArray(percents, sizeOfScale)

        return [percents, shortStatistics, [answerAverageRating, sizeOfScale - answerAverageRating]]

    } else {

        const sortedAnswers: number[] = getSortedAnswerArray(answer1, 10)

        const percents: number[] = getPercentArrayForChart(sortedAnswers, answer1.length)

        const shortStatistics: number[] = getShortStatisticsArray(percents, 10)

        const npsRating = getNPSRating(answer1.length, sortedAnswers)

        return [percents, shortStatistics, [0, 0], [npsRating]]
    }
}

interface IStatisticsObj {
    [key: string]: number
}

const getSortedAnswerArray = (answer1: IAnswer[], scale: number): number[] => {

    const statisticsObj: IStatisticsObj = {}

    for (let i = 1; i <= scale; i++) {
        statisticsObj[`grade${i}`] = 0
    }

    answer1.forEach((item) => {
        statisticsObj[`grade${item.rating}`]++
    })

    return Object.values(statisticsObj)
}

const getAnswerAverageRating = (answer1: IAnswer[]): number => {
    return answer1.map(item => item.rating).reduce((p, n) => p + n) / answer1.length
}

const getPercentArrayForChart = (sortedAnswers: number[], answer1Length: number): number[] => {

    return sortedAnswers.map((value, index) => {
        if (sortedAnswers[index] > 0) {
            return (Math.round(value / answer1Length * 100))
        } else {
            return 0
        }
    })
}

const getShortStatisticsArray = (percents: number[], scale: number): number[] => {

    const shortStatistics: number[] = new Array(3).fill(0)

    percents.forEach((item, index) => {
        if (scale === 5) {
            if (index <= 2) {
                shortStatistics[0] = shortStatistics[0] + item
            }
            if (index === 3) {
                shortStatistics[1] = shortStatistics[1] + item
            }
            if (index === 4) {
                shortStatistics[2] = shortStatistics[2] + item
            }
        }
        if (scale === 10) {
            if (index <= 5) {
                shortStatistics[0] = shortStatistics[0] + item
            }
            if (index > 5 && index <= 8) {
                shortStatistics[1] = shortStatistics[1] + item
            }
            if (index > 8) {
                shortStatistics[2] = shortStatistics[2] + item
            }
        }
    })
    return shortStatistics
}

export const getTotalAnswersCount = (typeOfSurvey: number, answer1Length: number, answer2Length: number) => {
    if (typeOfSurvey === 3) {
        return answer1Length
    } else {
        return answer1Length + answer2Length
    }
}

const getNPSRating = (numbersOfAnswers: number, sortedAnswers: number[]) => {
    const shortStatisticsArray = getShortStatisticsArray(sortedAnswers, 10)
    return Math.round((shortStatisticsArray[2] - shortStatisticsArray[0]) / numbersOfAnswers * 100)
}

/****/

/**StatisticsBottomBlock**/

export const getSurveyName = (typeOfSurvey: number) => {
    return (
        typeOfSurvey === 1 ? "Опрос CSAT" :
            typeOfSurvey === 2 ? "Опрос CES" : "Опрос NPS"
    )
}

/****/

/**SmileSurvey & FiveNumberSurvey**/

export const fakeHoverOn = (mainColor: string) => (event: React.MouseEvent<HTMLLIElement>) => {
    event.currentTarget.style.backgroundColor = `${mainColor}90`
}
export const fakeHoverOff = (mainColor: string, isSelected: boolean) => (event: React.MouseEvent<HTMLLIElement>) => {
    event.currentTarget.style.backgroundColor = isSelected ? mainColor : ""
    event.currentTarget.style.opacity = ""
}

/****/

/**DoughnutChart**/

export const getLabelsPosition = (scale: number, index: number, average: string, typeOfSurvey: number) => {
    const roundedAverage = Math.floor(Number(average))
    if (typeOfSurvey === 1) {
        switch (index) {
            case 1:
                return {
                    position: "absolute" as "absolute",
                    top: "-2%",
                    left: "40%",
                    opacity: roundedAverage === 0 ? "1" : "0.4"
                }
            case 2:
                return {
                    position: "absolute" as "absolute",
                    top: "34%",
                    left: "98%",
                    opacity: roundedAverage === 1 ? "1" : "0.4"
                }
            case 3:
                return {
                    position: "absolute" as "absolute",
                    top: "94%",
                    left: "74%",
                    opacity: roundedAverage === 2 ? "1" : "0.4"
                }
            case 4:
                return {
                    position: "absolute" as "absolute",
                    top: "94%",
                    left: "3%",
                    opacity: roundedAverage === 3 ? "1" : "0.4"
                }
            case 5:
                return {
                    position: "absolute" as "absolute",
                    top: "34%",
                    left: "-22%",
                    opacity: roundedAverage === 4 ? "1" : "0.4"
                }


        }
    }

    if (scale === 5) {
        switch (index) {
            case 1:
                return {
                    position: "absolute" as "absolute",
                    top: "9%",
                    left: "47%",
                    fontWeight: roundedAverage === 0 ? "bold" : ""
                }
            case 2:
                return {
                    position: "absolute" as "absolute",
                    top: "40%",
                    left: "98%",
                    fontWeight: roundedAverage === 1 ? "bold" : ""
                }
            case 3:
                return {
                    position: "absolute" as "absolute",
                    top: "94%",
                    left: "78%",
                    fontWeight: roundedAverage === 2 ? "bold" : ""
                }
            case 4:
                return {
                    position: "absolute" as "absolute",
                    top: "96%",
                    left: "18%",
                    fontWeight: roundedAverage === 3 ? "bold" : ""
                }
            case 5:
                return {
                    position: "absolute" as "absolute",
                    top: "44%",
                    left: "-5%",
                    fontWeight: roundedAverage === 4 ? "bold" : ""
                }


        }

    } else if (scale === 10) {
        switch (index) {
            case 1:
                return {
                    position: "absolute" as "absolute",
                    top: "9%",
                    left: "47%",
                    fontWeight: roundedAverage === 0 ? "bold" : ""
                }
            case 2:
                return {
                    position: "absolute" as "absolute",
                    top: "17%",
                    left: "76%",
                    fontWeight: roundedAverage === 1 ? "bold" : ""
                }
            case 3:
                return {
                    position: "absolute" as "absolute",
                    top: "40%",
                    left: "98%",
                    fontWeight: roundedAverage === 2 ? "bold" : ""
                }
            case 4:
                return {
                    position: "absolute" as "absolute",
                    top: "67%",
                    left: "98%",
                    fontWeight: roundedAverage === 3 ? "bold" : ""
                }
            case 5:
                return {
                    position: "absolute" as "absolute",
                    top: "93%",
                    left: "79%",
                    fontWeight: roundedAverage === 4 ? "bold" : ""
                }
            case 6:
                return {
                    position: "absolute" as "absolute",
                    top: "102%",
                    left: "48%",
                    fontWeight: roundedAverage === 5 ? "bold" : ""
                }
            case 7:
                return {
                    position: "absolute" as "absolute",
                    top: "95%",
                    left: "17%",
                    fontWeight: roundedAverage === 6 ? "bold" : ""
                }
            case 8:
                return {
                    position: "absolute" as "absolute",
                    top: "71%",
                    left: "-2%",
                    fontWeight: roundedAverage === 7 ? "bold" : ""
                }
            case 9:
                return {
                    position: "absolute" as "absolute",
                    top: "44%",
                    left: "-4%",
                    fontWeight: roundedAverage === 8 ? "bold" : ""
                }
            case 10:
                return {
                    position: "absolute" as "absolute",
                    top: "19%",
                    left: "14%",
                    fontWeight: roundedAverage === 9 ? "bold" : ""
                }


        }
    } else {
        return {
            position: "absolute" as "absolute",
            top: "19%",
            left: "14%"
        }
    }

}

export const getRoundedAverage = (statistics: number[][]): string => {
    let average = ""
    if (statistics[2]) {
        average = Number(statistics[2][0]).toFixed(2)
    }
    return average
}

/********/

/**VerticalCart**/

export const getData = (typeOfSurvey: number, scale: string, dataObj: IDataObj) => {
    if (typeOfSurvey === 2 && scale === "10") {
        return dataObj.data4
    }
    return dataObj[`data${typeOfSurvey}`]
}