import {
  firebaseStore,
  landingCurrentCompanyStorage
} from '../../../../stores';
import { auth } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { routerHistory } from '../../../../router-history';
import { modalWrapperService, TagManagerService } from '../../../../services';

export enum STEPS {
  PHONE_NUMBER_STEP = 'phone',
  SMS_CODE_STEP = 'code'
}

export type TLoginFormServiceState = {
  isRequestProcessing: boolean;
  errorText: string;
  currentStep: STEPS;
};

export class LoginFormService {
  private confirmator: auth.ConfirmationResult | null = null;

  // @ts-ignore
  private _state$: BehaviorSubject<
    TLoginFormServiceState
  > = new BehaviorSubject({
    isRequestProcessing: false,
    currentStep: STEPS.PHONE_NUMBER_STEP
  });

  public state$: Observable<
    TLoginFormServiceState
  > = this._state$.asObservable();

  public sendFormValue(value: string): void {
    this.setState(true, this._state$.value.currentStep);
    this._state$.value.currentStep === STEPS.PHONE_NUMBER_STEP &&
      this.signInWithPhoneNumber(value);
    this._state$.value.currentStep === STEPS.SMS_CODE_STEP &&
      this.confirmCode(value);
  }

  private confirmCode(code: string): void {
    this.confirmator &&
      this.confirmator
        .confirm(code)
        .then((response: auth.UserCredential): void => {
          this.setState(false, STEPS.SMS_CODE_STEP);
          firebaseStore.setCurrentUser(response.user);
          modalWrapperService.closeModal();
          TagManagerService.pushEvent('authoSuccess');
          routerHistory.push(
            landingCurrentCompanyStorage.companyInn ? '/greeting' : '/cabinet'
          );
        })
        .catch((error: Error): void =>
          this.setState(false, STEPS.SMS_CODE_STEP, error.message)
        );
  }

  private signInWithPhoneNumber(phone: string): void {
    const verifierContainer = this.getContainer();
    const recaptchaVerifier = firebaseStore.getRecaptchaVerifier(
      verifierContainer
    );

    firebaseStore
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((response: auth.ConfirmationResult): void => {
        this.confirmator = response;
        this.setState(false, STEPS.SMS_CODE_STEP);
      })
      .catch((error: Error): void =>
        this.setState(false, STEPS.PHONE_NUMBER_STEP, error.message)
      )
      .finally((): void => {
        document.body.removeChild(verifierContainer);
      });
  }

  private getContainer(): HTMLDivElement {
    const container = document.createElement('div');

    container.className = 'form-recaptcha-container';
    document.body.appendChild(container);

    return container;
  }

  private setState(
    isRequestProcessing: boolean,
    currentStep: STEPS,
    errorText: string = ''
  ): void {
    this._state$.next({ isRequestProcessing, errorText, currentStep });
  }
}
