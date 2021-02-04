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

import { ReactComponent as DocumentsAdd } from '../../../../assets/images/svg/documents-add.svg';
import { Button } from '../../../common/Button';
import { useRxStream } from '../../../../utils/hooks';
import { uploadDocumentsActionCardVisibilityStreams } from './consts';

export const UploadDocumentsActionCard = React.memo(
  (): JSX.Element => {
    const [
      currentCompany,
      documentsSended
    ] = useRxStream(uploadDocumentsActionCardVisibilityStreams, [null, true]);
    const wasProcessed = Boolean(currentCompany?.wasProcessed);

    if (wasProcessed || documentsSended) return <></>;

    return (
      <Card className="mvp-action-card" horizontal>
        <CardIcon className="mvp-action-card-icon">
          <SvgIcon round>
            <DocumentsAdd width="36" height="36" />
          </SvgIcon>
        </CardIcon>

        <CardContent>
          <CardTitle>Приложить сканы документов</CardTitle>
          Вам потребуются сканы устава, паспорта генерального директора,
          отчетность за&nbsp;пошлый год&nbsp;&mdash; и&nbsp;другие стандартные
          документы о&nbsp;компании.
        </CardContent>

        <CardControls position="right">
          <Button
            theme="light"
            onClick={ModalsOpenerService.openUploadCompanyDocumentsForm}
          >
            Приложить
          </Button>
        </CardControls>
      </Card>
    );
  }
);

UploadDocumentsActionCard.displayName = 'UploadDocumentsActionCard';
