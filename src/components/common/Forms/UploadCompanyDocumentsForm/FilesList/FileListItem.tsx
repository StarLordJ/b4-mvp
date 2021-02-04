import * as React from 'react';
import { TProcessUploadFile } from '../file-upload.service';

type TFileListItemProps = {
  onDeleteFile: (id: TProcessUploadFile) => void;
  info: TProcessUploadFile;
};

export function FileListItem({
  onDeleteFile,
  info
}: TFileListItemProps): JSX.Element {
  const handleDeleteFile = React.useCallback((): void => {
    info.id && onDeleteFile(info);
  }, [info, onDeleteFile]);

  return (
    <div className="company-file-item">
      <div className="company-file-item__name">{info.fileName}</div>
      <div className="company-file-item__actions">
        <div
          className={`company-file-item__actions--${info.processUploading}`}
        />
        <div
          className="company-file-item__actions--delete"
          onClick={handleDeleteFile}
        />
      </div>
    </div>
  );
}
