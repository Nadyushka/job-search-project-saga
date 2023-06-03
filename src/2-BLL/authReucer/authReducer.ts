import {put, call, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {authApi, ResponseTypeAuth} from "1-DAL/authApi";
import {errorHandler} from "3-UI/u2-assets/utilits/error";
import { appSelect } from "3-UI/u2-assets/utilits/getStateSaga";



const initialState = {
    isAuthorised: false,
    isLoading: false,
    error: '',
    userAuthData: {
        "access_token": '',
        "refresh_token": '',
        "ttl": null,
        "expires_in": null,
        "token_type": '',
    } as userAuthDataType,
}

type InitialStateAuthReducerType = typeof initialState

export const authReducer = (state: InitialStateAuthReducerType = initialState, action: ActionsAuthTypes): InitialStateAuthReducerType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
        case "job-search/auth/setError":
            return {...state, error: action.error}
        case "job-search/auth/setUserData":
            return {...state, userAuthData: {...action.userAuthData}, isAuthorised: true}
        case "job-search/auth/refreshToken":
            return {
                ...state,
                userAuthData: {
                    ...state.userAuthData,
                    access_token: action.access_token,
                    refresh_token: action.refresh_token
                }
            }
        default:
            return state
    }
}

// sagas

export function* authorisedWithPasswordWorkerSaga(action: ReturnType<typeof authorisedWithPassword>): any {
    yield put(isLoadingAuthAC(true))
    yield put(setErrorAuthAC(''))
    try {
        let res: AxiosResponse<ResponseTypeAuth> = yield call(authApi.authorisedWithPassword,
            {
                login: action.login,
                password: action.password,
                client_id: action.client_id,
                client_secret: action.client_secret,
                hr: action.hr
            })
        yield put(setUserDataAuthAC(res.data))
    } catch (e) {
        errorHandler(e, setErrorAuthAC)
    } finally {
        yield put(isLoadingAuthAC(false))
    }
}

export function* refreshTokenWorkerSaga(): any {
    yield put(isLoadingAuthAC(true))
    yield put(setErrorAuthAC(''))
    const refreshToken = yield appSelect(state => state.auth.userAuthData.refresh_token)
    try {
        let res = yield call(authApi.refreshToken, refreshToken)
        yield put(setUserDataAuthAC(res.data))
    } catch (e) {
        errorHandler(e, setErrorAuthAC)
    } finally {
        yield put(isLoadingAuthAC(false))
    }
}

// actions authWorkerSaga

export const authorisedWithPassword = (login: string, password: string, client_id: number, client_secret: string, hr: number = 0) => ({
    type: 'auth/AUTHORIZE-WITH-PASSWORD',
    login,
    password,
    client_id,
    client_secret,
    hr
})

export const getRefreshToken = () => ({
    type: 'auth/GET-REFRESH-WITH-TOKEN',
})

//authWorkerSaga

export function* authWorkerSaga() {
    yield takeEvery('auth/AUTHORIZE-WITH-PASSWORD', authorisedWithPasswordWorkerSaga)
    yield takeEvery('auth/GET-REFRESH-WITH-TOKEN', refreshTokenWorkerSaga)
}

//actions creators

export const isLoadingAuthAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorAuthAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
export const setUserDataAuthAC = (userAuthData: userAuthDataType) => ({
    type: 'job-search/auth/setUserData',
    userAuthData
} as const)
export const refreshTokenAC = (access_token: string, refresh_token: string) => ({
    type: 'job-search/auth/refreshToken',
    access_token,
    refresh_token
} as const)

//types

export type ActionsAuthTypes = isLoadingACType | setErrorType | setAuthUserDataType | refreshTokenDataType

type isLoadingACType = ReturnType<typeof isLoadingAuthAC>
type setErrorType = ReturnType<typeof setErrorAuthAC>
type setAuthUserDataType = ReturnType<typeof setUserDataAuthAC>
type refreshTokenDataType = ReturnType<typeof refreshTokenAC>

type userAuthDataType = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number | null,
    "expires_in": number | null,
    "token_type": string,
}
