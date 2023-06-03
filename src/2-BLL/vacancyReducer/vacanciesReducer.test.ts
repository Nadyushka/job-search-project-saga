import {ResponseTypeCatalogues, ResponseTypeVacancies, VacancyInfo} from "../../1-DAL/vacanciesAPI";
import {
    setCatalogueDataAC,
    setErrorVacancyAC, setFiltersAC, setPageInfoAC,
    setVacanciesDataAC,
    setVacancyDataAC,
    vacanciesReducer
} from "./vacanciesReducer";

describe('vacanciesReducers actions test', () => {

    let startState: any;
    const vacanciesData: ResponseTypeVacancies = {
        objects: [{
            id: 1,
            payment_from: 150000,
            payment_to: 200000,
            profession: 'Frontend developer',
            currency: "rub",
            type_of_work: {id: 1, title: 'remote'},
            town: {id: 2, title: 'Minsk', declension: '', genitive: ''},
            firm_name: '',
            vacancyRichText: '',
            marked: false
        },
            {
                id: 11,
                payment_from: 150000,
                payment_to: 200000,
                profession: 'Manager',
                currency: "rub",
                type_of_work: {id: 1, title: 'remote'},
                town: {id: 2, title: 'Minsk', declension: '', genitive: ''},
                firm_name: '',
                vacancyRichText: '',
                marked: false
            }],
        total: 255,
        corrected_keyword: '',
        more: false,
    }

    beforeEach(() => {
        startState = {
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
            pageCount: 3,
            payment_from: '' as number | '',
            payment_to: '' as number | '',
            jobArea: '',
            keyWord: '',
        }
    })

    it('should set correct error', () => {
        const endState = vacanciesReducer(startState, setErrorVacancyAC('some error'))
        expect(endState.error).toBe('some error')
    })

    it('should set correct catalogues data', () => {
        const catalogueData: ResponseTypeCatalogues[] = [{title_rus: 'IT', key: 1}, {title_rus: 'MUSIC', key: 2}]
        const endState = vacanciesReducer(startState, setCatalogueDataAC(catalogueData))
        expect(endState.catalogueData).toStrictEqual([{title_rus: 'IT', key: 1}, {title_rus: 'MUSIC', key: 2}])
    })

    it('should set correct vacancies data', () => {
        const endState = vacanciesReducer(startState, setVacanciesDataAC(vacanciesData))
        expect(startState.vacanciesData.objects.length).toBe(0)
        expect(endState.vacanciesData.objects.length).toBe(2)
    })

    it('should set correct selected vacancy data', () => {
        const endState = vacanciesReducer(startState, setVacancyDataAC(vacanciesData.objects[0]))
        expect(endState.vacancyData.profession).toBe('Frontend developer')
    })

    it('should set correct page data', () => {
        const endState = vacanciesReducer(startState, setPageInfoAC(5))
        expect(endState.currentPage).toBe(5)
    })

    it('should set correct filters data', () => {
        const endState = vacanciesReducer(startState, setFiltersAC(50000, 100000, '33', 'manager'))
        expect(endState.payment_from).toBe(50000)
        expect(endState.payment_to).toBe(100000)
    })

})
