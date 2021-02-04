import * as React from 'react';
import classNames from 'classnames';

type TCardIconProps = {
  className: string;
  children: React.ReactNode;
};

export function CardIcon(props: TCardIconProps): JSX.Element {
  const className = classNames({
    'card-icon': true,
    [props.className]: props.className
  });

  return <div className={className}>{props.children}</div>;
}
