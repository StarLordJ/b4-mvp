import { BehaviorSubject, Observable } from 'rxjs';
import {
  b4Transport,
  TCompanyInn,
  TCompanyLandingInfo,
  TUserCompaniesResponse
} from '../transport';
import { firebaseStore } from './firebase';
import { landingCurrentCompanyStorage } from './landing-current-company.store';

class UserCurrentCompanyStorage {
  // @ts-ignore
  private _allCompanies$: BehaviorSubject<
    TCompanyLandingInfo[]
  > = new BehaviorSubject([]);
  // @ts-ignore
  private _currentCompany$: BehaviorSubject<TCompanyLandingInfo | null> = new BehaviorSubject(
    null
  );

  public currentCompany$: Observable<TCompanyLandingInfo | null> = this._currentCompany$.asObservable();

  public allCompanies$: Observable<
    TCompanyLandingInfo[]
  > = this._allCompanies$.asObservable();

  constructor() {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean | void): void => {
      if (isLoggedIn) {
        landingCurrentCompanyStorage
          .addCompany()
          .then((): void => this.getCompanies());
      } else {
        this._allCompanies$.next([]);
      }
    });
  }

  public setCurrentCompany(currentCompany: TCompanyInn): void {
    const fullInfo: TCompanyLandingInfo = this._allCompanies$.value.find(
      ({ inn }: TCompanyLandingInfo): boolean => inn === currentCompany
    ) as TCompanyLandingInfo;
    this._currentCompany$.next(fullInfo);
  }

  private getCompanies(): void {
    b4Transport
      .getCurrentUserCompanies()
      .then(({ companies }: TUserCompaniesResponse): void => {
        this._allCompanies$.next(companies);

        const currentCompany =
          companies.find(
            (company: TCompanyLandingInfo): boolean =>
              company.inn === landingCurrentCompanyStorage.companyInn
          ) || companies[0];
        this._currentCompany$.next(currentCompany);
      });
  }
}

export const currentCompanyStorage = new UserCurrentCompanyStorage();
