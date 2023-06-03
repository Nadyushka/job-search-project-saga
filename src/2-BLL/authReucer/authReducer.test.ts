import {authReducer, isLoadingAuthAC, refreshTokenAC, setErrorAuthAC, setUserDataAuthAC} from "./authReducer";

describe('authReducers actions test', () => {

    let startState: any;

    beforeEach(() => {
        startState = {
            isAuthorised: false,
            isLoading: false,
            error: '',
            userAuthData: {
                "access_token": '',
                "refresh_token": '',
                "ttl": null,
                "expires_in": null,
                "token_type": '',
            }
        }
    })

    it('should set correct loading status', () => {
        const endState = authReducer(startState, isLoadingAuthAC(true))
        expect(endState.isLoading).toBeTruthy()
    })

    it('should set correct error', () => {
        const endState = authReducer(startState, setErrorAuthAC('some error'))
        expect(endState.error).toBe('some error')
    })

    it('should set correct user data', () => {
        const userData = {
            access_token: 'pokpokpk',
            refresh_token: 'jhbjhbb',
            ttl: null,
            expires_in: null,
            token_type: 'jbjh'
        }

        const endState = authReducer(startState, setUserDataAuthAC(userData))
        expect(endState.userAuthData.refresh_token).toBe('jhbjhbb')
        expect(endState.userAuthData.ttl).toBeNull()
    })

    it('should set correct new token', () => {

        const endState = authReducer(startState, refreshTokenAC('1234', '5678',))
        expect(endState.userAuthData.refresh_token).toBe('5678')
        expect(endState.userAuthData.access_token).toBe('1234')
    })

})
