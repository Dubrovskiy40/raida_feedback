import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import style from "./ShareLink.module.css"
import TopBlock from "./TopBlock/TopBlock"
import {IShareLinkProps} from "../../store/types"
import BottomBlock from "./BottomBlock/BottomBlock"
import {getIsCopiedToClipBoard, getUrlToShare} from "../../store/selectors/selectors"
import {handleCopyUrlThunk, setActivePage, setIsVisited} from "../../store/appReducer"


const ShareLink: React.FC<IShareLinkProps> = ({surveyState}) => {

    const dispatch = useDispatch()
    const urlToShare = useSelector(getUrlToShare)
    const isCopiedToClipBoard = useSelector(getIsCopiedToClipBoard)

    useEffect(() => {
        dispatch(setActivePage(4))
        dispatch(setIsVisited('visitedPage4', true))
    }, [dispatch])

    const handleCopyUrl = () => {
        dispatch(handleCopyUrlThunk(urlToShare))
    }

    return (
        <div className={style.container}>
            <TopBlock state={surveyState}/>
            <BottomBlock urlToShare={urlToShare} handleCopyToClipboard={handleCopyUrl}
                         isCopiedToClipBoard={isCopiedToClipBoard} surveyId={surveyState.id}/>
        </div>
    )
}

export default React.memo(ShareLink)