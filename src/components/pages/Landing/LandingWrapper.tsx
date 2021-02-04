import * as React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { landingCurrentCompanyStorage } from '../../../stores';
import { TCompanyInn } from '../../../transport';
import { useRxStream } from '../../../utils/hooks';
import { LoadingPage } from '../LoadingPage';
import { Landing } from './Landing';
import { landingDataService } from './landing-data.service';

export const COMPANY_INN_ROUTE_KEY: string = 'company';

export function LandingWrapper({ match }: RouteChildrenProps): JSX.Element {
  const data = useRxStream(landingDataService.data$, {
    landingInfo: void 0,
    errorInfo: void 0
  });
  const { landingInfo, errorInfo } = data;
  const companyInn: TCompanyInn = (match as {
    params: { [key: string]: TCompanyInn };
  })?.params[COMPANY_INN_ROUTE_KEY];

  React.useEffect((): void => {
    landingDataService.getLandingDataByInn(companyInn);
    landingCurrentCompanyStorage.companyInn = companyInn;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!landingInfo && !errorInfo && <LoadingPage />}
      {landingInfo && <Landing info={landingInfo} />}
      {errorInfo && (
        <div>Что-то пошло не так. Попробуйте перезагрузить страницу</div>
      )}
    </>
  );
}
