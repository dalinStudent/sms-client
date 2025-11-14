<template>
    <div class="menu-header-content-footer">
        <SideMenu />
        <div class="header-content-footer">
            <div class="content-footer">
                <div class="content">
                    <slot />
                </div>
                <!-- <Footer></Footer> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SideMenu from '@/components/SideMenu.vue'
import { useAuthStore } from '@/stores'
import { disableDevTools } from '@/configs'

const authStore = useAuthStore()
const idleTimeout = ref<any>(null)
const idleTime = ref<number>(15 * 60 * 1000) // 15 minutes
onBeforeUnmount(() => {
    window.removeEventListener('mousemove', resetIdleTimeout)
    window.removeEventListener('keypress', resetIdleTimeout)
    window.removeEventListener('scroll', resetIdleTimeout)
})

watch(
    () => authStore.authData,
    () => {
        resetIdleTimeout()
    }
)

onMounted(() => {
    setupIdleTimeout()
    setupEventListeners()
})

const setupIdleTimeout = () => {
    idleTimeout.value = setTimeout(() => {
        logout()
    }, idleTime.value)
}
const resetIdleTimeout = () => {
    clearTimeout(idleTimeout.value)
    setupIdleTimeout()
}
const logout = () => {
    const authStore = useAuthStore()
    authStore.logout()
}
const setupEventListeners = () => {
    window.addEventListener('mousemove', resetIdleTimeout)
    window.addEventListener('keypress', resetIdleTimeout)
    window.addEventListener('scroll', resetIdleTimeout)
}

if (disableDevTools === 'true') {
    document.addEventListener('contextmenu', (event) => event.preventDefault())
    document.addEventListener('keydown', (event) => {
        if (
            event.code === 'F12' ||
            (event.ctrlKey && event.code === 'KeyU') ||
            (event.ctrlKey && event.shiftKey && event.code === 'KeyI') ||
            (event.ctrlKey && event.shiftKey && event.code === 'KeyJ') ||
            (event.metaKey && event.altKey && event.code === 'KeyI') ||
            (event.metaKey && event.altKey && event.code === 'KeyJ') ||
            (event.metaKey && event.altKey && event.code === 'KeyU')
        ) {
            event.preventDefault()
        }
    })
}
</script>
