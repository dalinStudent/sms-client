<template>
  <div class="list-header">
    <PageTitle :items="breadcrumbs" title="Create New User" />
  </div>
  <div class="form-section">
    <div class="form-header">
      <h3>User Information</h3>
    </div>
    <div class="form-content">
      <el-form>
        <el-row ::gutter="20">
          <el-col :span="12">
            <el-form-item label="First Name">
              <el-input size="large" placeholder="Input First Name"> </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Last Name">
              <el-input size="large" placeholder="Input Last Name"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row ::gutter="20">
          <el-col :span="12">
            <el-form-item label="Email">
              <el-input size="large" placeholder="Input Email"> </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Phone Number">
              <el-input size="large" placeholder="Input Phone Number"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Breadcrumb } from "@/common/interface/breadcrumb.interface";
import PageTitle from "@/components/PageTitle.vue";
import { ref } from "vue";
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
</script>
