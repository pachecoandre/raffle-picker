import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCampaign, draw } from '../../client';
import { currency } from '../../helpers/formatter';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import Content from '../../components/Content';
import { ICampaign } from './types';
import MainLayout from '../../components/MainLayout';
import {
  Descriptions,
  DescriptionsProps,
  Button,
  Space,
  Row,
  Col,
  Card,
  Breadcrumb,
  Spin
} from 'antd';
import Loader from '../../components/Loader';
import './styles.css';

const Campaign: FC = () => {
  const { campaignId = '' } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<ICampaign>({});

  const handleViewDrawResult = () => {
    navigate(`/campaigns/${campaignId}/draw`);
  };

  const handleDraw = () => {
    draw(campaignId).then(() => {
      handleViewDrawResult();
    });
  };

  useEffect(() => {
    getCampaign(campaignId)
      .then((result: ICampaign) => {
        setCampaign(result);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [campaignId]);

  const getDescriptionItems = (
    campaign: ICampaign,
    campaignId: string
  ): DescriptionsProps['items'] => [
    {
      key: 'revenue',
      label: t('campaign.revenue'),
      span: 'filled',
      children: currency(campaign.revenue)
    },
    {
      key: 'rafflePrice',
      label: t('campaign.rafflePrice'),
      span: 'filled',
      children: currency(campaign.rafflePrice)
    }
  ];

  return (
    <MainLayout>
      <Breadcrumb
        items={[{ title: <Link to="/">{t('campaigns.title')}</Link> }, { title: campaign?.name }]}
      />
      <Container>
        <Spin spinning={loading}>
          <Section mb={1}>
            <Title backLink={'/'} configUrl={`/campaigns/${campaignId}/edit`}>
              {campaign.name}
            </Title>
          </Section>
          <Descriptions items={getDescriptionItems(campaign, campaignId)} bordered />
          <Section>
            <Row gutter={16}>
              <Col md={24} lg={12}>
                <Card
                  className="campaign-stat-card"
                  onClick={() => navigate(`/campaigns/${campaignId}/raffle-tickets`)}
                >
                  <div className="card-content" style={{ fontSize: 60 }}>
                    {campaign.rafflesCount}
                  </div>
                  <div className="card-content link-color">{t('campaign.tickets')}</div>
                </Card>
                {campaign && !campaign.drawDate && (
                  <Section>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="default"
                        onClick={() => navigate(`/campaigns/${campaignId}/raffle-tickets/new`)}
                      >
                        {t('campaign.registerTicket')}
                      </Button>
                    </div>
                  </Section>
                )}
              </Col>
              <Col md={24} lg={12}>
                <Card
                  className="campaign-stat-card"
                  onClick={() => navigate(`/campaigns/${campaignId}/prizes`)}
                >
                  <div className="card-content" style={{ fontSize: 60 }}>
                    {campaign.prizesCount}
                  </div>
                  <div className="card-content link-color">{t('campaign.prizes')}</div>
                </Card>
                {campaign && !campaign.drawDate && (
                  <Section>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="default"
                        onClick={() => navigate(`/campaigns/${campaignId}/prizes/new`)}
                      >
                        {t('campaign.addPrize')}
                      </Button>
                    </div>
                  </Section>
                )}
              </Col>
            </Row>
          </Section>
          <Content justifyCenter>
            <Section mb={0}>
              <div className="space-between">
                <Button type="default" onClick={() => navigate(`/`)}>
                  {t('common.back')}
                </Button>
                {campaign.drawDate ? (
                  <Button onClick={handleViewDrawResult}>{t('campaign.seeResults')}</Button>
                ) : (
                  <Button onClick={handleDraw}>{t('campaign.drawRaffle')}</Button>
                )}
              </div>
            </Section>
          </Content>
        </Spin>
      </Container>
    </MainLayout>
  );
};

export default Campaign;
