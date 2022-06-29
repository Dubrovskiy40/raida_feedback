import React from "react"
import {Bar} from "react-chartjs-2"
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js"

import style from "./veticalChart.module.css"
import {getData} from "../../../helpers/helpers"

export interface IDataObj {
    [key: string]: IDateSet
}

export interface IDateSet {
    labels: string[]
    datasets: Array<{
        label: string,
        data: number[],
        backgroundColor: string[],
        borderWidth: number,
        borderRadius: number,
        borderColor: string,
    }>
}

export interface IVerticalChartProps {
    scale: string
    typeSurvey: number
    labelsSmiles: string[]
    statistics: number[]
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const VerticalChart: React.FC<IVerticalChartProps> = ({labelsSmiles, typeSurvey, scale,statistics}) => {

    const labels = ['', '', '', '', '']
    const labelsFiveNumber = ['1', '2', '3', '4', '5']
    const labelsTenNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    const bgc5 = ['#64C7FE', '#64C7FE', '#64C7FE', '#FAA846', '#23B979']
    const bgc10 = ['#64C7FE', '#64C7FE', '#64C7FE', '#64C7FE', '#64C7FE', '#64C7FE', '#FAA846', '#FAA846', '#23B979', '#23B979']
    const bc = '#FFF'

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }

    const dataObj: IDataObj = {
        data1: {
            labels: labels,
            datasets: [
                {
                    label: 'Опрос по CSAT',
                    data: statistics,
                    backgroundColor: bgc5,
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: bc,
                },
            ],
        },
        data2: {
            labels: labelsFiveNumber,
            datasets: [
                {
                    label: 'Опрос CES по 5 бальной шкале',
                    data: statistics,
                    backgroundColor: bgc5,
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: bc,
                },
            ],
        },
        data3: {
            labels: labelsTenNumber,
            datasets: [
                {
                    label: 'Опрос NPS по 10 бальной шкале',
                    data: statistics,
                    backgroundColor: bgc10,
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: bc,
                },
            ],
        },
        data4: {
            labels: labelsTenNumber,
            datasets: [
                {
                    label: 'Опрос CES по 10 бальной шкале',
                    data: statistics,
                    backgroundColor: bgc10,
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: bc,
                },
            ],
        }
    }

    return (
        <div className={style.verticalBar}>
            <Bar
                options={options}
                data={getData(typeSurvey, scale, dataObj)}
            />
            {
                typeSurvey === 1 && <div className={style.smileLabels}>
                    {
                        labelsSmiles.map((item: string, index) => {
                            return (
                                <img key={index} src={item} alt={" "}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default VerticalChart