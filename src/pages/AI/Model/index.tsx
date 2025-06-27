import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Form, Input, Button, message } from 'antd';

const AIModelPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 模拟API请求获取配置
    setTimeout(() => {
      form.setFieldsValue({
        mainApiUrl: 'https://api.openai.com/v1',
        mainApiKey: 'sk-******',
        mainModel: 'gpt-4',
        backupApiUrl: 'https://api.anthropic.com/v1',
        backupApiKey: 'sk-******',
        backupModel: 'claude-2'
      });
      setLoading(false);
    }, 500);
  }, [form]);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    message.success('配置保存成功');
  };

  return (
    <PageContainer>
      <Card title="主AI配置" style={{ marginBottom: 24 }} loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="API地址"
            name="mainApiUrl"
            rules={[{ required: true, message: '请输入API地址' }]}
          >
            <Input placeholder="例如: https://api.openai.com/v1" />
          </Form.Item>
          <Form.Item
            label="API密钥"
            name="mainApiKey"
            rules={[{ required: true, message: '请输入API密钥' }]}
          >
            <Input.Password placeholder="输入主AI的API密钥" />
          </Form.Item>
          <Form.Item
            label="模型名称"
            name="mainModel"
            rules={[{ required: true, message: '请输入模型名称' }]}
          >
            <Input placeholder="例如: gpt-4" />
          </Form.Item>
        </Form>
      </Card>

      <Card title="备用AI配置" loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="API地址"
            name="backupApiUrl"
          >
            <Input placeholder="例如: https://api.anthropic.com/v1" />
          </Form.Item>
          <Form.Item
            label="API密钥"
            name="backupApiKey"
          >
            <Input.Password placeholder="输入备用AI的API密钥" />
          </Form.Item>
          <Form.Item
            label="模型名称"
            name="backupModel"
          >
            <Input placeholder="例如: claude-2" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存配置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default AIModelPage;