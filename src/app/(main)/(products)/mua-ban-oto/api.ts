import { AxiosResponse } from 'axios';

import baseApiFe from "@/utils/baseApiFe";

import {
    AddProductRequest,
    AddProductResponse,
    CheckProductInCollectionRequest,
    CheckProductInCollectionResponse,
    CheckSavedResponse,
    CreateCollectionRequest,
    CreateCollectionResponse,
    GetCollectionRequest,
    GetCollectionResponse,
    ItemCollection,
    Product,
    RemoveProductRequest,
    RemoveProductResponse,
} from "./type";

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

// check lưu bộ sưu tập
export const checkCollectionSaved = (data: CheckProductInCollectionRequest): Promise<CheckSavedResponse> => {
    const url = `api/collection/saved`;
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}
