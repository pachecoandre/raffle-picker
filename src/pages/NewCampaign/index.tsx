import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { createCampaign, getCampaign, updateCampaign } from '../../client';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Section from '../../components/Section';
Content;

interface Props {
  isEdit?: boolean;
}

const NewCampaign: FC<Props> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { campaignId = '' } = useParams();
  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     price: "",
  //     drawDate: "",
  //   },
  //   onSubmit: (values) => {
  //     if (isNaN(Number(values.price))) {
  //       return alert("Por favor, informe um preço válido");
  //     }
  //     if (isEdit) {
  //       return updateCampaign(campaignId, {
  //         name: values.name,
  //         estimatedDrawDate: values.drawDate,
  //       }).then(() => {
  //         setTimeout(() => {
  //           navigate(`/campaigns/${campaignId}`);
  //         }, 500);
  //       });
  //     }
  //     createCampaign({
  //       name: values.name,
  //       rafflePrice: Number(values.price),
  //       estimatedDrawDate: values.drawDate,
  //     }).then(({ id }) =>
  //       setTimeout(() => {
  //         navigate(`/campaigns/${id}`);
  //       }, 500)
  //     );
  //   },
  // });
  const handleCancel = () => navigate(-1);

  // useEffect(() => {
  //   if (isEdit) {
  //     getCampaign(campaignId).then((data) => {
  //       formik.setFieldValue('name', data.name);
  //       formik.setFieldValue('price', data.rafflePrice);
  //       formik.setFieldValue('drawDate', data.estimatedDrawDate?.split('T')[0]);
  //     });
  //   }
  // }, []);

  return (
    <Container>
      <Content justifyCenter>
        <Section>
          <h1>{isEdit ? 'Editar campanha' : 'Nova campanha'}</h1>
        </Section>
        <Section>
          <form onSubmit={() => {}}>
            <label htmlFor="name">Nome</label>
            <input id="name" name="name" type="text" />
            <label htmlFor="price">Valor da rifa</label>
            <input id="price" name="price" type="number" disabled={isEdit} />
            <label htmlFor="drawDate">Data prevista para o sorteio</label>
            <input id="drawDate" name="drawDate" type="date" />
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit">{isEdit ? 'Salvar' : 'Criar'}</button>
          </form>
        </Section>
      </Content>
    </Container>
  );
};

export default NewCampaign;
