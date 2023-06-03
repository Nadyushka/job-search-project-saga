import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {select, all} from 'redux-saga/effects'
import {authReducer, authWorkerSaga} from "2-BLL/authReucer/authReducer";
import {vacanciesReducer, vacanciesWorkerSaga} from "2-BLL/vacancyReducer/vacanciesReducer";
import {selectedVacanciesReducer, selectedVacanciesWorkerSaga} from "2-BLL/selectedVacanciesReducer/selectedVacanciesReducer";


// store
export const rootReducer = combineReducers({
    auth: authReducer,
    vacancies: vacanciesReducer,
    selectedVacancies: selectedVacanciesReducer
})

export const sagaMiddleware = createSagaMiddleware()

// store

export const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware))

// create the saga middleware

sagaMiddleware.run(sagaWatcher)

// then run the saga
function* sagaWatcher() {
    yield all([authWorkerSaga(), vacanciesWorkerSaga(), selectedVacanciesWorkerSaga()])
}

//custom hooks
export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
>

//@ts-ignore
window.store = store