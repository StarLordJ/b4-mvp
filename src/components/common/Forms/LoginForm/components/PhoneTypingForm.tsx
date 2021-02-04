import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FormControlProps
} from 'rsuite';
import { Button } from '../../../Button';
import { TFormProps } from './prop-types';
import MaskedInput from 'react-input-mask';

function PhoneMaskInput(
  props: Omit<FormControlProps, 'onChange'>
): JSX.Element {
  return (
    <MaskedInput
      mask="+7 999 999 99 99"
      className="rs-input"
      maskChar={null}
      {...props}
    />
  );
}

export function PhoneTypingForm({
  isRequestProcessing,
  errorText,
  onSubmit,
  controlName
}: TFormProps): JSX.Element {
  return (
    <Form className="login-form" onSubmit={onSubmit}>
      <FormGroup>
        <ControlLabel>Номер телефона</ControlLabel>
        <FormControl
          errorMessage={errorText}
          autoFocus
          type="text"
          required
          name={controlName}
          placeholder="+7"
          accepter={PhoneMaskInput}
        />
      </FormGroup>

      <FormGroup className="form-footer">
        <Button
          loading={isRequestProcessing}
          block
          className="login-form-submit"
          skin="inverse"
          type="submit"
        >
          Выслать код
        </Button>
      </FormGroup>
    </Form>
  );
}
