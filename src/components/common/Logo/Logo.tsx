import * as React from 'react';
import classnames from 'classnames';

import logo from './assets/logo.svg';
import logoNarrow from './assets/logo-narrow.svg';

import './style.scss';

type TLogoProps = {
  className?: string;
  mode?: 'wide' | 'narrow';
};

export function Logo(props: TLogoProps): JSX.Element {
  const { className, mode = 'wide', ...forwardingProps } = props;

  const logoImage = mode === 'narrow' ? logoNarrow : logo;

  return (
    <img
      src={logoImage}
      className={classnames(className, {
        logo: true,
        [`is-${mode}`]: !!mode
      })}
      alt="B4ALL"
      {...forwardingProps}
    />
  );
}
