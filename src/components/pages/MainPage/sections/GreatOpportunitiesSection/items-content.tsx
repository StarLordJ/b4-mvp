import * as React from 'react';

import { ReactComponent as Lens } from './assets/Vector1.svg';
import { ReactComponent as Terminal } from './assets/Vector2.svg';
import { ReactComponent as Lock } from './assets/Vector3.svg';
import { ReactComponent as CashBack } from './assets/Vector4.svg';
import { ReactComponent as Smile } from './assets/Vector5.svg';
import { TOpportinityItemProps } from './components';

export const itemsContent: TOpportinityItemProps[] = [
  {
    description: (
      <>
        Доступны все виды торгов по&nbsp;всем&nbsp;ТЗ на&nbsp;всех площадках.
        <br />
        Доступны торги по&nbsp;44-ФЗ, 223-ФЗ, 185-ФЗ/615&nbsp;ПП РФ. <br />
        Данные из&nbsp;основных площадок zakupki.gov.ru, Сбербанк-АСТ,
        НЭП-Фабрикант
      </>
    ),
    icon: <Lens />,
    title: 'Поиск закупок'
  },
  {
    description: (
      <>
        Сравниваете онлайн предложения, выбираете, оплачиваете счет. Получайте
        и&nbsp;поддерживайте лимит, сразу в&nbsp;нескольких банках. Заявка
        на&nbsp;гарантию создается за&nbsp;2&nbsp;минуты и&nbsp;в&nbsp;один клик
        уходит на&nbsp;рассмотрение в&nbsp;несколько банков
      </>
    ),
    icon: <Terminal />,
    title: 'Все в одном'
  },
  {
    description: (
      <>
        Умные рекомендации по&nbsp;участию в&nbsp;тендерах <br /> Расширенная
        аналитика по&nbsp;компании <br /> Единое досье для всех банков
      </>
    ),
    icon: <Lock />,
    title: 'Возможности на 100%'
  },
  {
    description: (
      <>
        Пусть ваши обороты работают на&nbsp;вас, а&nbsp;не&nbsp;на&nbsp;брокера.
        <br />
        Получайте лучшие предложения от&nbsp;банков напрямую. <br /> Присылаем
        акции, скидки и&nbsp;предложения банков в&nbsp;личный кабинет.
      </>
    ),
    icon: <CashBack />,
    title: 'Кэшбек!'
  },
  {
    description: (
      <>
        Честность и&nbsp;прозрачность <br /> Нет посредников, агентов или
        брокеров.
      </>
    ),
    icon: <Smile />,
    title: 'Отношения с банками'
  }
];
