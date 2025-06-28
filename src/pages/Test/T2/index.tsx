import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface MajorDistributionItem {
  id: string;
  majorName: string;
  studentCount: number;
  maleCount: number;
  femaleCount: number;
  college: string;
  grade: string;
  teacherCount: number;
  avgScore: number;
  excellentRate: number;
}

const demoData: MajorDistributionItem[] = [
  {
    id: '1',
    majorName: '计算机科学与技术',
    studentCount: 120,
    maleCount: 80,
    femaleCount: 40,
    college: '计算机学院',
    grade: '2023级',
    teacherCount: 15,
    avgScore: 85.6,
    excellentRate: 30.5,
  },
  {
    id: '2',
    majorName: '软件工程',
    studentCount: 90,
    maleCount: 60,
    femaleCount: 30,
    college: '软件学院',
    grade: '2023级',
    teacherCount: 12,
    avgScore: 87.2,
    excellentRate: 35.2,
  },
  {
    id: '3',
    majorName: '信息安全',
    studentCount: 60,
    maleCount: 45,
    femaleCount: 15,
    college: '信息学院',
    grade: '2023级',
    teacherCount: 8,
    avgScore: 89.1,
    excellentRate: 42.3,
  },
  {
    id: '4',
    majorName: '人工智能',
    studentCount: 50,
    maleCount: 35,
    femaleCount: 15,
    college: '计算机学院',
    grade: '2023级',
    teacherCount: 10,
    avgScore: 88.5,
    excellentRate: 38.7,
  },
  {
    id: '5',
    majorName: '数据科学',
    studentCount: 45,
    maleCount: 25,
    femaleCount: 20,
    college: '信息学院',
    grade: '2023级',
    teacherCount: 6,
    avgScore: 86.9,
    excellentRate: 33.8,
  },
  {
    id: '6',
    majorName: '网络工程',
    studentCount: 75,
    maleCount: 55,
    femaleCount: 20,
    college: '计算机学院',
    grade: '2023级',
    teacherCount: 9,
    avgScore: 84.3,
    excellentRate: 28.4,
  },
  {
    id: '7',
    majorName: '数字媒体技术',
    studentCount: 65,
    maleCount: 30,
    femaleCount: 35,
    college: '软件学院',
    grade: '2023级',
    teacherCount: 7,
    avgScore: 83.7,
    excellentRate: 25.9,
  },
  {
    id: '8',
    majorName: '物联网工程',
    studentCount: 55,
    maleCount: 40,
    femaleCount: 15,
    college: '信息学院',
    grade: '2023级',
    teacherCount: 8,
    avgScore: 85.2,
    excellentRate: 31.6,
  },
  {
    id: '9',
    majorName: '智能科学与技术',
    studentCount: 40,
    maleCount: 25,
    femaleCount: 15,
    college: '计算机学院',
    grade: '2023级',
    teacherCount: 6,
    avgScore: 87.8,
    excellentRate: 37.2,
  },
  {
    id: '10',
    majorName: '区块链工程',
    studentCount: 30,
    maleCount: 20,
    femaleCount: 10,
    college: '软件学院',
    grade: '2023级',
    teacherCount: 5,
    avgScore: 89.5,
    excellentRate: 45.1,
  },
];

const columns: ProColumns<MajorDistributionItem>[] = [
  { title: '专业名称', dataIndex: 'majorName', width: 150 },
  { title: '学生总数', dataIndex: 'studentCount', width: 100 },
  { title: '男生人数', dataIndex: 'maleCount', width: 100 },
  { title: '女生人数', dataIndex: 'femaleCount', width: 100 },
  { title: '所属学院', dataIndex: 'college', width: 120 },
  { title: '年级', dataIndex: 'grade', width: 80 },
  { title: '教师人数', dataIndex: 'teacherCount', width: 100 },
  {
    title: '平均成绩',
    dataIndex: 'avgScore',
    width: 100,
    render: (_, record) => `${record.avgScore.toFixed(1)}`,
  },
  {
    title: '优秀率(%)',
    dataIndex: 'excellentRate',
    width: 100,
    render: (_, record) => `${record.excellentRate.toFixed(1)}%`,
  },
];

const T2: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<MajorDistributionItem[]>([]);
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
        专业分布统计表
      </div>
      <ProTable<MajorDistributionItem>
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
        <Form.Item name="majorName" label="专业名称">
          <Input placeholder="请输入专业名称" />
        </Form.Item>
        <Form.Item name="college" label="所属学院">
          <Input placeholder="请输入学院" />
        </Form.Item>
        <Form.Item name="grade" label="年级">
          <Select placeholder="请选择年级">
            <Select.Option value="2021级">2021级</Select.Option>
            <Select.Option value="2022级">2022级</Select.Option>
            <Select.Option value="2023级">2023级</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T2;
