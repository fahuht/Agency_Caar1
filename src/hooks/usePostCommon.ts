import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { PostRequestResponse } from '@/types/global';
import baseApi from "@/utils/baseApi";

interface QueryParams{
    type: string;
    // data?: any,
    // config?: any,
    onSuccessCallback?: (data: any) => void;
    onErrorCallback?: (error: Error) => void;
}

export const postRequest = (url: string, data?: any, config?: any): Promise<any> => {
    // console.log('====================================');
    // console.log('data', data);
    // console.log('====================================');
    return new Promise((resolve, reject) =>
        {baseApi
            .post(url, data, config)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

export const usePostCommon = ({ type, onSuccessCallback, onErrorCallback }: QueryParams) => {
    const configRequest = {
        retry: 1,
        // cacheTime: 5 * 60 * 1000, // 5 phút
        // staleTime: 5 * 60 * 1000 // 5 phút
    }
    let url = '';
    if(type === 'SAVE_BOOKMARK'){
        url = 'share-service/api/v1/bookmark';
    }
    // const QUERY_KEY = [url]
    const mutation = useMutation<PostRequestResponse<any>, Error>({
        // mutationKey: QUERY_KEY,
        mutationFn:  (data) => postRequest(url, data), 
        onSuccess(res: PostRequestResponse<any>){
            if(onSuccessCallback){
                onSuccessCallback(res);
            }
        },
        onError(error: Error){
            if(onErrorCallback){
                onErrorCallback(error);
            }
        },
        ...configRequest
    });
    return mutation;
}; 