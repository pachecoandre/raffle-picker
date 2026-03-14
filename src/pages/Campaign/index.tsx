import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
      label: 'Revenue',
      span: 'filled',
      children: currency(campaign.revenue)
    },
    {
      key: 'rafflePrice',
      label: 'Raffle Price',
      span: 'filled',
      children: currency(campaign.rafflePrice)
    }
  ];

  return (
    <MainLayout>
      <Breadcrumb items={[{ title: <Link to="/">Campaigns</Link> }, { title: campaign?.name }]} />

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
                    <Link to={`/campaigns/${campaignId}/raffles`}>See Raffles</Link>
                  </div>
                </Card>
                {campaign && !campaign.drawDate && (
                  <Section>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="primary"
                        onClick={() => navigate(`/campaigns/${campaignId}/raffles/new`)}
                      >
                        Add Raffle
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
                    <Link to={`/campaigns/${campaignId}/prizes`}>See Prizes</Link>
                  </div>
                </Card>
                {campaign && !campaign.drawDate && (
                  <Section>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="primary"
                        onClick={() => navigate(`/campaigns/${campaignId}/prizes/new`)}
                      >
                        Add Prize
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
                <Button onClick={handleViewDrawResult}>See Results</Button>
              ) : (
                <Button onClick={handleDraw}>Draw Raffle</Button>
              )}
            </Section>
          </Content>
        </Spin>
      </Container>
    </MainLayout>
  );
};

export default Campaign;
