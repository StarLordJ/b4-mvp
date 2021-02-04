import * as React from 'react';
import classNames from 'classnames';

type TCardControlsProps = {
  position: string;
  className?: string;
  children: React.ReactNode;
};

export function CardControls(props: TCardControlsProps): JSX.Element {
  const className = classNames(props.className, {
    'card-controls': true,
    [`position-${props.position}`]: !!props.position
  });

  return <div className={className}>{props.children}</div>;
}
