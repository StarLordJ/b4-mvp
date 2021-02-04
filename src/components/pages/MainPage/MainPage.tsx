import * as React from 'react';

import './style.scss';
import { MainPageLayout } from './components';
import {
  HeaderSection,
  InComparisonSection,
  GreatOpportunitiesSection,
  ExperiencedTendererSection
} from './sections';

export function MainPage(): JSX.Element {
  return (
    <MainPageLayout>
      <HeaderSection />
      <InComparisonSection />
      <GreatOpportunitiesSection />
      <ExperiencedTendererSection />
    </MainPageLayout>
  );
}
