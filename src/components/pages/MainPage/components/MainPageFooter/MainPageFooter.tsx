import * as React from 'react';

import './style.scss';
import { Logo } from '../../../../common/Logo';

export function MainPageFooter(): JSX.Element {
  return (
    <footer className="main-page-footer">
      <Logo className="main-page-footer__logo" />
      <span className="main-page-footer__copyright">ООО «Б4», 2020</span>
    </footer>
  );
}
