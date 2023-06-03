import { AppRootStateType } from '2-BLL/store'

export const isLoadingSelectedVacancies = (state: AppRootStateType) => state.selectedVacancies.isLoading
export const errorSelectedVacancies = (state: AppRootStateType) => state.selectedVacancies.error
export const vacanciesDataSelectedVacancies = (state: AppRootStateType) => state.selectedVacancies.vacanciesData
export const currentPageSelectedVacancies = (state: AppRootStateType) => state.selectedVacancies.currentPage
export const pageCountSelectedVacancies = (state: AppRootStateType) => state.selectedVacancies.pageCount

