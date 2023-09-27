import { AxiosResponse } from "axios";

import { Notifications, PagingListNotificationResponse, RequestGetNotification } from "@/components/Home/type";
import baseApiFe from "@/utils/baseApiFe";

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