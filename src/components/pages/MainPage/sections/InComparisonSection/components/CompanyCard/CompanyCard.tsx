import * as React from 'react';
import classnames from 'classnames';

import './style.scss';

type TCompanyCardProps = {
  serviceUsage: boolean;
  companyName: string;
};

export function CompanyCard({
  serviceUsage,
  companyName
}: TCompanyCardProps): JSX.Element {
  return (
    <div className="comparison-company-card">
      <div
        className={classnames('comparison-company-card__usage', {
          'comparison-company-card__usage--is-using': serviceUsage,
          'comparison-company-card__usage--is-not-using': !serviceUsage
        })}
      >
        <div className="comparison-company-card__usage-indicator" />
        <div className="comparison-company-card__usage-text">
          {serviceUsage ? 'Использует В4' : 'Не использует B4'}
        </div>
      </div>
      <div className="comparison-company-card__company-name">{companyName}</div>
    </div>
  );
}
