import React, {useEffect} from "react"
import {useDispatch} from "react-redux"

import SetScale from "./SetScale/SetScale"
import style from "./editSurvey.module.css"
import TypeSurvey from "../typeSurvey/TypeSurvey"
import {IEditSurveyProps} from "../../store/types"
import MyInput from "../miscellaneous/myInputs/MyInput"
import CreateBtn from "../buttons/createBtn/CreateBtn"
import MyTextarea from "../miscellaneous/myInputs/MyTextarea"
import ColorInput from "../miscellaneous/colorInput/ColorInput"
import DeviceType from "../miscellaneous/deviceType/DeviceType"
import NameOfSurvey from "../miscellaneous/nameOfSurvey/NameOfSurvey"
import SurveyLocation from "../miscellaneous/surveyLocation/SurveyLocation"
import {setActivePage, setIsVisited, setSurveyActivePage} from "../../store/appReducer"
import {changeColorValueOfSurvey, changeValueOfSurvey} from "../../store/surveyReducer"


const EditSurvey: React.FC<IEditSurveyProps> = ({surveyState}) => {

    const dispatch = useDispatch()
    const {
        nameOfSurvey,
        mainColor,
        backgroundColor,
        typeSurvey,
        questionName0,
        questionName1,
        angry,
        happy,
        size,
        position,
        scale
    } = surveyState

    useEffect(() => {
        dispatch(setActivePage(2))
        dispatch(setIsVisited("visitedPage2", true))
    }, [dispatch])

    const handleChangeValueOfSurvey = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(changeValueOfSurvey(event))
    }

    const handleColorChange = (color: string, fieldName: string) => {
        dispatch(changeColorValueOfSurvey(color, fieldName))
    }

    const changeSurveyPageByFocus = (page: number, typeOfSurvey: number) => () => {
        typeOfSurvey === 3 && dispatch(setSurveyActivePage(page))
    }

    const conditionForButtonDisable = () => {
        if (typeSurvey <= 2) {
            return nameOfSurvey === "" || questionName0 === "" || angry === "" || happy === ""
        }
        if (typeSurvey === 3) {
            return nameOfSurvey === "" || questionName0 === "" || questionName1 === "" || angry === "" || happy === ""
        }
    }

    return (
        <div className={style.editSurvey}>
            <div className={style.editSurvey__top_wrap}>
                <div className={style.nameOfSurvey__wrap}>
                    <NameOfSurvey name={"nameOfSurvey"} handleChange={handleChangeValueOfSurvey} value={nameOfSurvey}
                                  placeholder={"???????????????? ????????????"}/>
                </div>
                <div className={style.editSurvey__type}>
                    <h2 className={style.editSurvey__header}>{"?????????????????????????????? ????????????????"}</h2>
                    <TypeSurvey surveyState={surveyState}/>
                </div>
                <div className={style.editSurvey__color_select}>
                    <h3 className={style.editSurvey__label}>????????</h3>
                    <div className={style.editSurvey__color_wrap}>
                        <ColorInput name={"mainColor"} color={mainColor}
                                    handleColorSelectInDiv={handleColorChange}>{"????????????????"}</ColorInput>
                        <ColorInput name={"backgroundColor"} color={backgroundColor}
                                    handleColorSelectInDiv={handleColorChange}>{"???????????? ????????"}</ColorInput>
                    </div>
                </div>
            </div>
            <div className={style.editSurvey__bottom_wrap}>
                <div className={`${style.text__wrap} ${typeSurvey === 3 ? style.text__wrap_small_padding : ""}`}>
                    <h1 className={style.editSurvey__title}>{"?????????????????????????? ??????????"}</h1>
                    <h3 className={style.editSurvey__subtitle}>{"???????????????? ?????????????? ?? ?????????? ????????????."}</h3>
                    <label
                        className={style.editSurvey__label}>{`${typeSurvey !== 3 ? "???????????? ????????????" : "????????????  ???1"}${questionName0 === "" ? "*" : ""}`}</label>
                    <MyTextarea name={"questionName0"} handleChange={handleChangeValueOfSurvey} value={questionName0}
                                placeholder={"?????????????? ????????????"}
                                changeActiveSurveyPage={changeSurveyPageByFocus(1, typeSurvey)}/>
                    <label
                        className={`${style.editSurvey__label} ${style.editSurvey__inp_wrap}`}>{`?????????? ??????????${angry === "" || happy === "" ? "*" : ""}`}</label>
                    <MyInput  name={"angry"} handleChange={handleChangeValueOfSurvey} value={angry}
                             placeholder={"?????????????? min ????????????????"}/>
                    <MyInput name={"happy"} handleChange={handleChangeValueOfSurvey} value={happy}
                             placeholder={"?????????????? max ????????????????"}/>
                    {
                        typeSurvey === 3 && (
                            <>
                                <label
                                    className={style.editSurvey__label}>{`????????????  ???2${questionName1 === "" ? "*" : ""}`}</label>
                                <MyTextarea name={"questionName1"} handleChange={handleChangeValueOfSurvey}
                                            value={questionName1}
                                            placeholder={"?????????????? ????????????"}
                                            changeActiveSurveyPage={changeSurveyPageByFocus(2, typeSurvey)}/>
                            </>
                        )
                    }
                    {
                        typeSurvey === 2 &&
                        <div className={style.editSurvey__scale_wrap}><SetScale scale={scale}/></div>
                    }
                </div>
                <div className={style.device__wrap}>
                    <DeviceType deviceType={size}/>
                    <SurveyLocation positionOfSurvey={position}/>
                </div>
                <div className={style.btn__wrap}>
                    <CreateBtn isLink={true} path={"/thanks"}
                               disabled={conditionForButtonDisable()} isShowAlert={conditionForButtonDisable()}>{"????????????????????"}</CreateBtn>
                </div>
            </div>
        </div>
    )
}

export default React.memo(EditSurvey)
