import * as React from 'react';

import { Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { auth } from 'firebase';
import { Button } from '../Button';

import { initRecaptcha } from 'effects/useRecaptcha';
import { FireBaseStore } from '../../../stores';

enum STEPS {
  PHONE_NUMBER_STEP = 'phone',
  SMS_CODE_STEP = 'code'
}

type TLoginFormProps = {
  done?: VoidFunction;
};

export function LoginForm(props: TLoginFormProps): JSX.Element {
  const { done, ...forwardingProps } = props;

  const [
    appVerifier,
    setAppVerifier
  ] = React.useState<auth.RecaptchaVerifier | null>(null);
  const [currentStep, setCurrentStep] = React.useState(STEPS.PHONE_NUMBER_STEP);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, updateSubmittingState] = React.useState(false);

  const recaptchaRef = React.useRef<HTMLDivElement | null>();
  const codeConsumer = React.useRef<auth.ConfirmationResult | null>(null);

  const setRef = (ref: HTMLDivElement): void => {
    if (!ref || appVerifier) {
      return;
    }

    recaptchaRef.current = ref;

    const recaptchaVerifier = initRecaptcha(recaptchaRef.current);
    setAppVerifier(recaptchaVerifier);
  };

  const onLogin = (
    _: boolean,
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    if (!appVerifier) {
      throw new Error('App verifier is not defined');
    }

    updateSubmittingState(true);

    const form = event.nativeEvent.target;

    switch (true) {
      default:
      case currentStep === STEPS.PHONE_NUMBER_STEP:
        // @ts-ignore (щас лень типы тут просчитывать)
        const phone = form && form.elements.phone.value;

        FireBaseStore.instance
          .auth()
          .signInWithPhoneNumber(phone, appVerifier)
          .then((confirmationResult: auth.ConfirmationResult): void => {
            setCurrentStep(STEPS.SMS_CODE_STEP);
            updateSubmittingState(false);

            codeConsumer.current = confirmationResult;
          })
          .catch((err: Error): void => {
            setErrorMessage(err.message);
            updateSubmittingState(false);
          });
        break;

      case currentStep === STEPS.SMS_CODE_STEP:
        // @ts-ignore (щас лень типы тут просчитывать)
        const code = form && form.elements.code.value;

        codeConsumer.current &&
          codeConsumer.current
            .confirm(code)
            .then((result: auth.UserCredential): void => {
              FireBaseStore.instance.recheck();

              updateSubmittingState(false);

              done && done();
            })
            .catch((err: Error): void => {
              setErrorMessage(err.message);
              updateSubmittingState(false);
            });
        break;
    }
  };

  return (
    <Form className="form login-form" onSubmit={onLogin} {...forwardingProps}>
      {currentStep === STEPS.PHONE_NUMBER_STEP && (
        <FormGroup className="form-group">
          <ControlLabel className="form-label">Номер телефона</ControlLabel>
          <FormControl
            errorMessage={errorMessage}
            type="text"
            name="phone"
            placeholder="+7 900 123 4565"
            required
          />
        </FormGroup>
      )}

      {currentStep === STEPS.SMS_CODE_STEP && (
        <FormGroup className="form-group">
          <ControlLabel className="form-label">
            Код, отправленный вам по SMS
          </ControlLabel>
          <FormControl
            errorMessage={errorMessage}
            type="text"
            name="code"
            placeholder="123456"
            required
          />
        </FormGroup>
      )}

      <FormGroup className="form-footer">
        {currentStep === STEPS.PHONE_NUMBER_STEP && (
          <>
            <Button
              loading={isSubmitting}
              block
              className="login-form-submit"
              skin="inverse"
              type="submit"
            >
              Выслать код
            </Button>
            <Button
              block
              loading={isSubmitting}
              className="login-form-alternate"
              skin="light"
              appearance="ghost"
            >
              Вход по ЭЦП
            </Button>
          </>
        )}

        {currentStep === STEPS.SMS_CODE_STEP && (
          <Button
            block
            loading={isSubmitting}
            className="login-form-submit"
            skin="inverse"
            type="submit"
          >
            Войти
          </Button>
        )}
      </FormGroup>

      <div className="form-recaptcha-container" ref={setRef} />
    </Form>
  );
}
