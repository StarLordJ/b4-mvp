import * as React from 'react';

import { modalWrapperService } from '../../../../services';
import { userCompanyDataSended } from '../../../../stores';
import { FormWrapper, SuccessNotifier } from '../components';
import { Dropzone } from './Dropzone';
import { FileList } from './FilesList';

import './style.scss';

export function UploadCompanyDocumentsForm(): JSX.Element {
  const [isUploaded, setIsUploaded] = React.useState(false);

  React.useEffect((): VoidFunction => {
    const sub = userCompanyDataSended.documentsSended$.subscribe(setIsUploaded);

    return (): void => sub.unsubscribe();
  }, []);

  return (
    <FormWrapper title={!isUploaded ? 'Приложить сканы документов' : ''}>
      {!isUploaded && (
        <div>
          <div className="upload-documents-form-row">
            <div className="upload-documents-form-dropzone-col">
              <div className="mvp-dropzone">
                <Dropzone />
              </div>
            </div>
            <div className="upload-documents-form-disclaimer-col">
              <div className="documents-disclaimer">
                <h3 className="documents-disclaimer-title">
                  Список документов, которые необходимо приложить
                </h3>

                <ul className="documents-disclaimer-list">
                  <li className="documents-disclaimer-list-item">
                    Бухгалтерская отчетность (год)
                  </li>
                  <li className="documents-disclaimer-list-item">
                    Бухгалтерская отчетность (квартал)
                  </li>
                  <li className="documents-disclaimer-list-item">Устав</li>
                  <li className="documents-disclaimer-list-item">
                    Решение/Доверенность
                  </li>
                  <li className="documents-disclaimer-list-item">Паспорт</li>
                  <li className="documents-disclaimer-list-item">
                    Договор Аренды /право Cобстветнности
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <FileList />
        </div>
      )}
      {isUploaded && (
        <SuccessNotifier
          onClick={modalWrapperService.closeModal}
          buttonText="Вернуться на главную"
          text={
            <>
              <p className="upload-success-text">Cпасибо!</p>
              <p className="upload-success-text">Мы обрабатываем документы</p>
            </>
          }
        />
      )}
    </FormWrapper>
  );
}
