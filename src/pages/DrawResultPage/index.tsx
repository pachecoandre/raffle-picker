import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Title from "../../components/Title";
import useDrawItems from "../../hooks/useDrawItems";

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const drawItems = useDrawItems();

  return (
    <Container>
      <Section>
        <Title backLink={`/campaigns/${campaignId}`}>
          Resultado da campanha {campaignId}
        </Title>
      </Section>
      <Section>
        <table>
          <thead>
            <tr>
              <td>Prêmio</td>
              <td>Nome</td>
              <td>Telefone</td>
            </tr>
          </thead>
          <tbody>
            {drawItems.length > 0
              ? drawItems.map((drawItem) => (
                  <tr key={drawItem.id}>
                    <td>{drawItem?.prizeName}</td>
                    <td>{drawItem?.winnerName}</td>
                    <td>{drawItem?.winnerPhone}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </Section>
    </Container>
  );
};

export default Prizes;
