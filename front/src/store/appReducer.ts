import {apiLocal} from "../api/apiLocal";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";

const SET_VISITED_PAGE_VALUE = "SET_VISITED_PAGE_VALUE"
const SET_ACTIVE_PAGE = "SRC/STORE/APP_REDUCER/SET_ACTIVE_PAGE"
const SET_INITIAL_STATE = "SRC/STORE/APP_REDUCER/SET_INITIAL_STATE"
const SET_RECEIVED_DATA = "SRC/STORE/APP_REDUCER/SET_RECEIVED_DATA"
const SET_IS_SHOW_POP_UP = "SRC/STORE/APP_REDUCER/SET_IS_SHOW_POP_UP"
const SET_SURVEY_ACTIVE_PAGE = "SRC/STORE/APP_REDUCER/SET_SURVEY_ACTIVE_PAGE"
const SET_COPIED_TO_CLIP_BOARD = "SRC/STORE/APP_REDUCER/SET_COPIED_TO_CLIP_BOARD"
const SET_IS_SHOW_SHARE_LINK_MODAL = "SRC/STORE/APP_REDUCER/SET_IS_SHOW_SHARE_LINK_MODAL"
const SET_IS_SHOW_STATISTICS_POP_UP = "SRC/STORE/APP_REDUCER/SET_IS_SHOW_STATISTICS_POP_UP"
const SET_IS_SHOW_STATISTICS_BUTTON = "SRC/STORE/APP_REDUCER/SET_IS_SHOW_STATISTICS_BUTTON"

export type InitialStateAppReducerType = {
    activePage: number
    isShowPopUp: boolean
    visitedPage2: boolean
    visitedPage3: boolean
    visitedPage4: boolean
    surveyActivePage: number
    isCopiedToClipBoard: boolean
    isShowShareLinkModal: boolean
    isShowStatisticsPopUp: boolean
    isShowStatisticsButton: boolean
}

const initialState: InitialStateAppReducerType = {
    activePage: 1,
    surveyActivePage: 1,
    isShowPopUp: false,
    visitedPage2: false,
    visitedPage3: false,
    visitedPage4: false,
    isCopiedToClipBoard: false,
    isShowShareLinkModal: false,
    isShowStatisticsPopUp: false,
    isShowStatisticsButton: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateAppReducerType => {
    switch (action.type) {
        case SET_SURVEY_ACTIVE_PAGE:
            return {
                ...state, surveyActivePage: action.pageNumber
            }

        case SET_ACTIVE_PAGE:
            return {
                ...state, activePage: action.number
            }

        case SET_COPIED_TO_CLIP_BOARD:
            return {
                ...state, isCopiedToClipBoard: action.state
            }

        case SET_RECEIVED_DATA:
            return action.state

        case SET_IS_SHOW_POP_UP:
            return {
                ...state, isShowPopUp: action.value
            }

        case SET_VISITED_PAGE_VALUE:
            return {
                ...state, [action.payload.fieldName]: action.payload.value
            }

        case SET_IS_SHOW_STATISTICS_POP_UP:
            return {
                ...state, isShowStatisticsPopUp: action.payload
            }

        case SET_IS_SHOW_STATISTICS_BUTTON:
            return {
                ...state, isShowStatisticsButton: action.payload
            }

        case SET_IS_SHOW_SHARE_LINK_MODAL:
            return {
                ...state, isShowShareLinkModal: action.payload
            }

        case SET_INITIAL_STATE:
            return {
                ...initialState
            }

        default:
            return state

    }
}

type ActionsTypes =
    ISetInitialState
    | ISetSurveyActivePage
    | ISetIsShowStatisticsButton
    | ISetIsShowStatisticsPopUp
    | SetIsShowPopUpActionType
    | SetActivePageActionType
    | ISetIsShowShareLinkModal
    | SetCopiedToClipBoardActionType
    | SetReceivedDataOfAppActionType
    | SetIsVisitedActionType


export type TThunkCreator = ThunkAction<Promise<void>, RootState, any, ActionsTypes>

export const handleCopyUrlThunk = (urlToShare: string): TThunkCreator => async (dispatch: Dispatch) => {
    await apiLocal.handleCopyToClipboard(urlToShare).then(() => {
        dispatch(setCopiedToClipBoard(true))
    }).then(() => {
        setTimeout(() => {
            dispatch(setCopiedToClipBoard(false))
        }, 3000)
    })
}

export interface ISetInitialState {
    type: typeof SET_INITIAL_STATE
}

export const setInitialAppState = (): ISetInitialState => ({
    type: SET_INITIAL_STATE
})

export interface ISetSurveyActivePage {
    type: typeof SET_SURVEY_ACTIVE_PAGE
    pageNumber: number
}

export const setSurveyActivePage = (pageNumber: number): ISetSurveyActivePage => ({
    type: SET_SURVEY_ACTIVE_PAGE,
    pageNumber
})

export interface ISetIsShowStatisticsButton {
    type: typeof SET_IS_SHOW_STATISTICS_BUTTON
    payload: boolean
}

export const setIsShowStatisticsButton = (payload: boolean): ISetIsShowStatisticsButton => ({
    type: SET_IS_SHOW_STATISTICS_BUTTON,
    payload
})

export interface ISetIsShowStatisticsPopUp {
    type: typeof SET_IS_SHOW_STATISTICS_POP_UP
    payload: boolean
}

export const setIsShowStatisticsPopUp = (payload: boolean): ISetIsShowStatisticsPopUp => ({
    type: SET_IS_SHOW_STATISTICS_POP_UP,
    payload
})

export type SetIsShowPopUpActionType = {
    type: typeof SET_IS_SHOW_POP_UP
    value: boolean
}

export const setIsShowPopUp = (value: boolean): SetIsShowPopUpActionType => ({
    type: SET_IS_SHOW_POP_UP,
    value
})

export type SetActivePageActionType = {
    type: typeof SET_ACTIVE_PAGE
    number: number
}

export const setActivePage = (number: number): SetActivePageActionType => ({
    type: SET_ACTIVE_PAGE,
    number
})

export type SetCopiedToClipBoardActionType = {
    type: typeof SET_COPIED_TO_CLIP_BOARD
    state: boolean
}

export const setCopiedToClipBoard = (state: boolean): SetCopiedToClipBoardActionType => ({
    type: SET_COPIED_TO_CLIP_BOARD,
    state
})

export type SetReceivedDataOfAppActionType = {
    type: typeof SET_RECEIVED_DATA
    state: InitialStateAppReducerType
}

export const setReceivedDataOfApp = (state: InitialStateAppReducerType): SetReceivedDataOfAppActionType => ({
    type: SET_RECEIVED_DATA,
    state
})

export type SetIsVisitedActionType = {
    type: typeof SET_VISITED_PAGE_VALUE
    payload: { fieldName: string, value: boolean }
}

export const setIsVisited = (fieldName: string, value: boolean): SetIsVisitedActionType => ({
    type: SET_VISITED_PAGE_VALUE,
    payload: {fieldName, value}
})

export interface ISetIsShowShareLinkModal {
    type: typeof SET_IS_SHOW_SHARE_LINK_MODAL
    payload: boolean
}

export const setIsShowShareLinkModal = (value: boolean): ISetIsShowShareLinkModal => ({
    type: SET_IS_SHOW_SHARE_LINK_MODAL,
    payload: value
})

export default appReducer

