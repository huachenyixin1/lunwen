import React, { useRef, useState } from 'react';
import { ProTable, PageContainer, ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

interface UserItem {
  id: string;
  code: string;
  name: string;
  org: string;
  roles: string[];
  status: number;
}

interface RoleOption {
  label: string;
  value: string;
}

const UserPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem>();

  // 用户数据
  const [userData, setUserData] = useState<UserItem[]>([
    { id: '1', code: '1001', name: '张三', org: '计算机学院', roles: ['admin'], status: 1 },
    { id: '2', code: '1002', name: '李四', org: '文学院', roles: ['teacher'], status: 1 },
  ]);

  // 角色选项
  const roleOptions: RoleOption[] = [
    { label: '管理员', value: 'admin' },
    { label: '教师', value: 'teacher' },
  ];

  // 组织选项
  const orgOptions = [
    { label: '计算机学院', value: '计算机学院' },
    { label: '文学院', value: '文学院' },
  ];

  const columns: ProColumns<UserItem>[] = [
    {
      title: '用户编码',
      dataIndex: 'code',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
    },
    {
      title: '所属组织',
      dataIndex: 'org',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: (_, record) => record.roles.join(', '),
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
        <a key="role" onClick={() => handleRole(record)}>
          关联角色
        </a>,
        <a key="resetPwd" onClick={() => {
          Modal.confirm({
            title: `重置密码` ,
            content: `确定要重置用户【${record.name}】的密码吗？`,
            onOk: () => {
              message.success('密码重置成功（mock）');
            },
          });
        }}>
          重置密码
        </a>,
      ],
    },
  ];

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleEdit = (record: UserItem) => {
    setSelectedUser(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleRole = (record: UserItem) => {
    setSelectedUser(record);
    setRoleModalVisible(true);
  };

  const handleDelete = (record: UserItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户【${record.name}】吗？`,
      onOk: () => {
        console.log('删除用户:', record);
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

  const handleRoleModalOk = async () => {
    setRoleModalVisible(false);
    actionRef.current?.reload();
  };

  const handleImport = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      actionRef.current?.reload();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  return (
    <PageContainer>
      <ProTable<UserItem>
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
          <Upload key="import" onChange={handleImport} showUploadList={false}>
            <Button icon={<UploadOutlined />}>导入</Button>
          </Upload>,
          <Button key="export" icon={<DownloadOutlined />} onClick={handleExport}>
            导出
          </Button>,
        ]}
        request={async () => {
          return {
            data: userData,
            success: true,
            total: userData.length,
          };
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />

      <ModalForm
        title={selectedUser ? '编辑用户' : '新增用户'}
        width={600}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        onFinish={handleModalOk}
        form={form}
      >
        <ProFormText
          label="用户编码"
          name="code"
          rules={[{ required: true, message: '请输入用户编码' }]}
        />
        <ProFormText
          label="用户名称"
          name="name"
          rules={[{ required: true, message: '请输入用户名称' }]}
        />
        <ProFormSelect
          label="所属组织"
          name="org"
          options={orgOptions}
          rules={[{ required: true, message: '请选择所属组织' }]}
        />
      </ModalForm>

      <Modal
        title={`用户角色设置 - ${selectedUser?.name}`}
        width={600}
        visible={roleModalVisible}
        onCancel={() => setRoleModalVisible(false)}
        onOk={handleRoleModalOk}
      >
        <Form>
          <Form.Item label="角色分配" name="roles">
            <ProFormSelect
              mode="multiple"
              options={roleOptions}
              initialValue={selectedUser?.roles}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UserPage;