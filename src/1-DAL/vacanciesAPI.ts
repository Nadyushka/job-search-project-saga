import axios from "axios";

const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    withCredentials: true,
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    }
})

export const vacancyApi = {
    getCatalogues() {
        return instance.get<ResponseTypeCatalogues[]>('catalogues')
    },

    getVacancies(token: string, paramsData: { currentPage: number, count: number }) {
        const params = {
            ...paramsData,
            'Authorization': `Bearer ${token}`,
            published: 1,
        }
        return instance.get<ResponseTypeVacancies>('vacancies', {params})
    },

    getFiltredVacancies(token: string, paramData: { page: number, count: number, published?: number, keyword?: string, payment_from?: number | '', payment_to?: number | '', catalogues?: string }) {
        const params = {
            ...paramData,
            no_agreement: 1,
            'Authorization': `Bearer ${token}`,
        }
        return instance.get<ResponseTypeVacancies>('vacancies', {params})
    }
    ,
    getVacancy(id: number, token: string) {
        return instance.get<VacancyInfo>(`vacancies/${id}/`,
            {params: {'Authorization': `Bearer ${token}`}})
    },
}

export type ResponseTypeCatalogues = {
    title_rus: string,
    key: number,
}

export type ResponseTypeVacancies = {
    "objects": VacancyInfo[],
    "total": number,
    "corrected_keyword": string,
    "more": boolean,
}

export type VacancyInfo = {
    "id": number,
    "payment_from": number | '',
    "payment_to": number | '',
    "profession": string,
    "currency": 'rub' | 'uah' | 'uzs',
    "type_of_work": {
        "id": number,
        "title": string,
    },
    "town": {
        "id": number,
        "title": string,
        "declension": string,
        "genitive": string
    },
    "firm_name": string,
    vacancyRichText: string,
    marked: boolean
}

export type SelectedVacancyInfo = {
    "id": number,
    "payment_from": number | '',
    "profession": string,
    "currency": 'rub' | 'uah' | 'uzs',
    "type_of_work": {
        "title": string,
    },
    "town": {
        "title": string,
    },
    marked: boolean
}