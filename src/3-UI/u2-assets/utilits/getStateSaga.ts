import {select} from 'redux-saga/effects'
import {AppRootStateType} from "2-BLL/store";

export function* appSelect<TSelected>(selector: (state: AppRootStateType) => TSelected,): Generator<any, TSelected, TSelected> {
    return yield select(selector);
}