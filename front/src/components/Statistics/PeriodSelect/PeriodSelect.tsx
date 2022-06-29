import React, {RefObject, useRef, useState} from "react"

import style from "./periodSelect.module.css"
import {ReactComponent as Chevron} from "../../../assets/images/periodSelect/chevron.svg"

export interface IPeriodSelectLocalStateItem {
    id: number,
    name: string,
    isSelected: boolean,
    value: number | string
}

const PeriodSelect: React.FC = () => {

    const ref = useRef<HTMLInputElement>(null)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [state, setState] = useState<IPeriodSelectLocalStateItem[]>([
            {id: 0, name: "День", isSelected: false, value: new Date(Date.now() - 86400000).toString()},
            {id: 1, name: "Неделя", isSelected: true, value: new Date(Date.now() - 604800000).toString()},
            {id: 2, name: "Месяц", isSelected: false, value: new Date(Date.now() - 2678400000).toString()},
            {id: 3, name: "Год", isSelected: false, value: new Date(Date.now() - 31536000000).toString()},
            {id: 4, name: "Период", isSelected: false, value: ""},
        ]
    )

    const openToggle = () => {
        setIsOpen(prev => !prev)
    }

    const getSelectedPeriodName = () => state.filter((item) => item.isSelected)[0].name

    const onFocusShowPicker = (ref: RefObject<HTMLInputElement>) => () => {
        // @ts-ignore
        ref.current.showPicker()
    }

    const handleSelectPeriod = (id: number) => (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>) => {
        setState((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    item.isSelected = true
                    return item
                } else {
                    item.isSelected = false
                    return item
                }
            })
        })
        // @ts-ignore
        if (event.target.value === undefined) {
            console.log(event.currentTarget.dataset.value, event)
            setIsOpen(false)
        } else {
            // @ts-ignore
            console.log(event.currentTarget.value)
            setIsOpen(false)
        }
    }

    return (
        <>
            <div className={style.window_close_layer} style={{display: isOpen? "block": "none"}} onClick={openToggle}/>
            <div className={style.wrapper}>
                <div className={style.header} onClick={openToggle}>
                    <span>{getSelectedPeriodName()}</span>
                    <Chevron className={`${style.chevron} ${isOpen ? style.chevron_open : ""}`}/>
                </div>
                <div className={`${style.dropDownList} ${isOpen && style.dropDownList_open}`}>
                    {
                        state.map((item) => {
                            if (item.name === "Период") {
                                return (
                                    <label
                                        key={item.id}
                                        className={`${style.dropDownList__item} ${item.isSelected && style.dropDownList__item_selected}`}>
                                        {"Период"}
                                        <Chevron
                                            className={`${style.chevron} ${style.chevron_rotated} ${isOpen ? style.chevron_open : ""}`}/>
                                        <input ref={ref} className={style.dropDownList__input_date} type={"date"}
                                               key={item.id} onChange={handleSelectPeriod(item.id)}
                                               onFocus={onFocusShowPicker(ref)}/>
                                    </label>
                                )

                            }
                            return (
                                <div key={item.id}
                                     className={`${style.dropDownList__item} ${item.isSelected && style.dropDownList__item_selected}`}
                                     onClick={handleSelectPeriod(item.id)} data-value={item.value}>
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default React.memo(PeriodSelect)