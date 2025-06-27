import React, { useRef, useState } from 'react';
import { ProTable, PageContainer, ModalForm } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Input, Table, Transfer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface PermItem {
  id: string;
  code: string;
  name: string;
  status: number;
}

interface MenuItem {
  key: string;
  title: string;
  description?: string;
}

const PermPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [transferVisible, setTransferVisible] = useState(false);
  const [selectedPerm, setSelectedPerm] = useState<PermItem>();

  // 权限列表数据
  const [permData, setPermData] = useState<PermItem[]>([
    { id: '1', code: 'user:perm', name: '权限管理', status: 1 },
    { id: '2', code: 'user:role', name: '角色管理', status: 1 },
    { id: '3', code: 'user:list', name: '用户管理', status: 1 },
    { id: '4', code: 'user:student', name: '学生用户', status: 1 },
  ]);

  // 菜单数据
  const mockMenus: MenuItem[] = [
    { key: '1', title: '用户管理' },
    { key: '2', title: '角色管理' },
    { key: '3', title: '权限管理' },
    { key: '4', title: '学生管理' },
  ];

  const columns: ProColumns<PermItem>[] = [
    {
      title: '权限编码',
      dataIndex: 'code',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <a key="assign" onClick={() => handleAssign(record)}>
          分配
        </a>,
        <a key="delete" onClick={() => handleDelete(record)}>
          删除
        </a>,
      ],
    },
  ];

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleEdit = (record: PermItem) => {
    setSelectedPerm(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleAssign = (record: PermItem) => {
    setSelectedPerm(record);
    setTransferVisible(true);
  };

  const handleDelete = (record: PermItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除权限【${record.name}】吗？`,
      onOk: () => {
        console.log('删除权限:', record);
        actionRef.current?.reload();
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('表单数据:', values);
      setModalVisible(false);
      form.resetFields();
      actionRef.current?.reload();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleTransferOk = () => {
    setTransferVisible(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<PermItem>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        options={{
          density: false,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增
          </Button>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          return {
            data: permData,
            success: true,
            total: permData.length,
          };
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />

      <ModalForm
        title={selectedPerm ? '编辑权限' : '新增权限'}
        width={600}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        onFinish={handleModalOk}
        form={form}
      >
        <Form.Item
          label="权限编码"
          name="code"
          rules={[{ required: true, message: '请输入权限编码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: '请输入权限名称' }]}
        >
          <Input />
        </Form.Item>
      </ModalForm>

      <Modal
        title="分配菜单权限"
        width={800}
        visible={transferVisible}
        onCancel={() => setTransferVisible(false)}
        onOk={handleTransferOk}
      >
        <Transfer
          dataSource={mockMenus}
          targetKeys={['1', '2']}
          render={(item) => item.title}
          listStyle={{
            width: 300,
            height: 400,
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default PermPage;