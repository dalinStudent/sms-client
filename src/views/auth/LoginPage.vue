<template>
  <el-row class="page-container">
    <el-col :lg="12" :xs="24">
      <div class="login-page">
        <HeaderText
          title="Middleware Portal"
          subtitle="Unified Platform for Automated Communication"
        />
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
                {{ authStore.loading ? "Loading ..." : "Sign in" }}
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-col>
    <el-col :lg="12" :xs="0" class="image-section">
      <el-image class="image" :src="LoginImage" alt="image" fit="cover" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import type { ElForm } from "element-plus";
import LoginImage from "@/assets/images/login-image.png";
import HeaderText from "@/components/HeaderText.vue";
import { useRouter } from "vue-router";
import CryptoJS from 'crypto-js'

interface LoginForm {
  username: string;
  password: string;
}

const form = ref<LoginForm>({ username: "", password: "" });
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const errorMessage = ref<string | null>(null);

const authStore = useAuthStore();
const router = useRouter();

const formRules = ref({
  username: [
    { required: true, message: "Email is required", trigger: "blur" },
    {
      type: "email",
      message: "Enter a valid email",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
  ],
});

const closeErrorMessage = () => (errorMessage.value = null);

const submitForm = async () => {
  if (errorMessage.value) closeErrorMessage();

  try {
    const valid = await formRef.value?.validate();
    if (!valid) return;
    const hashedPassword = CryptoJS.SHA256(form.value.password)
      .toString()
      .toUpperCase();
    await authStore.login(form.value.username, hashedPassword);
    router.push("/dashboard");
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Login failed";
  }
};
</script>
