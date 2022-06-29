import React from "react"

import style from "./error404.module.css"
import Button404 from "./button404/Button404"
import img from "../../assets/images/404/bg.png"
import {ReactComponent as Error404Svg} from "../../assets/images/404/error404.svg"


const Error404 = () => (
    <div className={style.error}>
        <Error404Svg/>
        <h2 className={style.error__subtitle}>Ой, что-то пошло не так?</h2>
        <p className={style.error__text}>
            Такой страницы не существует.<br/>
            Попробуйте вернуться назад или проверьте свое подключение к интернету
        </p>
        <div className={style.error__btns_block}>
            <Button404 name={"на главную"} styleChange={true} isLink={true} path={"/template"}/>
            <Button404 name={"связаться"} styleChange={false} isLink={true} path={"/"}/>
        </div>
        <img className={style.error__img} src={img} alt="img"/>
    </div>
)


export default Error404
