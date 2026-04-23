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
      <Breadcrumb items={[{ title: <Link to="/">{t('campaigns.title')}</Link> }, { title: campaign?.name }]} />

      <Container>
        <Spin spinning={loading}>
          <Section>
            <Title backLink={'/'} configUrl={`/campaigns/${campaignId}/edit`}>
              {campaign.name}
            </Title>
          </Section>
          <Descriptions items={getDescriptionItems(campaign, campaignId)} bordered />
          <Section>
            <Row gutter={16}>
              <Col md={24} lg={12}>
                <Card>
                  <div style={{ fontSize: 60, display: 'flex', justifyContent: 'center' }}>
                    {campaign.rafflesCount}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/campaigns/${campaignId}/raffle-tickets`}>{t('campaign.seeTickets')}</Link>
                  </div>
                </Card>
                {campaign && !campaign.drawDate && (
                  <Section>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="primary"
                        onClick={() => navigate(`/campaigns/${campaignId}/raffle-tickets/new`)}
                      >
                        {t('campaign.registerTicket')}
                      </Button>
                    </div>
                  </Section>
                )}
              </Col>
              <Col md={24} lg={12}>
                <Card>
                  <div style={{ fontSize: 60, display: 'flex', justifyContent: 'center' }}>
                    {campaign.prizesCount}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/campaigns/${campaignId}/prizes`}>{t('campaign.seePrizes')}</Link>
                  </div>
                </Card>
                {campaign && !campaign.drawDate && (
                  <Section>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="primary"
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
            <Section>
              {campaign.drawDate ? (
                <Button onClick={handleViewDrawResult}>{t('campaign.seeResults')}</Button>
              ) : (
                <Button onClick={handleDraw}>{t('campaign.drawRaffle')}</Button>
              )}
            </Section>
          </Content>
        </Spin>
      </Container>
    </MainLayout>
  );
};

export default Campaign;
