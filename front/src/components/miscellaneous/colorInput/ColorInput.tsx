import React, {useState} from "react"

import style from "./colorInput.module.css"
import {IColorInput} from "../../../store/types"
import {ReactComponent as PlusSignSVG} from "../../../assets/images/palette/plusSign.svg"


const ColorInput: React.FC<IColorInput> = ({
                                               color,
                                               name = "",
                                               handleColorSelectInDiv,
                                               children
                                           }) => {

    const [colors, setColor] = useState([
        {id: 1, name: "", value: "#7C74D5", isSelected: true},
        {id: 2, name: "", value: "#64C7FE", isSelected: false},
        {id: 3, name: "", value: "#FAA846", isSelected: false},
        {id: 4, name: "", value: "#23B979", isSelected: false},
        {id: 5, name: "", value: "#FE457A", isSelected: false},
    ])

    const [isOpen, setIsOpen] = useState(false)

    const handlePaletteToggle = () => {
        setIsOpen(prev => !prev)
    }

    const colorSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        const selectedColor = event.currentTarget.dataset.color
        const fieldName = event.currentTarget.dataset.name
        selectedColor && fieldName && handleColorSelectInDiv(selectedColor, fieldName)
        handlePaletteToggle()
    }

    const handleAddColorToPalette = (event: React.FocusEvent<HTMLInputElement>) => {
        const newColorObj = {id: colors.length + 1, name: "", value: event.currentTarget.value, isSelected: true}
        setColor((prevState => prevState.concat(newColorObj)))
    }

    const handlePaletteClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            {
                isOpen &&
                <div style={{zIndex: 4, position: "absolute", top: 0, right: 0, bottom: 0, left: 0}}
                     onClick={handlePaletteClose}/>
            }
            <div className={style.colorSelectContainer}>
                <div className={style.input_color} style={{backgroundColor: color}} onClick={handlePaletteToggle}/>
                <div className={`${style.colorPalette} ${isOpen ? style.colorPalette_open : ""}`}>
                    {
                        colors.map(item => {
                            return <div key={item.id}
                                        className={`${style.colorBrick} ${item.value === color ? style.colorBrick_selected : ""} ${item.value === "#ffffff" ? style.colorBrick_outlined : "d"} `}
                                        style={{backgroundColor: item.value}}
                                        data-color={item.value} data-name={name} onClick={colorSelect}/>
                        })
                    }
                    <label className={style.input_color_label}>
                        <PlusSignSVG/>
                        <input name={name} className={`${style.input_color} ${style.input_color__hide}`} type={"color"}
                               onBlur={handleAddColorToPalette}/>
                    </label>
                </div>
                <p className={style.colorTitle}>{children}</p>
            </div>
        </>
    )
}

const areEqual = (prevProps: IColorInput, nextProps: IColorInput) => {
    return prevProps.color === nextProps.color && prevProps.name === nextProps.name
}

export default React.memo(ColorInput, areEqual)