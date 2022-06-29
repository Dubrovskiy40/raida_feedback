import React, {useEffect} from "react"
import {useDispatch} from "react-redux"

import style from "./template.module.css"
import {ITemplateProps} from "../../store/types"
import TypeSurvey from "../typeSurvey/TypeSurvey"
import {setActivePage} from "../../store/appReducer"
import TemplateInfo from "./templateInfo/TemplateInfo"
import CreateBtn from "../buttons/createBtn/CreateBtn"
import TemplateBlock from "./templateBlock/TemplateBlock"


const Template: React.FC<ITemplateProps> = ({surveyState}) => {

    const dispatch = useDispatch()
    const {typeSurvey} = surveyState

    useEffect(() => {
        dispatch(setActivePage(1))
    }, [dispatch])

    return (
        <div className={style.template}>
            <div className={style.template__top}>
                <div className={style.template__wrap_block1}>
                    <h1 className={style.template__title}>{"Выберите шаблон опроса"}</h1>
                    <h3 className={style.template__subtitle}>{"Воспользуйтесь готовым шаблоном "}</h3>
                </div>
                <div className={style.template__wrap_block2}>
                    <TemplateBlock surveyType={typeSurvey}/>
                </div>
            </div>
            <div className={style.template__bottom}>
                <div className={style.template__wrap_block3}>
                    <TypeSurvey surveyState={surveyState}/>
                </div>
                <div className={style.template__wrap_block4}>
                    <TemplateInfo templateNumber={typeSurvey}/>
                    <div className={style.template__container}>
                        <CreateBtn isLink={true} path={"/design"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Template)
