import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { ApiListResponse, CommonList } from '@/types/global';
import baseApi from "@/utils/baseApi";
import baseApiFe from '@/utils/baseApiFe';

interface QueryParams {
    type: string;
    onSuccessCallback?: (data: ApiListResponse<CommonList>) => void;
    onErrorCallback?: (error: Error) => void;
}

export const getList = (url: string, type?: string): Promise<ApiListResponse<CommonList>> => {
    if (type === 'BOOKMARKS') {
        return new Promise((resolve, reject) =>
            {baseApiFe
                .get(url)
                .then((res: AxiosResponse) => resolve(res?.data))
                .catch((err: Error) => reject(err))},
        );
    }
    return new Promise((resolve, reject) =>
        {baseApi
            .get(url)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

export const useGetCommon = ({ type, onSuccessCallback, onErrorCallback }: QueryParams) => {
    const configRequest = {
        retry: 1,
        cacheTime: 5 * 24 * 60 * 60 * 1000, // 5 ngày
        staleTime: 5 * 24 * 60 * 60 * 1000 // 5 ngày
    }
    let url = '';
    if (type === 'PROVINCE') {
        url = 'share-service/api/v1/locate/find-province';
    }
    else if (type === 'DISTRICT') {
        url = 'share-service/api/v1/locate/find-district';
    }
    else if (type === 'SUBDISTRICT') {
        url = 'share-service/api/v1/locate/find-sub-district';
    }
    else if (type === 'CAR_MAKE') {
        url = 'product-service/api/v1/car/find-by-type/PRODUCT_CAR_MAKE';
    } else if (type === 'CAR_MODEL') {
        url = 'product-service/api/v1/car/find-by-type/PRODUCT_CAR_MODEL';
    }
    else if (type === 'CAR_COLORS') {
        url = 'share-service/api/v1/categories/type/PRODUCT_CAR_COLOR'
    }
    else if (type === 'BOOKMARKS') {
        url = 'api/bookmark'
    }
    const QUERY_KEY = [url, type]
    const data = useQuery<ApiListResponse<CommonList>, Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getList(url, type),
        onSuccess(res: ApiListResponse<CommonList>) {
            if (onSuccessCallback) {
                onSuccessCallback(res);
            }
        },
        onError(error: Error) {
            if (onErrorCallback) {
                onErrorCallback(error);
            }
        },
        ...configRequest
    });
    return data;
}; 