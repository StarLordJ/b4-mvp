import * as React from 'react';
import classNames from 'classnames';

type TCardFooterProps = {
  className: string;
  children: React.ReactNode;
};

export function CardFooter(props: TCardFooterProps): JSX.Element {
  const className = classNames({
    'card-footer': true,
    [props.className]: props.className
  });

  return <div className={className}>{props.children}</div>;
}
