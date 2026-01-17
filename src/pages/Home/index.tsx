import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Section from "../../components/Section";

import { getCampaigns } from "../../client";
import CampaignsTable from "./components/CampaignsTable";

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaigns().then((result) => {
      setCampaigns(result);
    });
  }, []);

  return (
    <Container>
      <Section mb={4}>
        <span>Seja bem vindo ao sorteio de rifa</span>
      </Section>
      <Section>
        <CampaignsTable
          data={campaigns}
        />
      </Section>
    </Container>
  );
};

export default HomePage;
