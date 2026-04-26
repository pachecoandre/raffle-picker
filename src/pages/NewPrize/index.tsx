import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, InputNumber, Upload, Breadcrumb } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { createPrize, getCampaign } from '../../client';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';
import { ICampaign } from '../Campaign/types';

const NewPrize: FC = () => {
  const { campaignId = '' } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [campaign, setCampaign] = useState<ICampaign>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCampaign(campaignId)
      .then((result: ICampaign) => {
        setCampaign(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [campaignId]);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      await createPrize(campaignId, values);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error creating prize:', error);
      alert(t('newPrize.errorCreating'));
      setSubmitting(false);
    }
  };
  const handleCancel = () => navigate(-1);

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { title: <Link to="/">{t('campaigns.title')}</Link> },
          { title: <Link to={`/campaigns/${campaignId}`}>{campaign?.name}</Link> },
          { title: t('newPrize.breadcrumb') }
        ]}
      />
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}/prizes`}>
            {t('newPrize.pageTitle', { campaignId })}
          </Title>
        </Section>
        <Content justifyCenter>
          <Section>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                quantity: 1
              }}
            >
              <Form.Item
                label={t('newPrize.name')}
                name="name"
                rules={[{ required: true, message: t('newPrize.nameRequired') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label={t('newPrize.description')} name="description">
                <Input />
              </Form.Item>

              <Form.Item
                label={t('newPrize.photo')}
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload beforeUpload={() => false} accept="image/*">
                  <Button icon={<UploadOutlined />}>{t('newPrize.selectImage')}</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label={t('newPrize.quantity')}
                name="quantity"
                rules={[{ required: true, message: t('newPrize.quantityRequired') }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                  {t('common.cancel')}
                </Button>
                <Button type="primary" htmlType="submit" disabled={submitting} loading={submitting}>
                  {t('newPrize.create')}
                </Button>
              </Form.Item>
            </Form>
          </Section>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default NewPrize;
