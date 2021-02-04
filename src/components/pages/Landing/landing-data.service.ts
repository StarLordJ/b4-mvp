import { Subject, Observable } from 'rxjs';
import {
  TCompanyLandingInfo,
  b4Transport,
  TCompanyInn
} from '../../../transport';

export type TLandingData = {
  landingInfo: TCompanyLandingInfo | void;
  errorInfo: Error | void;
};

class LandingDataService {
  private _data$: Subject<TLandingData> = new Subject();

  public data$: Observable<TLandingData> = this._data$.asObservable();

  public getLandingDataByInn(inn: TCompanyInn): void {
    b4Transport
      .getCompanyLandingInfoByINN(inn)
      .then((landingInfo: TCompanyLandingInfo): void =>
        this._data$.next({ landingInfo, errorInfo: void 0 })
      )
      .catch((errorInfo: Error): void =>
        this._data$.next({ landingInfo: void 0, errorInfo })
      );
  }
}

export const landingDataService = new LandingDataService();
