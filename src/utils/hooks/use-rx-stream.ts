import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function useRxStream<T>(stream: Observable<T>, defaultValue: T): T {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect((): VoidFunction => {
    const subscription = stream.subscribe((nextValue: T): void =>
      setValue(nextValue)
    );

    return (): void => subscription.unsubscribe();
  }, [stream]);

  return value;
}
