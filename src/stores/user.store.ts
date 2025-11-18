import { defineStore } from "pinia";
import type { User, UserRequestPayload } from "@/common/interface/user.interface";
import type { PaginatedResponse } from "@/common/types/paginated-response.type";
import type { Response } from "@/common/types/response.type";
import { getCreateUser, getUserList } from "@/services/backoffice-user.service";

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
      currentPage: number,
      pageSize: number,
      fromDate: number | string,
      toDate: number | string,
      searchBy?: string
    ): Promise<Response<PaginatedResponse<User>> | null> {
      this.loading = true;
      try {
        const result = await getUserList(
          currentPage,
          pageSize,
          fromDate,
          toDate,
          searchBy
        );
        const data = result?.data as PaginatedResponse<User>;
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
    async createUser(body: UserRequestPayload): Promise<Response<null>> {
      return getCreateUser(body)
    }
  },
});
