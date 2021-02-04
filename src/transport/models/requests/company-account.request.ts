import { TCompanyAccount } from '../responses/company-accounts.response';

export type TCompanyAccountRequest = Omit<TCompanyAccount, 'id' | 'dadata'>;
