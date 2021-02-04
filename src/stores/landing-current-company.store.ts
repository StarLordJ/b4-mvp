import { b4Transport, TCompanyInn } from '../transport';

class LandingCurrentCompanyStorage {
  private _companyInn: TCompanyInn | null = null;

  public get companyInn(): TCompanyInn | null {
    return this._companyInn;
  }

  public set companyInn(inn: TCompanyInn | null) {
    this._companyInn = inn;
  }

  public addCompany(): Promise<void> {
    if (this._companyInn) {
      return (b4Transport.addCompany(this._companyInn) as unknown) as Promise<
        void
      >;
    }
    return Promise.resolve();
  }
}

export const landingCurrentCompanyStorage = new LandingCurrentCompanyStorage();
