import * as React from 'react';
import { TCompanyRecommendsResponse } from '../../../../../transport';
import {
  Card,
  CardContent,
  CardFooter
} from '../../../../../components/common/Card';
// import { IconButton } from '../../../../../components/common/IconButton';
import { Button } from '../../../../../components/common/Button';

// import { ReactComponent as FeaturedOutline } from '../../../../../assets/images/svg/featured-outline.svg';

export function Tender(props: TCompanyRecommendsResponse): JSX.Element {
  return (
    <section className="tenders-group">
      <aside className="tenders-group-date">
        <span>24 мая</span>
      </aside>
      <div className="tenders-group-cards">
        <Card className="tender">
          <CardContent className="tender-body">
            <div className="tender-info">
              <Button
                size="sm"
                appearance="primary"
                className="tender-risk-rate"
              >
                Вероятность победы:
                <span className="tender-risk-rate-percent">{`${props.competitorGrowthPercent}%`}</span>
                <span className="tender-risk-rate-cta">
                  <span role="img" aria-label="Огонь">
                    🔥
                  </span>
                  &nbsp;Давай!
                </span>
              </Button>
              <div className="tender-title">{props.competitorFullName}</div>
              <div className="tender-company">{props.competitorShortName}</div>
            </div>
            <div className="tender-price">{`${props.total} ₽`}</div>
          </CardContent>
          <CardFooter className="tender-footer">
            <div className="tender-meta">
              <span className="tender-number">{`№ ${props.accountNumber}`}</span>
              <span className="tender-date">
                {new Date(props.publishedAt).toLocaleDateString()}
              </span>
              <span className="tender-jurisdiction">{props.federalLaw}</span>
            </div>
            {/* <IconButton
              skin="orange"
              appearance="ghost"
              className="tender-favorites"
              icon={<FeaturedOutline width="20" height="20" />}
            /> */}
            <div className="tender-guarantee-status">
              {props.warrantyApproved
                ? 'Гарантия одобрена'
                : 'Гарантия не одобрена'}
              <span className="tender-guarantee-status-price">{`${props.warrantySum} ₽`}</span>
            </div>
            <Button
              skin="light"
              appearance="ghost"
              arrow
              className="tender-proceed-btn"
            >
              Изучить тендер
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
