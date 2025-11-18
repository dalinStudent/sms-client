<template>
  <div class="login-bg">
    <div class="bg"></div>
  </div>
  <div class="page-container">
    <div class="login-page">
      <div class="login-dialog">
        <el-form
          label-position="top"
          :model="form"
          :rules="formRules"
          ref="formRef"
        >
          <div class="dialog-content">
            <div>
              <h2>User Activation</h2>
              <p>Welcome to Auto SMS Middleware Portal</p>
            </div>
            <div class="error-message" v-if="errorMessage">
              <el-alert
                :title="errorMessage"
                type="error"
                @close="closeErrorMessage"
              />
            </div>
            <div class="frm-sign-in">
              <el-form-item prop="password" style="padding-top: 14px">
                <label style="color: #606266"
                  ><span style="color: red">* </span> Password</label
                >
                <el-input
                  size="large"
                  v-model="form.password"
                  @keyup.enter="submitForm()"
                  type="password"
                  show-password
                  maxlength="60"
                  show-word-limit
                  placeholder="Input Password"
                />
              </el-form-item>

              <el-form-item prop="confirmPassword" style="padding-top: 14px">
                <label style="color: #606266"
                  ><span style="color: red">* </span>Confirm Password</label
                >
                <el-input
                  size="large"
                  v-model="form.confirmPassword"
                  @keyup.enter="submitForm()"
                  type="password"
                  show-password
                  maxlength="60"
                  show-word-limit
                  placeholder="Input Confirm Password"
                />
              </el-form-item>
            </div>
            <p style="font-size: 12px; line-height: normal; padding-top: 18px">
              Passwords must be at least 8 characters long and include one
              lowercase letter, one uppercase letter, one number, and one
              special character.
            </p>
            <el-button type="primary" @click="submitForm()">Activate</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { passwordValidator } from "@/utils/password-validator.util";
import type { FormRules, FormInstance } from "element-plus";
import { userActivation } from "@/services/activate.service";
import messageBox from "@/utils/message-box.util";
import CryptoJS from "crypto-js";
import { messages } from "@/common/data/message.data";
import router from "@/routes";

const form = ref<{
  activateKey: string;
  password: string;
  confirmPassword: string;
}>({
  activateKey: "",
  password: "",
  confirmPassword: "",
});

let acc = "Account";

const checkPassword = (rule: any, value: any, callback: any) => {
  if (value && value != form.value.password) {
    return callback(new Error(messages.validation.passwordNotMatch()));
  } else return callback();
};
const formRef = ref<FormInstance>();
const formRules = ref<FormRules>({
  activateKey: [
    { required: true, message: "Please input reset key", trigger: "blur" },
  ],
  password: [
    { validator: passwordValidator, trigger: "blur" },
    { required: true, message: "Field is required", trigger: "blur" },
  ],
  confirmPassword: [
    { validator: checkPassword, trigger: "blur" },
    { required: true, message: "Field is required", trigger: "change" },
  ],
});

const errorMessage = ref<string | null>(null);
const loading = ref(false);
const key = router.currentRoute.value.query?.key;

onMounted(() => {
  if (key) {
    form.value.activateKey = key.toString();
  }
});

const submitForm = async () => {
  if (!formRef.value) return;
  if (!form.value.activateKey) return;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      loading.value = true;
      userActivation(
        form.value.activateKey,
        CryptoJS.SHA256(form.value.password).toString().toUpperCase()
      )
        .then((res) => {
          if (res.status.code === 0) {
            messageBox.success(
              res.status.message || messages.success.activated(acc)
            );
            router.push("/auth/login");
          } else {
            messageBox.error(
              res.status.message || messages.error.activate(acc)
            );
          }
        })
        .catch((error: any) => {
          messageBox.error(error.toString());
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

const closeErrorMessage = () => {
  errorMessage.value = null;
};
</script>
