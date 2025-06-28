import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

interface TimeNodeItem {
  id: string;
  nodeName: string;
  nodeType: '论文' | '专利' | '项目' | '会议' | '其他';
  startTime: string;
  endTime: string;
  importance: '高' | '中' | '低';
  status: '未开始' | '进行中' | '已完成' | '已延期';
  responsible: string;
  description: string;
}

const demoData: TimeNodeItem[] = [
  {
    id: '1',
    nodeName: '论文初稿提交',
    nodeType: '论文',
    startTime: '2023-09-01',
    endTime: '2023-09-30',
    importance: '高',
    status: '已完成',
    responsible: '张三',
    description: '完成论文初稿并提交导师审核',
  },
  {
    id: '2',
    nodeName: '中期检查',
    nodeType: '项目',
    startTime: '2023-10-15',
    endTime: '2023-10-30',
    importance: '高',
    status: '已完成',
    responsible: '李四',
    description: '项目中期进度汇报',
  },
  {
    id: '3',
    nodeName: '专利申请书提交',
    nodeType: '专利',
    startTime: '2023-11-01',
    endTime: '2023-11-15',
    importance: '中',
    status: '已完成',
    responsible: '王五',
    description: '提交专利申请材料',
  },
  {
    id: '4',
    nodeName: '学术会议报告',
    nodeType: '会议',
    startTime: '2023-12-10',
    endTime: '2023-12-12',
    importance: '中',
    status: '已完成',
    responsible: '赵六',
    description: '参加国际学术会议并作报告',
  },
  {
    id: '5',
    nodeName: '论文修改稿提交',
    nodeType: '论文',
    startTime: '2024-01-05',
    endTime: '2024-01-20',
    importance: '高',
    status: '进行中',
    responsible: '张三',
    description: '根据导师意见修改论文',
  },
  {
    id: '6',
    nodeName: '实验数据收集',
    nodeType: '项目',
    startTime: '2024-02-01',
    endTime: '2024-02-28',
    importance: '中',
    status: '进行中',
    responsible: '李四',
    description: '完成所有实验数据采集',
  },
  {
    id: '7',
    nodeName: '论文终稿提交',
    nodeType: '论文',
    startTime: '2024-03-01',
    endTime: '2024-03-15',
    importance: '高',
    status: '未开始',
    responsible: '张三',
    description: '提交论文最终版本',
  },
  {
    id: '8',
    nodeName: '论文答辩',
    nodeType: '会议',
    startTime: '2024-04-10',
    endTime: '2024-04-12',
    importance: '高',
    status: '未开始',
    responsible: '张三',
    description: '毕业论文答辩',
  },
  {
    id: '9',
    nodeName: '项目结题报告',
    nodeType: '项目',
    startTime: '2024-05-01',
    endTime: '2024-05-31',
    importance: '中',
    status: '未开始',
    responsible: '李四',
    description: '提交项目结题材料',
  },
  {
    id: '10',
    nodeName: '毕业材料提交',
    nodeType: '其他',
    startTime: '2024-06-01',
    endTime: '2024-06-10',
    importance: '低',
    status: '未开始',
    responsible: '王五',
    description: '提交所有毕业相关材料',
  },
];

const columns: ProColumns<TimeNodeItem>[] = [
  { title: '节点名称', dataIndex: 'nodeName', width: 150 },
  { title: '节点类型', dataIndex: 'nodeType', width: 100 },
  { title: '开始时间', dataIndex: 'startTime', width: 120 },
  { title: '结束时间', dataIndex: 'endTime', width: 120 },
  {
    title: '重要程度',
    dataIndex: 'importance',
    width: 100,
    render: (_, record) => {
      let color = '';
      switch (record.importance) {
        case '高':
          color = 'red';
          break;
        case '中':
          color = 'orange';
          break;
        case '低':
          color = 'green';
          break;
      }
      return <Tag color={color}>{record.importance}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (_, record) => {
      let color = '';
      switch (record.status) {
        case '未开始':
          color = 'default';
          break;
        case '进行中':
          color = 'processing';
          break;
        case '已完成':
          color = 'success';
          break;
        case '已延期':
          color = 'error';
          break;
      }
      return <Tag color={color}>{record.status}</Tag>;
    },
  },
  { title: '负责人', dataIndex: 'responsible', width: 100 },
  { title: '描述', dataIndex: 'description', width: 200 },
];

const T12: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<TimeNodeItem[]>([]);
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
        重要时间节点表
      </div>
      <ProTable<TimeNodeItem>
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
        <Form.Item name="nodeName" label="节点名称">
          <Input placeholder="请输入节点名称" />
        </Form.Item>
        <Form.Item name="nodeType" label="节点类型">
          <Select placeholder="请选择类型">
            <Select.Option value="论文">论文</Select.Option>
            <Select.Option value="专利">专利</Select.Option>
            <Select.Option value="项目">项目</Select.Option>
            <Select.Option value="会议">会议</Select.Option>
            <Select.Option value="其他">其他</Select.Option>
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

export default T12;
