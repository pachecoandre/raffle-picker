import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Section from '../../components/Section';
import CampaignsTable from './components/CampaignsTable';
import MainLayout from '../../components/MainLayout';

import { getCampaigns } from '../../client';

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaigns().then((result) => {
      setCampaigns(result);
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Section mb={4}>
          <span>Seja bem vindo ao sorteio de rifa</span>
        </Section>
        <Section>
          <CampaignsTable data={campaigns} />
        </Section>
      </Container>
    </MainLayout>
  );
};

export default HomePage;
