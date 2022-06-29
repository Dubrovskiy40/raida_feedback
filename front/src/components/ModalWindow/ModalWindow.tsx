import React from "react"
import Box from "@mui/material/Box"

import style from "./modalWindow.module.css"
import CopyBtn from "../buttons/copyBtn/CopyBtn"
import {useDispatch, useSelector} from "react-redux"
import MyInput from "../miscellaneous/myInputs/MyInput"
import {handleCopyUrlThunk} from "../../store/appReducer"
import SocialNetwork from "../miscellaneous/socialNetwork/SocialNetwork"
import {getIsCopiedToClipBoard, getUrlToShare} from "../../store/selectors/selectors"

const styles = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: " var(--lactic)",
    border: "2px solid  var(--violet)",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
    padding: "64px 48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: "500"
}

interface IModalWindow {
    selectedSurveyId: number
}

const ModalWindow: React.FC<IModalWindow> = ({selectedSurveyId}) => {

    const dispatch = useDispatch()
    const urlToShare = useSelector(getUrlToShare)
    const isCopiedToClipBoard = useSelector(getIsCopiedToClipBoard)

    const handleCopyUrl = () => {
        dispatch(handleCopyUrlThunk(urlToShare))
    }

    return (
        <div>
                <Box sx={styles}>
                    <p className={style.label}>Поделитесь этой ссылкой, чтобы распространить свой опрос</p>
                    <div className={style.url_container}>
                        <MyInput name={"urlToShare"} value={`https://feedback.skroy.ru/survey/demo/${selectedSurveyId}`} isForUrl={true}/>
                        <div className={style.social_container}>
                            <SocialNetwork id={selectedSurveyId}/>
                        </div>
                        <CopyBtn isCopied={isCopiedToClipBoard} callBack={handleCopyUrl}/>
                    </div>
                </Box>
        </div>
    )
}

export default ModalWindow