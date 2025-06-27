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

// 定义班级的数据类型
interface ClassItem {
  id: string;
  code: string;
  name: string;
  isActive: boolean;  // 基础模板需要的状态字段
  createdAt: string;
  updatedAt: string;
}

const ClassList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<ClassItem[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [hasEdited, setHasEdited] = useState<boolean>(false);

  // 定义列配置
  const columns: ProColumns<ClassItem>[] = [
    {
      title: '班级编码',
      dataIndex: 'code',
      formItemProps: {
        rules: [{ required: true, message: '请输入班级编码' }],
      },
      editable: false,
      fixed: 'left',
      width: 100,
    },
    {
      title: '班级名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入班级名称' }],
      },
      editable: false,
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      valueEnum: {
        true: { text: '启用', status: 'Success' },
        false: { text: '停用', status: 'Default' },
      },
      editable: false,
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      editable: false,
      search: false,
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      editable: false,
      search: false,
      width: 150,
    },
  ];

  const handleStatusChange = async (records: ClassItem[], isActive: boolean) => {
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
              code: '',
              name: '',
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
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
      <ProTable<ClassItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [renderToolbarButtons()]
        }
        request={async (params) => {
          // TODO: 调用实际的API
          return {
            data: [
              {
                id: 'class123',
                code: 'CL001',
                name: '2024春季班',
                isActive: true,
                createdAt: '2025-01-01T12:00:00Z',
                updatedAt: '2025-01-01T12:00:00Z',
              },
            ],
            success: true,
            total: 1,
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
          persistenceKey: 'class-list-columns',
          defaultValue: {
            createdAt: { show: false },
            updatedAt: { show: false },
          },
        }}
      />
    </PageContainer>
  );
};

export default ClassList;