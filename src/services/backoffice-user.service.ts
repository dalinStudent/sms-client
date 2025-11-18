import type {
  User,
  UserRequestPayload,
} from "@/common/interface/user.interface";
import type { PaginatedResponse } from "@/common/types/paginated-response.type";
import type { Response } from "@/common/types/response.type";
import axios from "@/utils/axios";

export const getUserList = async (
  page: number,
  size: number,
  fromDate: number | string,
  toDate: number | string,
  searchBy?: string
): Promise<Response<PaginatedResponse<User>>> => {
  const body = {
    page,
    size,
    fromDate,
    toDate,
    searchBy,
  };
  try {
    const response = await axios.post(`/users/get-all`, body, {});
    return response?.data as Response<PaginatedResponse<User>>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getCreateUser = async (
  payload: UserRequestPayload
): Promise<Response<null>> => {
  try {
    const response = await axios.post(`/users/create`, payload, {});
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};
