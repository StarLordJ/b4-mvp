import * as React from 'react';

type TErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  unknown,
  TErrorBoundaryState
> {
  readonly state: TErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
