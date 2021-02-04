import * as React from 'react';
import { MainPageHeader } from '../MainPageHeader';
import { MainPageFooter } from '../MainPageFooter/MainPageFooter';

import './style.scss';

type TMainPageLayoutProps = {
  children: React.ReactNode;
};

export function MainPageLayout({
  children
}: TMainPageLayoutProps): JSX.Element {
  return (
    <>
      <MainPageHeader />
      <main className="main-page-layout__content">{children}</main>
      <MainPageFooter />
    </>
  );
}
