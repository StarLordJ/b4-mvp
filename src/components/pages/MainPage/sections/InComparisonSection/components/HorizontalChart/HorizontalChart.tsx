import * as React from 'react';

import './style.scss';

type THorizontalChartProps = {
  title?: React.ReactNode;
  fillPercent: number;
};

export function HorizontalChart({
  title,
  fillPercent
}: THorizontalChartProps): JSX.Element {
  return (
    <div className="comparison-section-horizontal-chart">
      <div
        className="comparison-section-horizontal-chart__progress"
        style={{ height: `${fillPercent}%` }}
      />
      <span className="comparison-section-horizontal-chart__title">
        {title}
      </span>
    </div>
  );
}
