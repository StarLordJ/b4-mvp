import * as React from 'react';
import { ProcessNotification } from '../../../common/ProcessNotification';
import { useRxStream } from '../../../../utils/hooks';
import { processNotificationCardVisibilityStreams$ } from './consts';
import { hideNotificationService } from './hide-notification.service';

export const ProcessNotificationCard = React.memo(
  (): JSX.Element => {
    const [
      companyAccountsSended,
      documentsSended,
      currentCompany,
      isHiddenByUser
    ] = useRxStream(processNotificationCardVisibilityStreams$, [
      true,
      true,
      null,
      true
    ]);
    const wasProcessed = currentCompany ? currentCompany.wasProcessed : true;
    const isVisible =
      companyAccountsSended &&
      documentsSended &&
      !wasProcessed &&
      !isHiddenByUser;

    const handleHideNotification = React.useCallback((): void => {
      currentCompany &&
        hideNotificationService.setNotificationHideState(currentCompany.inn);
    }, [currentCompany]);

    if (!isVisible) return <></>;

    return (
      <ProcessNotification
        label="Фоновый процесс"
        onHideNotification={handleHideNotification}
      >
        Обратабываем ваши документы и&nbsp;анкету. Уведомим, как все будет
        готово.
      </ProcessNotification>
    );
  }
);
