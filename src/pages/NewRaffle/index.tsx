import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRaffles } from '../../client';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Content from '../../components/Content';
import MainLayout from '../../components/MainLayout';
import { Button, Form, Input } from 'antd';

const NewRaffle: FC = () => {
  const navigate = useNavigate();
  const { campaignId = '' } = useParams();

  const handleSubmit = async (values: any) => {
    try {
      await createRaffles(campaignId, values);
      navigate(`/campaigns/${campaignId}/raffles`);
    } catch (error) {
      console.error(error);
      alert('Error creating raffles. Please try again.');
    }
  };
  const handleCancel = () => navigate(-1);
  return (
    <MainLayout>
      <Container>
        <Content justifyCenter>
          <Section>
            <h1>New Raffle</h1>
          </Section>
          <Section>
            <Form onFinish={handleSubmit}>
              <Form.Item label="Participant Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="E-mail" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Quantity" name="quantity" initialValue={1}>
                <Input type="number" />
              </Form.Item>
              <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NewRaffle;
