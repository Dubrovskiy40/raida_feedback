import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import "./App.css"
import {apiLocal} from "./api/apiLocal"
import Hello from "./components/Hello/Hello"
import Header from "./components/Header/Header"
import Error404 from "./components/404/Error404"
import DemoPage from "./components/DemoPage/DemoPage"
import Template from "./components/template/Template"
import AuthPage from "./components/AuthPage/AuthPage"
import Navbar from "./components/Header/Navbar/Navbar"
import ShareLink from "./components/ShareLink/ShareLink"
import {setReceivedDataOfAuth} from "./store/authReducer"
import Statistics from "./components/Statistics/Statistics"
import EditSurvey from "./components/EditSurvey/EditSurvey"
import {setReceivedDataOfSurvey} from "./store/surveyReducer"
import {setReceivedDataOfDraft} from "./store/draftSurveyReducer"
import SavePopUp from "./components/miscellaneous/savePopUp/SavePopUp"
import ThanksComponent from "./components/ThanksComponent/ThanksComponent"
import {setIsShowPopUp, setIsShowShareLinkModal, setReceivedDataOfApp} from "./store/appReducer"
import {
    getIsShowPopUp,
    getIsShowShareLinkModal,
    getSelectedSurvey,
    getState,
    getSurveyState
} from "./store/selectors/selectors"
import ModalWindow from "./components/ModalWindow/ModalWindow";


const App: React.FC = () => {

    const dispatch = useDispatch()
    const state = useSelector(getState)
    const isShowPopUp = useSelector(getIsShowPopUp)
    const surveyState = useSelector(getSurveyState)
    const selectedSurveyData = useSelector(getSelectedSurvey)
    const isShowShareLinkModal = useSelector(getIsShowShareLinkModal)

    useEffect(() => {
        apiLocal.getDataFromSessionStorage().then((stateLSObj) => {
            if (stateLSObj) {
                dispatch(setReceivedDataOfApp(stateLSObj.app))
                dispatch(setReceivedDataOfAuth(stateLSObj.auth))
                dispatch(setReceivedDataOfDraft(stateLSObj.draft))
                dispatch(setReceivedDataOfSurvey(stateLSObj.survey))
            }
        })
    }, [dispatch])

    useEffect(() => {
        apiLocal.setDataToSessionStorage(state).then((data) => {
        })
    }, [state, dispatch])

    const handlePopUpClose = () => {
        dispatch(setIsShowPopUp(false))
        dispatch(setIsShowShareLinkModal(false))
    }

    return (
        <BrowserRouter>
            {
                isShowPopUp && <SavePopUp/>
            }
            {
                isShowShareLinkModal &&
                <ModalWindow selectedSurveyId={selectedSurveyData.id}/>
            }
            {
                (isShowShareLinkModal || isShowPopUp) && <div className={"background"} onClick={handlePopUpClose}/>
            }
            <div className={(isShowShareLinkModal || isShowPopUp) ? "app__wrap app__blurred_content" : "app__wrap"}>
                {window.location.pathname !== '/' && <Header/>}
                {window.location.pathname !== '/' && window.location.pathname !== '/hello' && window.location.pathname !== '/*' &&
                <Navbar surveyState={surveyState}/>}
                <main>
                    <Routes>
                        <Route path={"/"} element={<AuthPage/>}/>
                        <Route path={"/hello"} element={<Hello/>}/>
                        <Route path={"/statistics"} element={<Statistics selectedSurveyData={selectedSurveyData}/>}/>
                        <Route path={"/template"} element={<Template surveyState={surveyState}/>}/>
                        <Route path={"/design"} element={<EditSurvey surveyState={surveyState}/>}/>
                        <Route path={"/thanks"} element={<ThanksComponent surveyState={surveyState}/>}/>
                        <Route path={"/share_link"} element={<ShareLink surveyState={surveyState}/>}/>
                        <Route path={"/survey/demo/*"} element={<DemoPage/>}/>
                        <Route path={"/*"} element={<Error404/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App