<template>
    <div class="login-bg">
      <div class="bg"></div>
    </div>
  
    <div class="login-page">
      <div class="login-dialog">
        <el-form
          label-position="top"
          :model="form"
          :rules="formRules"
          ref="formRef"
          :disabled="authStore.loading"
        >
          <div class="dialog-content">
            <div>
              <h2>Auto Message Middleware Portal</h2>
              <p>Welcome back, please login to proceed</p>
  
              <div class="error-message mt-20" v-if="errorMessage">
                <el-alert
                  :title="errorMessage"
                  type="error"
                  @close="closeErrorMessage"
                />
              </div>
            </div>
  
            <div class="frm-sign-in">
              <el-form-item label="Email" prop="username">
                <el-input
                  v-model="form.username"
                  maxlength="50"
                  show-word-limit
                  size="large"
                  placeholder="Enter your email"
                  @keyup.enter="submitForm"
                />
              </el-form-item>
  
              <el-form-item label="Password" prop="password" class="mt-20">
                <el-input
                  v-model="form.password"
                  maxlength="60"
                  show-word-limit
                  size="large"
                  type="password"
                  show-password
                  placeholder="Enter password"
                  @keyup.enter="submitForm"
                />
              </el-form-item>
  
              <div class="forgot-password">
                <RouterLink to="/auth/reset-password">
                  <p>Forgot Password?</p>
                </RouterLink>
              </div>
            </div>
  
            <el-button
              type="primary"
              size="large"
              :loading="authStore.loading"
              :disabled="authStore.loading"
              @click="submitForm"
              class="mt-20"
            >
              {{ authStore.loading ? 'Loading ...' : 'Sign in' }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores'
  import CryptoJS from 'crypto-js'
  import type { ElForm } from 'element-plus'
  
  interface LoginForm {
    username: string
    password: string
  }
  
  const form = ref<LoginForm>({ username: '', password: '' })
  const formRef = ref<InstanceType<typeof ElForm> | null>(null)
  const errorMessage = ref<string | null>(null)
  
  const authStore = useAuthStore()
  
  const formRules = ref({
    username: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Enter a valid email', trigger: ['blur', 'change'] },
    ],
    password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
  })
  
  const closeErrorMessage = () => (errorMessage.value = null)
  
  const submitForm = async () => {
    if (errorMessage.value) closeErrorMessage()
  
    try {
      const valid = await formRef.value?.validate()
      if (!valid) return
  
      // Hash password before sending
      const hashedPassword = CryptoJS.SHA256(form.value.password).toString().toUpperCase()
  
      await authStore.login(form.value.username, hashedPassword)
      // Redirect after login
      window.location.href = '/contacts' // or use router.push('/contacts')
    } catch (error: any) {
      errorMessage.value = error.response?.data?.message || error.message || 'Login failed'
    }
  }
  </script>
  
  <style scoped>
  .login-bg {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
    z-index: -1;
  }
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .login-dialog {
    width: 420px;
    padding: 40px 30px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  .dialog-content h2 {
    text-align: center;
    margin-bottom: 8px;
  }
  .dialog-content p {
    text-align: center;
    color: #555;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .forgot-password {
    text-align: right;
    margin-top: 5px;
  }
  .forgot-password p {
    color: #409eff;
    cursor: pointer;
  }
  </style>
  