import {useDispatch} from "react-redux"
import React, {useEffect, useState} from "react"

import style from "./deviceType.module.css"
import {IDeviceType} from "../../../store/types"
import {setSizeOfSurvey} from "../../../store/surveyReducer"
import phone from "../../../assets/images/deviceType/phone.png"
import tablet from "../../../assets/images/deviceType/tablet.png"
import computer from "../../../assets/images/deviceType/computer.png"


const DeviceType: React.FC<IDeviceType> = ({deviceType}) => {

    const dispatch = useDispatch()
    const [type, setType] = useState([
        {id: "1", path: computer, deviceName: "deskTop", isSelected: false},
        {id: "2", path: tablet, deviceName: "tablet", isSelected: false},
        {id: "3", path: phone, deviceName: "phone", isSelected: false},

    ])

    useEffect(() => {
        setType(prevState => prevState.map((item) => {
                    if (item.deviceName === deviceType) {
                        return {...item, isSelected: true}
                    } else {
                        return {...item, isSelected: false}
                    }
                }
            )
        )
    }, [deviceType])

    return (
        <div className={style.deviceType}>
            <h2 className={style.deviceType__title}>Тип устройства</h2>
            <ul className={style.deviceType__list}>
                {
                    type.map((element) => {
                        return <li
                            className={`${style.deviceType__item} ${element.isSelected ? style.deviceType__item_active : ""}`}
                            id={element.id}
                            key={element.id}
                            onClick={(e: React.MouseEvent<HTMLLIElement>) => dispatch(setSizeOfSurvey(element.deviceName))}>
                            <img src={element.path} alt="device"/>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default DeviceType
