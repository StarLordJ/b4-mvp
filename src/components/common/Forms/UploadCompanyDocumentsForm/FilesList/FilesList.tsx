import * as React from 'react';
import { fileUploadService } from '../Dropzone';
import { TProcessUploadFile } from '../file-upload.service';
import { Button } from '../../../Button';
import { FileListItem } from './FileListItem';
import './style.scss';
import { useRxStream } from '../../../../../utils/hooks';

export const FileList = React.memo(
  (): JSX.Element => {
    const processingFiles = useRxStream(
      fileUploadService.processUploadingFiles$,
      {}
    );

    React.useEffect((): VoidFunction => {
      return (): void => fileUploadService.reset();
    }, []);

    const values = Object.values(processingFiles);

    return (
      <>
        <div className="company-file-list">
          {values.map(
            (processingFile: TProcessUploadFile): JSX.Element => (
              <FileListItem
                onDeleteFile={fileUploadService.deleteFile}
                info={processingFile}
                key={processingFile.fileName}
              />
            )
          )}
        </div>

        {values.length > 0 && (
          <div className="company-file-list__button-wrapper">
            <Button
              onClick={fileUploadService.mapFilesToCompany}
              skin="light"
              className="info-modal-results-button"
            >
              Отправить
            </Button>
          </div>
        )}
      </>
    );
  }
);
