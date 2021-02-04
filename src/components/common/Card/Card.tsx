import * as React from 'react';
import classnames from 'classnames';

import { Panel, PanelProps } from 'rsuite';

type TCardProps = {
  horizontal?: boolean;
  className: string;
  children: React.ReactNode;
} & PanelProps;

export function Card({
  horizontal,
  className,
  children,
  ...forwardingProps
}: TCardProps): JSX.Element {
  return (
    <Panel
      classPrefix="card"
      className={classnames({
        'direction-horizontal': !!horizontal,

        [className]: className
      })}
      {...forwardingProps}
    >
      {children}
    </Panel>
  );
}
