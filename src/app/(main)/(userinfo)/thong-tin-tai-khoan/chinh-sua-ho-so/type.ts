import { Dayjs } from "dayjs";


export interface DetailsUserInfo {
    
    displayName: string;
    phoneNumber: string;
    email: string;
    birthday: Dayjs | string | null;

}
export interface ErrorMsg {
    
    displayName: string;
    phoneNumber: string;
    email: string;
    birthday: string | null;
}
export interface ItemField {
    title: string;
    field: string;
    typeFormat: string;
    valueFormat: string;
    typeRender: string;
}

export type DataForm = {
    // id: string;
    displayName: string;
    phoneNumber: string;
    // email: string;
    // birthday: string;
  };