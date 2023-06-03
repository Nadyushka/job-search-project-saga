import axios from "axios";
import {put} from "redux-saga/effects";

export function* errorHandler (e: any,  setErrorAC: (error: string) =>  { type: string, error: string }) {
    if (axios.isAxiosError<ErrorType>(e)) {
        const error = e.response?.data ? e.response.data.error.message : e.message
        yield put(setErrorAC(error))
    } else {
        yield put(setErrorAC('Some error'))
    }
}

type ErrorType = {
    error: {
        code: string,
        message: string
    }
}