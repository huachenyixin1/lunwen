import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Dropdown, message, Space } from 'antd';
import type { MenuProps } from 'antd';
import React, { useRef, useState } from 'react';

interface StudentUserItem {
  id: string;
  studentId: string;
  collegeId: string;
  centerId: string;
  name: string;
  batchId: string;
  password: string;
}

const StudentUserList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<StudentUserItem[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [hasEdited, setHasEdited] = useState<boolean>(false);

  const columns: ProColumns<StudentUserItem>[] = [
    { title: 'ID', dataIndex: 'id', editable: false, width: 80 },
    { title: '学生ID', dataIndex: 'studentId', editable: false, width: 120 },
    { title: '学院ID', dataIndex: 'collegeId', editable: false, width: 120 },
    { title: '学习中心ID', dataIndex: 'centerId', editable: false, width: 120 },
    { title: '姓名', dataIndex: 'name', editable: false, width: 100 },
    { title: '批次ID', dataIndex: 'batchId', editable: false, width: 120 },
    // { title: '密码', dataIndex: 'password', editable: false, width: 120 }, // 密码字段不显示
  ];

  const handleStatusChange = async (records: StudentUserItem[], isActive: boolean) => {
    message.success(`${isActive ? '启用' : '停用'}成功（mock）`);
    actionRef.current?.reload();
  };

  const statusMenuItems: MenuProps['items'] = [
    {
      key: 'enable',
      label: '启用',
      icon: <CheckOutlined />,
      onClick: () => handleStatusChange(selectedRowsState, true),
    },
    {
      key: 'disable',
      label: '停用',
      icon: <StopOutlined />,
      onClick: () => handleStatusChange(selectedRowsState, false),
    },
  ];

  const renderToolbarButtons = () => {
    if (hasEdited) {
      return (
        <Space>
          <Button
            type="primary"
            key="save"
            onClick={async () => {
              message.success('保存成功（mock）');
              setEditableKeys([]);
              setHasEdited(false);
              actionRef.current?.reload();
            }}
          >
            保存
          </Button>
          <Button
            key="cancel"
            onClick={() => {
              setEditableKeys([]);
              setHasEdited(false);
              actionRef.current?.reload();
            }}
          >
            取消
          </Button>
        </Space>
      );
    }
    return (
      <Space>
        <Button
          type="primary"
          key="add"
          onClick={() => {
            const newRecord = {
              id: `new_${Date.now()}`,
              studentId: '',
              collegeId: '',
              centerId: '',
              name: '',
              batchId: '',
              password: '',
            };
            actionRef.current?.addEditRecord?.(newRecord);
            setEditableKeys([...editableKeys, newRecord.id]);
            setHasEdited(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>
        <Button
          key="edit"
          onClick={() => {
            const keys = selectedRowsState.map(row => row.id);
            setEditableKeys(keys);
            setHasEdited(true);
            selectedRowsState.forEach(row => {
              actionRef.current?.startEditable?.(row.id);
            });
          }}
        >
          <EditOutlined /> 编辑
        </Button>
        <Button
          key="resetPwd"
          disabled={selectedRowsState.length === 0}
          onClick={() => {
            message.success('重置密码成功（mock）');
          }}
        >
          <StopOutlined /> 重置密码
        </Button>
        <Dropdown 
          menu={{ items: statusMenuItems }} 
          disabled={selectedRowsState.length === 0}
        >
          <Button>
            状态操作
          </Button>
        </Dropdown>
        <Button
          key="delete"
          danger
          disabled={selectedRowsState.length === 0}
          onClick={async () => {
            message.success('删除成功（mock）');
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <DeleteOutlined /> 删除
        </Button>
      </Space>
    );
  };

  return (
    <PageContainer title={false}>
      <ProTable<StudentUserItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 900 }}
        toolBarRender={() => [renderToolbarButtons()]}
        request={async (params) => {
          // mock数据，来源于学生信息页面的部分字段
          return {
            data: [
              {
                id: '1',
                studentId: '20240001',
                collegeId: 'XG01',
                centerId: 'NJ01',
                name: '张三',
                batchId: '2024春季',
                password: '20240001',
              },
              {
                id: '2',
                studentId: '20240002',
                collegeId: 'JG01',
                centerId: 'CD01',
                name: '李四',
                batchId: '2024秋季',
                password: '20240002',
              },
              {
                id: '3',
                studentId: '20250001',
                collegeId: 'WY01',
                centerId: 'GZ01',
                name: '王五',
                batchId: '2025春季',
                password: '20250001',
              },
              {
                id: '4',
                studentId: '20250002',
                collegeId: 'FX01',
                centerId: 'BJ01',
                name: '赵六',
                batchId: '2025秋季',
                password: '20250002',
              },
              {
                id: '5',
                studentId: '20240003',
                collegeId: 'HL01',
                centerId: 'SH01',
                name: '孙七',
                batchId: '2024春季',
                password: '20240003',
              }
            ],
            success: true,
            total: 5,
          };
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableKeys,
          onValuesChange: () => {
            setHasEdited(true);
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columnsState={{
          persistenceKey: 'student-user-list-columns',
        }}
      />
    </PageContainer>
  );
};

export default StudentUserList;
