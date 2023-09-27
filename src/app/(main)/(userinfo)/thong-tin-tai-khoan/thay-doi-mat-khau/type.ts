export interface FieldList {
    placeHolder: string,
    field: string,
}

export type DataForm = {
    newPassword: string;
    confirmNewPassword: string;
    currentPassword: string;
  };

  export type RequestBody = {
    newPassword: string | undefined;
    confirmNewPassword: string | undefined;
    currentPassword: string | undefined;
  };