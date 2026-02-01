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
      alert('Erro ao criar rifas. Por favor, tente novamente.');
    }
  };
  const handleCancel = () => navigate(-1);
  return (
    <MainLayout>
      <Container>
        <Content justifyCenter>
          <Section>
            <h1>Nova rifa</h1>
          </Section>
          <Section>
            <Form onFinish={handleSubmit}>
              <Form.Item label="Nome do participante" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Telefone" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="E-mail" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Quantidade" name="quantity" initialValue={1}>
                <Input type="number" />
              </Form.Item>
              <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Criar
              </Button>
            </Form>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NewRaffle;
