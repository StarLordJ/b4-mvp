import React from 'react';
import classNames from 'classnames';

import { Button as NativeButton, ButtonProps } from 'rsuite';

import SvgIcon from 'components/common/SvgIcon';

import { ReactComponent as CaretDown } from 'assets/images/svg/caret-down.svg';

import './style.scss';

type TButtonProps = {
  arrow?: boolean;
  skin?: string;
  className?: string;
  appearance?: 'primary' | 'link' | 'ghost';
} & Partial<ButtonProps>;

export function Button({
  arrow,
  skin,
  className: passedClassName,
  ...transferringProps
}: TButtonProps): JSX.Element {
  const className = classNames({
    btn: true,

    'is-primary': transferringProps.appearance === 'primary',
    'is-link': transferringProps.appearance === 'link',
    'is-ghost': transferringProps.appearance === 'ghost',
    'is-arrow': !!arrow,

    [`skin-${skin}`]: !!skin,
    [`size-${transferringProps.size}`]: !!transferringProps.size,

    [passedClassName]: !!passedClassName
  });

  return (
    <NativeButton className={className} {...transferringProps}>
      <span className="btn-content">{transferringProps.children}</span>

      {((): JSX.Element | void => {
        if (arrow) {
          return (
            <SvgIcon className="btn-arrow">
              <CaretDown width="14" height="8" />
            </SvgIcon>
          );
        }
      })()}
    </NativeButton>
  );
}
