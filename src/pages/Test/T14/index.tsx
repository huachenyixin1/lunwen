import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface RejectionDetail {
  key: string;
  paperId: string;
  paperTitle: string;
  submitter: string;
  submitTime: string;
  reviewer: string;
  reviewTime: string;
  rejectionReason: string;
  status: string;
}

const columns: ProColumns<RejectionDetail>[] = [
  {
    title: '论文ID',
    dataIndex: 'paperId',
    key: 'paperId',
  },
  {
    title: '论文标题',
    dataIndex: 'paperTitle',
    key: 'paperTitle',
  },
  {
    title: '提交人',
    dataIndex: 'submitter',
    key: 'submitter',
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
  },
  {
    title: '复审人',
    dataIndex: 'reviewer',
    key: 'reviewer',
  },
  {
    title: '复审时间',
    dataIndex: 'reviewTime',
    key: 'reviewTime',
  },
  {
    title: '未通过原因',
    dataIndex: 'rejectionReason',
    key: 'rejectionReason',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => (
      <span style={{ color: 'red' }}>{record.status}</span>
    ),
  },
];

const demoData: RejectionDetail[] = [
  {
    key: '1',
    paperId: 'P2023001',
    paperTitle: '基于深度学习的图像识别研究',
    submitter: '张三',
    submitTime: '2023-01-15',
    reviewer: '李四',
    reviewTime: '2023-02-20',
    rejectionReason: '实验数据不足',
    status: '未通过',
  },
  {
    key: '2',
    paperId: 'P2023002',
    paperTitle: '区块链技术在金融领域的应用',
    submitter: '王五',
    submitTime: '2023-01-18',
    reviewer: '赵六',
    reviewTime: '2023-02-22',
    rejectionReason: '创新性不足',
    status: '未通过',
  },
  {
    key: '3',
    paperId: 'P2023003',
    paperTitle: '云计算环境下的数据安全研究',
    submitter: '钱七',
    submitTime: '2023-01-20',
    reviewer: '孙八',
    reviewTime: '2023-02-25',
    rejectionReason: '实验设计有缺陷',
    status: '未通过',
  },
  {
    key: '4',
    paperId: 'P2023004',
    paperTitle: '人工智能在医疗诊断中的应用',
    submitter: '周九',
    submitTime: '2023-01-22',
    reviewer: '吴十',
    reviewTime: '2023-02-28',
    rejectionReason: '临床数据不足',
    status: '未通过',
  },
  {
    key: '5',
    paperId: 'P2023005',
    paperTitle: '物联网智能家居系统设计',
    submitter: '郑十一',
    submitTime: '2023-01-25',
    reviewer: '王十二',
    reviewTime: '2023-03-01',
    rejectionReason: '系统稳定性不足',
    status: '未通过',
  },
  {
    key: '6',
    paperId: 'P2023006',
    paperTitle: '大数据分析在电商推荐系统中的应用',
    submitter: '冯十三',
    submitTime: '2023-01-28',
    reviewer: '陈十四',
    reviewTime: '2023-03-05',
    rejectionReason: '算法对比不充分',
    status: '未通过',
  },
  {
    key: '7',
    paperId: 'P2023007',
    paperTitle: '5G网络下的边缘计算研究',
    submitter: '褚十五',
    submitTime: '2023-02-01',
    reviewer: '卫十六',
    reviewTime: '2023-03-08',
    rejectionReason: '理论分析不够深入',
    status: '未通过',
  },
  {
    key: '8',
    paperId: 'P2023008',
    paperTitle: '虚拟现实在教育领域的应用',
    submitter: '蒋十七',
    submitTime: '2023-02-05',
    reviewer: '沈十八',
    reviewTime: '2023-03-12',
    rejectionReason: '用户体验研究不足',
    status: '未通过',
  },
  {
    key: '9',
    paperId: 'P2023009',
    paperTitle: '自动驾驶中的计算机视觉技术',
    submitter: '韩十九',
    submitTime: '2023-02-08',
    reviewer: '杨二十',
    reviewTime: '2023-03-15',
    rejectionReason: '安全性验证不足',
    status: '未通过',
  },
  {
    key: '10',
    paperId: 'P2023010',
    paperTitle: '量子计算算法研究',
    submitter: '朱二十一',
    submitTime: '2023-02-12',
    reviewer: '秦二十二',
    reviewTime: '2023-03-18',
    rejectionReason: '数学推导有误',
    status: '未通过',
  },
  {
    key: '11',
    paperId: 'P2023011',
    paperTitle: '联邦学习中的隐私保护研究',
    submitter: '尤二十三',
    submitTime: '2023-02-15',
    reviewer: '许二十四',
    reviewTime: '2023-03-20',
    rejectionReason: '实验规模太小',
    status: '未通过',
  },
  {
    key: '12',
    paperId: 'P2023012',
    paperTitle: '知识图谱构建方法研究',
    submitter: '何二十五',
    submitTime: '2023-02-18',
    reviewer: '吕二十六',
    reviewTime: '2023-03-22',
    rejectionReason: '领域适应性不足',
    status: '未通过',
  },
  {
    key: '13',
    paperId: 'P2023013',
    paperTitle: '自然语言处理中的情感分析',
    submitter: '施二十七',
    submitTime: '2023-02-20',
    reviewer: '张二十八',
    reviewTime: '2023-03-25',
    rejectionReason: '数据集代表性不足',
    status: '未通过',
  },
  {
    key: '14',
    paperId: 'P2023014',
    paperTitle: '机器人路径规划算法',
    submitter: '孔二十九',
    submitTime: '2023-02-22',
    reviewer: '曹三十',
    reviewTime: '2023-03-28',
    rejectionReason: '实时性验证不足',
    status: '未通过',
  },
  {
    key: '15',
    paperId: 'P2023015',
    paperTitle: '增强现实在工业维修中的应用',
    submitter: '严三十一',
    submitTime: '2023-02-25',
    reviewer: '华三十二',
    reviewTime: '2023-03-30',
    rejectionReason: '实际应用场景验证不足',
    status: '未通过',
  },
];

const T14: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<RejectionDetail[]>([]);
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
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        复审未通过明细表
      </div>
      <ProTable<RejectionDetail>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
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
        <Form.Item name="paperId" label="论文ID">
          <Input placeholder="请输入论文ID" />
        </Form.Item>
        <Form.Item name="paperTitle" label="论文标题">
          <Input placeholder="请输入论文标题" />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态">
            <Select.Option value="未通过">未通过</Select.Option>
            <Select.Option value="已通过">已通过</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T14;
