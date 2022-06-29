import React from "react"
import {NavLink} from "react-router-dom"
import style from "./button404.module.css"
import {IButton404} from "../../../store/types"


const Button404: React.FC<IButton404> = ({ name, styleChange, isLink, path }) => {

    const handleClick = () => {

    }

    return (
        isLink ?
            <NavLink className={styleChange ? `${style.btn404} ${style.toHome}` : `${style.btn404} ${style.contact}`}
                     to={path} onClick={handleClick}>{name}</NavLink>
            :
            <button className={styleChange ? `${style.btn404} ${style.toHome}` : `${style.btn404} ${style.contact}`} onClick={handleClick}>{name}</button>
    )
}

export default Button404
