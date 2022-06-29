import React from "react"

import {useDispatch} from "react-redux"
import style from "./settingBtn.module.css"
import {setIsShowShareLinkModal} from "../../../store/appReducer"
import {ReactComponent as SettingButton} from "../../../assets/images/btns/SettingBtn.svg"


const SettingsBtn: React.FC = () => {

    const dispatch = useDispatch()

    const handleOpen = () => dispatch(setIsShowShareLinkModal(true))

    return (
        <button className={style.wrapper} onClick={handleOpen}>
            <SettingButton/>
        </button>
    )
}

export default React.memo(SettingsBtn)