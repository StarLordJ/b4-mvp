import * as React from 'react';

import { PageLayout } from '../../common/PageLayout';
import { AttentionAlert } from '../../common/AttentionAlert';
import { Button } from '../../common/Button';

import './style.scss';
import { routerHistory } from '../../../router-history';

function goToNextPage(): void {
  routerHistory.push('/cabinet');
}

export function GreetingPage(): JSX.Element {
  return (
    <PageLayout background="main">
      <div className="mvp-01-content">
        <AttentionAlert
          title={'👋  Добро пожаловать!'}
          className="mvp-01-welcome"
        >
          <p className="mvp-01-welcome-content">
            Вы зарегистрированы B4. Наш сервис поможет вам улучшить свои
            результаты в тендерах. 
            <br />
            Чтобы начать работу нужно заполнить анкету компании и приложить
            основные документы.
          </p>
          <Button
            skin="inverse"
            className="mvp-01-welcome-button"
            onClick={goToNextPage}
          >
            Начать
          </Button>
        </AttentionAlert>
      </div>
    </PageLayout>
  );
}
