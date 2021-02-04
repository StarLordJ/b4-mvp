import { TCompanyInn } from './company-landing-info.response';

export type TCompanyAccount = {
  id: number;
  company: TCompanyInn;
  bankName: string;
  accountNumber: string;
  bik: string;
  dadata: string;
};
