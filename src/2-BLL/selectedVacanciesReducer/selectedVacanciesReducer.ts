import { put, takeEvery} from "redux-saga/effects";

import {SelectedVacancyInfo, VacancyInfo} from "1-DAL/vacanciesAPI";
import {errorHandler} from "3-UI/u2-assets/utilits/error";
import { appSelect } from "3-UI/u2-assets/utilits/getStateSaga";



const initialState = {
    isLoading: false,
    error: '',
    vacanciesData: {
        "objects": [] as SelectedVacancyInfo[],
        "total": 0,
        "corrected_keyword": '',
        "more": false
    },
    currentPage: 1,
    pageCount: 3,
}

type InitialStateType = typeof initialState

export const selectedVacanciesReducer = (state: InitialStateType = initialState, action: ActionsSelectedVacanciesTypes): InitialStateType => {
    switch (action.type) {
        case "job-search/auth/isLoading":
            return {...state, isLoading: action.isLoading}
        case "job-search/auth/setError":
            return {...state, error: action.error}
        case "job-search/selectedVacancies/setSelectedVacanciesData":
            return {
                ...state,
                currentPage: action.currentPage,
                pageCount: action.count,
                vacanciesData: {
                    ...state.vacanciesData,
                    total: action.objects.length,
                    objects: action.objects.map(vacancies => ({...vacancies}))
                }
            }
        default:
            return state
    }
}

// saga creators

function* setSelectedVacanciesWorkerSaga(action: ReturnType<typeof setSelectedVacancies>): any {
    yield put(isLoadingAC(true))
    try {
        const localStorageSelectedVacancies = localStorage.getItem('selectedVacancies') ? localStorage.getItem('selectedVacancies') : '{selectedVacanciesArray:[]}'
        const selectedItems: VacancyInfo[] = JSON.parse(localStorageSelectedVacancies!).selectedVacanciesArray
        yield put(setSelectedVacanciesDataAC(selectedItems, action.currentPage, action.count))
    } catch (e) {
        errorHandler(e, setErrorSelectedVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}

function* removeVacancyFromSelectionWorkerSaga(action: ReturnType<typeof removeVacancyFromSelection>): any {
    yield put(isLoadingAC(true))
    try {
        const selectedVacancies = yield appSelect(state => state.selectedVacancies.vacanciesData.objects.filter(v => v.id !== action.id))

        localStorage.removeItem('selectedVacancies')
        localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancies}))
        yield put(setSelectedVacanciesDataAC(selectedVacancies, action.currentPage, action.count))
    } catch (e) {
        errorHandler(e, setErrorSelectedVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}

function* addVacancyToSelectedWorkerSaga(action: ReturnType<typeof addVacancyToSelected>): any {
    yield put(isLoadingAC(true))
    try {
        const pageCount = yield appSelect(state => state.selectedVacancies.pageCount)
        const selectedVacanciesSaved: VacancyInfo[] = yield appSelect(state => state.selectedVacancies.vacanciesData.objects)

        const newVacancy = {
            id: action.id,
            profession: action.professionName,
            currency: action.currency,
            payment_from: action.salary,
            type_of_work: {title: action.type_of_work},
            town: {title: action.town},
            marked: true
        }
        const selectedVacancies = [newVacancy, ...selectedVacanciesSaved]
        localStorage.removeItem('selectedVacancies')
        localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancies}))
        yield put(setSelectedVacanciesDataAC(selectedVacancies, 1, pageCount))
    } catch (e) {
        errorHandler(e, setErrorSelectedVacancyAC)
    } finally {
        yield put(isLoadingAC(false))
    }
}

// saga actions

export const setSelectedVacancies = (currentPage: number, count: number) => ({
    type: 'selectedVacancies/SET-SELECTED-VACANCIES-DATA',
    currentPage, count
})

export const removeVacancyFromSelection = (id: number, currentPage: number, count: number) => ({
    type: 'selectedVacancies/REMOVE-SELECTED-VACANCIES-DATA',
    currentPage, count, id
})

export const addVacancyToSelected = (id: number, professionName: string, salary: number | "", currency: "rub" | "uah" | "uzs", type_of_work: string, town: string) => ({
    type: 'selectedVacancies/ADD-VACANCY-TO-SELECTED',
    professionName, salary, id, currency, type_of_work, town
})

//authWorkerSaga

export function* selectedVacanciesWorkerSaga() {
    yield takeEvery('selectedVacancies/SET-SELECTED-VACANCIES-DATA', setSelectedVacanciesWorkerSaga)
    yield takeEvery('selectedVacancies/REMOVE-SELECTED-VACANCIES-DATA', removeVacancyFromSelectionWorkerSaga)
    yield takeEvery('selectedVacancies/ADD-VACANCY-TO-SELECTED', addVacancyToSelectedWorkerSaga)
}

// actions

const isLoadingAC = (isLoading: boolean) => ({type: 'job-search/auth/isLoading', isLoading} as const)
export const setErrorSelectedVacancyAC = (error: string) => ({type: 'job-search/auth/setError', error} as const)
export const setSelectedVacanciesDataAC = (objects: SelectedVacancyInfo[], currentPage: number, count: number) => ({
    type: 'job-search/selectedVacancies/setSelectedVacanciesData',
    objects,
    count,
    currentPage
} as const)

// types

export type ActionsSelectedVacanciesTypes =
    isLoadingACType
    | setErrorType
    | setSelectedVacanciesDataType

type isLoadingACType = ReturnType<typeof isLoadingAC>
type setErrorType = ReturnType<typeof setErrorSelectedVacancyAC>
export type setSelectedVacanciesDataType = ReturnType<typeof setSelectedVacanciesDataAC>

