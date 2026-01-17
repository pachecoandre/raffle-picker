import React, { FC } from 'react';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Title from '../../components/Title';
import Content from '../../components/Content';

const NotFound: FC = () => {
  return (
    <Container>
      <Section>
        <Title backLink={'/'}>Não encontrado (404)</Title>
      </Section>
      <Content justifyCenter>
        <Section>
          <a href="/">Voltar para a página principal</a>
        </Section>
      </Content>
    </Container>
  );
};

export default NotFound;
