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
                <el-popover v-if="authStore.profileData" placement="right" trigger="hover">
                    <h4>
                        {{ authStore.profileData.firstName }}
                        {{ authStore.profileData.lastName }}
                    </h4>

                    <p style="font-size: 12px">
                        {{ formatEnumToText(authStore.profileData.role as string) }}
                    </p>

                    <div style="background: #e4e7ed; height: 1px; margin: 10px 0"></div>

                    <RouterLink :to="{ name: 'change-password' }">
                        <el-button type="primary" size="small" style="margin-bottom: 5px">Change Password</el-button>
                    </RouterLink>
                    <template #reference>
                        <el-image class="footer-profile" :src="authStore.profileData.imageUrl ?? DefaultImage" />
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
</template>

<script lang="ts" setup>
import Logo from '@/assets/images/auto-message.png'
import SettingIcon from './menu-icon/SettingIcon.vue';
import ConfigIcon from './menu-icon/ConfigIcon.vue';
import ContactIcon from './menu-icon/ContactIcon.vue';
import DashboardIcon from './menu-icon/DashboardIcon.vue';
import MessageIcon from './menu-icon/MessageIcon.vue';
import DefaultImage from '@/assets/images/user.png'
import { useAuthStore } from '@/stores';
import { formatEnumToText } from '@/utils/formatter.util'
import { ElMessageBox } from 'element-plus';
import LogoutIcon from './menu-icon/LogoutIcon.vue';
import { onMounted, watch } from 'vue';

const authStore = useAuthStore()

onMounted(() => {
    if(authStore.authData) {
        authStore.fetchProfile();
    }
})

watch(
  () => authStore.profileData,
  (v) => console.log("PROFILE UPDATED →", v),
  { immediate: true }
);

const onLogout = () => {
    ElMessageBox.confirm('Are you sure you want to logout?', 'Attention Required', {
        confirmButtonText: 'Log me out',
        cancelButtonText: 'Cancel',
        type: 'error',
    })
        .then(async () => {
            const authStore = useAuthStore()
            return authStore.logout()
        })
        .catch(() => { })
}

</script>