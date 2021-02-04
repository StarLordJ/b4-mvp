import * as React from 'react';
import classnames from 'classnames';

import './style.scss';

type TSVGIconProps = {
  className?: string;
  round?: boolean;
  rounded?: boolean;
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
};

// TODO replace with NativeIcon component
export function SvgIcon(props: TSVGIconProps): JSX.Element {
  const { width = '16', height = '16' } = props;

  const className = classnames(props.className, {
    'svg-icon': true,

    'is-round': !!props.round,
    'is-rounded': !!props.rounded
  });

  return (
    <span className={className} style={{ width, height }}>
      {props.children}
    </span>
  );
}
