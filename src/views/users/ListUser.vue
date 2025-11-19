<template>
  <div class="list-header">
    <div class="texts">
      <PageTitle :items="breadcrumbs" title="Backoffice Users" />
    </div>

    <div class="buttons">
      <RouterLink :to="{ path: '/settings/backoffice-user/create' }">
        <el-button
          type="primary"
          :icon="Plus"
          size="large"
          :disabled="userStore.loading"
          >Add New</el-button
        >
      </RouterLink>
    </div>
  </div>

  <div class="list-filter">
    <div class="row one-third">
      <el-input
        v-model="inputSearch"
        @change="onSearch"
        placeholder="Search by name, email..."
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
      v-loading="userStore.loading"
      :data="userStore.data"
      @row-dblclick="onDetail"
    >
      <el-table-column
        type="index"
        :index="indexNoColumn"
        label="No"
        align="center"
        fixed="left"
      />
      <el-table-column label="Image" width="70" align="center" fixed="left">
        <template #default="{ row }">
          <Image :iconUrl="row.imageUrl ? row.imageUrl : ''" />
        </template>
      </el-table-column>
      <el-table-column label="Name" min-width="230" fixed="left">
        <template #default="{ row }">
          <div style="font-size: 14px; font-weight: 500">
            {{ row.firstName + " " + row.lastName }}
          </div>
          <div style="font-size: 12px">
            {{ row.email }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Role" min-width="200">
        <template #default="{ row }">
          {{ row.role.toUpperCase() }}
        </template>
      </el-table-column>

      <el-table-column prop="phoneNumber" label="Phone" width="160" />
      <el-table-column prop="staffId" label="Staff ID" width="160" />
      <el-table-column label="User Status" width="230">
        <template #default="{ row }">
          <el-tag
            :type="row.activated === true ? 'success' : 'info'"
            round
            size="small"
            effect="dark"
            >{{ row.activated === true ? "Active" : "Inactive" }}</el-tag
          >
          <div style="font-size: 12px">
            Last Login:
            {{ row.lastLoginDate ? dateFormatter(row.lastLoginDate) : "N/A" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdBy" label="Created By" width="200" />
      <el-table-column label="Created Date" width="200">
        <template #default="{ row }">
          {{ row.createdAt ? dateFormatter(row.createdAt) : "N/A" }}
        </template>
      </el-table-column>
      <el-table-column prop="lastModifiedBy" label="Modified By" width="200" />
      <el-table-column label="Last Modified Date" width="200">
        <template #default="{ row }">
          {{
            row.lastModifiedDate ? dateFormatter(row.lastModifiedDate) : "N/A"
          }}
        </template>
      </el-table-column>
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
                <el-dropdown-item
                  link
                  type="primary"
                  @click="onResend(scope.row)"
                >
                  <el-icon>
                    <Position />
                  </el-icon>
                  <p class="ml-5">Resend</p>
                </el-dropdown-item>
                <el-dropdown-item
                  link
                  type="primary"
                  @click="onEdit(scope.row)"
                >
                  <el-icon>
                    <EditPen />
                  </el-icon>
                  <p class="ml-5">Edit</p>
                </el-dropdown-item>
                <el-dropdown-item
                  link
                  type="primary"
                  @click="onDialogMessageOpen('Delete', scope.row)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                  <p class="ml-5">Delete</p>
                </el-dropdown-item>
                <el-dropdown-item
                  link
                  type="primary"
                  @click="
                    onDialogMessageOpen(
                      scope.row.activated === true ? 'Deactivate' : 'Activate',
                      scope.row
                    )
                  "
                >
                  <el-icon>
                    <Lock />
                  </el-icon>
                  <p class="ml-5">
                    {{
                      scope.row.activated === true ? "Deactivate" : "Activate"
                    }}
                  </p>
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
      :total="userStore.totalElements"
      :page-sizes="[20, 50, 100, 200]"
      :default-page-size="20"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>

  <MessageBox
    v-model="dialogMessageVisible"
    :title="'Confirmation'"
    :subtitle="`${`Are you sure you want to ${actionSubmit.toLowerCase()} this user?`}`"
    :selected-data="data"
    :approve-btn="`${actionSubmit}`"
    @update:dialog-visible="onDialogMessageClosed"
    @approve="handleAction(actionSubmit, data!)"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import type { Breadcrumb } from "@/common/interface/breadcrumb.interface";
import type {
  User,
  UserBlockStatusPayload,
} from "@/common/interface/user.interface";
import PageTitle from "@/components/PageTitle.vue";
import { useUserStore } from "@/stores";
import { dateFormatter, formatDate } from "@/utils/formatter.util";
import messageBoxUtil from "@/utils/message-box.util";
import { onMounted, ref } from "vue";
import {
  Plus,
  MoreFilled,
  Position,
  EditPen,
  Delete,
} from "@element-plus/icons-vue";
import type { PaginatedRequestPayload } from "@/common/interface/pagination-payload.interface";
import router from "@/routes";
import { messages } from "@/common/data/message.data";
import MessageBox from "@/components/MessageBox.vue";

const userStore = useUserStore();

const inputSearch = ref<string>("");
const loading = ref<boolean>(false);
const dialogMessageVisible = ref<boolean>(false);
const actionSubmit = ref<string>("");
const pageSize = ref<number>(20);
const currentPage = ref<number>(1);
const data = ref<User>();
const isEmpty = ref<boolean>(false);
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
    searchBy: inputSearch.value,
  };
  await userStore
    .getList(payload)
    .then(() => {
      isEmpty.value = userStore.data.length === 0;
    })
    .catch((error) => {
      if (error.response && error.response.status !== 401)
        messageBoxUtil.error(error.toString());
    });
};
const onSearch = () => onLoad();
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  onLoad();
};
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  onLoad();
};
const onEdit = (row: User) => {
  router.push("/settings/backoffice-user/" + row.id + "/edit");
};
const onDetail = (row: User) => {
  router.push("/settings/backoffice-user/" + row.id + "/view");
};

const onResend = async (rowData: User) => {
  await userStore
    .resend(rowData.id)
    .then((res) => {
      if (res.status.code === 0) {
        messageBoxUtil.success(
          res.status.message || messages.success.resent("Email")
        );
        onLoad();
      } else {
        messageBoxUtil.error(
          res.status.message || messages.error.resend("Email")
        );
      }
    })
    .catch((error) => {
      messageBoxUtil.error(error.toString());
    });
};

const onDelete = (rowData: User) => {
  if (rowData) {
    loading.value = true;
    userStore
      .deleteUser(rowData.id)
      .then((res) => {
        if (res.status.code === 0) {
          messageBoxUtil.success(
            res.status.message || messages.success.deleted("User")
          );
          onLoad();
        } else {
          messageBoxUtil.error(
            res.status.message || messages.error.delete("User")
          );
        }
      })
      .catch((error) => {
        if (error.response && error.response.status !== 401)
          messageBoxUtil.error(error.toString());
      })
      .finally(() => {
        onDialogMessageClosed();
      });
  }
};

const onBlock = (rowData: User) => {
  if (rowData) {
    const dto: UserBlockStatusPayload = {
      block: rowData.isActive ? true : false,
      id: rowData.id,
    };
    loading.value = true;
    userStore
      .blockUser(dto)
      .then((res) => {
        if (res.status.code === 0) {
          messageBoxUtil.success(
            res.status.message || messages.success.deleted("User")
          );
          onLoad();
        } else {
          messageBoxUtil.error(
            res.status.message || messages.error.delete("User")
          );
        }
      })
      .catch((error) => {
        if (error.response && error.response.status !== 401)
          messageBoxUtil.error(error.toString());
      })
      .finally(() => {
        onDialogMessageClosed();
      });
  }
};

const onDialogMessageOpen = (action: any, rowData: User) => {
  data.value = rowData;
  dialogMessageVisible.value = true;
  actionSubmit.value = action;
};

const onDialogMessageClosed = () => {
  dialogMessageVisible.value = false;
  loading.value = false;
};

const handleAction = (action: any, rowData: User) => {
  data.value = rowData;
  actionSubmit.value = action;
  if (action === "Delete") {
    onDelete(rowData);
  } else if (action === "Activate" || action === "Deactivate") {
    onBlock(rowData);
  }
};

const indexNoColumn = (index: number) => {
  return (
    pageSize.value * (currentPage.value ? currentPage.value - 1 : 0) + index + 1
  );
};
</script>
