import * as React from 'react';

import './style.scss';
import { Logo } from '../../../../common/Logo';
import { Button } from '../../../../common/Button';

export function MainPageHeader(): JSX.Element {
  return (
    <header className="main-page-header">
      <div className="main-page-header__content">
        <div>
          <Logo mode="narrow" className="main-page-header__logo" />
        </div>
        <div className="main-page-header__actions">
          <nav className="main-page-header__navigation">
            <ul className="main-page-header__navigation-items">
              <li>Преимущества</li>
              <li>Тарифы</li>
              <li>О нас</li>
              <li>Связаться с нами</li>
            </ul>
          </nav>
          <div>
            <Button appearance="primary">Скоро</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
