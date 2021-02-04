import * as React from 'react';
import { ReactComponent as Pencil } from './shape.svg';
import { SvgIcon } from '../../../../SvgIcon';
import { TCompanyAccount } from '../../../../../../transport';

type TAccountsListItem = {
  onSelectEdit: (account: TCompanyAccount) => void;
  account: TCompanyAccount;
};

export const AccountsListItem = React.memo(
  ({ account, onSelectEdit }: TAccountsListItem): JSX.Element => {
    const { bankName, accountNumber, bik } = account;
    const handleSelectEdit = React.useCallback(
      (): void => onSelectEdit(account),
      [account, onSelectEdit]
    );

    return (
      <div className="accounts-list__item">
        <div className="accounts-list__item--column">
          <div className="accounts-list__item--column-name">
            Наименование банка
          </div>
          <div className="accounts-list__item--column-value">{bankName}</div>
        </div>
        <div className="accounts-list__item--column">
          <div className="accounts-list__item--column-name">Номер счета</div>
          <div className="accounts-list__item--column-value">
            {accountNumber}
          </div>
        </div>
        <div className="accounts-list__item--column">
          <div className="accounts-list__item--column-name">БИК</div>
          <div className="accounts-list__item--column-value">{bik}</div>
        </div>
        <div className="accounts-list__item--column accounts-list__item--column-button-wrap">
          <div
            className="accounts-list__item--column-button"
            onClick={handleSelectEdit}
          >
            <SvgIcon>
              <Pencil
                width="20"
                height="20"
                className="accounts-list__item--column-button__icon"
              />
            </SvgIcon>
            <div className="accounts-list__item--column-button__text">
              Изменить
            </div>
          </div>
        </div>
      </div>
    );
  }
);
