import { defineStore } from "pinia";
import type {
  User,
  UserBlockStatusPayload,
  UserRequestPayload,
} from "@/common/interface/user.interface";
import type { PaginatedResponse } from "@/common/types/paginated-response.type";
import type { Response } from "@/common/types/response.type";
import {
  getBlockUser,
  getCreateUser,
  getDeleteUser,
  getDetailUser,
  getUpdateUser,
  getUserList,
} from "@/services/backoffice-user.service";
import type { PaginatedRequestPayload } from "@/common/interface/pagination-payload.interface";
import { resendEmail } from "@/services/activate.service";
interface UserState {
  data: User[];
  loading: boolean;
  totalPages: number;
  totalElements: number;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    data: [],
    loading: false,
    totalPages: 0,
    totalElements: 0,
  }),
  actions: {
    async getList(
      payload: PaginatedRequestPayload
    ): Promise<Response<PaginatedResponse<User>> | null> {
      this.loading = true;
      const result = await getUserList(payload).finally(
        () => (this.loading = false)
      );
      const data = result?.data as PaginatedResponse<User>;
      this.data = data?.content;
      this.totalPages = data?.totalPages;
      this.totalElements = data?.totalElements;
      return result;
    },
    async detailUser(id: number): Promise<Response<User>> {
      return getDetailUser(id);
    },
    async createUser(body: UserRequestPayload): Promise<Response<null>> {
      return getCreateUser(body);
    },
    async updateUser(body: UserRequestPayload): Promise<Response<null>> {
      return getUpdateUser(body);
    },
    async resend(id: number): Promise<Response<null>> {
      return resendEmail(id);
    },
    async deleteUser(id: number): Promise<Response<null>> {
      return getDeleteUser(id);
    },
    async blockUser(body: UserBlockStatusPayload): Promise<Response<null>> {
      return getBlockUser(body);
    },
  },
});
