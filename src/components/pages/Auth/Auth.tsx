import * as React from 'react';
import { LoginForm } from '../../common/Forms';

import './style.scss';

export function Auth(): JSX.Element {
  return (
    <div className="auth">
      <LoginForm />
    </div>
  );
}
