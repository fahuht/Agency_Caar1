export type Countdown = {
  countDown: number;
  startCountDown: () => void;
  stopCountDown: () => void;
  resetCountDown: (newSecond: number) => void;
};

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

export type RequestBody = {
  email: string;
};
