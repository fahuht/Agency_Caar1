import { AxiosResponse } from 'axios';

import { UserInfo } from '@/types/global';
import baseApiFe from '@/utils/baseApiFe';

// POST
export type ResponseLogin = {
  status: string
}
export const apiLogin = (
  url: string,
  data: FormData,
): Promise<ResponseLogin> => {
  return new Promise((resolve, reject) =>
    {baseApiFe
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: Error) => reject(err))},
  );
};

// POST
export const apiGetInfoUser = (
  url: string,
): Promise<UserInfo> => {
  return new Promise((resolve, reject) =>
    {baseApiFe
      .get(url)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: Error) => reject(err))},
  );
};

