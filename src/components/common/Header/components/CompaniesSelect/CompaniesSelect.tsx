import * as React from 'react';
import { Dropdown } from 'rsuite';
import { SvgIcon } from '../../../SvgIcon';

import { ReactComponent as CaretDown } from '../../../../../assets/images/svg/caret-down.svg';

import { currentCompanyStorage } from '../../../../../stores';
import { TCompanyLandingInfo } from '../../../../../transport';
import { useRxStream } from '../../../../../utils/hooks';

function renderTitle(children: React.ReactNode): React.ReactNode {
  return (
    <div className="header-dropdown-toggle">
      <div className="header-dropdown-label">{children}</div>
      <SvgIcon className="header-dropdown-icon">
        <CaretDown width="12" height="7" />
      </SvgIcon>
    </div>
  );
}

export function CompaniesSelect(): JSX.Element | null {
  const currentCompany = useRxStream(
    currentCompanyStorage.currentCompany$,
    null
  );
  const companies = useRxStream(currentCompanyStorage.allCompanies$, []);

  const handleSelect = (companyInn: TCompanyLandingInfo['inn']): void => {
    currentCompanyStorage.setCurrentCompany(companyInn);
  };

  return companies.length ? (
    <div className="page-header__company">
      <Dropdown
        placement="bottomEnd"
        className="header-dropdown"
        onSelect={handleSelect}
        trigger="click"
        title={currentCompany?.companyShortName}
        renderTitle={renderTitle}
      >
        {companies.map(
          (company: TCompanyLandingInfo): JSX.Element => (
            <Dropdown.Item eventKey={company.inn} key={company.inn}>
              {company.companyShortName}
            </Dropdown.Item>
          )
        )}
      </Dropdown>
    </div>
  ) : null;
}
