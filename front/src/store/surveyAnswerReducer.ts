import {Dispatch} from "redux"
import {RootState} from "./index"
import {apiLocal, apiPostAnswer} from "../api/apiLocal"
import {ThunkAction} from "redux-thunk";

const SET_ANSWER = "SRC/STORE/SURVEY_ANSWER_REDUCER/SET_ANSWER"
const SET_QUESTION_ID = "SRC/STORE/SURVEY_ANSWER_REDUCER/SET_QUESTION_ID"
const SET_ANSWER_ARRAY = "SRC/STORE/SURVEY_ANSWER_REDUCER/SET_ANSWER_ARRAY"

interface IGradeObj {
    [key: string]: number | string

    grade1: number
    grade2: string
}

export interface IAnswer {
    rating: number
    wishes: string
    data_time: string
    question: number
}

interface IAnswerReducerInitialState {
    answer1: number
    answer2: string
    questionId1: number
    questionId2: number
    questionId1Answers: IAnswer[]
    questionId2Answers: IAnswer[]
}

const answerReducerInitialState: IAnswerReducerInitialState = {
    answer1: 0,
    answer2: "",
    questionId1: 0,
    questionId2: 0,
    questionId1Answers: [],
    questionId2Answers: [],
}

type TAction = ISetAnswer | ISetQuestionsId | ISetAnswerArray

const answerReducer = (state = answerReducerInitialState, action: TAction): IAnswerReducerInitialState => {
    switch (action.type) {
        case SET_ANSWER:
            return {
                ...state, [`answer${action.questionNumber}`]: action.grade
            }
        case SET_QUESTION_ID:
            return {
                ...state, questionId1: action.questionsIdArray[0], questionId2: action.questionsIdArray[1]
            }
        case SET_ANSWER_ARRAY:
            return {
                ...state, [`questionId${action.questionNumber}Answers`]: action.answers
            }
        default:
            return state
    }
}

type TThunkCreator = ThunkAction<Promise<void>, RootState, any, TAction>

export const postAnswer = (typeOfSurvey: number): TThunkCreator => async (dispatch: Dispatch, getState: () => RootState) => {
    if (typeOfSurvey === 3) {
        const rating1 = getState().answer.answer1
        const rating2 = getState().answer.answer2
        const questionId1 = getState().answer.questionId1
        const questionId2 = getState().answer.questionId2
        const data1 = {
            rating: rating1,
            question: questionId1
        }
        const data2 = {
            wishes: rating2,
            question: questionId2
        }
        try {
            await Promise.all([apiPostAnswer.postAnswer(data1), apiPostAnswer.postAnswer(data2)])
        } catch (e) {
            console.log(e)
        }
    } else {
        const rating = getState().answer.answer1
        const questionId1 = getState().answer.questionId1
        const data = {
            rating: rating,
            question: questionId1
        }
        try {
            await apiPostAnswer.postAnswer(data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const handleSetAnswerThunk = (questionNumber: number[], grade1: number, grade2: string = ""): TThunkCreator => async (dispatch, getState: () => RootState) => {

    const gradeObj: IGradeObj = {
        grade1: grade1,
        grade2: grade2
    }
    const surveyId = getState().surveysArray.selectedSurvey.id
    const typeSurvey = getState().surveysArray.selectedSurvey.typeSurvey

    if (typeSurvey === 3) {
        questionNumber.forEach((value, index) => {
            dispatch(setAnswer(value, gradeObj[`grade${index + 1}`]))
        })

    } else {
        questionNumber.forEach((value, index) => {
            dispatch(setAnswer(value, gradeObj[`grade${index + 1}`]))
        })
    }
    await dispatch(postAnswer(typeSurvey))
    apiLocal.setIsAnswerToLocalStorage(surveyId)
}

interface ISetAnswer {
    type: typeof SET_ANSWER
    questionNumber: number
    grade: number | string
}

export const setAnswer = (questionNumber: number, grade: number | string): ISetAnswer => ({
    type: SET_ANSWER,
    questionNumber,
    grade
})

interface ISetQuestionsId {
    type: typeof SET_QUESTION_ID
    questionsIdArray: number[]
}

export const setQuestionsId = (questionsIdArray: number[]): ISetQuestionsId => ({
    type: SET_QUESTION_ID,
    questionsIdArray
})

interface ISetAnswerArray {
    type: typeof SET_ANSWER_ARRAY
    questionNumber: number
    answers: IAnswer[]
}

export const setAnswersArray = (answers: IAnswer[], questionNumber: number): ISetAnswerArray => ({
    type: SET_ANSWER_ARRAY,
    questionNumber,
    answers
})

export default answerReducer