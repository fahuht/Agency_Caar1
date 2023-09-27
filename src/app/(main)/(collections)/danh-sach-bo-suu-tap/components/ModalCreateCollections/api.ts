import { AxiosResponse } from "axios";

import baseApiFe from "@/utils/baseApiFe";

import { DataForm } from "../../type";
import { ResponseCreateCollections } from "./type";

// tạo mới bộ sưu tập
export const onCreateCollections = (data: DataForm): Promise<ResponseCreateCollections> => {
  const url = 'api/collection/create';
  return new Promise((resolve, reject) =>
      {
        baseApiFe
          .post(url, data)
          .then((res: AxiosResponse) => resolve(res?.data))
          .catch((err: Error) => reject(err))
        },
  );
}
