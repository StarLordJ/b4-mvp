import * as React from 'react';

import {
  Form,
  ControlLabel,
  Input,
  SelectPicker,
  DatePicker,
  DateRangePicker,
  FormGroup
} from 'rsuite';
import { modalWrapperService } from '../../../../services';
import { TGuaranteeRequest } from '../../../../transport';

import { Button } from '../../Button';
import { guaranteeService } from './guarantee.service';
import { calculateDays, guaranteeTypesItems } from './utils';

import './style.scss';
import { FormWrapper, SuccessNotifier } from '../components';

type TGuaranteeModalState = Pick<
  TGuaranteeRequest,
  'purchaseNumber' | 'bgType' | 'bgSum' | 'email'
> & {
  startDate: Date | null;
  endDate: Date | null;
  purchaseDate: Date | null;
};

export function WarrantyClaimForm(): JSX.Element {
  const [data, setData] = React.useState<TGuaranteeModalState>({
    purchaseNumber: '',
    bgType: '',
    bgSum: '',
    email: '',
    purchaseDate: null,
    startDate: null,
    endDate: null
  });

  const [isSended, setIsSended] = React.useState(false);

  function setFieldUpdater(
    field: keyof TGuaranteeRequest
  ): (value: string | Date) => void {
    return (value: string | Date): void =>
      setData({
        ...data,
        [field]: value
      });
  }

  function setDateUpdater(): (value: (Date | undefined)[]) => void {
    return ([startDate, endDate]: (Date | undefined)[]): void => {
      setData({
        ...data,
        startDate: startDate || null,
        endDate: endDate || null
      });
    };
  }

  function handleSubmit(): void {
    if (Object.values(data).every(Boolean)) {
      const tender = {
        ...data,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        purchaseDate: data.purchaseDate?.toISOString()
      };
      guaranteeService
        // @ts-ignore не раздупляет ts проверку выше
        .sendGuarantee(tender)
        .then((): void => setIsSended(true));
    }
  }

  const daysCounter =
    (data.startDate &&
      data.endDate &&
      calculateDays(data.startDate, data.endDate)) ||
    0;

  return (
    <FormWrapper title={!isSended ? 'Заявка на гарантию' : ''}>
      {!isSended && (
        <Form className="warranty-form">
          <div className="warranty-form-columns">
            <div className="warranty-form-column">
              <FormGroup
                className="warranty-form-group"
                style={{ width: '420px' }}
              >
                <ControlLabel className="warranty-form-label">
                  Вид банковской гарантии
                </ControlLabel>
                <SelectPicker
                  className="warranty-form-select"
                  cleanable={false}
                  searchable={false}
                  onSelect={setFieldUpdater('bgType')}
                  data={guaranteeTypesItems}
                />
              </FormGroup>
            </div>
          </div>
          <p className="warranty-form-disclaimer">
            Данная гарантия на обеспечение гарантийных обязательств свыше срока
            действия контракта. Если Вам требуется гарантия на обеспечение
            гарантийных обязательств в пределах срока действия контракта,
            необходимо выбрать тип “Банковская гарантия на исполнение контракта”
            и затем указать наличие гарантийных обязательств.
          </p>

          <div className="warranty-form-columns">
            <div className="warranty-form-column">
              <FormGroup
                className="warranty-form-group"
                style={{ width: '420px' }}
              >
                <ControlLabel className="warranty-form-label">
                  Дата начала гарантии / Дата окончания гарантии
                </ControlLabel>
                <DateRangePicker
                  block
                  placeholder="дд-мм-гггг / дд-мм-гггг"
                  format="DD-MM-YYYY"
                  onChange={setDateUpdater()}
                />
              </FormGroup>
            </div>
            <div className="warranty-form-column">
              <ControlLabel className="warranty-form-label">
                Итого дней:
              </ControlLabel>
              <div className="warranty-form-total-days">{daysCounter}</div>
            </div>
          </div>
          <div className="warranty-form-columns">
            <div className="warranty-form-column">
              <FormGroup className="warranty-form-group">
                <ControlLabel className="warranty-form-label">
                  Реестровый № торгов
                </ControlLabel>
                <Input
                  type="text"
                  placeholder="2343523532"
                  onChange={setFieldUpdater('purchaseNumber')}
                />
              </FormGroup>
            </div>
            {/* <div className="warranty-form-column">
              <FormGroup className="warranty-form-group">
                <ControlLabel className="warranty-form-label">
                  Закон
                </ControlLabel>
                <SelectPicker
                  className="warranty-form-select"
                  cleanable={false}
                  searchable={false}
                  data={lawSelectItems}
                  onSelect={setFieldUpdater('law')}
                />
              </FormGroup>
            </div> */}
            <div className="warranty-form-column">
              <FormGroup className="warranty-form-group">
                <ControlLabel className="warranty-form-label">
                  Сумма
                </ControlLabel>
                <Input
                  type="text"
                  placeholder="10000"
                  onChange={setFieldUpdater('bgSum')}
                />
              </FormGroup>
            </div>
            <div className="warranty-form-column">
              <FormGroup className="warranty-form-group">
                <ControlLabel className="warranty-form-label">
                  Дата тендера(аукциона)
                </ControlLabel>
                <DatePicker
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  className="warranty-form-date-picker"
                  oneTap
                  onSelect={setFieldUpdater('purchaseDate')}
                />
              </FormGroup>
            </div>
          </div>
          <div className="warranty-form-columns">
            <div className="warranty-form-column">
              <FormGroup
                className="warranty-form-group"
                style={{ width: '420px' }}
              >
                <ControlLabel className="warranty-form-label">
                  Электронная почта
                </ControlLabel>
                <Input
                  type="text"
                  placeholder="example@example.com"
                  onChange={setFieldUpdater('email')}
                />
              </FormGroup>
            </div>
          </div>
          <div className="warranty-form-group">
            <Button
              className="warranty-form-submit"
              skin="inverse"
              onClick={handleSubmit}
            >
              Отправить заявку
            </Button>
          </div>
        </Form>
      )}
      {isSended && (
        <SuccessNotifier
          onClick={modalWrapperService.closeModal}
          buttonText="Вернуться на главную"
          text={
            <>
              <p className="warranty-success-text">Cпасибо!</p>
              <p className="warranty-success-text">
                Мы обрабатываем вашу заявку
              </p>
            </>
          }
        />
      )}
    </FormWrapper>
  );
}
