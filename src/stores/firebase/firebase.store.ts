import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

class FireBaseStore {
  private firebaseInstance: firebase.app.App;
  // @ts-ignore
  private _isLoggedIn$: BehaviorSubject<boolean | void> = new BehaviorSubject(
    void 0
  );

  public currentUser: firebase.User | null = null;

  public isLoggedIn$: Observable<
    boolean | void
  > = this._isLoggedIn$.asObservable().pipe(distinctUntilChanged());

  constructor() {
    this.firebaseInstance = firebase.initializeApp(firebaseConfig);
    this.onAuthStateChanged();
  }

  public get isLoggedIn(): boolean {
    return Boolean(this._isLoggedIn$.value);
  }

  public setCurrentUser(user: firebase.User | null): void {
    this.currentUser = user;
    this._isLoggedIn$.next(Boolean(user));
  }

  public signOut(): void {
    this.firebaseInstance
      .auth()
      .signOut()
      .then((): void => this.setCurrentUser(null));
  }

  public signInWithPhoneNumber(
    phone: string,
    recapthaVerifier: firebase.auth.RecaptchaVerifier
  ): Promise<firebase.auth.ConfirmationResult> {
    return this.firebaseInstance
      .auth()
      .signInWithPhoneNumber(phone, recapthaVerifier);
  }

  public getRecaptchaVerifier(
    container: HTMLDivElement
  ): firebase.auth.RecaptchaVerifier {
    return new firebase.auth.RecaptchaVerifier(container, {
      size: 'invisible',
      callback: (response: unknown): void => console.log(response, 'callback'),
      'expired-callback': (anything: unknown): void =>
        console.log(anything, 'expired-callback')
    });
  }

  private onAuthStateChanged(): void {
    this.firebaseInstance
      .auth()
      .onAuthStateChanged((user: firebase.User | null): void => {
        this.setCurrentUser(user);
      });
  }
}

export const firebaseStore = new FireBaseStore();
