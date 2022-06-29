const LOGIN = "SRC/STORE/AUTH_REDUCER/LOGIN"
const LOGOUT = "SRC/STORE/AUTH_REDUCER/LOGOUT"
const SET_HREF = "SRC/STORE/AUTH_REDUCER/SET_HREF"
const CHANGE_VALUE_AUTH = "SRC/STORE/AUTH_REDUCER/CHANGE_VALUE_AUTH"
const SET_RECEIVED_DATA = "SRC/STORE/AUTH_REDUCER/SET_RECEIVED_DATA"

export type InitialStateAuthReducerType = {
    isAdmin: boolean
    email: string
    password: string
    href: string
}

const initialState: InitialStateAuthReducerType = {
    isAdmin: false,
    email: "",
    password: "",
    href: ""
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateAuthReducerType => {

    switch (action.type) {
        case LOGIN:
            return {
                ...state, isAdmin: true, email: action.email, password: action.password
            }

        case LOGOUT:
            return {
                ...state, isAdmin: false, email: "", password: ""
            }

        case CHANGE_VALUE_AUTH:
            return {
                ...state, [action.fieldName]: action.fieldValue
            }

        case SET_HREF:
            return {
                ...state, href: action.href
            }

        case SET_RECEIVED_DATA:
            return action.state

        default:
            return state

    }
}

type ActionsTypes =
    LogInActionType
    | LogOutActionType
    | HandleChangeAuthActionType
    | SetHrefActionType
    | SetReceivedDataOfAuthActionType

export type LogInActionType = {
    type: typeof LOGIN
    email: string
    password: string
}

export const logIn = (email: string, password: string): LogInActionType => ({
    type: LOGIN,
    email,
    password
})

export type LogOutActionType = {
    type: typeof LOGOUT
}

export const logOut = (): LogOutActionType => ({
    type: LOGOUT
})

export type HandleChangeAuthActionType = {
    type: typeof CHANGE_VALUE_AUTH,
    fieldName: string
    fieldValue: string
}

export const handleChangeAuth = (fieldName: string, fieldValue: string): HandleChangeAuthActionType => ({
    type: CHANGE_VALUE_AUTH,
    fieldName,
    fieldValue
})

export type SetHrefActionType = {
    type: typeof SET_HREF
    href: string
}

export const setHref = (href: string): SetHrefActionType => ({
    type: SET_HREF,
    href
})

export type SetReceivedDataOfAuthActionType = {
    type: typeof SET_RECEIVED_DATA,
    state: InitialStateAuthReducerType
}

export const setReceivedDataOfAuth = (state: InitialStateAuthReducerType): SetReceivedDataOfAuthActionType => ({
    type: SET_RECEIVED_DATA,
    state
})

export default authReducer