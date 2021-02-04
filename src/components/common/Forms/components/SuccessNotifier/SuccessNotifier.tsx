import * as React from 'react';
import { Button } from '../../../Button';
import './style.scss';

type TSuccessNotifierProps = {
  onClick: VoidFunction;
  text: React.ReactNode;
  buttonText: string;
};

export function SuccessNotifier({
  onClick,
  text,
  buttonText
}: TSuccessNotifierProps): JSX.Element {
  return (
    <div className="success-notifier-results">
      {text}
      <Button
        skin="light"
        className="success-notifier-results-button"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
