import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, Button } from 'antd';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import PrizesTable from './PrizesTable';
import { getCampaign } from '../../client';
import { ICampaign } from '../Campaign/types';

const Prizes: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
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
          { title: <Link to="/">Campaigns</Link> },
          { title: <Link to={`/campaigns/${campaignId}`}>{campaign?.name}</Link> },
          { title: 'Prizes' }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}`}>Prizes of {campaign?.name}</Title>
        </Section>
        <Section mb={4}>
          <div>
            <Button type="primary" onClick={() => navigate(`/campaigns/${campaignId}/prizes/new`)}>
              Add Prize
            </Button>
          </div>
        </Section>
        <PrizesTable />
      </Container>
    </MainLayout>
  );
};

export default Prizes;
