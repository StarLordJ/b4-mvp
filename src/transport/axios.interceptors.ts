import { axiosTransport } from './axios.transport';
import { AxiosRequestConfig } from 'axios';
import { firebaseStore } from '../stores';

axiosTransport.interceptors.request.use(
  (request): Promise<AxiosRequestConfig> => {
    if (firebaseStore.currentUser) {
      return firebaseStore.currentUser?.getIdToken().then(
        (token: string): AxiosRequestConfig => {
          request.headers.Authorization = `JWT ${token}`;

          return request;
        }
      );
    }

    return Promise.resolve(request);
  }
);
