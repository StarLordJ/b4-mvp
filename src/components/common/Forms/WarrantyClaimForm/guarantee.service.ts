import {
  b4Transport,
  TCompanyInn,
  TCompanyLandingInfo,
  TGuaranteeRequest
} from '../../../../transport';
import { TagManagerService } from '../../../../services';
import { currentCompanyStorage } from '../../../../stores';

class GuaranteeService {
  private currentCompanyInn: TCompanyInn = '';

  constructor() {
    currentCompanyStorage.currentCompany$.subscribe(
      (currentCompany: TCompanyLandingInfo | null): void => {
        if (currentCompany) {
          this.currentCompanyInn = currentCompany.inn;
        }
      }
    );
  }
  public sendGuarantee(guarantee: TGuaranteeRequest): Promise<void> {
    return b4Transport
      .sendGuarantee({ ...guarantee, company: this.currentCompanyInn })
      .then((): void => TagManagerService.pushEvent('guarantyLeadSend'));
  }
}

export const guaranteeService = new GuaranteeService();
