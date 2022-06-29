import React from "react"

import style from "./loader.module.css"
import ClipLoader from "react-spinners/ClipLoader"

const Loader: React.FC = () => (
    <div className={style.loader__spinner}>
        <ClipLoader color="#7C74D5;" size={50}/>
        <span>Данные не загружены, ожидайте...</span>
    </div>
)

export default Loader
