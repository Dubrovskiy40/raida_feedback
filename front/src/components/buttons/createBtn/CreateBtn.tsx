import React from "react"
import {NavLink} from "react-router-dom"

import style from "./createBtn.module.css"
import {ICreateBtn} from "../../../store/types"
import AlertTextBlock from "../../miscellaneous/alertTextBlock/AlertTextBlock"


const CreateBtn: React.FC<ICreateBtn> = ({
                                             isLink = false,
                                             path = "",
                                             handleClick = () => {
                                             },
                                             children,
                                             disabled = false,
                                             isShowAlert
                                         }) => {


    const multiFunc = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        if (disabled) {
            event.preventDefault()
        } else {
            handleClick()
        }
    }

    return (
        isLink ?
            <div className={style.button_wrap}>
                <NavLink className={`${style.createBtn} ${disabled ? style.createBtn_disabled : ""}`}
                         to={path} onClick={multiFunc}>{children ? children : "СОЗДАТЬ ОПРОС"}</NavLink>
                {
                    isShowAlert&&<div className={style.alert_wrap}><AlertTextBlock/></div>
                }
            </div>
            :
            <div className={style.button_wrap}>
                <button
                    className={style.createBtn} onClick={multiFunc}
                    disabled={disabled}>{children ? children : "СОЗДАТЬ ОПРОС"}
                </button>
                {
                    isShowAlert&&<div className={style.alert_wrap}><AlertTextBlock/></div>
                }
            </div>
    )
}

export default React.memo(CreateBtn)
