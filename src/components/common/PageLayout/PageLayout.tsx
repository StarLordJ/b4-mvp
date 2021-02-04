import * as React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import './style.scss';

type TPageLayoutProps = {
  children: React.ReactNode;
  background?: 'default' | 'main';
};

export function PageLayout({
  children,
  background = 'default'
}: TPageLayoutProps): JSX.Element {
  return (
    <div
      className="page-layout-wrapper"
      style={{
        backgroundColor: background === 'default' ? 'white' : '#fcfcfa'
      }}
    >
      <section className="page-layout">
        <Header transparent={background === 'default'} />
        <main className="page-layout-content">{children}</main>
        <Footer />
      </section>
    </div>
  );
}
