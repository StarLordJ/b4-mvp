import * as React from 'react';
import { SectionLayout } from '../SectionLayout';

import './style.scss';
import { scrollSectionId } from '../scroll-section-id.conts';
import { CompanyCard, Diagram, HorizontalChart } from './components';

export function InComparisonSection(): JSX.Element {
  return (
    <SectionLayout title="В сравнении" id={scrollSectionId}>
      <div className="comparison-section-content">
        <div className="comparison-section__companies-card">
          <div className="comparison-section__companies-card-wrapper">
            <CompanyCard companyName="Компания А" serviceUsage />
          </div>
          <div className="comparison-section__companies-card-wrapper">
            <CompanyCard companyName="Компания Б" serviceUsage={false} />
          </div>
        </div>
        <div className="comparison-section__charts">
          <div className="comparison-section__charts-title">
            IV квартал 2019
          </div>
          <div className="comparison-section__charts-wrapper">
            <div className="comparison-section__chart-item">
              <Diagram title="9 побед" fillPercent={90} />
              <div className="comparison-section__chart-item-description">
                12 торгов
              </div>
            </div>
            <div className="comparison-section__chart-item">
              <HorizontalChart
                fillPercent={75}
                title={
                  <span className="comparison-section__chart-horizontal-chart-title">
                    в <span>5</span> раз больше
                  </span>
                }
              />
              <div className="comparison-section__chart-item-pre-description">
                Объем продаж
              </div>
              <div className="comparison-section__chart-item-description">
                147 344 000 ₽
              </div>
            </div>
            <div className="comparison-section__chart-item">
              <HorizontalChart fillPercent={15} />
              <div className="comparison-section__chart-item-pre-description">
                Объем продаж
              </div>
              <div className="comparison-section__chart-item-description">
                128 000 ₽
              </div>
            </div>
            <div className="comparison-section__chart-item">
              <Diagram title="1 победа" fillPercent={10} />
              <div className="comparison-section__chart-item-description">
                5 торгов
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
