import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface ApprovalTaskItem {
  id: string;
  paperId: string;
  paperTitle: string;
  author: string;
  college: string;
  submitTime: string;
  status:
    | '待初审'
    | '初审通过'
    | '初审驳回'
    | '待复审'
    | '复审通过'
    | '复审驳回';
  currentStep: string;
  daysPending: number;
}

const columns: ProColumns<ApprovalTaskItem>[] = [
  { title: '任务ID', dataIndex: 'id', width: 100 },
  { title: '论文ID', dataIndex: 'paperId', width: 120 },
  { title: '论文标题', dataIndex: 'paperTitle', ellipsis: true },
  { title: '作者', dataIndex: 'author', width: 100 },
  { title: '学院', dataIndex: 'college' },
  { title: '提交时间', dataIndex: 'submitTime' },
  {
    title: '审批状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      待初审: { text: '待初审', status: 'Processing' },
      初审通过: { text: '初审通过', status: 'Success' },
      初审驳回: { text: '初审驳回', status: 'Error' },
      待复审: { text: '待复审', status: 'Warning' },
      复审通过: { text: '复审通过', status: 'Success' },
      复审驳回: { text: '复审驳回', status: 'Error' },
    },
  },
  { title: '当前环节', dataIndex: 'currentStep' },
  { title: '待审批天数', dataIndex: 'daysPending' },
];

const mockData: ApprovalTaskItem[] = [
  {
    id: 'T001',
    paperId: 'P2024001',
    paperTitle: '深度学习在医学影像分析中的应用研究',
    author: '张三',
    college: '计算机学院',
    submitTime: '2024-05-10',
    status: '待初审',
    currentStep: '初审',
    daysPending: 3,
  },
  {
    id: 'T002',
    paperId: 'P2024002',
    paperTitle: '区块链技术在供应链金融中的应用',
    author: '李四',
    college: '软件学院',
    submitTime: '2024-05-12',
    status: '待初审',
    currentStep: '初审',
    daysPending: 1,
  },
  {
    id: 'T003',
    paperId: 'P2024003',
    paperTitle: '基于机器学习的股票预测模型研究',
    author: '王五',
    college: '数据科学学院',
    submitTime: '2024-05-05',
    status: '初审通过',
    currentStep: '复审',
    daysPending: 5,
  },
  {
    id: 'T004',
    paperId: 'P2024004',
    paperTitle: '云计算环境下的数据安全研究',
    author: '赵六',
    college: '网络安全学院',
    submitTime: '2024-05-08',
    status: '待复审',
    currentStep: '复审',
    daysPending: 2,
  },
  {
    id: 'T005',
    paperId: 'P2024005',
    paperTitle: '自然语言处理在智能客服中的应用',
    author: '钱七',
    college: '人工智能学院',
    submitTime: '2024-05-15',
    status: '待初审',
    currentStep: '初审',
    daysPending: 0,
  },
  {
    id: 'T006',
    paperId: 'P2024006',
    paperTitle: '物联网智能家居安全架构研究',
    author: '孙八',
    college: '计算机学院',
    submitTime: '2024-04-28',
    status: '初审驳回',
    currentStep: '修改',
    daysPending: 12,
  },
  {
    id: 'T007',
    paperId: 'P2024007',
    paperTitle: '大数据可视化分析平台设计',
    author: '周九',
    college: '数据科学学院',
    submitTime: '2024-05-01',
    status: '复审通过',
    currentStep: '完成',
    daysPending: 0,
  },
  {
    id: 'T008',
    paperId: 'P2024008',
    paperTitle: '联邦学习在隐私保护中的应用',
    author: '吴十',
    college: '人工智能学院',
    submitTime: '2024-05-14',
    status: '待复审',
    currentStep: '复审',
    daysPending: 1,
  },
  {
    id: 'T009',
    paperId: 'P2024009',
    paperTitle: '基于深度强化学习的游戏AI研究',
    author: '郑十一',
    college: '计算机学院',
    submitTime: '2024-05-09',
    status: '待初审',
    currentStep: '初审',
    daysPending: 4,
  },
  {
    id: 'T010',
    paperId: 'P2024010',
    paperTitle: '智能合约安全漏洞检测方法',
    author: '王十二',
    college: '网络安全学院',
    submitTime: '2024-05-11',
    status: '初审通过',
    currentStep: '复审',
    daysPending: 3,
  },
];

const T8: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<ApprovalTaskItem[]>([]);
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
        待审批任务清单
      </div>
      <ProTable<ApprovalTaskItem>
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
        scroll={{ x: 1500 }}
      />

      <ModalForm
        title="查询条件"
        visible={searchVisible}
        onVisibleChange={setSearchVisible}
        onFinish={handleSearch}
        form={form}
      >
        <Form.Item name="status" label="审批状态">
          <Select placeholder="请选择审批状态">
            <Select.Option value="待初审">待初审</Select.Option>
            <Select.Option value="待复审">待复审</Select.Option>
            <Select.Option value="初审通过">初审通过</Select.Option>
            <Select.Option value="初审驳回">初审驳回</Select.Option>
            <Select.Option value="复审通过">复审通过</Select.Option>
            <Select.Option value="复审驳回">复审驳回</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="college" label="学院">
          <Input placeholder="请输入学院名称" />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T8;
