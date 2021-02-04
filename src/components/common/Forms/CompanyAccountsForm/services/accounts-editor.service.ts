import { BehaviorSubject, Observable } from 'rxjs';
import { TCompanyAccountRequest } from '../../../../../transport';
import { companyAccountsService } from './company-accounts.service';
import { TagManagerService } from '../../../../../services';

const initialState = {
  bankName: '',
  accountNumber: '',
  bik: ''
};

type TBankItem = { bik: string; bankName: string };

class AccountsServiceEditor {
  private _account$: BehaviorSubject<
    Omit<TCompanyAccountRequest, 'company'>
  > = new BehaviorSubject(initialState);
  // @ts-ignore
  private _isEditing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isEditing$: Observable<boolean> = this._isEditing$.asObservable();
  public account$: Observable<
    Omit<TCompanyAccountRequest, 'company'>
  > = this._account$.asObservable();

  public handleSelectBank = (item: TBankItem): void => {
    this._account$.next({ ...this._account$.value, ...item });
  }

  public handleTypeAccountNumber = (accountNumber: string): void => {
    this._account$.next({ ...this._account$.value, accountNumber });
  }

  public saveAccount = (): void => {
    this._isEditing$.value ? this.saveEditedAccount() : this.setNewAccount();
  }

  public reset = (): void => {
    this._isEditing$.next(false);
    this._account$.next(initialState);
  }

  public handleSelectEditAccount = (
    account: Omit<TCompanyAccountRequest, 'company'>
  ): void => {
    this._isEditing$.next(true);
    this._account$.next(account);
  }

  private setNewAccount(): void {
    companyAccountsService
      .setNewCompanyAccount(this._account$.value)
      .then((): void => {
        TagManagerService.pushEvent('сompProfileSend');
        this._account$.next(initialState);
      });
  }

  private saveEditedAccount(): void {
    companyAccountsService
      .editCompanyAccount(this._account$.value)
      .then((): void => {
        this._isEditing$.next(false);
        this._account$.next(initialState);
      });
  }
}

export const accountsServiceEditor = new AccountsServiceEditor();
