import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import RafflesTable from './RafflesTable';
import { Breadcrumb, Button } from 'antd';
import { ICampaign } from '../Campaign/types';
import { getCampaign } from '../../client';

const Raffles: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

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
          { title: <a href="/">Campaigns</a> },
          { title: <a href={`/campaigns/${campaignId}`}>{campaign?.name}</a> },
          { title: 'Raffles' }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>Sold raffles of {campaign?.name}</Title>
        </Section>
        <Section mb={1}>
          <div>
            <Button onClick={() => navigate(`/campaigns/${campaignId}/raffles/new`)}>
              Register Raffle
            </Button>
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
