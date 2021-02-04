import { modalWrapperService } from '../../../services';
import {
  CompanyAccountsForm,
  UploadCompanyDocumentsForm,
  WarrantyClaimForm
} from '../../common/Forms';
import * as React from 'react';

export abstract class ModalsOpenerService {
  public static openWarrantyModal(): void {
    modalWrapperService.openModal({ component: <WarrantyClaimForm /> });
  }

  public static openUploadCompanyDocumentsForm(): void {
    modalWrapperService.openModal({
      component: <UploadCompanyDocumentsForm />
    });
  }

  public static openCompanyAccountsForm(): void {
    modalWrapperService.openModal({ component: <CompanyAccountsForm /> });
  }
}
