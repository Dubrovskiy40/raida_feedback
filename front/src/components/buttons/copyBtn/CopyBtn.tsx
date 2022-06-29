import React from "react"

import style from "./copyBtn.module.css"
import {ICopyBtn} from "../../../store/types"


const CopyBtn: React.FC<ICopyBtn> = ({
                                         width,
                                         isDisabled = false,
                                         isCopied,
                                         callBack = () => {},
                                     }) => {

    return (
        <button
            className={`${style.copyBtn} ${isDisabled ? style.copyBtn_disabled : ""} ${isCopied ? style.copyBtn_copied : ""}`}
            onClick={callBack}
            style={{width: width}}>
            {isCopied ? "СКОПИРОВАНО" : "КОПИРОВАТЬ ССЫЛКУ"}
        </button>
    )
}

export default CopyBtn
