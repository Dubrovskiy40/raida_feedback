import thunk from "redux-thunk"
import appReducer from "./appReducer"
import authReducer from "./authReducer"
import surveyReducer from "./surveyReducer"
import answerReducer from "./surveyAnswerReducer"
import surveyArrayReducer from "./surveyArrayReducer"
import draftSurveyReducer from "./draftSurveyReducer"
import {composeWithDevTools} from "redux-devtools-extension"
import {applyMiddleware, combineReducers, createStore} from "redux"

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    answer: answerReducer,
    survey: surveyReducer,
    draft: draftSurveyReducer,
    surveysArray: surveyArrayReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

type RootReducer = typeof reducers
export type RootState = ReturnType<RootReducer>

export default store