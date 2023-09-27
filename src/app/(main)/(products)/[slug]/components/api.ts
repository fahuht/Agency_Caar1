import { AxiosResponse } from 'axios';

import { PagingListResponse } from '@/types/global';
import baseApiFe from "@/utils/baseApiFe";

import {
    AddProductRequest,
    AddProductResponse,
    CheckProductInCollectionRequest,
    CheckProductInCollectionResponse,
    CreateCollectionRequest,
    CreateCollectionResponse,
    GetCollectionRequest,
    GetCollectionResponse,
    GetListStatusRequest,
    GetListStatusResponse,
    GetMoreProductRequest,
    ItemCollection,
    Product,
    RemoveProductRequest,
    RemoveProductResponse,
    UpdateStatusRequest,
    UpdateStatusResponse
} from "../type";


// get list bộ sưu tập
export const getCollection = (data: GetCollectionRequest): Promise<GetCollectionResponse<ItemCollection<Product>>> => {
    const url = 'api/collection';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// tạo mới bộ sưu tập
export const createCollection = (data: CreateCollectionRequest): Promise<CreateCollectionResponse> => {
    const url = 'api/collection/create';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// kiểm tra sản phẩm trong bộ sưu tập
export const checkProductInCollection = (data: CheckProductInCollectionRequest): Promise<CheckProductInCollectionResponse> => {
    const url = 'api/collection/product-in-collection';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// thêm sản phẩm vào bộ sưu tập
export const addProductInCollection = (data: AddProductRequest): Promise<AddProductResponse> => {
    const url = 'api/collection/add';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// xoá sản phẩm khỏi bộ sưu tập
export const removeProductInCollection = (data: RemoveProductRequest): Promise<RemoveProductResponse> => {
    const url = 'api/collection/remove';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// get list trạng thái bộ sưu tập
export const getListStatus = (data: GetListStatusRequest): Promise<GetListStatusResponse> => {
    const url = 'api/collection/find-by-types';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// cập nhật trạng thái bộ sưu tập
export const updateStatus = (data: UpdateStatusRequest): Promise<UpdateStatusResponse> => {
    const url = 'api/collection/update';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// get thêm tin liên quan
export const getMoreProduct = (data: GetMoreProductRequest): Promise<PagingListResponse<Product>> => {
    const url = 'api/products';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}