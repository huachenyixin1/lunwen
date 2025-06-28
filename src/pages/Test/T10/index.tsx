import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface ProgressItem {
  id: string;
  taskName: string;
  taskType: '论文' | '专利' | '项目';
  startDate: string;
  endDate: string;
  progress: number;
  status: '未开始' | '进行中' | '已完成' | '已延期';
  supervisor: string;
  lastUpdate: string;
}

const demoData: ProgressItem[] = [
  {
    id: '1',
    taskName: '基于深度学习的图像识别研究',
    taskType: '论文',
    startDate: '2023-01-10',
    endDate: '2023-12-31',
    progress: 80,
    status: '进行中',
    supervisor: '李教授',
    lastUpdate: '2023-06-20',
  },
  {
    id: '2',
    taskName: '区块链金融应用专利',
    taskType: '专利',
    startDate: '2023-03-15',
    endDate: '2023-09-30',
    progress: 100,
    status: '已完成',
    supervisor: '王教授',
    lastUpdate: '2023-09-28',
  },
  {
    id: '3',
    taskName: '物联网安全项目',
    taskType: '项目',
    startDate: '2023-02-01',
    endDate: '2023-11-30',
    progress: 65,
    status: '进行中',
    supervisor: '赵教授',
    lastUpdate: '2023-07-15',
  },
  {
    id: '4',
    taskName: '人工智能伦理论文',
    taskType: '论文',
    startDate: '2023-04-05',
    endDate: '2023-10-31',
    progress: 90,
    status: '进行中',
    supervisor: '李教授',
    lastUpdate: '2023-09-10',
  },
  {
    id: '5',
    taskName: '云计算调度算法专利',
    taskType: '专利',
    startDate: '2023-01-20',
    endDate: '2023-06-30',
    progress: 100,
    status: '已完成',
    supervisor: '王教授',
    lastUpdate: '2023-06-25',
  },
  {
    id: '6',
    taskName: '5G网络切片项目',
    taskType: '项目',
    startDate: '2023-05-10',
    endDate: '2023-12-15',
    progress: 40,
    status: '进行中',
    supervisor: '赵教授',
    lastUpdate: '2023-08-20',
  },
  {
    id: '7',
    taskName: '联邦学习隐私保护论文',
    taskType: '论文',
    startDate: '2023-06-01',
    endDate: '2024-01-31',
    progress: 30,
    status: '进行中',
    supervisor: '李教授',
    lastUpdate: '2023-09-05',
  },
  {
    id: '8',
    taskName: '微服务性能优化专利',
    taskType: '专利',
    startDate: '2023-02-15',
    endDate: '2023-08-31',
    progress: 100,
    status: '已完成',
    supervisor: '王教授',
    lastUpdate: '2023-08-25',
  },
  {
    id: '9',
    taskName: '量子计算算法项目',
    taskType: '项目',
    startDate: '2023-07-01',
    endDate: '2024-03-31',
    progress: 20,
    status: '进行中',
    supervisor: '赵教授',
    lastUpdate: '2023-09-15',
  },
  {
    id: '10',
    taskName: '自动驾驶感知系统论文',
    taskType: '论文',
    startDate: '2023-08-10',
    endDate: '2024-02-28',
    progress: 15,
    status: '进行中',
    supervisor: '李教授',
    lastUpdate: '2023-09-20',
  },
];

const columns: ProColumns<ProgressItem>[] = [
  { title: '任务名称', dataIndex: 'taskName', width: 200 },
  { title: '任务类型', dataIndex: 'taskType', width: 100 },
  { title: '开始时间', dataIndex: 'startDate', width: 120 },
  { title: '截止时间', dataIndex: 'endDate', width: 120 },
  {
    title: '进度(%)',
    dataIndex: 'progress',
    width: 100,
    render: (_, record) => `${record.progress}%`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (_, record) => {
      let color = '';
      switch (record.status) {
        case '未开始':
          color = 'gray';
          break;
        case '进行中':
          color = 'blue';
          break;
        case '已完成':
          color = 'green';
          break;
        case '已延期':
          color = 'red';
          break;
      }
      return <span style={{ color }}>{record.status}</span>;
    },
  },
  { title: '指导教师', dataIndex: 'supervisor', width: 120 },
  { title: '最后更新', dataIndex: 'lastUpdate', width: 120 },
];

const T10: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<ProgressItem[]>([]);
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
        个人进度详情表
      </div>
      <ProTable<ProgressItem>
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
        <Form.Item name="taskName" label="任务名称">
          <Input placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item name="taskType" label="任务类型">
          <Select placeholder="请选择类型">
            <Select.Option value="论文">论文</Select.Option>
            <Select.Option value="专利">专利</Select.Option>
            <Select.Option value="项目">项目</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态">
            <Select.Option value="未开始">未开始</Select.Option>
            <Select.Option value="进行中">进行中</Select.Option>
            <Select.Option value="已完成">已完成</Select.Option>
            <Select.Option value="已延期">已延期</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T10;
