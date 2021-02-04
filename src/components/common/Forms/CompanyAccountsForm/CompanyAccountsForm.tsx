import * as React from 'react';

import { Form, FormGroup, ControlLabel, FormControl } from 'rsuite';
import { useRxStream } from '../../../../utils/hooks';

import { Button } from '../../Button';
import { FormWrapper } from '../components';
import { AccountsList, BankSelect } from './components';
import { AccountNumberAccepter } from './field-accepters';
import { accountsServiceEditor } from './services';

import './style.scss';

const initialState = {
  bankName: '',
  accountNumber: '',
  bik: ''
};

export function CompanyAccountsForm(): JSX.Element {
  const state = useRxStream(accountsServiceEditor.account$, initialState);
  const isEditing = useRxStream(accountsServiceEditor.isEditing$, false);

  React.useEffect((): VoidFunction => {
    return (): void => accountsServiceEditor.reset();
  }, []);

  return (
    <FormWrapper title="Счета в компании">
      <Form>
        <FormGroup className="company-accounts-form-fields">
          <div className="form-field-row">
            <ControlLabel>Банк</ControlLabel>
            <BankSelect
              onSelect={accountsServiceEditor.handleSelectBank}
              value={{ bankName: state.bankName, bik: state.bik }}
            />
          </div>
          <div className="form-field-row">
            <ControlLabel>Номер счета</ControlLabel>
            <FormControl
              type="text"
              required
              accepter={AccountNumberAccepter}
              onChange={accountsServiceEditor.handleTypeAccountNumber}
              value={state.accountNumber}
            />
          </div>
        </FormGroup>
        <Button skin="inverse" onClick={accountsServiceEditor.saveAccount}>
          {isEditing ? 'Сохранить' : 'Добавить'}
        </Button>
      </Form>
      <div className="accounts-list-wrapper">
        <AccountsList
          onSelectEdit={accountsServiceEditor.handleSelectEditAccount}
        />
      </div>
    </FormWrapper>
  );
}
