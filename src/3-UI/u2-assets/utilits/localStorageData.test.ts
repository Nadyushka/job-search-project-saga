import {getDataFromLocalStorage} from "./localStorageData";
import LS from './mockLocalStorage';
import {ResponseTypeVacancies} from "../../../1-DAL/vacanciesAPI";
import {setPropertyMarkedToVacancies} from "./setPropertyMarkedToVacancies";

describe('local storage test', () => {
    beforeEach(() => {
        LS.window.localStorage.clear();
    });

    afterEach(() => {
        LS.window.localStorage.clear();
    });

    it('should return array with all selected vacancies IDs', () => {

        let selectedVacanciesInLocalStorage = [{
            id: 1,
            payment_from: 150000,
            profession: 'Manager',
            currency: "rub",
            type_of_work: {title: 'remote'},
            town: {title: 'Minsk'},
            marked: true
        }, {
            id: 15,
            payment_from: 150000,
            profession: 'Manager',
            currency: "rub",
            type_of_work: {title: 'remote'},
            town: {title: 'Minsk'},
            marked: true
        }, {
            id: 78,
            payment_from: 150000,
            profession: 'Manager',
            currency: "rub",
            type_of_work: {title: 'remote'},
            town: {title: 'Minsk'},
            marked: true
        }]

        LS.window.localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacanciesInLocalStorage}));

        let finalVacanciesArray = getDataFromLocalStorage()

        expect(finalVacanciesArray.length).toBe(3)
        expect(finalVacanciesArray).toEqual([1, 15, 78])
    });

    it('should update to each vacancy property "marked" depending on local storage info', () => {

        let savedVacanciesFromLocalStorage: ResponseTypeVacancies = {
            objects: [{
                id: 1,
                payment_from: 150000,
                payment_to: 200000,
                profession: '',
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
            total: 10, corrected_keyword: '', more: true
        }

        let selectedVacancyInLS = [{
            id: 11,
            payment_from: 150000,
            profession: 'Manager',
            currency: "rub",
            type_of_work: {title: 'remote'},
            town: {title: 'Minsk'},
            marked: true
        }]

        LS.window.localStorage.setItem('selectedVacancies', JSON.stringify({selectedVacanciesArray: selectedVacancyInLS}))

        let finalVacanciesArray = setPropertyMarkedToVacancies(savedVacanciesFromLocalStorage)

        expect(finalVacanciesArray.objects.length).toBe(2)
        expect(finalVacanciesArray.objects[0].marked).toBeFalsy()
        expect(finalVacanciesArray.objects[1].marked).toBeTruthy()
    });

});
