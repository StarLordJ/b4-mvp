export type TCompanyRecommendsResponse = {
  id: number;
  company: string;
  /**
   * Краткое описание тендера
   */
  topic: string;
  /**
   * Компания, опубликовавшая тендер
   */
  customer: string;
  /**
   * Номер счета
   */
  accountNumber: string;
  /**
   * Вероятность победы
   */
  probabilityOfVictory: string;
  /**
   * Сумма
   */
  total: string;
  /**
   * Дата публикации
   */
  publishedAt: string;
  /**
   * ФЗ
   */
  federalLaw: string;
  /**
   * Одобрена гарантия
   */
  warrantyApproved: boolean;
  /**
   * Сумма гарантии
   */
  warrantySum: number;
};
