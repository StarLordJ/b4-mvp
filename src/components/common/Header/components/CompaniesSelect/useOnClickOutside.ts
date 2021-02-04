import * as React from 'react';

export function useOnClickOutside(
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => void
): void {
  React.useEffect(
    (): (() => void) => {
      const listener = (event: Event): void => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return (): void => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
