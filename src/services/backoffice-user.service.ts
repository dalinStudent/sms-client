import type { PaginatedRequestPayload } from "@/common/interface/pagination-payload.interface";
import type {
  User,
  UserBlockStatusPayload,
  UserRequestPayload,
} from "@/common/interface/user.interface";
import type { PaginatedResponse } from "@/common/types/paginated-response.type";
import type { Response } from "@/common/types/response.type";
import axios from "@/utils/axios";

export const getUserList = async (
  body: PaginatedRequestPayload
): Promise<Response<PaginatedResponse<User>>> => {
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
    const response = await axios.post(`/users/create-user`, payload, {});
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getUpdateUser = async (
  payload: UserRequestPayload
): Promise<Response<null>> => {
  try {
    const response = await axios.post(`/users/update-user`, payload, {});
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getDetailUser = async (id: number): Promise<Response<User>> => {
  try {
    const response = await axios.post(`/users/get-user`, { id });
    return response.data as Response<User>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getDeleteUser = async (id: number): Promise<Response<null>> => {
  try {
    const response = await axios.post(`/users/delete-user`, { id });
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getBlockUser = async (body: UserBlockStatusPayload): Promise<Response<null>> => {
  try {
    const response = await axios.post(`/users/block-user`, { body });
    return response.data as Response<null>;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};