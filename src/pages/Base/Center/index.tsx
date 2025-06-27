import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import React, { useRef } from 'react';

// 中心数据类型
interface CenterItem {
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
const mockData: CenterItem[] = [
  {
    id: '1',
    code: 'C001',
    name: '南京学习中心',
    parentName: '计算机学院',
    head: '张老师',
    phone: '13800138001',
    description: '南京地区直属学习中心',
    isActive: true,
    createdAt: '2023-01-01'
  },
  {
    id: '2',
    code: 'C002',
    name: '上海学习中心',
    parentName: '计算机学院',
    head: '李老师',
    phone: '13800138002',
    description: '上海地区直属学习中心',
    isActive: true,
    createdAt: '2023-01-02'
  },
  {
    id: '3',
    code: 'C003',
    name: '成都学习中心',
    parentName: '商学院',
    head: '王老师',
    phone: '13800138003',
    description: '成都地区直属学习中心',
    isActive: false,
    createdAt: '2023-01-03'
  }
];

const CenterList: React.FC = () => {
  const actionRef = useRef();

  const columns: ProColumns<CenterItem>[] = [
    {
      title: '所属学院',
      dataIndex: 'parentName',
      width: 120,
    },
    {
      title: '中心编码',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: '中心名称',
      dataIndex: 'name',
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
      <ProTable<CenterItem>
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

export default CenterList;