import React from "react"
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import style from "./Header.module.css"
import {logOut} from "../../store/authReducer"
import {setInitialAppState} from "../../store/appReducer"
import {clearDraftSurvey} from "../../store/draftSurveyReducer"
import userAvatar from "../../assets/images/header/userAvatar.jpg"
import {createNewSurvey, createSurveyFromDraft} from "../../store/surveyReducer"
import {getActivePage, getDraftSurvey, getIsAdmin} from "../../store/selectors/selectors"


const Header: React.FC = () => {

    const dispatch = useDispatch()
    const checkAuth = useSelector(getIsAdmin)
    const activePage = useSelector(getActivePage)
    const draftSurvey = useSelector(getDraftSurvey)

    const handleLogout = () => {
        dispatch(logOut)
    }

    const handleNewSurvey = () => {
        dispatch(setInitialAppState())
        dispatch(createNewSurvey(0))
    }

    const handleMoveDraftToSurvey = () => {
        if (draftSurvey) {
            createSurveyFromDraft(0, draftSurvey)
            clearDraftSurvey()
            dispatch(setInitialAppState())
        }
    }

    return (
        <header>
            <div className={`${style.header} ${activePage === 6 ? style.header_center : ""}`}>
                <p className={style.headerText}>{"WORLD "}<span className={style.transformedText}>{"OF"}</span>{" POLLS"}</p>
                {
                    activePage !== 6 && checkAuth && <div className={style.menu__block}>
                        <img className={style.avatar} src={userAvatar} alt={"изображение пользователя"}/>
                        <ul className={style.menu}>
                            <li className={style.menu__item}>{"Профиль"}</li>
                            {
                                checkAuth
                                    ? <NavLink className={style.menu__item} to={"/statistics"}>{"Мои опросы"}</NavLink>
                                    : <li className={style.menu__item}>Мои опросы</li>
                            }
                            {
                                checkAuth
                                    ? <NavLink className={style.menu__item} to={"/template"} onClick={handleNewSurvey}>{"Новый опрос"}</NavLink>
                                    : <li className={style.menu__item} >Новый опрос</li>
                            }
                            {
                                checkAuth
                                    ? <NavLink className={style.menu__item} to={"/template"} onClick={handleMoveDraftToSurvey}>{"Черновик"}</NavLink>
                                    : <li className={style.menu__item}>{"Черновик"}</li>
                            }
                            {
                                checkAuth
                                    ?
                                    <NavLink className={style.menu__item} to={"/"} onClick={handleLogout}>{"Выход"}</NavLink>
                                    : <li className={style.menu__item}>{"Выход"}</li>
                            }
                        </ul>
                    </div>
                }
            </div>
        </header>
    )
}

export default React.memo(Header)