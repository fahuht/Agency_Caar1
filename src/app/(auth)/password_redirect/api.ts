import baseApi from "@/utils/baseApi";

import { RequestBody, ResponseData } from "./types";

// POST
export const updatePassword = (
  url: string,
  data: RequestBody
): Promise<ResponseData> => {
  return new Promise((resolve, reject) =>
    {baseApi
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))}
  );
};
