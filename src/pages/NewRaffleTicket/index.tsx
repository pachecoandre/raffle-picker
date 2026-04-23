import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createRaffleTickets, getCampaign } from '../../client';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Content from '../../components/Content';
import MainLayout from '../../components/MainLayout';
import { Breadcrumb, Button, Form, Input } from 'antd';
import { ICampaign } from '../Campaign/types';

const NewRaffleTicket: FC = () => {
  const navigate = useNavigate();
  const { campaignId = '' } = useParams();
  const { t } = useTranslation();

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

  const handleSubmit = async (values: any) => {
    try {
      await createRaffleTickets(campaignId, values);
      navigate(`/campaigns/${campaignId}`);
    } catch (error) {
      console.error(error);
      alert(t('newRaffleTicket.errorCreating'));
    }
  };
  const handleCancel = () => navigate(-1);
  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { title: <Link to="/">{t('campaigns.title')}</Link> },
          { title: <Link to={`/campaigns/${campaignId}`}>{campaign?.name}</Link> },
          { title: t('newRaffleTicket.breadcrumb') }
        ]}
      />
      <Container>
        <Content justifyCenter>
          <Section>
            <h1>{t('newRaffleTicket.pageTitle')}</h1>
          </Section>
          <Section>
            <Form onFinish={handleSubmit}>
              <Form.Item label={t('newRaffleTicket.participantName')} name="name">
                <Input />
              </Form.Item>
              <Form.Item label={t('newRaffleTicket.phone')} name="phone">
                <Input />
              </Form.Item>
              <Form.Item label={t('newRaffleTicket.email')} name="email">
                <Input />
              </Form.Item>
              <Form.Item label={t('newRaffleTicket.quantity')} name="quantity" initialValue={1}>
                <Input type="number" />
              </Form.Item>
              <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                {t('common.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('newRaffleTicket.create')}
              </Button>
            </Form>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NewRaffleTicket;
