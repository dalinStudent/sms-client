<template>
  <nav class="sidebar">
    <div class="top-menu">
      <div class="logo-container">
        <el-image class="logo" :src="Logo"></el-image>
      </div>
      <div class="section-menu">
        <div class="section-menu-item">
          <div class="svg-icon">
            <DashboardIcon />
          </div>
          <p>DASHBOARD</p>
        </div>

        <div class="section-menu-item">
          <div class="svg-icon">
            <ContactIcon />
          </div>
          <p>Contacts</p>
        </div>

        <div class="section-menu-item">
          <div class="svg-icon">
            <MessageIcon />
          </div>
          <p>Messages</p>
        </div>

        <div class="section-menu-item">
          <div class="svg-icon">
            <SettingIcon />
          </div>
          <p>Settings</p>
        </div>

        <div class="section-menu-item">
          <div class="svg-icon">
            <ConfigIcon />
          </div>
          <p>Configs</p>
        </div>
      </div>
      <div class="footer-menu">
        <el-popover
          v-if="authStore.profileData"
          placement="right"
          trigger="hover"
        >
          <h4>
            {{ authStore.profileData.firstName }}
            {{ authStore.profileData.lastName }}
          </h4>

          <p style="font-size: 12px">
            {{ formatEnumToText(authStore.profileData.role as string) }}
          </p>

          <div style="background: #e4e7ed; height: 1px; margin: 10px 0"></div>

          <RouterLink :to="{ name: 'change-password' }">
            <el-button type="primary" size="small" style="margin-bottom: 5px"
              >Change Password</el-button
            >
          </RouterLink>
          <template #reference>
            <el-image
              class="footer-profile"
              :src="authStore.profileData.imageUrl ?? DefaultImage"
            />
          </template>
        </el-popover>
        <div style="width: 24px; height: 1px; background-color: #c0c7cd"></div>
        <el-tooltip effect="light" content="Logout" placement="right">
          <div class="footer-logout" @click="onLogout()">
            <div class="svg-icon">
              <LogoutIcon />
            </div>

            <p>LOGOUT</p>
          </div>
        </el-tooltip>
      </div>
    </div>
  </nav>
  <nav class="side-submenu">
    <div class="submenu-title">
      <p>MD Back Office</p>
      <h5>Auto Message Portal</h5>
    </div>

    <div class="submenu-subtitle">
      <h3>Settings</h3>
    </div>
    <div class="top-side-submenu">
      <p style="padding-top: 16px">Back Office Settings</p>
      <router-link
        to="/settings/roles-permission"
        custom
        v-slot="{ href, navigate, isExactActive }"
      >
        <li>
          <a
            :href="href"
            :class="[
              'side-submenu-item',
              {
                active: isExactActive,
              },
            ]"
            @click="navigate"
          >
            <RolePermission />

            <span class="side-submenu-item-text">Roles & Permission</span>
          </a>
        </li>
      </router-link>

      <router-link
        to="/settings/backoffice-user"
        custom
        v-slot="{ href, navigate, isExactActive }"
      >
        <li>
          <a
            :href="href"
            :class="[
              'side-submenu-item',
              {
                active: isExactActive,
              },
            ]"
            @click="navigate"
          >
            <UserIcon />

            <span class="side-submenu-item-text">Backoffice Users</span>
          </a>
        </li>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import Logo from "@/assets/images/auto-message.png";
import SettingIcon from "./menu-icon/SettingIcon.vue";
import ConfigIcon from "./menu-icon/ConfigIcon.vue";
import ContactIcon from "./menu-icon/ContactIcon.vue";
import DashboardIcon from "./menu-icon/DashboardIcon.vue";
import MessageIcon from "./menu-icon/MessageIcon.vue";
import DefaultImage from "@/assets/images/user.png";
import { useAuthStore } from "@/stores";
import { formatEnumToText } from "@/utils/formatter.util";
import { ElMessageBox } from "element-plus";
import LogoutIcon from "./menu-icon/LogoutIcon.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import RolePermission from "./menu-icon/RolePermission.vue";
import UserIcon from "./menu-icon/UserIcon.vue";

const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  if (authStore.authData) {
    authStore.fetchProfile();
  }
});

watch(
  () => authStore.profileData,
  (v) => console.log("PROFILE UPDATED →", v),
  { immediate: true }
);

const onLogout = () => {
  ElMessageBox.confirm(
    "Are you sure you want to logout?",
    "Attention Required",
    {
      confirmButtonText: "Log me out",
      cancelButtonText: "Cancel",
      type: "error",
    }
  )
    .then(async () => {
      const authStore = useAuthStore();
      return authStore.logout();
    })
    .catch(() => {});
};
</script>
