<template>
    <!-- <div class="list-header">
        <div class="texts">
            <PageTitle :items="breadcrumbs" :title="'Change Password'" />
        </div>
    </div> -->
    <!-- <div style="background: #e4e7ed; height: 1px; padding: 0.5px; margin: 0 24px"></div>
    <div class="form-sections enabled">
        <el-form
            require-asterisk-position="right"
            label-position="top"
            :model="form"
            :rules="formRules"
            :disabled="loading"
            ref="formRef"
            v-loading="loading"
        >
            <div class="form-section">
                <div class="form-header">Change Password</div>
                <div class="form-content">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Current Password" prop="currentPassword">
                                <el-input
                                    v-model="form.currentPassword"
                                    @keyup.enter="submitForm()"
                                    placeholder="Input Current Password"
                                    size="large"
                                    clearable
                                    type="password"
                                    show-password
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="New Password" prop="newPassword">
                                <el-input
                                    v-model="form.newPassword"
                                    @keyup.enter="submitForm()"
                                    placeholder="Input New Password"
                                    size="large"
                                    clearable
                                    type="password"
                                    show-password
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Confirm New Password" prop="confirmPassword">
                                <el-input
                                    v-model="form.confirmPassword"
                                    @keyup.enter="submitForm()"
                                    placeholder="Confirm New Password"
                                    size="large"
                                    clearable
                                    type="password"
                                    show-password
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <p style="font-size: 12px; line-height: normal">
                        Passwords must be at least 8 characters long and include one lowercase
                        letter, one uppercase letter, one number, and one special character.
                    </p>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="buttons mt-2.5">
                                <el-button text size="large" @click="forgetPassword"
                                    >Forget Password</el-button
                                >
                                <el-button type="primary" @click="submitForm" size="large"
                                    >Save Password</el-button
                                >
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-form>
    </div> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { ChangePasswordRequest } from '@/common/interface/password.interface'
import { passwordValidator } from '@/utils/password-validator.util'
import CryptoJS from 'crypto-js'
import { useAuthStore } from '@/stores'
import messageBox from '@/utils/message-box.util'
import { messages } from '@/common/data/message.data'

const checkNewPassword = (rule: any, value: any, callback: any) => {
    if (value && value != form.value.newPassword) {
        return callback(new Error(messages.validation.passwordNotMatch()))
    } else return callback()
}
const loading = ref<boolean>(false)
let password = 'Password'
const form = ref<{
    currentPassword: string
    newPassword: string
    confirmPassword: string
}>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})
const formRef = ref<FormInstance>()
const formRules = ref({
    currentPassword: [{ required: true, message: 'Field is required', trigger: 'blur' }],
    newPassword: [
        { required: true, message: 'Field is required', trigger: 'blur' },
        { min: 8, message: 'Password must be minimum of 8 characters', trigger: 'blur' },
        { max: 60, message: 'Password must be no more than 60 characters.', trigger: 'blur' },
        { validator: passwordValidator, trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: 'Field is required', trigger: 'blur' },
        { validator: checkNewPassword, trigger: 'blur' }
    ]
})
const authStore = useAuthStore()

const clearForm = () => {
    formRef.value?.resetFields()
    formRef.value?.clearValidate(['currentPassword', 'newPassword', 'confirmPassword'])
    form.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
}

// const forgetPassword = async () => {
//     await resetPasswordRequest(userStore.profileData?.email as string)
//         .then((res) => {
//             if (res.status.code === 0) {
//                 messageBox.success(messages.info.reset())
//             } else {
//                 messageBox.error(res.status.message)
//             }
//         })
//         .catch((error: any) => {
//             if (error.response && error.response.status !== 401) messageBox.error(error.toString())
//         })
//         .finally(() => {
//             loading.value = false
//         })
// }

// const submitForm = () => {
//     formRef.value?.validate((valid: boolean) => {
//         if (valid) {
//             loading.value = true
//             const dto: ChangePasswordRequest = {
//                 id: userStore.profileData?.id as number,
//                 currentPassword: CryptoJS.SHA256(form.value.currentPassword)
//                     .toString()
//                     .toUpperCase(),
//                 newPassword: CryptoJS.SHA256(form.value.newPassword).toString().toUpperCase(),
//                 confirmPassword: CryptoJS.SHA256(form.value.confirmPassword)
//                     .toString()
//                     .toUpperCase(),
//                 timestamp: new Date().getTime()
//             }
//             changePassword(dto)
//                 .then((res) => {
//                     if (res.status.code === 0) {
//                         messageBox.success(res.status.message || messages.success.changed(password))
//                         clearForm()
//                     } else {
//                         messageBox.error(res.status.message || messages.error.change(password))
//                     }
//                 })
//                 .catch((error) => {
//                     if (error.response && error.response.status !== 401)
//                         messageBox.error(error.toString())
//                 })
//                 .finally(() => {
//                     loading.value = false
//                 })
//         }
//     })
// }

// const breadcrumbs = ref<Breadcrumb[]>([
//     {
//         name: 'User',
//         path: null
//     },
//     {
//         name: 'Change Password',
//         path: null
//     }
// ])
</script>
