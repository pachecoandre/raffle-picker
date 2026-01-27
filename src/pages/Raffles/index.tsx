import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';

const Raffles: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>
            Rifas vendidas de campanha {campaignId}
          </Title>
        </Section>
        <Section mb={1}>
          <div>
            <button onClick={() => navigate(`/campaigns/${campaignId}/raffles/new`)}>
              Cadastrar Rifa
            </button>
          </div>
        </Section>
        <Section>Raffles Table Here</Section>
      </Container>
    </MainLayout>
  );
};

export default Raffles;
