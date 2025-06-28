import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface CollegeCompletionItem {
  id: string;
  college: string;
  totalPapers: number;
  completedPapers: number;
  completionRate: number;
  avgScore: number;
  excellentRate: number;
  qualifiedRate: number;
  lastUpdate: string;
}

const demoData: CollegeCompletionItem[] = [
  {
    id: '1',
    college: '计算机学院',
    totalPapers: 156,
    completedPapers: 142,
    completionRate: 91.0,
    avgScore: 85.6,
    excellentRate: 32.5,
    qualifiedRate: 98.7,
    lastUpdate: '2025-06-28',
  },
  {
    id: '2',
    college: '软件学院',
    totalPapers: 128,
    completedPapers: 115,
    completionRate: 89.8,
    avgScore: 83.2,
    excellentRate: 28.7,
    qualifiedRate: 97.3,
    lastUpdate: '2025-06-28',
  },
  {
    id: '3',
    college: '信息学院',
    totalPapers: 98,
    completedPapers: 86,
    completionRate: 87.8,
    avgScore: 81.9,
    excellentRate: 25.3,
    qualifiedRate: 96.1,
    lastUpdate: '2025-06-27',
  },
  {
    id: '4',
    college: '电子工程学院',
    totalPapers: 112,
    completedPapers: 97,
    completionRate: 86.6,
    avgScore: 80.5,
    excellentRate: 22.8,
    qualifiedRate: 95.4,
    lastUpdate: '2025-06-27',
  },
  {
    id: '5',
    college: '机械工程学院',
    totalPapers: 105,
    completedPapers: 89,
    completionRate: 84.8,
    avgScore: 79.2,
    excellentRate: 20.1,
    qualifiedRate: 94.3,
    lastUpdate: '2025-06-26',
  },
  {
    id: '6',
    college: '材料科学与工程学院',
    totalPapers: 87,
    completedPapers: 72,
    completionRate: 82.8,
    avgScore: 78.6,
    excellentRate: 18.9,
    qualifiedRate: 93.7,
    lastUpdate: '2025-06-26',
  },
  {
    id: '7',
    college: '理学院',
    totalPapers: 76,
    completedPapers: 62,
    completionRate: 81.6,
    avgScore: 77.8,
    excellentRate: 17.5,
    qualifiedRate: 92.8,
    lastUpdate: '2025-06-25',
  },
  {
    id: '8',
    college: '经济管理学院',
    totalPapers: 94,
    completedPapers: 76,
    completionRate: 80.9,
    avgScore: 76.5,
    excellentRate: 16.2,
    qualifiedRate: 91.9,
    lastUpdate: '2025-06-25',
  },
  {
    id: '9',
    college: '人文学院',
    totalPapers: 68,
    completedPapers: 54,
    completionRate: 79.4,
    avgScore: 75.3,
    excellentRate: 15.7,
    qualifiedRate: 90.5,
    lastUpdate: '2025-06-24',
  },
  {
    id: '10',
    college: '艺术学院',
    totalPapers: 52,
    completedPapers: 41,
    completionRate: 78.8,
    avgScore: 74.8,
    excellentRate: 14.9,
    qualifiedRate: 89.7,
    lastUpdate: '2025-06-24',
  },
];

const columns: ProColumns<CollegeCompletionItem>[] = [
  { title: '学院名称', dataIndex: 'college', width: 150 },
  { title: '论文总数', dataIndex: 'totalPapers', width: 100 },
  { title: '已完成数', dataIndex: 'completedPapers', width: 100 },
  {
    title: '完成率(%)',
    dataIndex: 'completionRate',
    width: 100,
    render: (_, record) => `${record.completionRate.toFixed(1)}%`,
  },
  {
    title: '平均分',
    dataIndex: 'avgScore',
    width: 100,
    render: (_, record) => record.avgScore.toFixed(1),
  },
  {
    title: '优秀率(%)',
    dataIndex: 'excellentRate',
    width: 100,
    render: (_, record) => `${record.excellentRate.toFixed(1)}%`,
  },
  {
    title: '合格率(%)',
    dataIndex: 'qualifiedRate',
    width: 100,
    render: (_, record) => `${record.qualifiedRate.toFixed(1)}%`,
  },
  { title: '最后更新', dataIndex: 'lastUpdate', width: 120 },
];

const T4: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<CollegeCompletionItem[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [form] = Form.useForm();

  const handleExport = async () => {
    actionRef.current?.reload();
  };

  const handleSearch = async () => {
    const values = await form.validateFields();
    console.log('查询条件:', values);
    setSearchVisible(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer title={false}>
      <div
        style={{
          textAlign: 'center',
          marginBottom: 24,
          fontSize: 20,
          fontWeight: 'bold',
          width: '100%',
        }}
      >
        学院论文完成率统计表
      </div>
      <ProTable<CollegeCompletionItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Space key="toolbar-space">
            <Button key="search" onClick={() => setSearchVisible(true)}>
              查询
            </Button>
            <Button type="primary" key="export" onClick={handleExport}>
              导出
            </Button>
          </Space>,
        ]}
        columns={columns}
        dataSource={demoData}
        rowSelection={{
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        bordered
        size="middle"
        scroll={{ x: 1200 }}
      />

      <ModalForm
        title="查询条件"
        visible={searchVisible}
        onVisibleChange={setSearchVisible}
        onFinish={handleSearch}
        form={form}
      >
        <Form.Item name="college" label="学院名称">
          <Input placeholder="请输入学院名称" />
        </Form.Item>
        <Form.Item name="completionRate" label="完成率(%)">
          <Input placeholder="请输入完成率下限" />
        </Form.Item>
        <Form.Item name="avgScore" label="平均分">
          <Input placeholder="请输入平均分下限" />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T4;
