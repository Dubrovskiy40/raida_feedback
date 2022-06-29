import React from "react"
import {NavLink} from "react-router-dom"

import style from "../../navbar.module.css"
import {ISecondNavbarItem} from "../../../../../store/types"


const SecondNavbarItem: React.FC<ISecondNavbarItem> = ({
                                                           linkUrl,
                                                           linkText,
                                                           callback,
                                                           selectedPage,
                                                           visitedPages,
                                                           numberActivePage
                                                       }) => {

    const handleClick = (event:React.MouseEvent<HTMLAnchorElement>) => {
        linkUrl === "/template" && event.preventDefault()
        callback && callback(true)
    }

    return (
        <>
            {
                visitedPages
                    ? <NavLink className={({isActive}) => (isActive ? `${style.item} ${style.active}` : style.item)}
                               to={linkUrl} onClick={handleClick}>{linkText}</NavLink>
                    : <span
                        className={numberActivePage === selectedPage ? `${style.item} ${style.active}` : style.item}>{linkText}</span>
            }
        </>
    )
}

export default React.memo(SecondNavbarItem)