import * as React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { Button } from '../../../Button';
import { TFormProps } from './prop-types';

export function CodeConfirmForm({
  isRequestProcessing,
  errorText,
  onSubmit,
  controlName
}: TFormProps): JSX.Element {
  return (
    <Form className="login-form" onSubmit={onSubmit}>
      <FormGroup>
        <ControlLabel>Код, отправленный вам по SMS</ControlLabel>
        <FormControl
          errorMessage={errorText}
          type="text"
          name={controlName}
          autoFocus
          required
        />
      </FormGroup>

      <FormGroup className="form-footer">
        <Button
          block
          loading={isRequestProcessing}
          className="login-form-submit"
          skin="inverse"
          type="submit"
        >
          Войти
        </Button>
      </FormGroup>
    </Form>
  );
}
