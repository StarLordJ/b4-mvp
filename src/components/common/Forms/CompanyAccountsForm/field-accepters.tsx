import * as React from 'react';
import { FormControlProps } from 'rsuite';

import MaskedInput from 'react-input-mask';

export function AccountNumberAccepter({
  onChange,
  ...props
}: FormControlProps): JSX.Element {
  const handleChange = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>): void =>
      onChange && onChange(event.currentTarget.value, event),
    [onChange]
  );

  return (
    <MaskedInput
      mask="9999999999999999"
      className="rs-input"
      maskChar={null}
      style={{ width: '343px' }}
      onChange={handleChange}
      {...props}
    />
  );
}
