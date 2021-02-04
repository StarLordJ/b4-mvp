import * as React from 'react';

import './style.scss';

type TCardProps = {
  icon: React.ReactNode;
  description: React.ReactNode;
};

export function Card({ icon, description }: TCardProps): JSX.Element {
  return (
    <div className="tender-card">
      <div className="tender-card-icon">{icon}</div>
      <div className="tender-card-description">{description}</div>
    </div>
  );
}
