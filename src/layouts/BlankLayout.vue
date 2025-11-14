<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { disableDevTools } from '@/configs'

export default defineComponent({
    setup() {
        if (disableDevTools == 'true') {
            document.addEventListener('contextmenu', event => event.preventDefault());
            document.addEventListener('keydown', (event) => {
                if (event.code === 'F12' ||
                    (event.ctrlKey && event.code === 'KeyU') ||
                    (event.ctrlKey && event.shiftKey && event.code === 'KeyI') ||
                    (event.ctrlKey && event.shiftKey && event.code === 'KeyJ') ||
                    (event.metaKey && event.altKey && event.code === 'KeyI') ||
                    (event.metaKey && event.altKey && event.code === 'KeyJ') ||
                    (event.metaKey && event.altKey && event.code === 'KeyU')) {
                    event.preventDefault();
                }
            });
        }
    },
})
</script>