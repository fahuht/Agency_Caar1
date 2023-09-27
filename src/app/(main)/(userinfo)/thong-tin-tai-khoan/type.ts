export interface OverviewAccount {
    status: number;
    name: string;
    icon: string;
    url: string;
}

export interface DataDelete {
    name: string | undefined;
    password: string;
}

export type ResponseData =
    | {
          errorCode: string;
          errorMsg: string;
          status: number;
      }
    | undefined;

export type RequestBody = {
    newPassword: string | undefined;
    confirmNewPassword: string | undefined;
    currentPassword: string | undefined;
};

export type RequestData = {
    id?: string | undefined;
    displayName: string | null;
    phoneNumber: string | null;
    email?: string | null;
    birthday?: string | null;
};
