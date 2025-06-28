import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface YearProgressItem {
  year: string;
  totalPapers: number;
  submitted: number;
  submittedRate: string;
  reviewed: number;
  reviewedRate: string;
  approved: number;
  approvedRate: string;
  avgScore: number;
  avgReviewDays: number;
}

const columns: ProColumns<YearProgressItem>[] = [
  { title: '年份', dataIndex: 'year', width: 100 },
  { title: '总论文数', dataIndex: 'totalPapers' },
  {
    title: '已提交数',
    dataIndex: 'submitted',
    render: (_, record) =>
      `${record.submitted} (${parseFloat(record.submittedRate) * 100}%)`,
  },
  {
    title: '已审核数',
    dataIndex: 'reviewed',
    render: (_, record) =>
      `${record.reviewed} (${parseFloat(record.reviewedRate) * 100}%)`,
  },
  {
    title: '已通过数',
    dataIndex: 'approved',
    render: (_, record) =>
      `${record.approved} (${parseFloat(record.approvedRate) * 100}%)`,
  },
  {
    title: '平均分',
    dataIndex: 'avgScore',
    render: (_, record) => record.avgScore.toFixed(1),
  },
  {
    title: '平均审核天数',
    dataIndex: 'avgReviewDays',
    render: (_, record) => record.avgReviewDays.toFixed(1),
  },
];

const mockData: YearProgressItem[] = [
  {
    year: '2024',
    totalPapers: 850,
    submitted: 680,
    submittedRate: '0.80',
    reviewed: 510,
    reviewedRate: '0.60',
    approved: 425,
    approvedRate: '0.50',
    avgScore: 82.3,
    avgReviewDays: 10.5,
  },
  {
    year: '2023',
    totalPapers: 780,
    submitted: 624,
    submittedRate: '0.80',
    reviewed: 468,
    reviewedRate: '0.60',
    approved: 390,
    approvedRate: '0.50',
    avgScore: 81.7,
    avgReviewDays: 11.2,
  },
  {
    year: '2022',
    totalPapers: 720,
    submitted: 576,
    submittedRate: '0.80',
    reviewed: 432,
    reviewedRate: '0.60',
    approved: 360,
    approvedRate: '0.50',
    avgScore: 80.5,
    avgReviewDays: 12.8,
  },
  {
    year: '2021',
    totalPapers: 650,
    submitted: 520,
    submittedRate: '0.80',
    reviewed: 390,
    reviewedRate: '0.60',
    approved: 325,
    approvedRate: '0.50',
    avgScore: 79.8,
    avgReviewDays: 14.3,
  },
  {
    year: '2020',
    totalPapers: 600,
    submitted: 480,
    submittedRate: '0.80',
    reviewed: 360,
    reviewedRate: '0.60',
    approved: 300,
    approvedRate: '0.50',
    avgScore: 78.2,
    avgReviewDays: 15.6,
  },
];

const T6: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<YearProgressItem[]>([]);
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
        年度进度对比表
      </div>
      <ProTable<YearProgressItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="year"
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
        dataSource={mockData}
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
        <Form.Item name="year" label="年份">
          <Select placeholder="请选择年份">
            <Select.Option value="2024">2024</Select.Option>
            <Select.Option value="2023">2023</Select.Option>
            <Select.Option value="2022">2022</Select.Option>
            <Select.Option value="2021">2021</Select.Option>
            <Select.Option value="2020">2020</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T6;
