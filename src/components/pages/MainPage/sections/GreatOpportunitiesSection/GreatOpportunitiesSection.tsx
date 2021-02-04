import * as React from 'react';
import { SectionLayout } from '../SectionLayout';
import { OpportinityItem, TOpportinityItemProps } from './components';
import image from './assets/preview.png';

import './style.scss';
import { itemsContent } from './items-content';

export function GreatOpportunitiesSection(): JSX.Element {
  return (
    <div className="opportunities-section-wrapper">
      <img
        src={image}
        alt="ipad-view"
        className="opportunities-section__image"
      />
      <SectionLayout
        title={`Большие возможности \n для вашей \n эффективной работы`}
      >
        <div>
          <div className="opportunities-section__items">
            {itemsContent.map(
              (item: TOpportinityItemProps, index: number): JSX.Element => (
                <OpportinityItem {...item} key={index} />
              )
            )}
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
