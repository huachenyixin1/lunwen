import React, { useState, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Card, Checkbox, Space, message } from 'antd';

interface OrgData {
  id: string;
  code: string;
  name: string;
  enabled: boolean;
  steps: boolean[]; // 0:开题申请 1:开题报告 2:论文初稿 3:中期检查 4:论文终稿 5:终审
}

const AIScopePage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  // 模拟组织数据
  const [orgData, setOrgData] = useState<OrgData[]>([
    {
      id: '001',
      code: 'ORG001',
      name: '计算机学院',
      enabled: true,
      steps: [true, true, true, true, true, true, true]
    },
    {
      id: '002',
      code: 'ORG002',
      name: '经济管理学院',
      enabled: true,
      steps: [true, false, true, false, true, false, true]
    },
    {
      id: '003',
      code: 'ORG003',
      name: '外国语学院',
      enabled: false,
      steps: [false, false, false, false, false, false, false]
    }
  ]);

  // 模拟加载状态
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 模拟API请求
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const columns: ProColumns<OrgData>[] = [
    {
      title: '组织编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '组织名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '是否启用AI',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.enabled} />
      ),
    },
    {
      title: '开题申请',
      key: 'step0',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.steps[0]} />
      ),
    },
    {
      title: '开题报告',
      key: 'step1',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.steps[1]} />
      ),
    },
    {
      title: '论文初稿',
      key: 'step2',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.steps[2]} />
      ),
    },
    {
      title: '中期检查',
      key: 'step3',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.steps[3]} />
      ),
    },
    {
      title: '论文终稿',
      key: 'step4',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.steps[4]} />
      ),
    },
    {
      title: '终审',
      key: 'step5',
      render: (dom: React.ReactNode, record: OrgData) => (
        <Checkbox checked={record.steps[5]} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">编辑</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <ProTable
          rowKey="id"
          columns={columns}
          dataSource={orgData}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          toolBarRender={() => [
            <Button key="save" type="primary">
              保存配置
            </Button>,
          ]}
          search={false}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: false
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default AIScopePage;