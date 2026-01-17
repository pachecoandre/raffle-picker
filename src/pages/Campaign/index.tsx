import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaign, draw } from "../../client";
import { currency } from "../../helpers/formatter";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Title from "../../components/Title";
import Content from "../../components/Content";
import { ICampaign } from "./types";

const Campaign: FC = () => {
  const { campaignId = "" } = useParams();
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

  return (
    <Container>
      <Section>
        <Title backLink={"/"} configUrl={`/campaigns/${campaignId}/edit`}>
          {campaign.name}
        </Title>
      </Section>
      <Content justifyCenter>
        <Section>
          <span>{currency(campaign.revenue)} Arrecadados</span>
        </Section>
        <Section>Valor da rifa: {currency(campaign.rafflePrice)}</Section>
        <Section>
          <a href={`/campaigns/${campaignId}/raffles`}>
            Rifas vendidas: {campaign.rafflesCount}
          </a>
        </Section>
        <Section>
          <a href={`/campaigns/${campaignId}/prizes`}>
            Prêmios: {campaign.prizesCount}
          </a>
        </Section>
        <Section>
          {campaign.drawDate ? (
            <button onClick={handleViewDrawResult}>Ver premiação</button>
          ) : (
            <button onClick={handleDraw}>Realizar sorteio</button>
          )}
        </Section>
      </Content>
    </Container>
  );
};

export default Campaign;
