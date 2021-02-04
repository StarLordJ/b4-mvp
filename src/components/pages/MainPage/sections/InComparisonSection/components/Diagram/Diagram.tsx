import * as React from 'react';

import './style.scss';

type TDiagramProps = {
  title: string;
  fillPercent: number;
};

const STROKE_DASHARRAY = 470.5;
const FULL_PERCENTAGE = 100;

function calculateStrokeDashArray(fillPercent: number = 0): string {
  return `${(STROKE_DASHARRAY * fillPercent) /
    FULL_PERCENTAGE} ${STROKE_DASHARRAY}`;
}

export function Diagram({
  title,
  fillPercent = 0
}: TDiagramProps): JSX.Element {
  const svgRef = React.useRef<null | SVGSVGElement>(null);
  const textBlockRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect((): void => {
    const svgElement = svgRef.current;
    const textBlockElement = textBlockRef.current;

    if (svgElement && textBlockElement) {
      const svgClone = svgElement.cloneNode(true);
      const circleElement = (svgClone as SVGSVGElement).querySelector('circle');

      if (circleElement) {
        circleElement.style.fill = 'white';
        circleElement.style.stroke = 'black';
      }

      textBlockElement.style.backgroundImage = `url('data:image/svg+xml;utf8,${
        (svgClone as SVGSVGElement).outerHTML
      }')`;
    }
  }, [fillPercent, svgRef, textBlockRef]);

  return (
    <div
      className="comparison-section-diagram-wrapper"
      style={{ background: `` }}
    >
      <svg
        width="150"
        height="150"
        className="comparison-section-diagram"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(145)"
        ref={svgRef}
      >
        <circle
          r="75"
          cx="75"
          cy="75"
          strokeDasharray={calculateStrokeDashArray(fillPercent)}
          strokeWidth="150"
          className="comparison-section-diagram__chart"
          style={{
            fill: '#ececf4',
            stroke: '#567df4'
          }}
        />
      </svg>
      <div ref={textBlockRef} className="comparison-section-diagram-title">
        {title}
      </div>
    </div>
  );
}
