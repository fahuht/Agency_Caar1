import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';

  import { baseApiFe as baseURL } from '@/utils/constants';
  // const isServer = typeof window === 'undefined'
  
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const onRequest = async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    return config;
  };
  
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };
  
  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  
  const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };
  
  export function setupInterceptorsTo(
    axiosInstance: AxiosInstance,
  ): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
  }
  
  export default setupInterceptorsTo(api);
  