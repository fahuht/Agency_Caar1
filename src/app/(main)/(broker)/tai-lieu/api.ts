import { AxiosResponse } from 'axios';

import { ApiListResponse } from '@/types/global';
import baseApi from '@/utils/baseApi';

import { FileDocument } from './type';


// GET file tài liệu
export const apiGetFile = (
  url: string,
): Promise<ApiListResponse<FileDocument>> => {
  return new Promise((resolve, reject) =>
    {baseApi
      .get(url)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: Error) => reject(err))},
  );
};

