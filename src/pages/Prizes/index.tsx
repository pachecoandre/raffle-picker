import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Button, Space } from 'antd';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import PrizesTable from './PrizesTable';
import { getCampaign } from '../../client';
import { ICampaign } from '../Campaign/types';
import './styles.css';

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [campaign, setCampaign] = useState<ICampaign>({});

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
          { title: t('prizes.title') }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>
            {t('prizes.pageTitle', { name: campaign?.name })}
          </Title>
        </Section>
        <Section mb={4}>
          <div className="flex-end">
            <Space>
              <Button onClick={() => navigate(`/campaigns/${campaignId}`)}>
                {t('common.cancel')}
              </Button>
              <Button
                type="primary"
                onClick={() => navigate(`/campaigns/${campaignId}/prizes/new`)}
              >
                {t('campaign.addPrize')}
              </Button>
            </Space>
          </div>
        </Section>
        <PrizesTable />
      </Container>
    </MainLayout>
  );
};

export default Prizes;
