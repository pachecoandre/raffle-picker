import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import PrizesTable from './PrizesTable';

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { title: <a href="/">Campaigns</a> },
          { title: <a href={`/campaigns/${campaignId}`}>Campaign {campaignId}</a> },
          { title: 'Prizes' }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>Prizes of campaign {campaignId}</Title>
        </Section>
        <Section mb={1}>
          <div>
            <button onClick={() => navigate(`/campaigns/${campaignId}/prizes/new`)}>
              Register Prize
            </button>
          </div>
        </Section>
        <PrizesTable />
      </Container>
    </MainLayout>
  );
};

export default Prizes;
