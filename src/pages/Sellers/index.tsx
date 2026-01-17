import React, { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Title from "../../components/Title";

const Sellers: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      <Section>
        <Title backLink={`/campaigns/${campaignId}`}>
          Vendedores de campanha {campaignId}
        </Title>
      </Section>
      <Section mb={1}>
        <textarea>
          <button
            onClick={() => navigate(`/campaigns/${campaignId}/sellers/invite`)}
          >
            Convidar
          </button>
        </textarea>
      </Section>
      <Section>
        Table here
      </Section>
    </Container>
  );
};

export default Sellers;
