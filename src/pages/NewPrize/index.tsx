import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { createPrize } from '../../client';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Section from '../../components/Section';
import Title from '../../components/Title';
import MainLayout from '../../components/MainLayout';

const NewPrize: FC = () => {
  const { campaignId = '' } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createPrize(campaignId, values);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error creating prize:', error);
      alert('Error creating prize. Please try again.');
    }
  };
  const handleCancel = () => navigate(-1);

  return (
    <MainLayout>
      <Container>
        <Section>
          <Title backLink={`/campaigns/${campaignId}/prizes`}>
            Register new prize in campaign {campaignId}
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
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input />
              </Form.Item>

              <Form.Item label="Photo" name="image">
                <Upload beforeUpload={() => false} accept="image/*">
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please enter the quantity' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create
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
