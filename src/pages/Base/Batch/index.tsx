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

interface BatchItem {
  id: string;
  year: number;
  season: '春季' | '秋季';
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const BatchList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<BatchItem[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [hasEdited, setHasEdited] = useState<boolean>(false);

  const columns: ProColumns<BatchItem>[] = [
    {
      title: '年份',
      dataIndex: 'year',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '请选择年份' }],
      },
      editable: false,
      fixed: 'left',
      width: 120,
      render: (text) => text ? text.toString() : '',
    },
    {
      title: '季节',
      dataIndex: 'season',
      valueType: 'select',
      valueEnum: {
        '春季': { text: '春季' },
        '秋季': { text: '秋季' }
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择季节' }],
      },
      editable: false,
      width: 100,
    },
    {
      title: '批次名称',
      dataIndex: 'name',
      editable: false,
      width: 200,
      render: (_, record) => `${record.year}${record.season}`
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
      width: 180,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      editable: false,
      search: false,
      width: 180,
    },
  ];

  const handleStatusChange = async (records: BatchItem[], isActive: boolean) => {
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
              year: new Date().getFullYear(),
              season: '春季',
              name: `${new Date().getFullYear()}春季`,
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
      <ProTable<BatchItem>
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
                id: 'batch2024spring',
                year: 2024,
                season: '春季',
                name: '2024春季',
                isActive: true,
                createdAt: '2024-01-01T12:00:00Z',
                updatedAt: '2024-01-01T12:00:00Z',
              },
              {
                id: 'batch2024fall',
                year: 2024,
                season: '秋季',
                name: '2024秋季',
                isActive: true,
                createdAt: '2024-08-01T12:00:00Z',
                updatedAt: '2024-08-01T12:00:00Z',
              },
              {
                id: 'batch2025spring',
                year: 2025,
                season: '春季',
                name: '2025春季',
                isActive: false,
                createdAt: '2025-01-01T12:00:00Z',
                updatedAt: '2025-01-01T12:00:00Z',
              },
              {
                id: 'batch2025fall',
                year: 2025,
                season: '秋季',
                name: '2025秋季',
                isActive: true,
                createdAt: '2025-08-01T12:00:00Z',
                updatedAt: '2025-08-01T12:00:00Z',
              }
            ],
            success: true,
            total: 4,
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
          persistenceKey: 'batch-list-columns',
          defaultValue: {
            createdAt: { show: false },
            updatedAt: { show: false },
          },
        }}
      />
    </PageContainer>
  );
};

export default BatchList;