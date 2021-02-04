import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosTransport } from './axios.transport';
import {
  TCompanyInn,
  TCompanyLandingInfo,
  TCompanyAccount,
  TCompanyAccountRequest,
  TFileUploadResponse,
  TCompanyFileResponse,
  TUserCompaniesResponse,
  TCompanyRecommendsResponse,
  TGuaranteeRequest
} from './models';

import './axios.interceptors';

class B4Transport {
  private static ENDPOINT: string = '/api/v1';

  public getCompanyLandingInfoByINN(
    inn: TCompanyInn
  ): Promise<TCompanyLandingInfo> {
    return this.get(`${B4Transport.ENDPOINT}/companies/${inn}`);
  }

  public getCompanyAccounts(): Promise<TCompanyAccount[]> {
    return this.get(`${B4Transport.ENDPOINT}/company_props`);
  }

  public setCompanyAccount(
    newAccount: TCompanyAccountRequest
  ): Promise<TCompanyAccount> {
    return this.post(`${B4Transport.ENDPOINT}/company_props`, newAccount);
  }

  public editCompanyAccount(
    editedAccount: Partial<TCompanyAccount>
  ): Promise<TCompanyAccount> {
    return this.patch(
      `${B4Transport.ENDPOINT}/company_props/${editedAccount.id}`,
      editedAccount
    );
  }

  public getCurrentUserCompanies(): Promise<TUserCompaniesResponse> {
    return this.get(`${B4Transport.ENDPOINT}/user/me`);
  }

  public addCompany(inn: string): Promise<void> {
    return this.patch(`${B4Transport.ENDPOINT}/user/add_company`, {
      inn
    });
  }

  public uploadFile(file: FormData): Promise<TFileUploadResponse> {
    return this.post(`${B4Transport.ENDPOINT}/filestorage/api_files/`, file);
  }

  public getFilesList(): Promise<TCompanyFileResponse[]> {
    return this.get(`${B4Transport.ENDPOINT}/company_files`);
  }

  public mapFileIdWithCompany(
    file: number,
    company: TCompanyInn
  ): Promise<TCompanyFileResponse> {
    return this.post(`${B4Transport.ENDPOINT}/company_files`, {
      file,
      company
    });
  }

  public getCommonRecommends(): Promise<TCompanyRecommendsResponse[]> {
    return this.get(`${B4Transport.ENDPOINT}/company_recommends`);
  }

  public getRecommends(
    inn: TCompanyInn
  ): Promise<TCompanyRecommendsResponse[]> {
    return this.get(
      `${B4Transport.ENDPOINT}/company_recommends?company=${inn}`
    );
  }

  public sendGuarantee(guarantee: TGuaranteeRequest): Promise<void> {
    return this.post(`${B4Transport.ENDPOINT}/warranties`, guarantee);
  }

  private get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return axiosTransport
      .get(url, config)
      .then(({ data }: AxiosResponse<T>): T => data);
  }

  private patch<T, M>(
    url: string,
    userData: T,
    config: AxiosRequestConfig = {}
  ): Promise<M> {
    return axiosTransport
      .patch(url, userData, config)
      .then(({ data }: AxiosResponse<M>): M => data);
  }

  private post<T, M>(
    url: string,
    userData: T,
    config: AxiosRequestConfig = {}
  ): Promise<M> {
    return axiosTransport
      .post(url, userData, config)
      .then(({ data }: AxiosResponse<M>): M => data);
  }
}

export const b4Transport = new B4Transport();
