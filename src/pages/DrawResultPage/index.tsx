import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import useDrawItems from '../../hooks/useDrawItems';
import MainLayout from '../../components/MainLayout';
import { Breadcrumb } from 'antd';
import { getCampaign } from '../../client';
import { ICampaign } from '../Campaign/types';

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const drawItems = useDrawItems();

  const [campaign, setCampaign] = useState<ICampaign>({});

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
    <MainLayout>
      <Breadcrumb
        items={[
          { title: <a href="/">Campaigns</a> },
          { title: <a href={`/campaigns/${campaignId}`}>{campaign?.name}</a> },
          { title: 'Prizes' }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>Raffle Draw {campaignId}</Title>
        </Section>
        <Section>
          <table>
            <thead>
              <tr>
                <td>Prize</td>
                <td>Name</td>
                <td>Phone</td>
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
    </MainLayout>
  );
};

export default Prizes;
