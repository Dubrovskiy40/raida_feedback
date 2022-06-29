import React from "react"
import {InitialStateSurveyReducerType} from "./surveyReducer"
import {InitialStateSurveyArrayType, IProjectItem} from "./surveyArrayReducer"

/**api types**/

export interface IProjectsResponse {
    id: number
    name: string
    description: string
    questions_lists: Array<number>
}

export interface IQuestionList {
    id: number
    title: string
    description: string
    project: number
    questions: number[]
}

export interface IQuestion {
    id: number
    title: string
    description: string
    min_rate_desc: string
    max_rate_desc: string
    thanks_text: string
    main_color: string
    thanks_color: string
    bg_color: string
    thanks_bg_color: string
    position: string
    size: string
    questions_list: number
    template: number
    rating: number
    answers: number[]
}

export interface ITemplate {
    id: number
    name: string
    description: string
    min_rate_desc: string
    max_rate_desc: string
    thanks_text: string
    main_color: string
    thanks_color: string
    bg_color: string
    thanks_bg_color: string
    position: string
    size: string
    questions: number[]
}

export interface IProjectPostData {
    name: string
    description: string
}

export interface TProjectPostResponseData extends IProjectPostData {
    id: number
}

export interface IPostQuestionListData {
    title: string
    description: string
    project: number | undefined
}

export interface IPostQuestionListResponse extends IPostQuestionListData {
    id: number | undefined
}

export interface IPostTemplateData {
    name: string
    description: string
    min_rate_desc: string
    max_rate_desc: string
    thanks_text: string
    main_color: string
    thanks_color: string
    bg_color: string
    thanks_bg_color: string
    position: string
    size: string
}

export interface IPostTemplateResponse extends IPostTemplateData {
    id: number
}

export interface IPostQuestionData {
    title: string
    description?: string
    min_rate_desc: string
    max_rate_desc: string
    thanks_text: string
    main_color: string
    thanks_color: string
    bg_color: string
    thanks_bg_color: string
    position: string
    size: string
    questions_list: number | undefined
    template: number | undefined
}

export interface IPostQuestionResponse extends IPostQuestionData {
    id: number
}

export interface IPostAnswerData {
    rating?: number
    wishes?: string
    question: number
}

export interface IPostAnswerResponse extends IPostAnswerData {
    data_time: string
}

export type IGetAnswersArrayResponse = Array<{
    rating: number
    wishes: string
    question: number
    data_time: string
}>

/**Component props**/

export interface IButton404 {
    name: string
    styleChange: boolean
    isLink: boolean
    path: string
}

export interface ICopyBtn {
    width?: string
    isCopied: boolean
    isDisabled?: boolean
    callBack: () => void
}

export interface ICreateBtn {
    isLink: boolean
    path: string
    handleClick?: () => void
    children?: React.ReactNode
    disabled?: boolean
    isShowAlert?: boolean
}

export interface IDownloadBtn {
    disabled?: boolean
}

export interface IDraftBtn {
    handleAddSurveyToDraft: () => void
}

export interface ISendBtn {
    disabled?: boolean
    mainColor: string
    showMeThanks: () => void
}

export interface IStatisticsBtnProps {
    disabled?: boolean
}

export interface IEditSurveyProps {
    surveyState: InitialStateSurveyReducerType
}

export interface ISecondNavbar {
    numberActivePage: number
}

export interface ISecondNavbarItem {
    linkUrl: string
    linkText: string
    selectedPage: number
    numberActivePage: number
    callback?: (value: boolean) => void
    visitedPages?: boolean
}

export interface INavbarProps {
    surveyState: InitialStateSurveyArrayType
}

export interface IColorInput {
    color: string
    name: string
    handleColorSelectInDiv: (color: string, fieldName: string) => void
    children: React.ReactNode
}

export interface IDeviceType {
    deviceType: string
}

export interface IMyInput {
    name: string
    value: string
    placeholder?: string
    isForUrl?: boolean
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IMyTextarea {
    name: string
    value: string
    placeholder: string
    isForUrl?: boolean
    changeActiveSurveyPage?: () => void
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

export interface INameOfSurvey {
    name: string
    value: string
    placeholder: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface INameOfSurveySelect {
    arrayOfSurvey: Array<IProjectItem>
    setSelectSurvey: (string: number) => void
    selectedSurvey: number
}

export interface ISurveyLocation {
    positionOfSurvey: string
}

export interface IBottomBlock {
    urlToShare: string
    handleCopyToClipboard: () => void
    isCopiedToClipBoard: boolean
    surveyId: number
}

export interface ITopBlock {
    state: InitialStateSurveyReducerType
}

export interface IShareLinkProps {
    surveyState: InitialStateSurveyReducerType
}

export interface IInfoLineProps {
    brickColor: string
    text: string
    percents: string | number
}

export interface IStatisticsBottomBlock {
    selectedSurveyData: InitialStateSurveyArrayType
}

export interface IStatisticsTopBlock {
    arrayOfSurvey: Array<IProjectItem>
    selectedSurveyData: InitialStateSurveyArrayType
}

export interface IStatisticsProps {
    selectedSurveyData: InitialStateSurveyReducerType
}

export interface ITemplateBlock {
    surveyType: number
}

export interface ITemplateInfo {
    templateNumber: number
}

export interface ITemplateProps {
    surveyState: InitialStateSurveyReducerType
}

export interface IThanksComponentBottomBlock {
    surveyState: InitialStateSurveyReducerType
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handlePostSurvey: () => void
}

export interface IThanksComponentTopBlock {
    surveyState: InitialStateSurveyReducerType
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IThanksComponent {
    surveyState: InitialStateSurveyReducerType
}

export interface ITypeSurvey {
    answerIsGot?: boolean
    surveyState: InitialStateSurveyReducerType
    handlePostAnswer?: (questionNumber: number[], garde1: number, grade2?: string) => void
}

export interface IFiveNumSurvey {
    answerIsGot?: boolean
    state: InitialStateSurveyReducerType
    postAnswer: (questionNumber: number[], garde1: number, grade2?: string) => void
}

export interface IGetGradeSlider {
    range: number
    evaluation: number
    evaluation2: string
    isDisable: boolean
    showMeThanks: () => void
    state: InitialStateSurveyReducerType
    setIsDisable: React.Dispatch<React.SetStateAction<boolean>>
    setEvaluation: React.Dispatch<React.SetStateAction<number>>
    setEvaluation2: React.Dispatch<React.SetStateAction<string>>
}

export interface IGetGradeSliderPaginator {
    page: number
    mainColor: string
    setPage: (pageNumber: number) => () => void
}

export interface IGetGradeSliderPage2Props {
    page: number
    isDisable: boolean
    evaluation2: string
    handleSubmit: () => void
    state: InitialStateSurveyReducerType
    setPage: (pageNumber: number) => () => void
    setEvaluation2: React.Dispatch<React.SetStateAction<string>>
}

export interface IGetGradeSliderPage1Props {
    page: number
    range: number
    evaluation: number
    isDisable: boolean
    showMeThanks: () => void
    state: InitialStateSurveyReducerType
    setPage: (pageNumber: number) => () => void
    setEvaluation: React.Dispatch<React.SetStateAction<number>>
}

export interface INumbers {
    range: number
    selectedNumber: number
}

export interface ISliderEvaluation {
    range?: number
    answerIsGot?: boolean
    state: InitialStateSurveyReducerType
    postAnswer: (questionNumber: number[], garde1: number, grade2?: string) => void
}

export interface ISmileSurvey {
    state: InitialStateSurveyReducerType
    answerIsGot?: boolean
    postAnswer: (questionNumber: number[], garde1: number, grade2?: string) => void
}

export interface ITenNumSurvey {
    answerIsGot?: boolean
    state: InitialStateSurveyReducerType
    postAnswer: (questionNumber: number[], garde1: number, grade2?: string) => void
}

export interface IThanksWidget {
    waveColor: string
    backgroundColor: string
    surveyThanksText: string
    showStatistics?: () => {}
}

export interface IVerticalBarChartProps {
    statistics: Array<number[]>
    selectedSurveyData: InitialStateSurveyArrayType
}

export interface ISetScaleProps {
    scale: string
}

export interface IShortStatisticsProps {
    criticsPercent: number | string
    neutralPercent: number | string
    promoterPercent: number | string
}

export interface IStatisticsBlock {
    scale: string
    typeSurvey: number
    statistics: number[][]
    totalAnswersCount: number
}

export interface IDoughnutChartProps {
    typeOfSurvey: number
    labelsSmiles: string[]
    statistics: Array<number[]>
    nps?: number
}