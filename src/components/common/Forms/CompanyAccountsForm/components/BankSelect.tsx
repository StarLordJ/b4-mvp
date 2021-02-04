import * as React from 'react';
import ReactDadataBox, { BankResponseType } from 'react-dadata-box';

export type TBankItem = { bik: string; bankName: string };

type TBankSelectProps = {
  onSelect: (value: TBankItem) => void;
  value: { bik: string; bankName: string };
};

const customStyle = { 'react-dadata__suggestions': { borderRadius: '15px' } };

export function BankSelect({ onSelect, value }: TBankSelectProps): JSX.Element {
  const handleSelect = React.useCallback(
    (res: BankResponseType): void =>
      onSelect({
        bik: res.data.bic || '',
        bankName: res.data.name?.payment || ''
      }),
    [onSelect]
  );

  return (
    <ReactDadataBox
      token="6df51bc0b039ab7994d1745c428d95c3e18088e0"
      query={value.bankName}
      type="bank"
      placeholder="Введите название или БИК банка"
      customStyles={customStyle}
      // @ts-ignore - тут с типами херь какая-то, не могу понять
      onChange={handleSelect}
      // tslint:disable-next-line:jsx-no-lambda
      customInput={(props: unknown): JSX.Element => (
        <input {...props} className="rs-input" />
      )}
    />
  );
}
