import * as React from 'react';
import classNames from 'classnames';

type TCardTitleProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardTitle(props: TCardTitleProps): JSX.Element {
  const className = classNames(props.className, {
    'card-title': true
  });

  return <div className={className}>{props.children}</div>;
}
