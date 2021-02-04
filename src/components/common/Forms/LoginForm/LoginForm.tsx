import * as React from 'react';

import {
  LoginFormService,
  STEPS,
  TLoginFormServiceState
} from './login-form.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CodeConfirmForm, PhoneTypingForm } from './components';
import { Logo } from '../../Logo';

import './style.scss';

type TLoginFormProps = {
  done?: VoidFunction;
};

enum FormControlNames {
  PHONE = 'phone',
  CODE = 'code'
}
export class LoginForm extends React.Component<
  TLoginFormProps,
  TLoginFormServiceState
> {
  private destroy$: Subject<void> = new Subject();
  private service: LoginFormService = new LoginFormService();
  readonly state: TLoginFormServiceState = {
    isRequestProcessing: false,
    currentStep: STEPS.PHONE_NUMBER_STEP,
    errorText: ''
  };

  public componentDidMount(): void {
    this.service.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: TLoginFormServiceState): void => this.setState(state));
  }

  public componentWillUnmount(): void {
    this.destroy$.next(void 0);
    this.destroy$.complete();
  }

  private handleFormSubmit = (
    _: boolean,
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    const form = event.nativeEvent.target as HTMLFormElement;
    const value: string =
      form &&
      form.elements[
        this.state.currentStep === STEPS.PHONE_NUMBER_STEP
          ? FormControlNames.PHONE
          : FormControlNames.CODE
      ].value;

    this.service.sendFormValue(value);
  }

  render(): React.ReactNode {
    const { currentStep, errorText, isRequestProcessing } = this.state;

    return (
      <div className="login-form-wrapper">
        <div className="login-form-title-wrapper">
          <Logo mode="narrow" className="login-form-logo" />
        </div>
        <div className="login-form">
          {currentStep === STEPS.PHONE_NUMBER_STEP && (
            <PhoneTypingForm
              errorText={errorText}
              isRequestProcessing={isRequestProcessing}
              onSubmit={this.handleFormSubmit}
              controlName={FormControlNames.PHONE}
            />
          )}
          {currentStep === STEPS.SMS_CODE_STEP && (
            <CodeConfirmForm
              errorText={errorText}
              isRequestProcessing={isRequestProcessing}
              onSubmit={this.handleFormSubmit}
              controlName={FormControlNames.CODE}
            />
          )}
        </div>
      </div>
    );
  }
}
