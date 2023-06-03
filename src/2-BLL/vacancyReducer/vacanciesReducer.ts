import {call, put, takeEvery} from "redux-saga/effects"

import {ResponseTypeCatalogues, ResponseTypeVacancies, vacancyApi, VacancyInfo} from "1-DAL/vacanciesAPI"

import { getRefreshToken } from "2-BLL/authReucer/authReducer";

import {setPropertyMarkedToVacancies} from "3-UI/u2-assets/utilits/setPropertyMarkedToVacancies";
import {errorHandler} from "3-UI/u2-assets/utilits/error";
import {getDataFromLocalStorage} from "3-UI/u2-assets/utilits/localStorageData";
import {AppRootStateType} from "../store";

import {appSelect} from "3-UI/u2-assets/utilits/getStateSaga";

const initialState = {
    isLoading: false,
    error: '',
    catalogueData: [] as ResponseTypeCatalogues[],
    vacanciesData: {
        "objects": [] as VacancyInfo[],
        "total": 0,
        "corrected_keyword": '',
        "more": false
    },
    vacancyData: {
        "id": 0,
        "payment_from": '',
        "payment_to": '',
        "profession": '',
        "currency": 'rub',
        "type_of_work": {
            "id": 0,
            "title": '',
        },
        "town": {
            "id": 0,
            "title": '',
            "declension": '',
            "genitive": '',
        },
        "firm_name": '',
        "vacancyRichText": '',
    } as VacancyInfo,
    currentPage: 1,
    pageCount: 4,
    payment_from: '' as number | '',
    payment_to: '' as number | '',
    jobArea: '',
    keyWord: '',
}

type InitialStateType = typeof initialState

export const vacanciesReducer = (state: InitialStateType = initialState, action: ActionsVacanciesTypes): InitialStateType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
        case "job-search/auth/setError":
            return {...state, error: action.error}
        case "job-search/vacancies/setCatalogueData":
            return {...state, catalogueData: action.catalogueData}
        case "job-search/vacancies/setVacanciesData":
            return {
                ...state,
                vacanciesData: {
                    ...action.vacanciesData,
                    objects: action.vacanciesData.objects.map(v => ({...v}))
                }
            }
        case "job-search/vacancies/setVacancyData":
            return {
                ...state,
                vacancyData: {...action.vacancyData}
            }
        case "job-search/vacancies/setPageInfo":
            return {
                ...state,
                currentPage: action.page
            }
        case "job-search/vacancies/setFilters":
            return {
                ...state,
                payment_to: action.payment_to,
                payment_from: action.payment_from,
                jobArea: action.catalogues,
                keyWord: action.keyWord,
                currentPage: 1,
            }
        case "job-search/vacancies/setKeyWord":
            return {
                ...state,
                keyWord: action.keyWord,
                currentPage: 1,
            }
        default:
            return state
    }
}

// actions authWorkerSaga

export const setCatalogueData = () => ({type: 'vacancies/SET-CATALOGUE-DATA'})

export const setVacanciesData = (currentPage: number, count: number) => ({
    type: 'vacancies/SET-VACANCIES-DATA',
    currentPage, count
})

export const setFilteredVacancies = () => ({
    type: 'vacancies/SET-FILTERED-VACANCIES',
})

export const setVacancyData = (id: number) => ({
    type: 'vacancies/SET-VACANCY-DATA',
    id
})

// sagas

export function* setCatalogueDataWorkerSaga(): any {
    yield put(isLoadingAC(true))
    const ttl = yield appSelect(state => state.auth.userAuthData.ttl)
    if (ttl && ttl < Date.now()) {
        yield put(getRefreshToken())
    }

    try {
        let res = yield call(vacancyApi.getCatalogues)
        yield put(setCatalogueDataAC(res.data))
    } catch (e) {
        errorHandler(e, setErrorVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}

function* setVacanciesDataWorkerSaga(action: ReturnType<typeof setVacanciesData>): any {
    yield put(isLoadingAC(true))
    const token = yield appSelect(state => state.auth.userAuthData.refresh_token)
    try {
        const res = yield call(vacancyApi.getVacancies, token, {currentPage: action.currentPage, count: action.count})
        const vacancies = setPropertyMarkedToVacancies(res.data)
        yield put(setVacanciesDataAC(vacancies))
    } catch (e) {
        errorHandler(e, setErrorVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}

function* setFiltredVacanciesWorkerSaga(): any {
    yield put(isLoadingAC(true))
    const token = yield appSelect(state => state.auth.userAuthData.refresh_token)
    const {
        keyWord,
        currentPage,
        pageCount: count,
        payment_from,
        payment_to,
        jobArea,
        catalogueData
    } = yield appSelect(state => state.vacancies)
    const catalogueID = catalogueData.find((c: ResponseTypeCatalogues) => c.title_rus === jobArea) ?
        catalogueData.find((c: ResponseTypeCatalogues) => c.title_rus === jobArea)!.key.toString() : ''

    try {
        let res = yield call(vacancyApi.getFiltredVacancies, token, {
            page: currentPage,
            count,
            published: 1,
            keyword: keyWord,
            payment_from,
            payment_to,
            catalogues: catalogueID
        })
        let vacancies = setPropertyMarkedToVacancies(res.data)

        yield put(setVacanciesDataAC(vacancies))
    } catch (e) {
        errorHandler(e, setErrorVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}

function* setVacancyDataWorkerSaga(action: ReturnType<typeof setVacancyData>): any {
    yield put(isLoadingAC(true))
    const token = yield appSelect((state:AppRootStateType) => state.auth.userAuthData.refresh_token)
    let selectedVacancies = getDataFromLocalStorage()
    try {
        let res = yield call(vacancyApi.getVacancy, action.id, token)
        let vacancies = {...res.data, marked: selectedVacancies.includes(res.data.id)}
        yield put(setVacancyDataAC(vacancies))
    } catch (e) {
        errorHandler(e, setErrorVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}


//authWorkerSaga

export function* vacanciesWorkerSaga() {
    yield takeEvery('vacancies/SET-CATALOGUE-DATA', setCatalogueDataWorkerSaga)
    yield takeEvery('vacancies/SET-VACANCIES-DATA', setVacanciesDataWorkerSaga)
    yield takeEvery('vacancies/SET-FILTERED-VACANCIES', setFiltredVacanciesWorkerSaga)
    yield takeEvery('vacancies/SET-VACANCY-DATA', setVacancyDataWorkerSaga)
}


// actions

const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorVacancyAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)

export const setCatalogueDataAC = (catalogueData: ResponseTypeCatalogues[]) => ({
    type: 'job-search/vacancies/setCatalogueData',
    catalogueData
} as const)

export const setVacanciesDataAC = (vacanciesData: ResponseTypeVacancies) => ({
    type: 'job-search/vacancies/setVacanciesData',
    vacanciesData
} as const)

export const setVacancyDataAC = (vacancyData: VacancyInfo) => ({
    type: 'job-search/vacancies/setVacancyData',
    vacancyData
} as const)

export const setPageInfoAC = (page: number) => ({
    type: 'job-search/vacancies/setPageInfo',
    page
} as const)

export const setFiltersAC = (payment_from: number | '', payment_to: number | '', catalogues: string | '', keyWord: string | '') => ({
    type: 'job-search/vacancies/setFilters',
    payment_from, payment_to, catalogues, keyWord
} as const)

export const setKeyWordValueAC = (keyWord: string) => ({
    type: 'job-search/vacancies/setKeyWord',
    keyWord
} as const)

// types

export type ActionsVacanciesTypes =
    isLoadingACType
    | setErrorType
    | setCatalogueDataType
    | setVacanciesDataType
    | setVacancyDataType
    | setPageInfoType
    | setFiltersType
    | setKewWordValueType

type isLoadingACType = ReturnType<typeof isLoadingAC>
type setErrorType = ReturnType<typeof setErrorVacancyAC>
type setCatalogueDataType = ReturnType<typeof setCatalogueDataAC>
type setVacanciesDataType = ReturnType<typeof setVacanciesDataAC>
type setVacancyDataType = ReturnType<typeof setVacancyDataAC>
type setPageInfoType = ReturnType<typeof setPageInfoAC>
type setFiltersType = ReturnType<typeof setFiltersAC>
type setKewWordValueType = ReturnType<typeof setKeyWordValueAC>