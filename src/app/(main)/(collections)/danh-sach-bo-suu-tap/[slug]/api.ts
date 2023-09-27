import { AxiosResponse } from 'axios';

import { RemoveProductRequest, State } from '@/app/(main)/(products)/mua-ban-oto/type';
import { ErrorResponse, Product } from '@/types/global';
import baseApiFe from "@/utils/baseApiFe";

import { CollectionItem, DeleteCollectionRequest, DetailCollectionResponse, GetListStatusRequest, GetListStatusResponse, UpdateCollectionRequest } from './type';

// get chi tiết bộ sưu tập
export const getDetailCollection = (data: State): Promise<DetailCollectionResponse<CollectionItem<Product>>> => {
    const url = 'api/collection/detail-collection';
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

// cập nhật bộ sưu tập
export const updateCollection = (data: UpdateCollectionRequest): Promise<ErrorResponse> => {
    const url = 'api/collection/update-name';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// xoá bộ sưu tập
export const deleteCollection = (data: DeleteCollectionRequest): Promise<ErrorResponse> => {
    const url = 'api/collection/delete';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

// xoá sản phẩm khỏi bộ sưu tập
export const removeProductInCollection = (data: RemoveProductRequest): Promise<ErrorResponse> => {
    const url = 'api/collection/remove';
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}