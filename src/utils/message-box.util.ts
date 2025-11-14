import { ElMessage } from 'element-plus'

class MessageBox {
    info(message: string) {
        ElMessage({
            message: message,
            type: 'info',
            grouping: true
        })
    }

    success(message: string) {
        ElMessage({
            message: message,
            type: 'success',
            grouping: true
        })
    }

    warning(message: string) {
        ElMessage({
            message: message,
            type: 'warning',
            grouping: true
        })
    }

    error(error: string) {
        ElMessage.error({
            message: error,
            type: 'danger',
            grouping: true
        })
    }
}
export default new MessageBox()
