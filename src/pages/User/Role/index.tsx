import React, { useRef, useState } from 'react';
import { ProTable, PageContainer, ModalForm, ProFormText } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Tabs, Transfer, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface RoleItem {
  id: string;
  code: string;
  name: string;
  status: number;
}

interface RelationItem {
  key: string;
  title: string;
}

const RolePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [relationVisible, setRelationVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('perm');
  const [selectedRole, setSelectedRole] = useState<RoleItem>();

  // 角色数据
  const [roleData, setRoleData] = useState<RoleItem[]>([
    { id: '1', code: 'admin', name: '管理员', status: 1 },
    { id: '2', code: 'teacher', name: '教师', status: 1 },
  ]);

  // 权限数据
  const permData: RelationItem[] = [
    { key: 'perm1', title: '用户管理' },
    { key: 'perm2', title: '角色管理' },
  ];

  // 组织数据
  const orgData: RelationItem[] = [
    { key: 'org1', title: '计算机学院' },
    // { key: 'org2', title: '文学院' }, // 已删除
  ];

  // 中心数据
  const centerData: RelationItem[] = [
    { key: 'center1', title: '北京中心' },
    { key: 'center2', title: '上海中心' },
  ];

  // 用户数据
  const userData: RelationItem[] = [
    { key: 'user1', title: '张三' },
    { key: 'user2', title: '李四' },
  ];

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色编码',
      dataIndex: 'code',
    },
    {
      title: '角色名称',
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
        <a key="relation" onClick={() => handleRelation(record)}>
          关联设置
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

  const handleEdit = (record: RoleItem) => {
    setSelectedRole(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleRelation = (record: RoleItem) => {
    setSelectedRole(record);
    setRelationVisible(true);
  };

  const handleDelete = (record: RoleItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除角色【${record.name}】吗？`,
      onOk: () => {
        console.log('删除角色:', record);
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

  const handleRelationOk = () => {
    setRelationVisible(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<RoleItem>
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
        request={async () => {
          return {
            data: roleData,
            success: true,
            total: roleData.length,
          };
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />

      <ModalForm
        title={selectedRole ? '编辑角色' : '新增角色'}
        width={600}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        onFinish={handleModalOk}
        form={form}
      >
        <ProFormText
          label="角色编码"
          name="code"
          rules={[{ required: true, message: '请输入角色编码' }]}
        />
        <ProFormText
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称' }]}
        />
      </ModalForm>

      <Modal
        title={`角色关联设置 - ${selectedRole?.name}`}
        width={800}
        visible={relationVisible}
        onCancel={() => setRelationVisible(false)}
        onOk={handleRelationOk}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="关联权限" key="perm">
            <Transfer
              dataSource={permData}
              targetKeys={['perm1']}
              render={(item) => item.title}
              listStyle={{
                width: 300,
                height: 400,
              }}
            />
          </TabPane>
          <TabPane tab="关联组织" key="org">
            <Transfer
              dataSource={orgData}
              targetKeys={['org1']}
              render={(item) => item.title}
              listStyle={{
                width: 300,
                height: 400,
              }}
            />
          </TabPane>
          <TabPane tab="关联中心" key="center">
            <Transfer
              dataSource={centerData}
              targetKeys={['center1']}
              render={(item) => item.title}
              listStyle={{
                width: 300,
                height: 400,
              }}
            />
          </TabPane>
          <TabPane tab="关联用户" key="user">
            <Transfer
              dataSource={userData}
              targetKeys={['user1']}
              render={(item) => item.title}
              listStyle={{
                width: 300,
                height: 400,
              }}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </PageContainer>
  );
};

export default RolePage;