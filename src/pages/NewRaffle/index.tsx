import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useFormik } from 'formik';
import { createRaffles } from '../../client';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Content from '../../components/Content';
import MainLayout from '../../components/MainLayout';

const NewRaffle: FC = () => {
  const navigate = useNavigate();
  // const { campaignId = '' } = useParams();
  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     phone: '',
  //     email: '',
  //     quantity: 1
  //   },
  //   onSubmit: async (values) => {
  //     createRaffles(campaignId, values).then(() => {
  //       navigate(`/campaigns/${campaignId}/raffles`);
  //     });
  //   }
  // });
  const handleCancel = () => navigate(-1);
  return (
    <MainLayout>
      <Container>
        <Content justifyCenter>
          <Section>
            <h1>Nova rifa</h1>
          </Section>
          <Section>
            <form onSubmit={() => {}}>
              <label htmlFor="name">Nome do participante</label>
              <input id="name" name="name" type="text" />
              <label htmlFor="phone">Telefone</label>
              <input id="phone" name="phone" type="text" />
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="text" />
              <label htmlFor="quantity">Quantidade</label>
              <input name="quantity" type="number" />
              <button type="button" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit">Criar</button>
            </form>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NewRaffle;
