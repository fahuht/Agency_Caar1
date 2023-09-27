import { AxiosResponse } from "axios";

import { UserInfo } from "@/types/global";
import baseApiFe from "@/utils/baseApiFe";

import { DataDelete, RequestBody, RequestData, ResponseData } from "./type";

export const logout = (): Promise<ResponseData> => {
    const url = "api/logout";
    return new Promise((resolve, reject) => {
        baseApiFe
            .get(url)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err));
    });
};
export const updateInfo = (data: RequestData): Promise<ResponseData> => {
    const url = "api/user/update";
    return new Promise((resolve, reject) => {
        baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err));
    });
};

export const apiGetInfoUser = (url: string): Promise<UserInfo> => {
    return new Promise((resolve, reject) => {
        baseApiFe
            .get(url)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err));
    });
};

export const updatePassword = (data: RequestBody): Promise<ResponseData> => {
    const url = "api/user/update-password";
    return new Promise((resolve, reject) => {
        baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err));
    });
};

export const deleteAccount = (data: DataDelete): Promise<ResponseData> => {
    const url = "api/user/delete-account";
    return new Promise((resolve, reject) => {
        baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err));
    });
};
