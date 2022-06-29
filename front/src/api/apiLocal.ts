import {RootState} from "../store"
import axios, {AxiosResponse} from "axios"
import {
    IGetAnswersArrayResponse,
    IPostAnswerData,
    IPostAnswerResponse,
    IPostQuestionData,
    IPostQuestionListData,
    IPostQuestionListResponse,
    IPostQuestionResponse,
    IPostTemplateData,
    IPostTemplateResponse,
    IProjectPostData,
    IProjectsResponse,
    IQuestion,
    IQuestionList,
    ITemplate,
    TProjectPostResponseData
} from "../store/types"

const instance = axios.create({
    baseURL: "https://api.feedback.skroy.ru/",
    headers: {
        "Content-Type": "application/json",
    }
})

export const apiLocal = {
    handleCopyToClipboard: (urlToCopy: string) => {
        return navigator.clipboard.writeText(urlToCopy)
    },
    getDataFromSessionStorage: (): Promise<RootState> => {
        return new Promise((resolve, reject) => {
            const stateFromLS: string | null = sessionStorage.getItem("appState")
            if (stateFromLS) {
                const stateLSObj = JSON.parse(stateFromLS)
                resolve(stateLSObj)
            }
            reject("error")
        })
    },
    setDataToSessionStorage: (state: RootState) => {
        return new Promise((resolve => {
            const stateStringify = JSON.stringify(state)
            sessionStorage.setItem("appState", stateStringify)
            resolve("success")
        }))
    },
    getIsAnswerFromLocalStorage: (surveyId: number) => {
        return localStorage.getItem(`answerIsGot${surveyId}`)
    },
    setIsAnswerToLocalStorage: (surveyId: number) => {
        localStorage.setItem(`answerIsGot${surveyId}`, surveyId.toString())
    }
}

export const apiGetSurvey = {
    getSurveyIds: () => {
        return instance.get<Array<IProjectsResponse>>("/projects/").then(response => response.data)
    },
    getSelectedProjectById: (projectId: number) => {
        return instance.get<IProjectsResponse>(`/projects/${projectId}`).then(response => response.data)
    },
    getQuestionListById: (questionListId: number) => {
        return instance.get<IQuestionList>(`/question_lists/${questionListId}`).then(response => response.data)
    },
    getQuestionById: (questionId: number) => {
        return instance.get<IQuestion>(`/questions/${questionId}`)
    },
    getTemplateById: (templateId: number) => {
        return instance.get<ITemplate>(`/template/${templateId}`).then(response => response.data)
    }
}

export const apiPostSurvey = {
    postProject: (name: string, scale: string) => {
        return instance.post<IProjectPostData, AxiosResponse<TProjectPostResponseData>>("/projects/", {
            name,
            description: scale
        }).then(response => response.data.id)
    },
    postQuestionList: (data: IPostQuestionListData) => {

        return instance.post<IPostQuestionListData, AxiosResponse<IPostQuestionListResponse>>("/question_lists/", data).then(response => response.data.id)
    },
    postTemplate: (data: IPostTemplateData) => {
        return instance.post<IPostTemplateData, AxiosResponse<IPostTemplateResponse>>("/template/", data).then(response => response.data.id)
    },
    postQuestionToList: (data: IPostQuestionData) => {
        return instance.post<IPostQuestionData, AxiosResponse<IPostQuestionResponse>>("/questions/", data).then(response => response.data.id)
    }
}

export const apiPostAnswer = {
    postAnswer: (data: IPostAnswerData) => {
        return instance.post<IPostAnswerData, AxiosResponse<IPostAnswerResponse>>("/answers/", data).then(response => response.data)
    }
}

export const apiGetAnswer = {
    getAnswersArrayById: (id: number) => {
        return instance.get<IGetAnswersArrayResponse>(`/questions/${id}/answers/`).then(response => response.data)
    }
}

