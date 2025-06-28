import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

interface SubmissionItem {
  id: string;
  paperTitle: string;
  submitter: string;
  submitTime: string;
  submitType: '初稿' | '修改稿' | '终稿';
  status: '待审核' | '已通过' | '已拒绝' | '需修改';
  reviewer: string;
  reviewTime: string;
  version: string;
}

const demoData: SubmissionItem[] = [
  {
    id: '1',
    paperTitle: '基于深度学习的图像识别研究',
    submitter: '张三',
    submitTime: '2023-05-15 14:30',
    submitType: '初稿',
    status: '待审核',
    reviewer: '李教授',
    reviewTime: '',
    version: '1.0',
  },
  {
    id: '2',
    paperTitle: '区块链金融应用研究',
    submitter: '李四',
    submitTime: '2023-06-20 10:15',
    submitType: '修改稿',
    status: '需修改',
    reviewer: '王教授',
    reviewTime: '2023-06-25 16:20',
    version: '1.2',
  },
  {
    id: '3',
    paperTitle: '物联网安全协议分析',
    submitter: '王五',
    submitTime: '2023-07-10 09:45',
    submitType: '终稿',
    status: '已通过',
    reviewer: '赵教授',
    reviewTime: '2023-07-15 14:10',
    version: '2.0',
  },
  {
    id: '4',
    paperTitle: '人工智能伦理问题探讨',
    submitter: '赵六',
    submitTime: '2023-04-05 13:20',
    submitType: '初稿',
    status: '已拒绝',
    reviewer: '李教授',
    reviewTime: '2023-04-10 11:30',
    version: '1.0',
  },
  {
    id: '5',
    paperTitle: '云计算资源调度算法',
    submitter: '钱七',
    submitTime: '2023-03-12 15:40',
    submitType: '终稿',
    status: '已通过',
    reviewer: '王教授',
    reviewTime: '2023-03-18 09:15',
    version: '3.1',
  },
  {
    id: '6',
    paperTitle: '5G网络切片技术',
    submitter: '孙八',
    submitTime: '2023-08-15 11:25',
    submitType: '修改稿',
    status: '需修改',
    reviewer: '赵教授',
    reviewTime: '2023-08-20 14:50',
    version: '1.5',
  },
  {
    id: '7',
    paperTitle: '联邦学习隐私保护',
    submitter: '周九',
    submitTime: '2023-09-01 16:30',
    submitType: '初稿',
    status: '待审核',
    reviewer: '李教授',
    reviewTime: '',
    version: '1.0',
  },
  {
    id: '8',
    paperTitle: '微服务架构优化',
    submitter: '吴十',
    submitTime: '2023-02-18 14:15',
    submitType: '终稿',
    status: '已通过',
    reviewer: '王教授',
    reviewTime: '2023-02-25 10:40',
    version: '2.3',
  },
  {
    id: '9',
    paperTitle: '量子计算算法研究',
    submitter: '郑十一',
    submitTime: '2023-10-05 10:50',
    submitType: '修改稿',
    status: '需修改',
    reviewer: '赵教授',
    reviewTime: '2023-10-12 15:20',
    version: '1.8',
  },
  {
    id: '10',
    paperTitle: '自动驾驶感知系统',
    submitter: '王十二',
    submitTime: '2023-11-20 09:10',
    submitType: '初稿',
    status: '待审核',
    reviewer: '李教授',
    reviewTime: '',
    version: '1.0',
  },
];

const columns: ProColumns<SubmissionItem>[] = [
  { title: '论文标题', dataIndex: 'paperTitle', width: 200 },
  { title: '提交人', dataIndex: 'submitter', width: 100 },
  { title: '提交时间', dataIndex: 'submitTime', width: 150 },
  { title: '提交类型', dataIndex: 'submitType', width: 100 },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (_, record) => {
      let color = '';
      switch (record.status) {
        case '待审核':
          color = 'orange';
          break;
        case '已通过':
          color = 'green';
          break;
        case '已拒绝':
          color = 'red';
          break;
        case '需修改':
          color = 'blue';
          break;
      }
      return <Tag color={color}>{record.status}</Tag>;
    },
  },
  { title: '审核人', dataIndex: 'reviewer', width: 100 },
  { title: '审核时间', dataIndex: 'reviewTime', width: 150 },
  { title: '版本号', dataIndex: 'version', width: 80 },
];

const T11: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<SubmissionItem[]>([]);
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
        提交记录表
      </div>
      <ProTable<SubmissionItem>
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
        <Form.Item name="paperTitle" label="论文标题">
          <Input placeholder="请输入论文标题" />
        </Form.Item>
        <Form.Item name="submitter" label="提交人">
          <Input placeholder="请输入提交人姓名" />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态">
            <Select.Option value="待审核">待审核</Select.Option>
            <Select.Option value="已通过">已通过</Select.Option>
            <Select.Option value="已拒绝">已拒绝</Select.Option>
            <Select.Option value="需修改">需修改</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T11;
