import * as React from 'react';
import classNames from 'classnames';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardControls } from '../Card';

import './style.scss';

type TProcessNotificationProps = {
  className?: string;
  label: string;
  children: React.ReactNode;
};

export function ProcessNotification(
  props: TProcessNotificationProps
): JSX.Element {
  const { className: passedClassName, ...transferringProps } = props;

  const className = classNames(props.className, {
    'process-notification': true
  });

  return (
    <Card className={className} horizontal {...transferringProps}>
      <CardContent className="process-notification-content">
        <Badge className="process-notification-badge" skin="grey">
          {props.label}
        </Badge>
        {props.children}
      </CardContent>

      <CardControls className="process-notification-controls" position="right">
        <Button appearance="link">Понятно</Button>
      </CardControls>
    </Card>
  );
}
