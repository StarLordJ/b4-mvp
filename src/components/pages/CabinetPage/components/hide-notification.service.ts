import { TCompanyInn, TCompanyLandingInfo } from '../../../../transport';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { firebaseStore, currentCompanyStorage } from '../../../../stores';

class HideNotificationService {
  private static key: string = 'notification';
  // @ts-ignore
  private _isHidden$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public isHidden$: Observable<boolean> = this._isHidden$.asObservable();

  constructor() {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean | void): void => {
      let sub: Subscription | undefined;

      if (isLoggedIn) {
        sub = currentCompanyStorage.currentCompany$.subscribe(
          (currentCompany: TCompanyLandingInfo | null): void => {
            if (currentCompany) {
              const isHiddenNotification = Boolean(
                localStorage.getItem(this.buildStorageKey(currentCompany.inn))
              );
              this._isHidden$.next(isHiddenNotification);
            }
          }
        );
      } else {
        sub && sub.unsubscribe();
      }
    });
  }
  public setNotificationHideState(inn: TCompanyInn): void {
    localStorage.setItem(this.buildStorageKey(inn), '1');
    this._isHidden$.next(true);
  }

  private buildStorageKey(inn: TCompanyInn): string {
    return `${HideNotificationService.key}:${inn}`;
  }
}

export const hideNotificationService = new HideNotificationService();
