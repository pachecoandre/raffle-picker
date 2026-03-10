import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaign, draw } from '../../client';
import { currency } from '../../helpers/formatter';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import Content from '../../components/Content';
import { ICampaign } from './types';
import MainLayout from '../../components/MainLayout';
import { Descriptions, DescriptionsProps, Button, Space } from 'antd';

const Campaign: FC = () => {
  const { campaignId = '' } = useParams();
  const navigate = useNavigate();

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
    },
    {
      key: 'rafflesCount',
      label: 'Sold Raffles',
      span: 'filled',
      children: (
        <Space>
          | {campaign.rafflesCount} |
          {(campaign.rafflesCount || 0) > 0 && (
            <>
              <a href={`/campaigns/${campaignId}/raffles`}>See Raffles</a> |
            </>
          )}
          <a href={`/campaigns/${campaignId}/raffles/new`}>Register Raffle</a> |
        </Space>
      )
    },
    {
      key: 'prizesCount',
      label: 'Prizes',
      span: 'filled',
      children: (
        <Space>
          | {campaign.prizesCount} |
          {(campaign.prizesCount || 0) > 0 && (
            <>
              <a href={`/campaigns/${campaignId}/prizes`}>See Prizes</a> |
            </>
          )}
          <a href={`/campaigns/${campaignId}/prizes/new`}>Register Prize</a> |
        </Space>
      )
    }
  ];

  return (
    <MainLayout>
      <Container>
        <Section>
          <Title backLink={'/'} configUrl={`/campaigns/${campaignId}/edit`}>
            {campaign.name}
          </Title>
        </Section>
        <Descriptions items={getDescriptionItems(campaign, campaignId)} bordered />
        <Content justifyCenter>
          <Section>
            {campaign.drawDate ? (
              <Button onClick={handleViewDrawResult}>See Results</Button>
            ) : (
              <Button onClick={handleDraw}>Draw Raffle</Button>
            )}
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default Campaign;
