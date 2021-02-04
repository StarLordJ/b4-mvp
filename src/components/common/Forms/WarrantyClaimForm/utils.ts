export function calculateDays(from: Date, to: Date): number {
  const diff = to.getTime() - from.getTime();

  // tslint:disable-next-line:no-magic-numbers
  return Math.floor(diff / (1000 * 3600 * 24));
}

export const lawSelectItems = [
  {
    value: 'ФЗ-44',
    label: 'ФЗ-44'
  },
  {
    value: 'ФЗ-223',
    label: 'ФЗ-223'
  }
];

export const guaranteeTypesItems = [
  {
    value: 'Обеспечение исполнения обязательств по контракту',
    label: 'Обеспечение исполнения обязательств по контракту'
  },
  {
    value: 'Обеспечение заявки на участие в торгах',
    label: 'Обеспечение заявки на участие в торгах'
  },
  {
    value: 'Обеспечение на возврат аванса',
    label: 'Обеспечение на возврат аванса'
  },
  {
    value: 'Обеспечение гарантийных обязательств',
    label: 'Обеспечение гарантийных обязательств'
  }
];
