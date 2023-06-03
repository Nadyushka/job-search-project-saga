import {ResponseTypeVacancies} from "1-DAL/vacanciesAPI"
import {getDataFromLocalStorage} from "./localStorageData";

export const setPropertyMarkedToVacancies = (vacanciesData: ResponseTypeVacancies) => {
    let selectedVacancies = getDataFromLocalStorage()
    return {
        ...vacanciesData,
        objects: vacanciesData.objects.map(vacancy => selectedVacancies.includes(vacancy.id) ?
            {...vacancy, marked: true} :
            {...vacancy, marked: false})
    }
}