<template>
  <div class="list-header">
    <PageTitle
      :items="breadcrumbs"
      :title="`${route.path.includes('edit') ? 'Edit' : 'View'} User`"
    />
  </div>
  <div class="border-header" />
  <div class="form-sections enabled">
    <div class="form-section">
      <div class="form-header">User Information</div>
      <el-form
        label-position="top"
        :model="form"
        :rules="formRules"
        v-loading="loading"
        ref="formRef"
        require-asterisk-position="right"
      >
        <div class="form-content">
          <UploadProfile
            label="Profile"
            style="margin-bottom: 15px"
            :width="100"
            :isRequired="false"
            :max-size="150"
            :aspectRadio="'1/1'"
            :resolution-height="256"
            :resolution-width="256"
            :preview-url="form.avatar"
          />
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item prop="firstName" label="First Name">
                <el-input
                  v-model="form.firstName"
                  placeholder="Input First Name"
                  maxlength="50"
                  show-word-limit
                  size="large"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="lastName" label="Last Name">
                <el-input
                  v-model="form.lastName"
                  placeholder="Input Last Name"
                  maxlength="50"
                  show-word-limit
                  size="large"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Gender" prop="gender" class="radio-btn">
                <el-radio-group
                  style="width: 100%"
                  v-model="form.gender"
                  size="large"
                >
                  <el-radio
                    v-for="(gender, index) in Gender"
                    :key="index"
                    :label="gender.value"
                    border
                    style="margin-right: 10px; border-radius: 8px"
                  >
                    <div style="display: flex; align-items: center; gap: 5px">
                      <el-icon>
                        <Female v-if="gender.label === 'Female'" />
                        <Male v-else />
                      </el-icon>
                      <span>{{ gender.label }}</span>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="email" label="Email">
                <el-input
                  v-model="form.email"
                  placeholder="Input Email"
                  maxlength="50"
                  show-word-limit
                  size="large"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="phoneNumber" label="Phone Number">
                <el-input
                  v-model="form.phoneNumber"
                  placeholder="Input Phone Number"
                  maxlength="20"
                  show-word-limit
                  size="large"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="cidNumber" label="ID Card Number">
                <el-input
                  v-model="form.cidNumber"
                  placeholder="Input ID Card Number"
                  maxlength="20"
                  show-word-limit
                  size="large"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Role" prop="role">
                <el-select
                  v-model="form.role"
                  placeholder="Select Role"
                  size="large"
                  filterable
                >
                  <el-option
                    v-for="(role, index) in Roles"
                    :key="index"
                    :value="role.value"
                    :label="formatRole(role.label)"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Department Name" prop="deptName">
                <el-input
                  maxlength="50"
                  show-word-limit
                  size="large"
                  v-model="form.deptName"
                  placeholder="Input Department Name"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Staff ID" prop="staffID">
                <el-input
                  v-model="form.staffId"
                  maxlength="50"
                  show-word-limit
                  size="large"
                  placeholder="Input Staff ID"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="buttons">
            <el-button @click="router.go(-1)" size="large">Cancel</el-button>
            <el-button
              type="primary"
              :icon="loading ? RefreshLeft : ''"
              size="large"
              @click="submit"
              >Save</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { RefreshLeft, Female, Male } from "@element-plus/icons-vue";
import type { Breadcrumb } from "@/common/interface/breadcrumb.interface";
import PageTitle from "@/components/PageTitle.vue";
import UploadProfile from "@/components/UploadProfile.vue";
import router from "@/routes";
import { formatRole } from "@/utils/formatter.util";
import messageBoxUtil from "@/utils/message-box.util";
import { messages } from "@/common/data/message.data";
import type { UserRequestPayload } from "@/common/interface/user.interface";
import { useUserStore } from "@/stores";
import { useRoute } from "vue-router";

const Gender = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const Roles = [
  { value: "ROLE_USER", label: "User" },
  { value: "ROLE_ADMIN", label: "Admin" },
  { value: "ROLE_OPERATOR", label: "Operator" },
];

const useStore = useUserStore();
const route = useRoute();

const loading = ref<boolean>(false);
const form = ref<{
  firstName: string;
  lastName: string;
  staffId: string;
  password: string;
  gender: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  role: string;
  deptName: string;
  cidNumber: string;
  isActive: boolean;
}>({
  firstName: "",
  lastName: "",
  staffId: "",
  password: "",
  gender: "",
  email: "",
  avatar: "",
  phoneNumber: "",
  role: "",
  deptName: "",
  cidNumber: "",
  isActive: false,
});
const formRef = ref<any>(null);
const formRules = ref({
  firstName: [
    { required: true, message: "Field is required", trigger: "blur" },
  ],
  lastName: [{ required: true, message: "Field is required", trigger: "blur" }],
  email: [{ required: true, message: "Field is required", trigger: "blur" }],
  role: [{ required: true, message: "Field is required", trigger: "blur" }],
  phoneNumber: [
    { required: true, message: "Field is required", trigger: "blur" },
  ],
});

const breadcrumbs = ref<Breadcrumb[]>([
  {
    name: "Settings",
    path: null,
  },
  {
    name: "Backoffice Users",
    path: null,
  },
]);
let id = ref();
let isEdit: boolean = false;

onBeforeMount(() => {
  id.value = Number(route.params.id);
  isEdit = route.path.includes("edit");
});

onMounted(async () => {
  if (id) {
    loading.value = true;
    await useStore
      .detailUser(id.value)
      .then((res) => {
        if (!res.data) {
          messageBoxUtil.error(messages.error.somethingIsWrong());
        } else {
          const data = res?.data;
          if (data) {
            (form.value.firstName = data.firstName),
              (form.value.lastName = data.lastName),
              (form.value.cidNumber = data.cidNumber),
              (form.value.deptName = data.deptName),
              (form.value.email = data.email),
              (form.value.phoneNumber = data.phoneNumber),
              (form.value.role = data.role),
              (form.value.staffId = data.staffId),
              (form.value.gender = data.gender),
              (form.value.avatar = data.avatar);
          }
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
});

const submit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // if (!form.value.avatar) {
      //   messageBoxUtil.error(messages.validation.image("Image"));
      //   return;
      // }
      loading.value = true;
      const userDto: UserRequestPayload = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phoneNumber: form.value.phoneNumber,
        isActive: form.value.isActive,
        role: form.value.role,
        gender: form.value.gender,
        avatar: form.value.avatar,
        deptName: form.value.deptName,
        staffId: form.value.staffId,
        password: form.value.password,
        cidNumber: form.value.cidNumber,
      };
      await useStore
        .createUser(userDto)
        .then((res) => {
          if (res.status.code === 0) {
            messageBoxUtil.success(
              res.status.message || messages.success.created("User")
            );
            router.push("/settings/backoffice-user");
          } else {
            messageBoxUtil.error(
              res.status.message || messages.error.create("User")
            );
          }
        })
        .catch((error) => {
          if (error.response && error.response.status !== 401)
            messageBoxUtil.error(error.toString());
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
</script>
