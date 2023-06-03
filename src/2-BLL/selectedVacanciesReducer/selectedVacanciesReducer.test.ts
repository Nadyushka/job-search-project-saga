import {
    selectedVacanciesReducer,
    setErrorSelectedVacancyAC,
    setSelectedVacanciesDataAC
} from "./selectedVacanciesReducer";
import { SelectedVacancyInfo} from "../../1-DAL/vacanciesAPI";


describe('selectedVacanciesReducers actions test', () => {

    let startState: any;
    const selectedVacanciesData = [{
            id: 1,
            payment_from: 150000,
            profession: 'Frontend developer',
            currency: "rub",
            type_of_work: {title: 'remote'},
            town: {title: 'Minsk'},
            marked: false
        },
            {
                id: 11,
                payment_from: 150000,
                profession: 'Manager',
                currency: "rub",
                type_of_work: {title: 'remote'},
                town: {title: 'Minsk'},
                marked: false
            }] as SelectedVacancyInfo[]

    beforeEach(() => {
        startState = {
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
    })

    it('should set correct error', () => {
        const endState = selectedVacanciesReducer(startState, setErrorSelectedVacancyAC('some error'))
        expect(endState.error).toBe('some error')
    })

    it('should set correct selected vacancies', () => {
        const endState = selectedVacanciesReducer(startState, setSelectedVacanciesDataAC(selectedVacanciesData, 1, 3))
        expect(startState.vacanciesData.objects.length).toBe(0)
        expect(endState.vacanciesData.objects.length).toBe(2)
        expect(endState.currentPage).toBe(1)
        expect(endState.pageCount).toBe(3)
    })

})
