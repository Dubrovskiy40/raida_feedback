import {RootState} from "../index"

export const getState = (state: RootState) => state

/************Auth Reducer selector*********************/
export const getAuthState = (state: RootState) => state.auth
export const getIsAdmin = (state: RootState) => state.auth.isAdmin

/************App Reducer selector**********************/
export const getActivePage = (state: RootState) => state.app.activePage
export const getIsShowPopUp = (state: RootState) => state.app.isShowPopUp
export const getSurveyActivePage = (state:RootState)=>state.app.surveyActivePage
export const getIsCopiedToClipBoard = (state: RootState) => state.app.isCopiedToClipBoard
export const getIsShowShareLinkModal = (state:RootState) => state.app.isShowShareLinkModal
export const getIsShowStatisticsPopUp = (state: RootState) => state.app.isShowStatisticsPopUp
export const getIsShowStatisticsButton = (state: RootState) => state.app.isShowStatisticsButton
export const getVisitedPages = (state: RootState) => ({
    visitedPage2: state.app.visitedPage2,
    visitedPage3: state.app.visitedPage3,
    visitedPage4: state.app.visitedPage4
})

/************Survey Reducer selector*******************/
export const getSurveyState = (state: RootState) => state.survey
export const getUrlToShare = (state: RootState) => state.survey.urlToShare
export const getThanksState = (state: RootState) => {
    const survey = state.survey
    return {
        thanksWaveColor: survey.thanksWaveColor,
        surveyThanksText: survey.surveyThanksText,
        thanksBackgroundColor: survey.thanksBackgroundColor,
    }
}
export const getTypeOfSurvey = (state: RootState) => state.survey.typeSurvey

/*********************Surveys Array Reducer******************/
export const getSurveyArray = (state: RootState) => state.surveysArray.arrayOfSurveys
export const getSurveysId = (state: RootState) => state.surveysArray.arrayOfSurveysId
export const getSelectedSurvey = (state: RootState) => state.surveysArray.selectedSurvey

/********************Draft Survey reducer******************/
export const getDraftSurvey = (state: RootState) => state.draft

/*******************Answer reducer************************/

export const getAnswer1 = (state: RootState) => state.answer.answer1
export const getAnswer2 = (state: RootState) => state.answer.answer2
export const getAnswerArray1 = (state: RootState) => state.answer.questionId1Answers
export const getAnswerArray2 = (state: RootState) => state.answer.questionId2Answers
