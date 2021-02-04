import { TCompanyLandingInfo } from './company-landing-info.response';

export type TUserCompaniesResponse = {
  id: number;
  companies: TCompanyLandingInfo[];
};
