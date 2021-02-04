import * as React from 'react';

import './style.scss';

type TIconProps = {
  children: React.ReactNode;
};

export function Icon({ children }: TIconProps): JSX.Element {
  return <div className="opportunity-item-icon">{children}</div>;
}
