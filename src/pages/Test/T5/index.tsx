import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface StatusDistributionItem {
  status: string;
  count: number;
  percentage: string;
  avgScore: number;
  avgReviewDays: number;
  collegeDistribution: string;
}

const columns: ProColumns<StatusDistributionItem>[] = [
  {
    title: '论文状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      未提交: { text: '未提交', status: 'Default' },
      已提交: { text: '已提交', status: 'Processing' },
      初审中: { text: '初审中', status: 'Warning' },
      修改中: { text: '修改中', status: 'Warning' },
      复审中: { text: '复审中', status: 'Warning' },
      已通过: { text: '已通过', status: 'Success' },
      未通过: { text: '未通过', status: 'Error' },
    },
  },
  { title: '数量', dataIndex: 'count' },
  {
    title: '占比',
    dataIndex: 'percentage',
    render: (_, record) => `${parseFloat(record.percentage) * 100}%`,
  },
  {
    title: '平均分',
    dataIndex: 'avgScore',
    render: (_, record) =>
      record.avgScore > 0 ? record.avgScore.toFixed(1) : '-',
  },
  {
    title: '平均审核天数',
    dataIndex: 'avgReviewDays',
    render: (_, record) =>
      record.avgReviewDays > 0 ? record.avgReviewDays.toFixed(1) : '-',
  },
  { title: '学院分布', dataIndex: 'collegeDistribution' },
];

const mockData: StatusDistributionItem[] = [
  {
    status: '未提交',
    count: 125,
    percentage: '0.15',
    avgScore: 0,
    avgReviewDays: 0,
    collegeDistribution: '计算机(45),软件(30),人文(20),其他(30)',
  },
  {
    status: '已提交',
    count: 85,
    percentage: '0.10',
    avgScore: 0,
    avgReviewDays: 0,
    collegeDistribution: '计算机(30),软件(25),数据(15),其他(15)',
  },
  {
    status: '初审中',
    count: 150,
    percentage: '0.18',
    avgScore: 0,
    avgReviewDays: 3.2,
    collegeDistribution: '计算机(60),软件(40),人工智能(25),其他(25)',
  },
  {
    status: '修改中',
    count: 90,
    percentage: '0.11',
    avgScore: 68.5,
    avgReviewDays: 7.5,
    collegeDistribution: '计算机(35),软件(25),网络安全(15),其他(15)',
  },
  {
    status: '复审中',
    count: 75,
    percentage: '0.09',
    avgScore: 72.3,
    avgReviewDays: 5.8,
    collegeDistribution: '计算机(30),软件(20),数据(10),其他(15)',
  },
  {
    status: '已通过',
    count: 210,
    percentage: '0.25',
    avgScore: 85.7,
    avgReviewDays: 12.3,
    collegeDistribution: '计算机(80),软件(60),人文(30),其他(40)',
  },
  {
    status: '未通过',
    count: 95,
    percentage: '0.12',
    avgScore: 62.4,
    avgReviewDays: 10.5,
    collegeDistribution: '计算机(35),软件(25),人工智能(15),其他(20)',
  },
];

const T5: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<StatusDistributionItem[]>([]);
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
        论文状态分布表
      </div>
      <ProTable<StatusDistributionItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="status"
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
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态">
            <Select.Option value="未提交">未提交</Select.Option>
            <Select.Option value="已提交">已提交</Select.Option>
            <Select.Option value="初审中">初审中</Select.Option>
            <Select.Option value="修改中">修改中</Select.Option>
            <Select.Option value="复审中">复审中</Select.Option>
            <Select.Option value="已通过">已通过</Select.Option>
            <Select.Option value="未通过">未通过</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T5;
