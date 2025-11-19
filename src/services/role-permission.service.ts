import type { PaginatedRequestPayload } from "@/common/interface/pagination-payload.interface";
import type {
  Role,
  RoleRequestPayload,
} from "@/common/interface/role-permission.interface";
import type { PaginatedResponse } from "@/common/types/paginated-response.type";
import type { Response } from "@/common/types/response.type";
import axios from "@/utils/axios";

export const getRolePermissionList = async (
  payload: PaginatedRequestPayload
): Promise<Response<PaginatedResponse<Role>>> => {
  try {
    const response = await axios.post(`/roles/get-all`, { ...payload }, {});
    return response?.data as Response<PaginatedResponse<Role>>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getDetailRole = async (
  name: string
): Promise<Response<Role>> => {
  try {
    const response = await axios.post(`/roles/detail-role`, name, {});
    return response.data as Response<Role>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getCreateRole = async (
  payload: RoleRequestPayload
): Promise<Response<null>> => {
  try {
    const response = await axios.post(`/roles/create-role`, payload, {});
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getUpdateRole = async (
  payload: RoleRequestPayload
): Promise<Response<null>> => {
  try {
    const response = await axios.post(`/roles/update-role`, payload, {});
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};
