import { defineStore } from "pinia";
import type { PaginatedResponse } from "@/common/types/paginated-response.type";
import type { Response } from "@/common/types/response.type";
import type {
  Role,
  RoleRequestPayload,
} from "@/common/interface/role-permission.interface";
import {
  getCreateRole,
  getDetailRole,
  getRolePermissionList,
} from "@/services/role-permission.service";
import type { PaginatedRequestPayload } from "@/common/interface/pagination-payload.interface";

interface RoleState {
  data: Role[];
  loading: boolean;
  totalPages: number;
  totalElements: number;
}

export const useRoleStore = defineStore("role", {
  state: (): RoleState => ({
    data: [],
    loading: false,
    totalPages: 0,
    totalElements: 0,
  }),
  actions: {
    async getList(
      payload: PaginatedRequestPayload
    ): Promise<Response<PaginatedResponse<Role>> | null> {
      this.loading = true;
      try {
        const result = await getRolePermissionList(payload);
        const data = result?.data as PaginatedResponse<Role>;
        this.data = data?.content;
        this.totalPages = data?.totalPages;
        this.totalElements = data?.totalElements;
        return result;
      } catch (error) {
        return null;
      } finally {
        this.loading = false;
      }
    },
    async detailRole(name: string): Promise<Response<Role>> {
      return getDetailRole(name);
    },
    async createRole(body: RoleRequestPayload): Promise<Response<null>> {
      return getCreateRole(body);
    },
    async updateRole(body: RoleRequestPayload): Promise<Response<null>> {
      return getCreateRole(body);
    },
  },
});
