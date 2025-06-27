type UserInfo = {
  id: string;
  name: string;
  nickName: string;
  email: string;
  [key: string]: any;
};

const mockData: {
  list: UserInfo[];
  total: number;
} = {
  list: [
    {
      id: '1',
      name: '示例用户1',
      nickName: '用户1',
      email: 'user1@example.com'
    },
    {
      id: '2',
      name: '示例用户2',
      nickName: '用户2',
      email: 'user2@example.com'
    }
  ],
  total: 2
};

type API = {
  UserInfo: UserInfo;
  FormValueType: UserInfo;
};
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API['UserInfo']) => {
  const hide = message.loading('正在添加');
  try {
    // 模拟添加操作
    mockData.list.push(fields);
    mockData.total += 1;
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: API['FormValueType'] & {id?: string}) => {
  const hide = message.loading('正在配置');
  try {
    // 模拟更新操作
    const index = mockData.list.findIndex(item => item.id === fields.id);
    if (index >= 0) {
      mockData.list[index] = { ...mockData.list[index], ...fields };
    }
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API['UserInfo'][]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // 模拟删除操作
    mockData.list = mockData.list.filter(
      item => !selectedRows.some(row => row.id === item.id)
    );
    mockData.total -= selectedRows.length;
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API['UserInfo']>();
  const [selectedRowsState, setSelectedRows] = useState<API['UserInfo'][]>([]);
  const columns: ProColumns<API['UserInfo'], 'text'>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      tip: '名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInForm: true,
      valueEnum: {
        0: { text: '男', status: 'MALE' },
        1: { text: '女', status: 'FEMALE' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: unknown, record: API['UserInfo']) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'CRUD 示例',
      }}
    >
      <ProTable<API['UserInfo']>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params = {}) => {
          // 模拟分页查询
          const { current = 1, pageSize = 10 } = params;
          const start = (current - 1) * pageSize;
          const end = start + pageSize;
          
          return {
            data: mockData.list.slice(start, end),
            success: true,
            total: mockData.total
          };
        }}
        columns={columns.map(col => ({
          ...col,
          title: col.title as React.ReactNode
        })) as any}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API['UserInfo'], API['UserInfo']>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate({
              ...stepFormValues,
              ...value,
              id: stepFormValues?.id || ''
            } as API['UserInfo']);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API['UserInfo']>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
