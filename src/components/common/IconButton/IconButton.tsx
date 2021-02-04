import * as React from 'react';
import classnames from 'classnames';

import { IconButton as NativeIconButton, IconButtonProps } from 'rsuite';

import './style.scss';

type TIconButtonProps = {
  skin: 'default' | string;
  className: string;
  children?: React.ReactElement;
} & IconButtonProps;

export function IconButton(props: TIconButtonProps): JSX.Element {
  const { skin = 'default', className, appearance, ...forwardingRefs } = props;

  const componentClassNames = classnames({
    'icon-button': true,
    'skin-primary': skin === 'primary',
    'skin-light': skin === 'light',
    'skin-default': skin === 'default',
    'skin-orange': skin === 'orange',
    'is-outlined': appearance === 'ghost',
    [`placement-${props.placement}`]: !!props.placement,
    [className]: className
  });

  return (
    <NativeIconButton
      icon={props.children}
      className={componentClassNames}
      appearance={appearance}
      {...forwardingRefs}
    />
  );
}
