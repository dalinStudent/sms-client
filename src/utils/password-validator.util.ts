import { messages } from "@/common/data/message.data"

export const passwordValidator = (rule: any, password: string, callback: (error?: Error) => void) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
    if (!regex.test(password)) {
        return callback(
            new Error(messages.validation.password())
        )
    } else return callback()
}
