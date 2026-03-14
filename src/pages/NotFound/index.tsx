import React, { FC } from 'react';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import Content from '../../components/Content';
import MainLayout from '../../components/MainLayout';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <MainLayout>
      <Container>
        <Section>
          <Title backLink={'/'}>Não encontrado (404)</Title>
        </Section>
        <Content justifyCenter>
          <Section>
            <Link to="/">Voltar para a página principal</Link>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NotFound;
