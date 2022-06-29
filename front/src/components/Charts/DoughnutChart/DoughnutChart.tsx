import React from "react"
import {Doughnut} from "react-chartjs-2"
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js"

import style from "./doughnutCharts.module.css"
import {IDoughnutChartProps} from "../../../store/types"
import {getLabelsPosition, getRoundedAverage} from "../../../helpers/helpers"

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart: React.FC<IDoughnutChartProps> = ({statistics, typeOfSurvey, labelsSmiles, nps}) => {
    console.log('statistics',statistics)
    console.log('typeOfSurvey',typeOfSurvey)
    console.log('labelsSmiles',labelsSmiles)
    console.log('nps',nps)
    const average = statistics[2]
    console.log('average',average)

    const data = {
        labels: [],
        datasets: [
            {
                data: typeOfSurvey === 3 ? `${nps}%` : average,
                backgroundColor: [
                    '#23B979',
                    '#FFF'
                ],
                borderColor: [
                    '#FFF',
                ],
                borderWidth: 2,
            },
        ],
    }

    const averageDataToRender = getRoundedAverage(statistics)

    const numbersArray = statistics[2] && new Array(statistics[2][0] + statistics[2][1]).fill(0)

    return (
        <>
            <h2 className={style.pieBar__title}>{"Средний показатель"}</h2>
            <div className={style.doughnutChart_Wrapper}>
                {
                    numbersArray ? <Doughnut data={data}/> : "нет ответов"
                }
                {
                    typeOfSurvey > 1 && <span className={style.doughnutChart__average}>{averageDataToRender}</span>
                }
                {
                    typeOfSurvey === 1 && numbersArray &&
                    <img src={labelsSmiles[Math.floor(Number(averageDataToRender))]}
                         className={style.doughnutChart__average} alt={' '}/>
                }
                {
                    typeOfSurvey === 1 && numbersArray && numbersArray.map((_, index) => {
                        return (
                            <div key={index}
                                 style={getLabelsPosition(numbersArray.length, index + 1, averageDataToRender, typeOfSurvey)}>
                                <img src={labelsSmiles[index]} alt={' '}/>
                            </div>
                        )
                    })
                }
                {
                    typeOfSurvey > 1 && numbersArray && numbersArray.map((_, index) => {
                        return (
                            <div key={index}
                                 style={getLabelsPosition(numbersArray.length, index + 1, averageDataToRender, typeOfSurvey)}>
                                {index}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DoughnutChart
