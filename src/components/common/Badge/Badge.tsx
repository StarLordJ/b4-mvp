import * as React from 'react';
import classnames from 'classnames';

import { Badge as NativeBadge } from 'rsuite';

import './style.scss';

type TBandgeProps = {
  children: React.ReactNode;
  skin: unknown;
  className: string;
};

export function Badge({
  children: content,
  skin,
  className,

  ...forwardingProps
}: TBandgeProps): JSX.Element {
  return (
    <NativeBadge
      classPrefix="badge"
      className={classnames({
        [className]: className,

        [`skin-${skin}`]: !!skin
      })}
      content={content}
      {...forwardingProps}
    />
  );
}
