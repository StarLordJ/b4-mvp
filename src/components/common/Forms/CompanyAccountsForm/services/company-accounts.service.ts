import {
  b4Transport,
  TCompanyAccount,
  TCompanyAccountRequest,
  TCompanyInn,
  TCompanyLandingInfo
} from '../../../../../transport';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  currentCompanyStorage,
  firebaseStore,
  userCompanyDataSended
} from '../../../../../stores';

class CompanyAccountsService {
  private accounts: TCompanyAccount[] = [];
  private currentCompany: TCompanyInn | null = null;
  // @ts-ignore
  private _accounts$: BehaviorSubject<TCompanyAccount[]> = new BehaviorSubject(
    []
  );

  public accounts$: Observable<
    TCompanyAccount[]
  > = this._accounts$.asObservable();

  constructor() {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean | void): void => {
      if (isLoggedIn) {
        this.getCompanyAccounts().then((): void => {
          currentCompanyStorage.currentCompany$.subscribe(
            (company: TCompanyLandingInfo | null): void => {
              this.currentCompany = company?.inn || null;
              this.filterCompanyAccounts();
            }
          );
        });
      }
    });
  }

  public getCompanyAccounts(): Promise<void> {
    return b4Transport
      .getCompanyAccounts()
      .then((accounts: TCompanyAccount[]): void => {
        this.accounts = accounts;
        this._accounts$.next(this.accounts);
      });
  }

  public setNewCompanyAccount(
    newAccount: Omit<TCompanyAccountRequest, 'company'>
  ): Promise<void> {
    if (!this.currentCompany) {
      throw new Error(
        'InvalidProgrammState: компания должна быть уже назначена к этому моменту'
      );
    }
    return b4Transport
      .setCompanyAccount({ ...newAccount, company: this.currentCompany })
      .then((data: TCompanyAccount): void => {
        this.accounts.push(data);
        this._accounts$.next(this.accounts);
        userCompanyDataSended.setCompanyAccountsSended(
          this.accounts.length > 0
        );
      });
  }

  public editCompanyAccount(
    editedAccount: Partial<TCompanyAccount>
  ): Promise<void> {
    return b4Transport.editCompanyAccount(editedAccount).then((): void => {
      const newList = this._accounts$.value.map(
        (account: TCompanyAccount): TCompanyAccount =>
          account.id === editedAccount.id
            ? { ...account, ...editedAccount }
            : account
      );
      this._accounts$.next(newList);
    });
  }

  public filterCompanyAccounts(): void {
    const filtered = this.accounts.filter(
      (account: TCompanyAccount): boolean =>
        account.company === this.currentCompany
    );

    this.currentCompany && this._accounts$.next(filtered);
    userCompanyDataSended.setCompanyAccountsSended(filtered.length > 0);
  }
}

export const companyAccountsService = new CompanyAccountsService();
