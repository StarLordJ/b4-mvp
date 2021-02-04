import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { currentCompanyStorage, firebaseStore } from '../../../../../stores';
import {
  b4Transport,
  TCompanyLandingInfo,
  TCompanyRecommendsResponse
} from '../../../../../transport';

class TendersService {
  // @ts-ignore
  private _tenders$: BehaviorSubject<
    TCompanyRecommendsResponse[]
  > = new BehaviorSubject([]);

  public tenders$: Observable<
    TCompanyRecommendsResponse[]
  > = this._tenders$.asObservable();

  constructor() {
    this.getCompanyTenders();
  }

  private getCompanyTenders(): void {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean | void): void => {
      let sub: Subscription | undefined;

      if (isLoggedIn) {
        sub = currentCompanyStorage.currentCompany$.subscribe(
          (currentCompany: TCompanyLandingInfo | null): void => {
            const inn = currentCompany?.inn || null;
            const wasProcessed = currentCompany?.wasProcessed || false;

            if (inn && wasProcessed) {
              Promise.all([
                b4Transport.getCommonRecommends(),
                b4Transport.getRecommends(inn)
              ]).then(
                ([
                  commonRecommends,
                  recommends
                ]: TCompanyRecommendsResponse[][]): void => {
                  this._tenders$.next([...commonRecommends, ...recommends]);
                }
              );
            } else {
              this._tenders$.next([]);
            }
          }
        );
      } else {
        this._tenders$.next([]);
        sub && sub.unsubscribe();
      }
    });
  }
}

export const tendersService = new TendersService();
