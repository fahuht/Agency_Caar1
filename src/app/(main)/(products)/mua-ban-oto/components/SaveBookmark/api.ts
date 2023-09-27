import { AxiosResponse } from 'axios';

import { ErrorResponse } from "@/types/global";
import baseApiFe from "@/utils/baseApiFe";
import { baseApiFe as baseUrlFe } from "@/utils/constants";

import { SaveBookmarkRequest, SaveBookmarkResponse } from "../../type";

export const saveBookmarkRequest = (data: SaveBookmarkRequest): Promise<SaveBookmarkResponse & ErrorResponse> => {
    // console.log('====================================');
    // console.log('data', data);
    // console.log('====================================');
    const url = `${baseUrlFe}/api/bookmark`;
    return new Promise((resolve, reject) =>
        {baseApiFe
            .post(url, data)
            .then((res: AxiosResponse) => resolve(res?.data))
            .catch((err: Error) => reject(err))},
    );
}