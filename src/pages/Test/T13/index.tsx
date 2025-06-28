import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface SubmissionRateItem {
  id: string;
  college: string;
  major: string;
  grade: string;
  totalStudents: number;
  submitted: number;
  submissionRate: number;
  passed: number;
  passRate: number;
  lastUpdate: string;
}

const demoData: SubmissionRateItem[] = [
  {
    id: '1',
    college: '计算机学院',
    major: '计算机科学与技术',
    grade: '2020级',
    totalStudents: 120,
    submitted: 110,
    submissionRate: 91.67,
    passed: 95,
    passRate: 79.17,
    lastUpdate: '2023-09-15',
  },
  {
    id: '2',
    college: '软件学院',
    major: '软件工程',
    grade: '2020级',
    totalStudents: 150,
    submitted: 135,
    submissionRate: 90.0,
    passed: 120,
    passRate: 80.0,
    lastUpdate: '2023-09-15',
  },
  {
    id: '3',
    college: '信息学院',
    major: '信息安全',
    grade: '2020级',
    totalStudents: 80,
    submitted: 75,
    submissionRate: 93.75,
    passed: 65,
    passRate: 81.25,
    lastUpdate: '2023-09-15',
  },
  {
    id: '4',
    college: '计算机学院',
    major: '人工智能',
    grade: '2020级',
    totalStudents: 60,
    submitted: 58,
    submissionRate: 96.67,
    passed: 50,
    passRate: 83.33,
    lastUpdate: '2023-09-15',
  },
  {
    id: '5',
    college: '软件学院',
    major: '大数据',
    grade: '2020级',
    totalStudents: 90,
    submitted: 82,
    submissionRate: 91.11,
    passed: 75,
    passRate: 83.33,
    lastUpdate: '2023-09-15',
  },
  {
    id: '6',
    college: '信息学院',
    major: '物联网',
    grade: '2020级',
    totalStudents: 70,
    submitted: 65,
    submissionRate: 92.86,
    passed: 58,
    passRate: 82.86,
    lastUpdate: '2023-09-15',
  },
  {
    id: '7',
    college: '计算机学院',
    major: '计算机科学与技术',
    grade: '2021级',
    totalStudents: 130,
    submitted: 115,
    submissionRate: 88.46,
    passed: 100,
    passRate: 76.92,
    lastUpdate: '2023-09-15',
  },
  {
    id: '8',
    college: '软件学院',
    major: '软件工程',
    grade: '2021级',
    totalStudents: 160,
    submitted: 140,
    submissionRate: 87.5,
    passed: 125,
    passRate: 78.13,
    lastUpdate: '2023-09-15',
  },
  {
    id: '9',
    college: '信息学院',
    major: '信息安全',
    grade: '2021级',
    totalStudents: 85,
    submitted: 78,
    submissionRate: 91.76,
    passed: 70,
    passRate: 82.35,
    lastUpdate: '2023-09-15',
  },
  {
    id: '10',
    college: '计算机学院',
    major: '人工智能',
    grade: '2021级',
    totalStudents: 65,
    submitted: 62,
    submissionRate: 95.38,
    passed: 55,
    passRate: 84.62,
    lastUpdate: '2023-09-15',
  },
  {
    id: '11',
    college: '软件学院',
    major: '大数据',
    grade: '2021级',
    totalStudents: 95,
    submitted: 85,
    submissionRate: 89.47,
    passed: 80,
    passRate: 84.21,
    lastUpdate: '2023-09-15',
  },
  {
    id: '12',
    college: '信息学院',
    major: '物联网',
    grade: '2021级',
    totalStudents: 75,
    submitted: 70,
    submissionRate: 93.33,
    passed: 65,
    passRate: 86.67,
    lastUpdate: '2023-09-15',
  },
];

const columns: ProColumns<SubmissionRateItem>[] = [
  { title: '学院', dataIndex: 'college', width: 120 },
  { title: '专业', dataIndex: 'major', width: 150 },
  { title: '年级', dataIndex: 'grade', width: 100 },
  { title: '总人数', dataIndex: 'totalStudents', width: 100 },
  { title: '已提交', dataIndex: 'submitted', width: 100 },
  {
    title: '提交率(%)',
    dataIndex: 'submissionRate',
    width: 120,
    render: (_, record) => `${record.submissionRate.toFixed(2)}%`,
  },
  { title: '通过数', dataIndex: 'passed', width: 100 },
  {
    title: '通过率(%)',
    dataIndex: 'passRate',
    width: 120,
    render: (_, record) => `${record.passRate.toFixed(2)}%`,
  },
  { title: '最后更新', dataIndex: 'lastUpdate', width: 120 },
];

const T13: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<SubmissionRateItem[]>([]);
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
        论文提交率统计表
      </div>
      <ProTable<SubmissionRateItem>
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
        <Form.Item name="college" label="学院">
          <Input placeholder="请输入学院名称" />
        </Form.Item>
        <Form.Item name="major" label="专业">
          <Input placeholder="请输入专业名称" />
        </Form.Item>
        <Form.Item name="grade" label="年级">
          <Input placeholder="请输入年级" />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T13;
