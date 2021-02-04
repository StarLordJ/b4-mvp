import { TCompanyInn } from '../responses';

export type TGuaranteeRequest = {
  id?: number;
  user?: number;
  /**
   * Имя
   */
  contactName?: string;
  /**
   * Телефон
   */
  phone?: string;
  /**
   * Почта
   */
  email: string;
  /**
   * Реестровый номер торгов
   */
  purchaseNumber: string;
  /**
   * Вид банковской гарантии
   */
  bgType: string;
  /**
   * Сумма гарнатии
   */
  bgSum: string;
  /**
   * Дата тендера
   */
  purchaseDate: string;
  /**
   * Дата начала гарантии
   */
  startDate: string;
  /**
   * Дата конца гарантии
   */
  endDate: string;
  /**
   * Закон
   */
  law: string;
  /**
   * Компания
   */
  company: TCompanyInn;
};
