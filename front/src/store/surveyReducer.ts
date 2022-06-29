import React from "react"
import {Dispatch} from "redux"
import {RootState} from "./index"
import {apiPostSurvey} from "../api/apiLocal"
import {ThunkAction} from "redux-thunk";

const SET_URL_TO_SHARE = "SRC/STORE/APP_REDUCER/SET_URL_TO_SHARE"
const CREATE_NEW_SURVEY = "SRC/STORE/ORDER_REDUCER/CREATE_NEW_SURVEY"
const SET_RECEIVED_DATA = "SRC/STORE/ORDER_REDUCER/SET_RECEIVED_DATA"
const SET_TYPE_OF_SURVEY = "SRC/STORE/ORDER_REDUCER/SET_TYPE_OF_SURVEY"
const SET_SIZE_OF_SURVEY = "SRC/STORE/APP_REDUCER/SET_SIZE_SURVEY_REDUCER"
const SET_POSITION_OF_SURVEY = "SRC/STORE/APP_REDUCER/SET_POSITION_OF_SURVEY"
const CREATE_SURVEY_FROM_DRAFT = "SRC/STORE/APP_REDUCER/CREATE_SURVEY_FROM_DRAFT"
const CHANGE_VALUE_SURVEY_REDUCER = "SRC/STORE/ORDER_REDUCER/CHANGE_VALUE_SURVEY_REDUCER"

export type InitialStateSurveyReducerType = {
    id: number
    typeSurvey: number
    nameOfSurvey: string
    questionName0: string
    questionName1: string
    angry: string
    happy: string
    mainColor: string
    backgroundColor: string
    position: string
    size: string
    surveyThanksText: string
    thanksWaveColor: string
    thanksBackgroundColor: string
    urlToShare: string
    scale: string
}

const initialState: InitialStateSurveyReducerType = {
    id: 0,
    typeSurvey: 1,
    nameOfSurvey: "",
    questionName0: "Насколько вы были удовлетворены полученной услугой?",
    questionName1: "Какие изменения Вы бы предложили для улучшения работы нашей компании?",
    angry: "Очень недовольный",
    happy: "Очень доволен",
    mainColor: "#7C74D5",
    backgroundColor: "#FFFFFF",
    position: "center",
    size: "deskTop",
    surveyThanksText: "Благодарим Вас за предоставленную информацию!",
    thanksWaveColor: "#7C74D5",
    thanksBackgroundColor: "#FFFFFF",
    urlToShare: "https://feedback.skroy.ru/survey/demo/0",
    scale: "5"
}

const surveyReducer = (state = initialState, action: ActionsTypes): InitialStateSurveyReducerType => {
    switch (action.type) {
        case CHANGE_VALUE_SURVEY_REDUCER:
            return {
                ...state, [action.fieldName]: action.fieldValue
            }

        case SET_TYPE_OF_SURVEY:
            const sizeOfScale = action.typeOfSurvey === 3 ? "10" : "5"
            return {
                ...state, typeSurvey: action.typeOfSurvey, scale: sizeOfScale
            }

        case SET_RECEIVED_DATA:
            return action.state

        case CREATE_NEW_SURVEY:
            return {
                ...initialState, id: action.id
            }

        case SET_URL_TO_SHARE:
            return {
                ...state, urlToShare: `https://feedback.skroy.ru/survey/demo/${action.url}`
            }

        case CREATE_SURVEY_FROM_DRAFT:
            return {
                ...action.draftSurvey, id: action.id
            }

        case SET_SIZE_OF_SURVEY:
            return {
                ...state, size: action.deviceType
            }

        case SET_POSITION_OF_SURVEY:
            return {
                ...state, position: action.position
            }

        default:
            return state

    }
}

type ActionsTypes =
    ChangeValueOfSurveyActionType
    | SetTypeOfSurveyActionType
    | SetReceivedDataOfSurveyActionType
    | CreateNewSurveyActionType
    | SetUrlToShareActionType
    | CreateSurveyFromDraftActionType
    | SetSizeOfSurveyActionType
    | SetPositionOfSurveyActionType

type TThunkCreator = ThunkAction<Promise<void>, RootState, any, ActionsTypes>

export const saveSurveyToBack = ():TThunkCreator => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        const survey = getState().survey
        const projectId = await apiPostSurvey.postProject(survey.nameOfSurvey, survey.scale).then((response => {
            response && dispatch(setUrlToShare(response.toString()))
            return response
        }))

        const questionListData = {
            title: "empty",
            description: "empty",
            project: projectId
        }
        const questionListId = projectId && await apiPostSurvey.postQuestionList(questionListData)

        const templateData = {
            name: survey.typeSurvey.toString(),
            bg_color: "empty",
            description: "empty",
            main_color: "empty",
            max_rate_desc: "empty",
            min_rate_desc: "empty",
            position: "empty",
            size: "empty",
            thanks_bg_color: "empty",
            thanks_color: "empty",
            thanks_text: "empty",
        }
        const templateId = await apiPostSurvey.postTemplate(templateData)

        if (survey.typeSurvey === 3) {
            const questionData1 = {
                title: survey.questionName0,
                description: "empty",
                min_rate_desc: survey.angry,
                max_rate_desc: survey.happy,
                thanks_text: survey.surveyThanksText,
                main_color: survey.mainColor,
                thanks_color: survey.thanksWaveColor,
                bg_color: survey.backgroundColor,
                thanks_bg_color: survey.thanksBackgroundColor,
                position: survey.position,
                size: survey.size,
                questions_list: questionListId,
                template: templateId
            }
            const questionData2 = {
                title: survey.questionName1,
                description: "empty",
                min_rate_desc: survey.angry,
                max_rate_desc: survey.happy,
                thanks_text: survey.surveyThanksText,
                main_color: survey.mainColor,
                thanks_color: survey.thanksWaveColor,
                bg_color: survey.backgroundColor,
                thanks_bg_color: survey.thanksBackgroundColor,
                position: survey.position,
                size: survey.size,
                questions_list: questionListId,
                template: templateId
            }
            const questionId1 = questionListId && templateId && await apiPostSurvey.postQuestionToList(questionData1)
            const questionId2 = questionListId && templateId && await apiPostSurvey.postQuestionToList(questionData2)
        } else {
            const questionData = {
                title: survey.questionName0,
                description: "empty",
                min_rate_desc: survey.angry,
                max_rate_desc: survey.happy,
                thanks_text: survey.surveyThanksText,
                main_color: survey.mainColor,
                thanks_color: survey.thanksWaveColor,
                bg_color: survey.backgroundColor,
                thanks_bg_color: survey.thanksBackgroundColor,
                position: survey.position,
                size: survey.size,
                questions_list: questionListId,
                template: templateId
            }
            const questionId = questionListId && templateId && await apiPostSurvey.postQuestionToList(questionData)
        }
    } catch (e) {
        console.log(e)
    }
}

export type ChangeValueOfSurveyActionType = {
    type: typeof CHANGE_VALUE_SURVEY_REDUCER
    fieldName: string
    fieldValue: string
}

export const changeValueOfSurvey = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLInputElement, MouseEvent>): ChangeValueOfSurveyActionType => ({
    type: CHANGE_VALUE_SURVEY_REDUCER,
    fieldName: event.currentTarget.name,
    fieldValue: event.currentTarget.value
})

export const changeColorValueOfSurvey = (color: string, fieldName: string): ChangeValueOfSurveyActionType => ({
    type: CHANGE_VALUE_SURVEY_REDUCER,
    fieldName: fieldName,
    fieldValue: color
})

export type SetTypeOfSurveyActionType = {
    type: typeof SET_TYPE_OF_SURVEY
    typeOfSurvey: number
}

export const setTypeOfSurvey = (typeOfSurvey: number): SetTypeOfSurveyActionType => ({
    type: SET_TYPE_OF_SURVEY,
    typeOfSurvey
})

export type SetReceivedDataOfSurveyActionType = {
    type: typeof SET_RECEIVED_DATA
    state: InitialStateSurveyReducerType
}

export const setReceivedDataOfSurvey = (state: InitialStateSurveyReducerType): SetReceivedDataOfSurveyActionType => ({
    type: SET_RECEIVED_DATA,
    state
})

export type CreateNewSurveyActionType = {
    type: typeof CREATE_NEW_SURVEY
    id: number
}

export const createNewSurvey = (id: number): CreateNewSurveyActionType => ({
    type: CREATE_NEW_SURVEY,
    id
})

export type SetUrlToShareActionType = {
    type: typeof SET_URL_TO_SHARE
    url: string
}

export const setUrlToShare = (url: string): SetUrlToShareActionType => ({
    type: SET_URL_TO_SHARE,
    url
})

export type CreateSurveyFromDraftActionType = {
    type: typeof CREATE_SURVEY_FROM_DRAFT
    id: number
    draftSurvey: InitialStateSurveyReducerType
}

export const createSurveyFromDraft = (id: number, draftSurvey: InitialStateSurveyReducerType): CreateSurveyFromDraftActionType => ({
    type: CREATE_SURVEY_FROM_DRAFT,
    id,
    draftSurvey
})

export type SetSizeOfSurveyActionType = {
    type: typeof SET_SIZE_OF_SURVEY
    deviceType: string
}

export const setSizeOfSurvey = (deviceType: string): SetSizeOfSurveyActionType => ({
    type: SET_SIZE_OF_SURVEY,
    deviceType
})

export type SetPositionOfSurveyActionType = {
    type: typeof SET_POSITION_OF_SURVEY
    position: string
}

export const setPositionOfSurvey = (position: string): SetPositionOfSurveyActionType => ({
    type: SET_POSITION_OF_SURVEY,
    position
})

export default surveyReducer