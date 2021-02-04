import * as React from 'react';

import './style.scss';
import { Icon } from '../Icon';

export type TOpportinityItemProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  icon: React.ReactNode;
};

export function OpportinityItem({
  title,
  description,
  icon
}: TOpportinityItemProps): JSX.Element {
  return (
    <div className="opportunity-item">
      <div className="opportunity-item__icon-wrapper">
        <Icon>{icon}</Icon>
      </div>

      <div className="opportunity-item__title">{title}</div>
      <div className="opportunity-item__description">{description}</div>
    </div>
  );
}
