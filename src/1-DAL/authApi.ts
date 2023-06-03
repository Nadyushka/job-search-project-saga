import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
    withCredentials: true,
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    }
})

export const authApi = {

    authorisedWithPassword(paramsData: { login: string, password: string, client_id: number, client_secret: string, hr: number }) {
        const params = {...paramsData}
        return instance.get<ResponseTypeAuth>('oauth2/password', {params})
    },

    refreshToken(refresh_token: string) {
        const params = {
            refresh_token,
            client_id: 2356,
            client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
        }
        return instance.get<ResponseTypeAuth>('refresh_token/', {params})
    },
}

export type ResponseTypeAuth = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number,
    "expires_in": number,
    "token_type": string,
}
