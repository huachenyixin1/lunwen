import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface ReviewProgressItem {
  id: string;
  projectName: string;
  college: string;
  major: string;
  teacher: string;
  submitDate: string;
  firstReviewDate: string;
  finalReviewDate: string;
  status: '未提交' | '初审中' | '复审中' | '已通过' | '需修改';
  currentStage: string;
  reviewer: string;
  score?: number;
}

const demoData: ReviewProgressItem[] = [
  {
    id: '1',
    projectName: '基于AI的论文质量评估系统',
    college: '计算机学院',
    major: '计算机科学与技术',
    teacher: '张教授',
    submitDate: '2025-05-10',
    firstReviewDate: '2025-05-15',
    finalReviewDate: '2025-05-25',
    status: '已通过',
    currentStage: '终审完成',
    reviewer: '李教授',
    score: 92,
  },
  {
    id: '2',
    projectName: '区块链在教育认证中的应用',
    college: '软件学院',
    major: '软件工程',
    teacher: '王教授',
    submitDate: '2025-05-12',
    firstReviewDate: '2025-05-18',
    finalReviewDate: '',
    status: '复审中',
    currentStage: '专家复审',
    reviewer: '赵教授',
  },
  {
    id: '3',
    projectName: '大数据分析在医疗领域的应用',
    college: '信息学院',
    major: '数据科学',
    teacher: '刘教授',
    submitDate: '2025-05-15',
    firstReviewDate: '2025-05-20',
    finalReviewDate: '',
    status: '初审中',
    currentStage: '专家初审',
    reviewer: '陈教授',
  },
  {
    id: '4',
    projectName: '物联网智能家居系统设计',
    college: '计算机学院',
    major: '物联网工程',
    teacher: '孙教授',
    submitDate: '2025-05-08',
    firstReviewDate: '2025-05-13',
    finalReviewDate: '2025-05-23',
    status: '需修改',
    currentStage: '等待修改',
    reviewer: '周教授',
    score: 68,
  },
  {
    id: '5',
    projectName: '虚拟现实在教学中的应用',
    college: '软件学院',
    major: '数字媒体技术',
    teacher: '吴教授',
    submitDate: '2025-05-18',
    firstReviewDate: '',
    finalReviewDate: '',
    status: '未提交',
    currentStage: '等待提交',
    reviewer: '',
  },
  {
    id: '6',
    projectName: '机器学习算法优化研究',
    college: '计算机学院',
    major: '人工智能',
    teacher: '郑教授',
    submitDate: '2025-05-09',
    firstReviewDate: '2025-05-14',
    finalReviewDate: '2025-05-24',
    status: '已通过',
    currentStage: '终审完成',
    reviewer: '钱教授',
    score: 88,
  },
  {
    id: '7',
    projectName: '网络安全防护系统设计',
    college: '信息学院',
    major: '信息安全',
    teacher: '林教授',
    submitDate: '2025-05-11',
    firstReviewDate: '2025-05-16',
    finalReviewDate: '',
    status: '复审中',
    currentStage: '专家复审',
    reviewer: '黄教授',
  },
  {
    id: '8',
    projectName: '智能推荐算法研究',
    college: '计算机学院',
    major: '计算机科学与技术',
    teacher: '马教授',
    submitDate: '2025-05-14',
    firstReviewDate: '2025-05-19',
    finalReviewDate: '',
    status: '初审中',
    currentStage: '专家初审',
    reviewer: '高教授',
  },
  {
    id: '9',
    projectName: '云计算资源调度优化',
    college: '软件学院',
    major: '软件工程',
    teacher: '欧阳教授',
    submitDate: '2025-05-07',
    firstReviewDate: '2025-05-12',
    finalReviewDate: '2025-05-22',
    status: '需修改',
    currentStage: '等待修改',
    reviewer: '司马教授',
    score: 72,
  },
  {
    id: '10',
    projectName: '自然语言处理技术研究',
    college: '计算机学院',
    major: '人工智能',
    teacher: '诸葛教授',
    submitDate: '2025-05-16',
    firstReviewDate: '2025-05-21',
    finalReviewDate: '',
    status: '复审中',
    currentStage: '专家复审',
    reviewer: '东方教授',
  },
];

const columns: ProColumns<ReviewProgressItem>[] = [
  { title: '项目名称', dataIndex: 'projectName', width: 200 },
  { title: '学院', dataIndex: 'college', width: 120 },
  { title: '专业', dataIndex: 'major', width: 150 },
  { title: '指导教师', dataIndex: 'teacher', width: 100 },
  { title: '提交日期', dataIndex: 'submitDate', width: 100 },
  { title: '初审日期', dataIndex: 'firstReviewDate', width: 100 },
  { title: '终审日期', dataIndex: 'finalReviewDate', width: 100 },
  {
    title: '审核状态',
    dataIndex: 'status',
    width: 100,
    valueEnum: {
      未提交: { text: '未提交', status: 'Default' },
      初审中: { text: '初审中', status: 'Processing' },
      复审中: { text: '复审中', status: 'Processing' },
      已通过: { text: '已通过', status: 'Success' },
      需修改: { text: '需修改', status: 'Error' },
    },
  },
  { title: '当前阶段', dataIndex: 'currentStage', width: 120 },
  { title: '审核人', dataIndex: 'reviewer', width: 100 },
  {
    title: '评分',
    dataIndex: 'score',
    width: 80,
    render: (_, record) => (record.score ? `${record.score}` : '-'),
  },
];

const T3: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<ReviewProgressItem[]>([]);
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
        审核进度总览表
      </div>
      <ProTable<ReviewProgressItem>
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
        scroll={{ x: 1500 }}
      />

      <ModalForm
        title="查询条件"
        visible={searchVisible}
        onVisibleChange={setSearchVisible}
        onFinish={handleSearch}
        form={form}
      >
        <Form.Item name="projectName" label="项目名称">
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item name="college" label="学院">
          <Input placeholder="请输入学院" />
        </Form.Item>
        <Form.Item name="major" label="专业">
          <Input placeholder="请输入专业" />
        </Form.Item>
        <Form.Item name="status" label="审核状态">
          <Select placeholder="请选择审核状态">
            <Select.Option value="未提交">未提交</Select.Option>
            <Select.Option value="初审中">初审中</Select.Option>
            <Select.Option value="复审中">复审中</Select.Option>
            <Select.Option value="已通过">已通过</Select.Option>
            <Select.Option value="需修改">需修改</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T3;
