const ADD_SURVEY = "SRC/STORE/DRAFT_SURVEY_REDUCER/ADD_SURVEY"
const CLEAR_DRAFT = "SRC/STORE/DRAFT_SURVEY_REDUCER/CLEAR_DRAFT"
const SET_RECEIVED_DATA = "SRC/STORE/DRAFT_SURVEY_REDUCER/SET_RECEIVED_DATA"

export type InitialStateDraftSurveyReducerType = {
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
}

const initialState: InitialStateDraftSurveyReducerType | null = null

const draftSurveyReducer = (state = initialState, action: ActionsTypes): InitialStateDraftSurveyReducerType | null => {

    switch (action.type) {
        case ADD_SURVEY:
            return action.survey

        case CLEAR_DRAFT:
            return null

        case SET_RECEIVED_DATA:
            return action.draftSurvey

        default:
            return state

    }
}

type ActionsTypes =
    AddSurveyToDraftActionType
    | ClearDraftSurveyActionType
    | SetReceivedDataOfDraftActionType

export type AddSurveyToDraftActionType = {
    type: typeof ADD_SURVEY
    survey: InitialStateDraftSurveyReducerType
}

export const addSurveyToDraft = (survey: InitialStateDraftSurveyReducerType): AddSurveyToDraftActionType => ({
    type: ADD_SURVEY,
    survey
})

export type ClearDraftSurveyActionType = {
    type: typeof CLEAR_DRAFT
}

export const clearDraftSurvey = (): ClearDraftSurveyActionType => ({
    type: CLEAR_DRAFT
})

export type SetReceivedDataOfDraftActionType = {
    type: typeof SET_RECEIVED_DATA,
    draftSurvey: InitialStateDraftSurveyReducerType
}

export const setReceivedDataOfDraft = (draftSurvey: InitialStateDraftSurveyReducerType): SetReceivedDataOfDraftActionType => ({
    type: SET_RECEIVED_DATA,
    draftSurvey
})

export default draftSurveyReducer