import { AppRootStateType } from '2-BLL/store'

export const isAuthorisedAuth = (state: AppRootStateType) => state.auth.isAuthorised
export const isLoadingAuth = (state: AppRootStateType) => state.auth.isLoading
export const errorAuth = (state: AppRootStateType) => state.auth.error
export const userAuthDataAuth = (state: AppRootStateType) => state.auth.userAuthData

