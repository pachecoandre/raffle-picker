import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useFormik } from "formik";

// import { createPrize } from "../../client";
import Container from '../../components/Container';
import Content from '../../components/Content';
import Section from '../../components/Section';
import Title from '../../components/Title';

const NewPrize: FC = () => {
  const { campaignId = '' } = useParams();
  const navigate = useNavigate();
  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     description: "",
  //     image: "",
  //     quantity: 1,
  //   },
  //   onSubmit: (values) => {
  //     createPrize(campaignId, values).then(() => {
  //       setTimeout(() => {
  //         navigate(-1);
  //       }, 1500);
  //     });
  //   },
  // });
  const handleCancel = () => navigate(-1);

  return (
    <Container>
      <Section>
        <Title backLink={`/campaigns/${campaignId}/prizes`}>
          Cadastrar novo prêmio na campanha {campaignId}
        </Title>
      </Section>
      <Content justifyCenter>
        <Section>
          <form onSubmit={() => {}}>
            <label htmlFor="name">Nome</label>
            <input name="name" type="text" />
            <label htmlFor="description">Descrição</label>
            <input name="description" type="text" />
            <label htmlFor="image">Foto</label>
            <input name="image" type="file" accept="image/*" />
            <label htmlFor="quantity">Quantidade</label>
            <input name="quantity" type="number" />
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit">Cadastrar</button>
          </form>
        </Section>
      </Content>
    </Container>
  );
};

export default NewPrize;
