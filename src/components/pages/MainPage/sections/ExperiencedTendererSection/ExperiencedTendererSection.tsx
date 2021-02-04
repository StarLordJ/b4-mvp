import * as React from 'react';
import { SectionLayout } from '../SectionLayout';
import { Card } from './components';

import { ReactComponent as Shield } from './assets/Vector1.svg';

import { ReactComponent as CashBack } from './assets/Vector4.svg';
import { ReactComponent as Line } from './assets/Vector3.svg';
import { ReactComponent as Percent } from './assets/Vector2.svg';

import './style.scss';

function ComplexIcon(): JSX.Element {
  return (
    <>
      <CashBack />
      <span className="tender-section__card-complex-icon-empty" />
      <Line />
      <span className="tender-section__card-complex-icon-empty" />
      <Percent />
    </>
  );
}

export function ExperiencedTendererSection(): JSX.Element {
  return (
    <SectionLayout title="Вы опытный участник торгов?">
      <div className="tender-section-description">
        Тогда вам тем более нужно использовать&nbsp;B4.
      </div>
      <div className="tender-section-cards">
        <div className="tender-section-card-wrapper">
          <Card
            icon={<Shield />}
            description="Получение гарантий напрямую от банков"
          />
        </div>
        <div className="tender-section-card-wrapper">
          <Card
            icon={<ComplexIcon />}
            description="Кэшбек или скидка за каждую гарантию"
          />
        </div>
      </div>
    </SectionLayout>
  );
}
