import { AppRootStateType } from '2-BLL/store'

export const isLoadingVacancies = (state: AppRootStateType) => state.vacancies.isLoading
export const errorVacancies = (state: AppRootStateType) => state.vacancies.error
export const catalogueDataVacancies = (state: AppRootStateType) => state.vacancies.catalogueData
export const vacanciesDataVacancies = (state: AppRootStateType) => state.vacancies.vacanciesData
export const vacancyDataVacancies = (state: AppRootStateType) => state.vacancies.vacancyData
export const currentPageVacancies = (state: AppRootStateType) => state.vacancies.currentPage
export const pageCountVacancies = (state: AppRootStateType) => state.vacancies.pageCount
export const paymentFromVacancies = (state: AppRootStateType) => state.vacancies.payment_from
export const paymentToVacancies = (state: AppRootStateType) => state.vacancies.payment_to
export const jobAreaVacancies = (state: AppRootStateType) => state.vacancies.jobArea
export const keyWordVacancies = (state: AppRootStateType) => state.vacancies.keyWord

