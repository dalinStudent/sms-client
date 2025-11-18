import type { Response } from '@/common/types/response.type'
import authHeader from '@/helpers/http-headers'
import axios from '@/utils/axios'
import HashUtil from '@/utils/hash.util'

export const userActivation = async (
    activateKey: string,
    password: string
): Promise<Response<null>> => {
    const body = {
        activateKey,
        password
    }
    try {
        const hashed = HashUtil.hashOrder(body)
        const response = await axios.post(`/auth/activate`, body, {
            headers: authHeader(hashed)
        })
        return response?.data as Response<null>
    } catch (error: any) {
        return Promise.reject(error)
    }
}
