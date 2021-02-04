import * as React from 'react';
import {
  Card,
  CardIcon,
  CardContent,
  CardTitle,
  CardControls
} from '../../../common/Card';
import { SvgIcon } from '../../../common/SvgIcon';
import { ModalsOpenerService } from '../modals-opener.service';

import { ReactComponent as DocumentsSearch } from '../../../../assets/images/svg/documents-search.svg';
import { Button } from '../../../common/Button';
import { useRxStream } from '../../../../utils/hooks';
import { uploadCompanyAccountsActionCardVisibilityStreams$ } from './consts';

export const UploadCompanyAccountsActionCard = React.memo(
  (): JSX.Element => {
    const [
      currentCompany,
      companyAccountsSended
    ] = useRxStream(uploadCompanyAccountsActionCardVisibilityStreams$, [
      null,
      true
    ]);
    const wasProcessed = Boolean(currentCompany?.wasProcessed);

    if (wasProcessed || companyAccountsSended) return <></>;

    return (
      <Card className="mvp-action-card" horizontal>
        <CardIcon className="mvp-action-card-icon">
          <SvgIcon round>
            <DocumentsSearch width="36" height="36" />
          </SvgIcon>
        </CardIcon>

        <CardContent>
          <CardTitle>Проверить и&nbsp;заполнить анкету компании</CardTitle>
          Добавьте данные о&nbsp;расчетном счете.
        </CardContent>

        <CardControls position="right">
          <Button
            theme="light"
            onClick={ModalsOpenerService.openCompanyAccountsForm}
          >
            Добавить
          </Button>
        </CardControls>
      </Card>
    );
  }
);

UploadCompanyAccountsActionCard.displayName = 'UploadCompanyAccountsActionCard';
