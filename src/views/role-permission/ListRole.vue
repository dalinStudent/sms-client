<template>
  <div class="list-header">
    <div class="texts">
      <PageTitle :items="breadcrumbs" title="Roles & Permission" />
    </div>

    <div class="buttons">
      <el-button
        size="large"
        type="primary"
        :icon="Plus"
        @click="onCreate"
        >Add New</el-button
      >
    </div>
  </div>

  <div class="list-filter">
    <div class="row one-third">
      <el-input
        v-model="inputSearch"
        @change="onSearch"
        placeholder="Search by name, title..."
        clearable
        size="large"
      >
        <template #append>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>
  </div>

  <div class="list-table">
    <el-table
      header-cell-class-name="table-header"
      stripe
      v-loading="roleStore.loading"
      :data="roleStore.data"
    >
      <el-table-column
        type="index"
        :index="indexNoColumn"
        label="No"
        align="center"
        fixed="left"
      />
      <el-table-column
        prop="title"
        label="Role Name"
        min-width="230"
        fixed="left"
      />
      <el-table-column
        fixed="right"
        label="Operations"
        align="center"
        width="100"
      >
        <template #default="scope">
          <el-dropdown size="small" trigger="click" class="drop-down">
            <el-button class="el-dropdown-link">
              <el-icon style="transform: rotate(90deg)">
                <MoreFilled />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item link type="primary" @click="onEdit(scope.row)">
                  <el-icon>
                    <EditPen />
                  </el-icon>
                  <p class="ml-5">Edit</p>
                </el-dropdown-item>
                <el-dropdown-item link type="primary"  @click="onDialogMessageOpen('Delete', scope.row)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                  <p class="ml-5">Delete</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="No Data"> </el-empty>
      </template>
    </el-table>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="roleStore.totalElements"
      :page-sizes="[20, 50, 100, 200]"
      :default-page-size="20"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>

  <CreateDialog
    v-model:dialogVisible="dialogFormVisible"
    :formType="formType"
    :userName="name"
    @refresh-data="onLoad"
    @update:dialog="closeFormDialog"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import {
  Search,
  MoreFilled,
  Plus,
  EditPen,
  Delete,
} from "@element-plus/icons-vue";
import type { Breadcrumb } from "@/common/interface/breadcrumb.interface";
import PageTitle from "@/components/PageTitle.vue";
import { useRoleStore } from "@/stores";
import messageBoxUtil from "@/utils/message-box.util";
import { onMounted, ref } from "vue";
import type { PaginatedRequestPayload } from "@/common/interface/pagination-payload.interface";
import { FormType } from "@/common/enums/form-type.enum";
import CreateDialog from "./CreateDialog.vue";
import type { Role } from "@/common/interface/role-permission.interface";

const roleStore = useRoleStore();

const inputSearch = ref<string>("");
const loading = ref<boolean>(false);
const dialogMessageVisible = ref<boolean>(false);
const onDialogMessageClosed = ref<boolean>(false);
const actionSubmit = ref<string>("");
const pageSize = ref<number>(20);
const currentPage = ref<number>(1);
const data = ref<Role>();
const name = ref<string>("");
const isEmpty = ref<boolean>(false);
const dialogFormVisible = ref<boolean>(false);
const formType = ref<FormType>(FormType.Create);
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

onMounted(() => onLoad());

const onLoad = async () => {
  const payload: PaginatedRequestPayload = {
    page: currentPage.value,
    size: pageSize.value,
  };
  await roleStore
    .getList(payload)
    .then(() => {
      isEmpty.value = roleStore.data.length === 0;
    })
    .catch((error) => {
      if (error.response && error.response.status !== 401)
        messageBoxUtil.error(error.toString());
    });
};

const onCreate = () => {
  dialogFormVisible.value = true;
  formType.value = FormType.Create;
};

const onEdit = (rowData: any) => {
    dialogFormVisible.value = true
    name.value = rowData.name
    formType.value = FormType.Edit
}

const closeFormDialog = () => (dialogFormVisible.value = false);
const onDialogMessageOpen = (action: any, rowData: Role) => {
    data.value = rowData
    dialogMessageVisible.value = true
    actionSubmit.value = action
}
const onSearch = () => onLoad();
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  onLoad();
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  onLoad();
};

const indexNoColumn = (index: number) => {
  return (
    pageSize.value * (currentPage.value ? currentPage.value - 1 : 0) + index + 1
  );
};
</script>
