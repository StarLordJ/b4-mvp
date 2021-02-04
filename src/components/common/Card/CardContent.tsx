import * as React from 'react';
import classNames from 'classnames';

type TCardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardContent(props: TCardContentProps): JSX.Element {
  const className = classNames(props.className, {
    'card-content': true
  });

  return <div className={className}>{props.children}</div>;
}
