import { BehaviorSubject, Observable } from 'rxjs';
import { guid } from '../../../../utils/guid';
import {
  currentCompanyStorage,
  firebaseStore,
  userCompanyDataSended
} from '../../../../stores';
import {
  b4Transport,
  TCompanyFileResponse,
  TCompanyInn,
  TCompanyLandingInfo,
  TFileUploadResponse
} from '../../../../transport';
import { TagManagerService } from '../../../../services';

export type TProcessUploadFile = {
  id?: number;
  processUploading: 'pending' | 'error' | 'success';
  fileName: string;
  storeId: string;
};

export type TProcessUploadFiles = {
  [id: string]: TProcessUploadFile;
};

class FileUploadService {
  private files: TCompanyFileResponse[] = [];
  private currentCompany: TCompanyInn | null = null;
  private uploadedFiles: TFileUploadResponse[] = [];
  // @ts-ignore
  private _processUploadingFiles$: BehaviorSubject<
    TProcessUploadFiles
  > = new BehaviorSubject({});

  public processUploadingFiles$: Observable<
    TProcessUploadFiles
  > = this._processUploadingFiles$.asObservable();

  constructor() {
    this.getFilesList();
  }

  public getFilesList(): void {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean | void): void => {
      isLoggedIn &&
        b4Transport
          .getFilesList()
          .then((files: TCompanyFileResponse[]): void => {
            this.files = files;
            currentCompanyStorage.currentCompany$.subscribe(
              (currentCompany: TCompanyLandingInfo | null): void => {
                this.currentCompany = currentCompany?.inn || null;
                this.filterCompanyFiles();
              }
            );
          });
    });
  }

  public uploadFiles(files: File[]): void {
    files.forEach(
      (file: File, index: number): Promise<void> => {
        const formData = new FormData();
        const id = guid();

        formData.append('file', file);

        this._processUploadingFiles$.next({
          ...this._processUploadingFiles$.value,
          [id]: {
            fileName: file.name,
            processUploading: 'pending',
            storeId: id
          }
        });

        return b4Transport
          .uploadFile(formData)
          .then((serverData: TFileUploadResponse): void => {
            this._processUploadingFiles$.next({
              ...this._processUploadingFiles$.value,
              [id]: {
                fileName: file.name,
                processUploading: 'success',
                id: serverData.id,
                storeId: id
              }
            });

            this.uploadedFiles.push(serverData);
          });
      }
    );
  }

  public mapFilesToCompany = (): void => {
    if (!this.currentCompany) {
      throw new Error('InvalidProgramState: Компания уже должна быть указана');
    }

    const promises = this.uploadedFiles.map(
      (uploadedFile: TFileUploadResponse): Promise<TCompanyFileResponse> =>
        b4Transport.mapFileIdWithCompany(
          uploadedFile.id,
          this.currentCompany as string
        )
    );

    Promise.all(promises).then((response: TCompanyFileResponse[]): void => {
      TagManagerService.pushEvent('docSend');
      this.files = response;
      userCompanyDataSended.setDocumentsSended(this.files.length > 0);
    });
  }

  public deleteFile = (file: TProcessUploadFile): void => {
    this.uploadedFiles = this.uploadedFiles.filter(
      (fileInfo: TFileUploadResponse): boolean => fileInfo.id !== file.id
    );
    const newState = { ...this._processUploadingFiles$.value };
    delete newState[file.storeId];
    this._processUploadingFiles$.next(newState);
  }

  public reset(): void {
    this._processUploadingFiles$.next({});
  }

  private filterCompanyFiles(): void {
    const filtered = this.files.filter(
      (file: TCompanyFileResponse): boolean =>
        file.company === this.currentCompany
    );
    userCompanyDataSended.setDocumentsSended(filtered.length > 0);
  }
}

export const fileUploadService = new FileUploadService();
