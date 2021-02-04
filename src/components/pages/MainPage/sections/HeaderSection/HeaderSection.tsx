import * as React from 'react';
import { Button } from '../../../../common/Button';
import { ReactComponent as Arrow } from './assets/arrow.svg';

import { scrollSectionId } from '../scroll-section-id.conts';

import './style.scss';

const PAGE_HEADER_HEIGHT_PX = 80;

export function HeaderSection(): JSX.Element {
  const handleScrollToSection = React.useCallback((): void => {
    const section = document.querySelector(`#${scrollSectionId}`);

    if (section instanceof HTMLElement) {
      const rect = section.getBoundingClientRect();

      window.scrollTo({
        top: window.pageYOffset + rect.top - PAGE_HEADER_HEIGHT_PX,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="header-section-block">
      <div className="header-section__content">
        <span className="header-section-title">
          Мы&nbsp;помогаем зарабатывать на&nbsp;госзакупках в&nbsp;разы больше
        </span>
        <span className="header-section-description">
          B4&nbsp;&mdash; это незаменимый инструмент для компаний, работающих
          с&nbsp;госзаказом. Мы&nbsp;помогаем получить лучшие условия
          по&nbsp;банковским гарантиям.
        </span>
        <Button appearance="ghost" skin="light">
          Скоро
        </Button>
      </div>
      <div className="continue-button" onClick={handleScrollToSection}>
        <Arrow />
      </div>
    </div>
  );
}
