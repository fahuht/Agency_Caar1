export type ItemInput = {
  field: string;
  placeHolder: string;
  regex: RegExp;
  type: string;
};

export type RequestBody = {
  email: string | null;
  newPassword: string | undefined;
  confirmNewPassword: string | undefined;
  token: string | null;
};

export interface BaseRequest {
  [key: string]: string | undefined;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export type ResponseData =
  | {
      data: {
        status: number;
        errorCode: string;
        errorMsg: string;
      };
      status: number;
    }
  | undefined;

export type DataForm = {
  newPassword: string;
  confirmNewPassword: string;
};

export type ErrorResponse = any;
