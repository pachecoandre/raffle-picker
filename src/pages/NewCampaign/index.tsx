import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createCampaign, getCampaign, updateCampaign } from '../../client';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Section from '../../components/Section';
import MainLayout from '../../components/MainLayout';
import { Button, Form, FormProps, Input } from 'antd';

interface Props {
  isEdit?: boolean;
}

const NewCampaign: FC<Props> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { campaignId = '' } = useParams();
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(Boolean(isEdit));
  const handleCancel = () => navigate(-1);

  useEffect(() => {
    if (isEdit) {
      getCampaign(campaignId).then((data) => {
        form.setFieldsValue({
          name: data.name,
          price: data.rafflePrice,
          drawDate: data.estimatedDrawDate?.split('T')[0]
        });
        setIsLoading(false);
      });
    }
  }, [isEdit, campaignId]);

  const handleSubmit: FormProps['onFinish'] = (values) => {
    if (isNaN(Number(values.price))) {
      return alert(t('newCampaign.invalidPrice'));
    }
    setIsLoading(true);
    if (isEdit) {
      return updateCampaign(campaignId, {
        name: values.name,
        estimatedDrawDate: values.drawDate
      }).then(() => {
        setTimeout(() => {
          navigate(`/campaigns/${campaignId}`);
        }, 500);
      });
    }
    createCampaign({
      name: values.name,
      rafflePrice: Number(values.price),
      estimatedDrawDate: values.drawDate
    }).then(({ id }) =>
      setTimeout(() => {
        navigate(`/campaigns/${id}`);
      }, 500)
    );
  };

  return (
    <MainLayout>
      <Container>
        <Content justifyCenter>
          <Section>
            <h1>{isEdit ? t('newCampaign.editTitle') : t('newCampaign.title')}</h1>
          </Section>
          <Section>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item label={t('common.name')} name="name">
                <Input />
              </Form.Item>
              <Form.Item label={t('campaign.rafflePrice')} name="price">
                <Input disabled={isEdit} />
              </Form.Item>
              <Form.Item label={t('newCampaign.estimatedDrawDate')} name="drawDate">
                <Input type="date" />
              </Form.Item>
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                {t('common.cancel')}
              </Button>
              <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
                {isEdit ? t('common.save') : t('newCampaign.create')}
              </Button>
            </Form>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NewCampaign;
