import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import React, { useRef } from 'react';

// 组织数据类型
interface OrgItem {
  id: string;
  code: string;
  name: string;
  parentName: string;
  head: string;
  phone: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

// mock数据
const mockData: OrgItem[] = [
  {
    id: 'org001',
    code: 'ORG001',
    name: '信息工程学院',
    parentName: '总校',
    head: '王老师',
    phone: '13800000001',
    description: '以信息技术为核心的学院',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'org002',
    code: 'ORG002',
    name: '经济管理学院',
    parentName: '总校',
    head: '李老师',
    phone: '13800000002',
    description: '经济与管理类专业',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'org003',
    code: 'ORG003',
    name: '护理学院',
    parentName: '总校',
    head: '赵老师',
    phone: '13800000003',
    description: '医学护理相关专业',
    isActive: false,
    createdAt: '2024-01-01'
  }
];

const OrgList: React.FC = () => {
  const actionRef = useRef();

  const columns: ProColumns<OrgItem>[] = [
    {
      title: '组织编码',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: '组织名称',
      dataIndex: 'name',
    },
    {
      title: '上级组织',
      dataIndex: 'parentName',
    },
    {
      title: '联系人',
      dataIndex: 'head',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      valueEnum: {
        true: { text: '启用', status: 'Success' },
        false: { text: '停用', status: 'Default' },
      },
      width: 100,
    },
  ];

  return (
    <PageContainer>
      <ProTable<OrgItem>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key="toolbar">
            <Button type="primary">新建</Button>
            <Button>删除</Button>
          </Space>
        ]}
        request={async ({ current, pageSize }) => {
          // 模拟分页查询
          const start = ((current || 1) - 1) * (pageSize || 10);
          const end = start + (pageSize || 10);
          const pageData = mockData.slice(start, end);
          
          return {
            data: pageData,
            success: true,
            total: mockData.length
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default OrgList;