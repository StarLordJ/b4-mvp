export type TFormProps = {
  errorText: string;
  isRequestProcessing: boolean;
  onSubmit: (
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  controlName: string;
};
