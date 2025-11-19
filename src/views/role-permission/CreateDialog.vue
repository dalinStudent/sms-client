<template>
  <el-dialog
    v-model="isDialogVisible"
    :title="`${
      formType.charAt(0).toUpperCase() + formType.slice(1).toLowerCase()
    } User Role`"
    width="450"
    :show-close="false"
    align-center
    @open="openDialog"
    @close="closeDialog"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="formType === FormType.View"
      label-position="top"
    >
      <div class="dialog-content">
        <el-form-item label="User Role Name" prop="name">
          <el-input
            v-model="form.name"
            :disabled="isViewMode || formType === FormType.Edit"
            size="large"
            placeholder="Input user role name"
            @change="onChangeName"
          />
        </el-form-item>
        <el-form-item label="User Role Title" prop="title">
          <el-input
            v-model="form.title"
            :disabled="isViewMode"
            size="large"
            placeholder="Input user role title"
          />
        </el-form-item>

        <div class="flex-end-toggle">
          <p>Is super admin?</p>
          <el-switch v-model="form.isSuperAdmin" size="large" />
        </div>
        <div v-if="formType !== FormType.View" class="buttons mt-2.5">
          <el-button size="large" @click="closeDialog">Cancel</el-button>
          <el-button
            size="large"
            type="primary"
            :disabled="isSaveAllowed"
            :loading="isLoading"
            @click="onSave"
            >Save</el-button
          >
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";
import { type FormInstance, type FormRules } from "element-plus";
import { useRoleStore } from "@/stores";
import { formatEnumToText, formatSplitRole } from "@/utils/formatter.util";
import messageBoxUtil from "@/utils/message-box.util";
import { messages } from "@/common/data/message.data";
import type { RoleRequestPayload } from "@/common/interface/role-permission.interface";
import { FormType } from "@/common/enums/form-type.enum";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  formType: {
    type: String as PropType<FormType>,
    required: true,
  },
  loading: {
    type: Boolean,
  },
});

const roleStore = useRoleStore();

const isLoading = ref(props.loading);
const formRef = ref<FormInstance>();
const isDialogVisible = ref(props.dialogVisible);

const emit = defineEmits<{
  (e: "update:dialog", dialogVisible: boolean): void;
  (e: "refreshData", refreshData: boolean): void;
}>();

watch(
  () => props.dialogVisible,
  (newVal) => (isDialogVisible.value = newVal)
);

interface Form {
  name: string;
  title: string;
  isSuperAdmin: boolean;
}

const form = ref<Form>({
  name: "",
  title: "",
  isSuperAdmin: false,
});

const rules = ref<FormRules<Form>>({
  name: [{ required: true, message: "Field is required", trigger: "blur" }],
  title: [{ required: true, message: "Field is required", trigger: "blur" }],
});

const newName = ref<string>("");
const isViewMode = computed(() => props.formType === FormType.View);
const isSaveAllowed = false;

const onChangeName = (value: string) => {
  newName.value = value;
};

const openDialog = async () => {
  if (props.formType !== FormType.Create) {
    onGetDetail(props.userName);
  }
};

const onGetDetail = (name: string) => {
  roleStore.detailRole(name).then((res) => {
    if (res.status.code === 0) {
      const response = res.data;
      form.value.name = formatSplitRole(formatEnumToText(response.name));
      form.value.title = response.title;
      form.value.isSuperAdmin = response.isSuperAdmin!;
    } else {
      messageBoxUtil.error(res.status.message ? res.status.message : "");
    }
  });
};

const onSave = async () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return;
    isLoading.value = true;
    const inputName = props.userName
      ? props.userName.trim()
      : form.value.name.trim();

    const roleName = inputName.startsWith("ROLE_")
      ? inputName
      : `ROLE_${inputName}`;
    const basePayload = {
      name: roleName,
      title: form.value.title,
      isSuperAdmin: form.value.isSuperAdmin,
    };

    const successMessage =
      props.formType === FormType.Create
        ? messages.success.created("User Role")
        : messages.success.updated("User Role");

    const errorMessage =
      props.formType === FormType.Create
        ? messages.error.create("User Role")
        : messages.error.update("User Role");

    try {
      let res;
      if (props.formType === FormType.Create) {
        res = await roleStore.createRole(basePayload as RoleRequestPayload);
      } else {
        res = await roleStore.updateRole(basePayload as RoleRequestPayload);
      }

      if (res.status.code === 0) {
        messageBoxUtil.success(res.status.message || successMessage);
        emit("refreshData", true);
        closeDialog();
      } else {
        messageBoxUtil.error(res.status.message || errorMessage);
      }
    } catch (err) {
      messageBoxUtil.error((err as Error).message || "Something went wrong");
    } finally {
      isLoading.value = false;
    }
  });
};

const closeDialog = () => {
  emit("update:dialog", false);
  form.value = {
    isSuperAdmin: false,
    name: "",
    title: "",
  };
  formRef.value?.clearValidate(["name", "title"]);
};
</script>
