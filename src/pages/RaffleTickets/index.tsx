import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import RafflesTable from './RafflesTable';
import { Breadcrumb, Button, Space } from 'antd';
import { ICampaign } from '../Campaign/types';
import { getCampaign } from '../../client';
import { useTranslation } from 'react-i18next';
import './styles.css';

const Raffles: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [campaign, setCampaign] = useState<ICampaign | null>(null);

  useEffect(() => {
    getCampaign(campaignId)
      .then((result: ICampaign) => {
        setCampaign(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [campaignId]);

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { title: <Link to="/">{t('campaigns.title')}</Link> },
          { title: <Link to={`/campaigns/${campaignId}`}>{campaign?.name}</Link> },
          { title: t('raffle-tickets.breadcrumb') }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>
            {t('raffle-tickets.pageTitle', { name: campaign?.name })}
          </Title>
        </Section>
        <Section mb={1}>
          <div className="flex-end">
            <Space>
              <Button onClick={() => navigate(`/campaigns/${campaignId}`)}>
                {t('common.cancel')}
              </Button>
              <Button
                type="primary"
                onClick={() => navigate(`/campaigns/${campaignId}/raffle-tickets/new`)}
              >
                {t('raffle-tickets.registerTicket')}
              </Button>
            </Space>
          </div>
        </Section>
        <Section>
          <RafflesTable />
        </Section>
      </Container>
    </MainLayout>
  );
};

export default Raffles;
