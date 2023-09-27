import { AxiosResponse } from "axios";

import { Logout } from "@/types/global";
import baseApiFe from "@/utils/baseApiFe";

import { Notifications, PagingListNotificationResponse, RequestGetNotification } from "./type";

export const logout = (): Promise<Logout> => {
  const url = "api/logout";
  return new Promise((resolve, reject) =>
      {baseApiFe
          .get(url)
          .then((res: AxiosResponse) => resolve(res?.data))
          .catch((err: Error) => reject(err))}
  );
};

// get list thông báo
export const getNotification = (url:string , data: RequestGetNotification): Promise<PagingListNotificationResponse<Notifications>> => {
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}

type StatusResponse ={
    status:number
}

// đánh dấu thông báo đã xem
export const seenNotification = (url:string): Promise<StatusResponse> => {
    return new Promise((resolve, reject) =>
        {baseApiFe
            .get(url)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}
