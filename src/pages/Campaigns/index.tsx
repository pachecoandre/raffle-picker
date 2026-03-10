import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Section from '../../components/Section';
import CampaignsTable from './components/CampaignsTable';
import MainLayout from '../../components/MainLayout';

import { getCampaigns } from '../../client';
import Loader from '../../components/Loader';


const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCampaigns().then((result) => {
      setCampaigns(result);
      setIsLoading(false);
    }).catch(() => {
      console.error('Failed to fetch campaigns');
      setIsLoading(false);
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Section>
          <CampaignsTable data={campaigns} isLoading={isLoading} />
        </Section>
      </Container>
    </MainLayout>
  );
};

export default HomePage;
