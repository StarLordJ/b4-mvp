import * as React from 'react';
import { CompaniesSelect, HeaderControls } from './components';
import { Logo } from '../Logo';

import './style.scss';

type THeanderProps = {
  transparent: boolean;
};

export function Header({ transparent }: THeanderProps): JSX.Element {
  return (
    <header
      className="page-header"
      style={{ backgroundColor: transparent ? 'transparent' : 'inherit' }}
    >
      <div className="page-header__content">
        <Logo className="page-header__logo" />
        {!transparent && <CompaniesSelect />}
        <HeaderControls />
      </div>
    </header>
  );
}
