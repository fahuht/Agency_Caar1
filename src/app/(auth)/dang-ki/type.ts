export type DataRequest = {
  name: string;
  password: string;
  confirmPassword: string;
};

export type DataUpdate = {
  id?: string;
  displayName: string;
  phoneNumber: string;
  // birthday: Dayjs | string | null;
  birthday: any;
  email: string;
};

export type DataActiveCode = {
  activeCode: string;
};

export type ResponseData =
  | {
      data: {
        id: string | undefined;
        status: number;
        errorCode: string;
        errorMsg: string;
      };
      status: number;
    }
  | undefined;

export type RequestForm = {
  data: any;
  type: string;
};

export type ItemInput = {
  field: string;
  placeHolder: string;
  // regex: RegExp;
  type: string;
};

export type DataForm = {
  // name: string
  password: string;
  confirmPassword: string;
};

export type ErrorResponse = any;

export type Countdown = {
  countDown: number;
  startCountDown: () => void;
  stopCountDown: () => void;
  resetCountDown: (newSecond: number) => void;
};
