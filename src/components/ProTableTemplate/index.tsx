import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Dropdown, Space, message } from 'antd';
import type { MenuProps } from 'antd';
import React, { useRef, useState } from 'react';
export interface BaseItem {
  id: string;
  isActive: boolean;
  [key: string]: any;
}
export interface ProTableTemplateProps<T extends BaseItem> {
  columns: ProColumns<T>[];
  request: (params: any) => Promise<{ data: T[]; success: boolean; total: number; }>;
  defaultHiddenColumns?: string[];
  initialValues?: Partial<T>;
  onSave?: (records: T[], columns: ProColumns<T>[]) => Promise<void>;
  onDelete?: (records: T[]) => Promise<void>;
  onStatusChange?: (records: T[], isActive: boolean) => Promise<void>;
}
export const ProTableTemplate = <T extends BaseItem>(props: ProTableTemplateProps<T>) => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [hasEdited, setHasEdited] = useState<boolean>(false);
  const handleStatusChange = async (records: T[], isActive: boolean) => {
    try {
      await props.onStatusChange?.(records, isActive);
      message.success(`${isActive ? '启用' : '停用'}成功`);
      actionRef.current?.reload();
    } catch (error) {
      message.error(`${isActive ? '启用' : '停用'}失败`);
    }
  };
  const statusMenuItems: MenuProps['items'] = [
    {
      key: 'enable',
      label: '启用',
      icon: <CheckOutlined />,
      onClick: () => handleStatusChange(selectedRows, true),
    },
    {
      key: 'disable',
      label: '停用',
      icon: <StopOutlined />,
      onClick: () => handleStatusChange(selectedRows, false),
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
              try {
                console.log('当前editableKeys:', editableKeys);
                const rows = (actionRef.current as any)?.getDataSource?.() || [];
                console.log('所有数据:', rows);
                console.log('actionRef:', actionRef.current);
                const editedRows = rows
                  .filter((row: T) => {
                    console.log('检查记录:', row.id, '是否在editableKeys中:', editableKeys.includes(row.id));
                    return editableKeys.includes(row.id);
                  })
                  .map((row: T) => {
                    const formData = (actionRef.current as any)?.getRowFormData?.(row.id) || {};
                    console.log('编辑记录:', row.id, '原始数据:', row, '编辑数据:', formData);
                    return {
                      ...row,
                      ...formData
                    };
                  });
                console.log('最终编辑数据:', editedRows);
                console.log('当前编辑状态:', hasEdited);
                if (editedRows.length === 0) {
                  message.warning('没有可保存的数据');
                  return;
                }
                await props.onSave?.(editedRows, props.columns);
                message.success('保存成功');
                setEditableKeys([]);
                setHasEdited(false);
                actionRef.current?.reload();
              } catch (error) {
                message.error('保存失败');
              }
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
              isActive: true,
              ...(props.initialValues || {}),
            } as T;
            actionRef.current?.addEditRecord?.(newRecord);
            setEditableKeys([...editableKeys, newRecord.id]);
            setHasEdited(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>
        <Button
          key="edit"
          disabled={selectedRows.length === 0}
          onClick={() => {
            const keys = selectedRows.map((row) => row.id);
            setEditableKeys(keys);
            setHasEdited(true);
          }}
        >
          <EditOutlined /> 编辑
        </Button>
        <Dropdown 
          menu={{ items: statusMenuItems }} 
          disabled={selectedRows.length === 0}
        >
          <Button>
            状态操作
          </Button>
        </Dropdown>
        <Button
          key="delete"
          danger
          disabled={selectedRows.length === 0}
          onClick={async () => {
            try {
              await props.onDelete?.(selectedRows);
              message.success('删除成功');
              actionRef.current?.reloadAndRest?.();
            } catch (error) {
              message.error('删除失败');
            }
          }}
        >
          <DeleteOutlined /> 删除
        </Button>
      </Space>
    );
  };
  return (
    <PageContainer title={false}>
      <ProTable<T>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
          filterType: 'light',
        }}
        toolBarRender={() => [renderToolbarButtons()]}
        request={props.request}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableKeys,
          onValuesChange: () => {
            setHasEdited(true);
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        columns={props.columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-template',
          defaultValue: props.defaultHiddenColumns?.reduce((acc, key) => ({
            ...acc,
            [key]: { show: false },
          }), {}),
        }}
      />
    </PageContainer>
  );
};