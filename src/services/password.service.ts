// import axios from '@/axios'
// import type { ChangePasswordRequest } from '@/common/interfaces/password.interface'
// import type { Response } from '@/common/types/response.type'
// import { appSalt, deviceId } from '@/config'
// import authHeader from '@/helpers/http-headers'
// import HashUtil from '@/utils/hash.util'

// export const resetPasswordRequest = async (email: string): Promise<Response<null>> => {
//     const body = {
//         email,
//         timestamp: new Date().getTime()
//     }
//     try {
//         const hashed = HashUtil.hashOrder(body, appSalt, deviceId)
//         const response = await axios.post(`/api/public/user/request-password-reset`, body, {
//             headers: authHeader(hashed)
//         })
//         return response?.data as Response<null>
//     } catch (error: any) {
//         return Promise.reject(error)
//     }
// }

// export const verifyResetPassword = async (
//     resetKey: string,
//     newPassword: string
// ): Promise<Response<null>> => {
//     const body = {
//         resetKey,
//         newPassword,
//         timestamp: new Date().getTime()
//     }
//     try {
//         const hashed = HashUtil.hashOrder(body, appSalt, deviceId)
//         const response = await axios.post(`/api/public/user/complete-password-reset`, body, {
//             headers: authHeader(hashed)
//         })
//         return response?.data as Response<null>
//     } catch (error: any) {
//         return Promise.reject(error)
//     }
// }

// export const changePassword = async (body: ChangePasswordRequest): Promise<Response<null>> => {
//     try {
//         const hashed = HashUtil.hashOrder(body, appSalt, deviceId)
//         const response = await axios.post(`/api/management/user/change-password`, body, {
//             headers: authHeader(hashed)
//         })
//         return response?.data as Response<null>
//     } catch (error: any) {
//         return Promise.reject(error)
//     }
// }
