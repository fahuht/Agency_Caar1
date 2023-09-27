
export type DataForm = {
  username: string;
  password: string;
};

export type RequestForm = {
  formLogin: FormData;
  type: string;
};
export type ItemInput = {
  field: string;
  placeHolder: string;
  regex: RegExp;
  type: string;
};
export type AccessToken = string;


export interface Token{
  access_token: string  
  expires_in: number
  jti : string
  refresh_token: string
  scope: string
  token_type: string

}
export type RequestFormLogin ={
  formLogin: FormData;
  type: string;
}