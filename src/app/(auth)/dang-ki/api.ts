import baseApi from "@/utils/baseApi";

import { DataActiveCode, DataRequest, DataUpdate, ResponseData } from "./type";

// POST
// Đăng kí tài khoản
export const registerData = (
    url: string,
    data: DataRequest
): Promise<ResponseData> => {
    return new Promise((resolve, reject) => {
        baseApi
            .post(url, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

//Cập nhật thông tin người dùng
export const updateInfo = (
    url: string,
    data: DataUpdate
): Promise<ResponseData> => {
    return new Promise((resolve, reject) => {
        baseApi
            .post(url, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

//Kích hoạt tài khoản
export const activeAccount = (
    url: string,
    data: DataActiveCode
): Promise<ResponseData> => {
    return new Promise((resolve, reject) => {
        baseApi
            .post(url, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

//Resend Email
export const resendEmail = (url: string): Promise<ResponseData> => {
    return new Promise((resolve, reject) => {
        baseApi
            .post(url)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
