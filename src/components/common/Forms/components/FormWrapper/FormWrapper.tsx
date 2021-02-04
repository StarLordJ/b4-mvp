import * as React from 'react';

import './style.scss';

type TFormWrapperProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

export function FormWrapper({
  title,
  children
}: TFormWrapperProps): JSX.Element {
  return (
    <div className="form-wrapper">
      <div className="form-wrapper__title">{title}</div>
      <div className="form-wrapper__content">{children}</div>
    </div>
  );
}
