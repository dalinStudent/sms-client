<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.path ? { path: item.path } : null"
                >{{ item.name }}</el-breadcrumb-item
            >
        </el-breadcrumb>
        <p style="font-size: 20px; font-weight: 900; padding-top: 8px; line-height: 28px">
            {{ title }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '@/common/interface/breadcrumb.interface';

const props = defineProps({
    items: {
        type: Array<Breadcrumb>,
        required: true
    },
    title: {
        type: String
    }
})
</script>

<style scoped></style>
