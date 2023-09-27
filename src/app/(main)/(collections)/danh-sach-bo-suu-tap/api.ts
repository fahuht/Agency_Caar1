import { AxiosResponse } from "axios";

import { GetListStatusRequest, GetListStatusResponse, Product } from "@/types/global";
import baseApiFe from "@/utils/baseApiFe";

import { State } from "../../(products)/mua-ban-oto/type";
import {
  Collection,
  ListCollectionResponse,
} from "./type";

export const getDataCollections = (
  data: State
): Promise<ListCollectionResponse<Collection<Product>>> => {
  const url = "api/collection/get-collections";
  return new Promise((resolve, reject) =>
    {
      baseApiFe
      .post(url, data)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: Error) => reject(err))
    }
  );
};

// get list trạng thái bộ sưu tập
export const getListStatusCollections = (
  data: GetListStatusRequest
): Promise<GetListStatusResponse> => {
  const url = "api/collection/find-by-types";
  return new Promise((resolve, reject) =>
    {
      baseApiFe
      .post(url, data)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: Error) => reject(err))
    }
  );
};
