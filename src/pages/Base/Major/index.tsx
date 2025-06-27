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

// 定义专业的数据类型
interface MajorItem {
  id: string;
  code: string;
  name: string;
  type: '专科' | '本科';  // 定义类型为专科或本科
  isActive: boolean;  // 添加状态字段
  createdAt: string;
  updatedAt: string;
}

const MajorList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<MajorItem[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [hasEdited, setHasEdited] = useState<boolean>(false);

  // 定义列配置
  const columns: ProColumns<MajorItem>[] = [
    {
      title: '专业编码',
      dataIndex: 'code',
      formItemProps: {
        rules: [{ required: true, message: '请输入专业编码' }],
      },
      editable: false,
      fixed: 'left',
      width: 120,
    },
    {
      title: '专业名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入专业名称' }],
      },
      editable: false,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        '专科': { text: '专科', status: 'Default' },
        '本科': { text: '本科', status: 'Success' },
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择专业类型' }],
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

  const handleStatusChange = async (records: MajorItem[], isActive: boolean) => {
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
              type: '专科',
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
      <ProTable<MajorItem>
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
                id: 'major123',
                code: 'MAJ001',
                name: '计算机科学与技术',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-01T12:00:00Z',
                updatedAt: '2025-01-01T12:00:00Z',
              },
              {
                id: 'major124',
                code: 'MAJ002',
                name: '软件工程',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-02T12:00:00Z',
                updatedAt: '2025-01-02T12:00:00Z',
              },
              {
                id: 'major125',
                code: 'MAJ003',
                name: '电子信息工程',
                type: '本科',
                isActive: false,
                createdAt: '2025-01-03T12:00:00Z',
                updatedAt: '2025-01-03T12:00:00Z',
              },
              {
                id: 'major126',
                code: 'MAJ004',
                name: '金融学',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-04T12:00:00Z',
                updatedAt: '2025-01-04T12:00:00Z',
              },
              {
                id: 'major127',
                code: 'MAJ005',
                name: '法学',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-05T12:00:00Z',
                updatedAt: '2025-01-05T12:00:00Z',
              },
              {
                id: 'major128',
                code: 'MAJ006',
                name: '汉语言文学',
                type: '本科',
                isActive: false,
                createdAt: '2025-01-06T12:00:00Z',
                updatedAt: '2025-01-06T12:00:00Z',
              },
              {
                id: 'major129',
                code: 'MAJ007',
                name: '护理学',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-07T12:00:00Z',
                updatedAt: '2025-01-07T12:00:00Z',
              },
              {
                id: 'major130',
                code: 'MAJ008',
                name: '会计学',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-08T12:00:00Z',
                updatedAt: '2025-01-08T12:00:00Z',
              },
              {
                id: 'major131',
                code: 'MAJ009',
                name: '土木工程',
                type: '本科',
                isActive: false,
                createdAt: '2025-01-09T12:00:00Z',
                updatedAt: '2025-01-09T12:00:00Z',
              },
              {
                id: 'major132',
                code: 'MAJ010',
                name: '英语',
                type: '本科',
                isActive: true,
                createdAt: '2025-01-10T12:00:00Z',
                updatedAt: '2025-01-10T12:00:00Z',
              }
            ],
            success: true,
            total: 10,
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
          persistenceKey: 'major-list-columns',
          defaultValue: {
            createdAt: { show: false },
            updatedAt: { show: false },
          },
        }}
      />
    </PageContainer>
  );
};

export default MajorList;