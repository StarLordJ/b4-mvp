import * as React from 'react';

import './style.scss';

type TSectionLayoutProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  nolayout?: boolean;
};

export function SectionLayout({
  title,
  children,
  id
}: TSectionLayoutProps): JSX.Element {
  return (
    <section id={id} className="section-layout">
      <div className="section-layout-title">{title}</div>
      <div>{children}</div>
    </section>
  );
}
