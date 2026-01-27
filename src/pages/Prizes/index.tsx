import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>Prêmios da campanha {campaignId}</Title>
        </Section>
        <Section mb={1}>
          <div>
            <button onClick={() => navigate(`/campaigns/${campaignId}/prizes/new`)}>
              Cadastrar Prêmio
            </button>
          </div>
        </Section>
        <Section>Prizes Table Here</Section>
      </Container>
    </MainLayout>
  );
};

export default Prizes;
