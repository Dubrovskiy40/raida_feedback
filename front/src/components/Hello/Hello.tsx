import React from "react"
import {useDispatch} from "react-redux"
import {NavLink} from "react-router-dom"

import style from "./hello.module.css"
import img from "../../assets/images/hello/bg.png"
import {setInitialAppState} from "../../store/appReducer"
import {createNewSurvey} from "../../store/surveyReducer"
import hello from "../../assets/images/hello/Emoji_1.svg"


const Hello:React.FC = () => {

    const dispatch = useDispatch()

    const handleNewSurvey = () => {
        dispatch(setInitialAppState())
        dispatch(createNewSurvey(0))
    }

    return (
        <div className={style.hello}>
            <div>
                <h1 className={style.hello__title}>{"Добро пожаловать в WORLD OF POLLS"}</h1>
                <img className={style.hello__logo} src={hello} alt="hello"/>
            </div>
            <div className={style.hello__section}>
                <ul className={`${style.hello__list} ${style.descriptions}`}>{"Запустите свой опрос в 3 клика"}
                    <li className={`${style.descriptions__item} ${style.item_1}`}>{"Выберите шаблон"}</li>
                    <li className={`${style.descriptions__item} ${style.item_2}`}>{"Измените его дизайн под стиль вашего бренда"}</li>
                    <li className={`${style.descriptions__item} ${style.item_3}`}>{"Поделитесь ссылкой"}</li>
                    <li className={`${style.descriptions__item} ${style.item_4}`}>{"Отслеживайте статистку"}</li>
                </ul>
                <NavLink className={`${style.hello__btn}`} to={"/template"}
                         onClick={handleNewSurvey}>{"СОЗДАТЬ ОПРОС"}</NavLink>
            </div>
            <img className={style.hello__img} src={img} alt="img"/>
        </div>
    )
}

export default React.memo(Hello)