import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import React, { useEffect } from 'react';

export type OrgFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.OrgItem) => Promise<void>;
  visible: boolean;
  initialValues?: Partial<API.OrgItem>;
  title: string;
};

const OrgForm: React.FC<OrgFormProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, initialValues, title } = props;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <ModalForm
      title={title}
      form={form}
      open={visible}
      onFinish={props.onSubmit}
      onOpenChange={(visible) => {
        if (!visible) {
          form.resetFields();
          props.onCancel();
        }
      }}
    >
      <ProFormText
        name="name"
        label="组织名称"
        rules={[{ required: true, message: '请输入组织名称' }]}
      />
      <ProFormText
        name="code"
        label="组织编码"
        rules={[{ required: true, message: '请输入组织编码' }]}
      />
      <ProFormSelect
        name="type"
        label="组织类型"
        valueEnum={{
          college: { text: '学院' },
          department: { text: '系部' },
          center: { text: '中心' },
        }}
        rules={[{ required: true, message: '请选择组织类型' }]}
      />
      <ProFormSelect
        name="status"
        label="状态"
        valueEnum={{
          '1': { text: '启用' },
          '0': { text: '禁用' },
        }}
        rules={[{ required: true, message: '请选择状态' }]}
      />
      <ProFormDigit
        name="sort"
        label="排序"
        rules={[{ required: true, message: '请输入排序号' }]}
        min={0}
        fieldProps={{ precision: 0 }}
      />
    </ModalForm>
  );
};

export default OrgForm; 