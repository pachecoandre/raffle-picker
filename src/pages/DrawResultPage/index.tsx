import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import useDrawItems from '../../hooks/useDrawItems';
import MainLayout from '../../components/MainLayout';
import { Breadcrumb, Button, Table } from 'antd';
import { getCampaign } from '../../client';
import { ICampaign } from '../Campaign/types';
import { DrawResult } from '../../client/types';

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const drawItems = useDrawItems();

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

  const columns = [
    { title: t('drawResult.prize'), dataIndex: 'prizeName', key: 'prizeName' },
    { title: t('common.name'), dataIndex: 'winnerName', key: 'winnerName' },
    { title: t('newRaffleTicket.phone'), dataIndex: 'winnerPhone', key: 'winnerPhone' }
  ];

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
            {t('drawResult.pageTitle', { name: campaign?.name })}
          </Title>
        </Section>
        <Section>
          <Button onClick={() => navigate(`/campaigns/${campaignId}`)}>{t('common.back')}</Button>
        </Section>
        <Section>
          <Table<DrawResult>
            columns={columns}
            dataSource={drawItems}
            rowKey="id"
            pagination={false}
          />
        </Section>
      </Container>
    </MainLayout>
  );
};

export default Prizes;
