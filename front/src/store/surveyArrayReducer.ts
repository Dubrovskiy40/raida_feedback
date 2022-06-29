import {Dispatch} from "redux";
import {IGetAnswersArrayResponse} from "./types"
import {apiGetAnswer, apiGetSurvey} from "../api/apiLocal"
import {InitialStateSurveyReducerType} from "./surveyReducer"
import {setAnswersArray, setQuestionsId} from "./surveyAnswerReducer"
import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";

const ADD_SURVEY = "SRC/STORE/ORDER_ARRAY_REDUCER/ADD_SURVEY"
const SET_SURVEYS_ID = "SRC/STORE/ORDER_ARRAY_REDUCER/SET_SURVEYS_ID"
const SET_RECEIVED_DATA = "SRC/STORE/ORDER_ARRAY_REDUCER/SET_RECEIVED_DATA"
const SET_SELECTED_SURVEY = "SRC/STORE/ORDER_ARRAY_REDUCER/SET_SELECTED_SURVEY"

export interface InitialStateSurveyArrayType {
    [key: string]: number | string

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

export interface IProjectItem {
    id: number,
    name: string,
    questions_lists: Array<number>
}

export type InitialStateSurveyArrayReducerType = {
    arrayOfSurveysId: Array<IProjectItem>
    selectedSurvey: InitialStateSurveyArrayType
    arrayOfSurveys: Array<InitialStateSurveyArrayType>
}

const initialState: InitialStateSurveyArrayReducerType = {
    selectedSurvey: {
        id: 0.1,
        typeSurvey: 1,
        nameOfSurvey: "",
        questionName0: "",
        questionName1: "",
        angry: "",
        happy: "",
        mainColor: "",
        backgroundColor: "",
        position: "",
        size: "",
        surveyThanksText: "",
        thanksWaveColor: "",
        thanksBackgroundColor: "",
        urlToShare: "",
        scale: "5"
    },
    arrayOfSurveys: [],
    arrayOfSurveysId: []
}

type ActionsTypes =
    AddSurveyToArrayActionType
    | SetReceivedDataOfSurveysArrayActionType
    | ISetSurveyID
    | ISetSelectedSurvey

const surveyArrayReducer = (state = initialState, action: ActionsTypes): InitialStateSurveyArrayReducerType => {
    switch (action.type) {
        case ADD_SURVEY:
            return {
                ...state, arrayOfSurveys: [...state.arrayOfSurveys].concat(action.survey)
            }
        case SET_SURVEYS_ID:
            return {
                ...state, arrayOfSurveysId: action.surveysId
            }
        case SET_RECEIVED_DATA:
            return action.arrayOfSurvey

        case SET_SELECTED_SURVEY:
            return {
                ...state, selectedSurvey: action.survey
            }
        default:
            return state

    }
}
export const getSurveyIds = () => async (dispatch: Dispatch) => {
    try {
        const response = await apiGetSurvey.getSurveyIds()
        dispatch(setSurveysId(response))
    } catch (e) {
        console.log(e)
    }

}
type TThunkCreator = ThunkAction<Promise<void>, RootState, any, ActionsTypes>

export const getSelectedSurveyThunk = (id: number):TThunkCreator => async (dispatch: Dispatch) => {
    try {
        const selectedSurvey: InitialStateSurveyArrayType = {
            id: 1,
            typeSurvey: 1,
            nameOfSurvey: "",
            questionName0: "",
            questionName1: "",
            angry: "",
            happy: "",
            mainColor: "",
            backgroundColor: "",
            position: "",
            size: "",
            surveyThanksText: "",
            thanksWaveColor: "",
            thanksBackgroundColor: "",
            urlToShare: "",
            scale: "5"
        }
        const answerPromises: Promise<IGetAnswersArrayResponse>[] = []

        const questionListId = await apiGetSurvey.getSelectedProjectById(id).then((response) => {
            selectedSurvey.id = response.id
            selectedSurvey.scale = response.description
            selectedSurvey.nameOfSurvey = response.name
            return response.questions_lists[0]
        })

        const questionPromises = await apiGetSurvey.getQuestionListById(questionListId).then(response => {
            dispatch(setQuestionsId(response.questions))
            return response.questions.map((item) => {
                answerPromises.push(apiGetAnswer.getAnswersArrayById(item))
                return apiGetSurvey.getQuestionById(item)
            })
        })

        const templateId = await Promise.all(questionPromises).then(response => {

            response.forEach((item, index) => selectedSurvey[`questionName${index}`] = item.data.title)

            const {
                main_color,
                min_rate_desc,
                max_rate_desc,
                bg_color,
                position,
                size,
                thanks_text,
                thanks_color,
                thanks_bg_color
            } = response[0].data
            selectedSurvey.angry = min_rate_desc
            selectedSurvey.happy = max_rate_desc
            selectedSurvey.mainColor = main_color
            selectedSurvey.backgroundColor = bg_color
            selectedSurvey.position = position
            selectedSurvey.size = size
            selectedSurvey.surveyThanksText = thanks_text
            selectedSurvey.thanksWaveColor = thanks_color
            selectedSurvey.thanksBackgroundColor = thanks_bg_color
            return response[0].data.template
        })

        await apiGetSurvey.getTemplateById(templateId).then(response => {
            selectedSurvey.typeSurvey = parseInt(response.name)
            dispatch(setSelectedSurvey(selectedSurvey))
        })

        await Promise.all(answerPromises).then(response => {
            response.forEach((item, index) => {
                dispatch(setAnswersArray(item, index + 1))
                response.length === 1 && dispatch(setAnswersArray([], 2))
            })
        })

    } catch (e) {
        console.log(e)
    }
}

export interface ISetSurveyID {
    type: typeof SET_SURVEYS_ID
    surveysId: Array<IProjectItem>
}

export const setSurveysId = (surveysId: Array<IProjectItem>): ISetSurveyID => ({
    type: SET_SURVEYS_ID,
    surveysId
})

export interface ISetSelectedSurvey {
    type: typeof SET_SELECTED_SURVEY
    survey: InitialStateSurveyArrayType
}

export const setSelectedSurvey = (survey: InitialStateSurveyArrayType): ISetSelectedSurvey => ({
    type: SET_SELECTED_SURVEY,
    survey
})

export type AddSurveyToArrayActionType = {
    type: typeof ADD_SURVEY,
    survey: InitialStateSurveyReducerType
}

export const addSurveyToArray = (survey: InitialStateSurveyReducerType): AddSurveyToArrayActionType => ({
    type: ADD_SURVEY,
    survey
})

export type SetReceivedDataOfSurveysArrayActionType = {
    type: typeof SET_RECEIVED_DATA,
    arrayOfSurvey: InitialStateSurveyArrayReducerType
}

export const setReceivedDataOfSurveysArray = (arrayOfSurvey: InitialStateSurveyArrayReducerType): SetReceivedDataOfSurveysArrayActionType => ({
    type: SET_RECEIVED_DATA,
    arrayOfSurvey
})

export default surveyArrayReducer