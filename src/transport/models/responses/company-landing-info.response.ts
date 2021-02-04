export type TCompanyInn = string;

export type TCompanyLandingInfo = {
  /**
   * ИНН
   */
  inn: TCompanyInn;
  /**
   * ОГРН
   */
  ogrn: string;
  /**
   * Полное название
   */
  companyName: string;
  /**
   * Сокращённое название
   */
  companyShortName: string;
  /**
   * Доход за 2019 год
   */
  revenue2019: string;
  /**
   * Доход за 2018 год
   */
  revenue2018: string;
  /**
   * Рост выручки
   */
  revenueGrowth: string;
  /**
   * Рост выручки в процентах
   */
  revenueGrowthPerc: string;
  /**
   * Удачных покупок
   */
  purchasesWins: number;
  /**
   * Всего покупок
   */
  purchasesTotal: number;
  /**
   * Покупок потеряно
   */
  purchasesLost: number;
  /**
   * Потерянный доход
   */
  revenueLost: string;
  /**
   * Перепата в процентах
   */
  bgOverpaymentPerc: string;
  /**
   * Сумма
   */
  bgSum: string;
  /**
   * Данные у конкурента
   */
  competitor: TCompanyLandingInfo & { bgSavingEconomy: number };
  /**
   * Были ли обработаны документы
   */
  wasProcessed: boolean;
};
