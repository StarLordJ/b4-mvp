import * as React from 'react';
import { TCompanyAccount } from '../../../../../../transport';
import { companyAccountsService } from '../../services';
import './style.scss';
import { AccountsListItem } from './AccountsListItem';
import { useRxStream } from '../../../../../../utils/hooks';

type TAccountsListProps = {
  onSelectEdit: (account: TCompanyAccount) => void;
};

export const AccountsList = React.memo(
  ({ onSelectEdit }: TAccountsListProps): JSX.Element => {
    const accounts = useRxStream(companyAccountsService.accounts$, []);

    return (
      <div className="accounts-list">
        {accounts.map(
          (account: TCompanyAccount): JSX.Element => (
            <AccountsListItem
              account={account}
              onSelectEdit={onSelectEdit}
              key={account.id}
            />
          )
        )}
      </div>
    );
  }
);
