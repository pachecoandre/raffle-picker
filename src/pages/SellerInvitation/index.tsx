import React, { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Title from "../../components/Title";

const SellerInvitation: FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //     setModalIsOpen(true);
  //   },
  // });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Section>
        <Title backLink={`/campaigns/${campaignId}`}>
          Convidar Vendedores - Campanha {campaignId}
        </Title>
      </Section>
      <Section>
        <form onSubmit={() => {}}>
          <label htmlFor="email">Emails (separados por espaço)</label>
          <textarea
            name="email"
            onChange={() => {}}
            value={""}
          />
          <button type="submit">Convidar</button>
        </form>
      </Section>
      <Section>Convites em aberto:</Section>
      {/* <ModalBase open={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
        <h1>Convite enviado</h1>
        <button onClick={handleBack}>Voltar</button>
      </ModalBase> */}
    </Container>
  );
};

export default SellerInvitation;
