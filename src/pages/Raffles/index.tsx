import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import RafflesTable from './RafflesTable';
import { Breadcrumb, Button } from 'antd';

const Raffles: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { title: <a href="/campaigns">Campaigns</a> },
          { title: <a href={`/campaigns/${campaignId}`}>Campaign {campaignId}</a> },
          { title: 'Raffles' }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>Sold raffles of campaign {campaignId}</Title>
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
