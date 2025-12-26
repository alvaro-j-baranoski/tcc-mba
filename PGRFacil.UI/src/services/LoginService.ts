import client from './client'

export interface LoginUserPayload {
    email: string
    password: string 
}

export const LoginService = {
    loginUser: (payload: LoginUserPayload) => client.post('/API/Acessos/Login', payload)
}