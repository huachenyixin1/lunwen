import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface AchievementItem {
  id: string;
  studentName: string;
  studentId: string;
  college: string;
  paperTitle: string;
  publishStatus: '已发表' | '待发表' | '已录用';
  journalLevel: 'SCI' | 'EI' | '核心' | '普通';
  publishDate: string;
  citationCount: number;
  supervisor: string;
}

const demoData: AchievementItem[] = [
  {
    id: '1',
    studentName: '张三',
    studentId: '2021001',
    college: '计算机学院',
    paperTitle: '基于深度学习的图像识别研究',
    publishStatus: '已发表',
    journalLevel: 'SCI',
    publishDate: '2023-05-15',
    citationCount: 12,
    supervisor: '李教授',
  },
  {
    id: '2',
    studentName: '李四',
    studentId: '2021002',
    college: '软件学院',
    paperTitle: '区块链技术在金融领域的应用',
    publishStatus: '已录用',
    journalLevel: 'EI',
    publishDate: '2023-06-20',
    citationCount: 8,
    supervisor: '王教授',
  },
  {
    id: '3',
    studentName: '王五',
    studentId: '2021003',
    college: '信息学院',
    paperTitle: '物联网安全协议研究',
    publishStatus: '待发表',
    journalLevel: '核心',
    publishDate: '2023-07-10',
    citationCount: 5,
    supervisor: '赵教授',
  },
  {
    id: '4',
    studentName: '赵六',
    studentId: '2021004',
    college: '计算机学院',
    paperTitle: '人工智能伦理问题探讨',
    publishStatus: '已发表',
    journalLevel: '普通',
    publishDate: '2023-04-05',
    citationCount: 15,
    supervisor: '李教授',
  },
  {
    id: '5',
    studentName: '钱七',
    studentId: '2021005',
    college: '软件学院',
    paperTitle: '云计算资源调度算法优化',
    publishStatus: '已发表',
    journalLevel: 'SCI',
    publishDate: '2023-03-12',
    citationCount: 20,
    supervisor: '王教授',
  },
  {
    id: '6',
    studentName: '孙八',
    studentId: '2021006',
    college: '信息学院',
    paperTitle: '5G网络切片技术研究',
    publishStatus: '已录用',
    journalLevel: 'EI',
    publishDate: '2023-08-15',
    citationCount: 3,
    supervisor: '赵教授',
  },
  {
    id: '7',
    studentName: '周九',
    studentId: '2021007',
    college: '计算机学院',
    paperTitle: '联邦学习隐私保护机制',
    publishStatus: '待发表',
    journalLevel: '核心',
    publishDate: '2023-09-01',
    citationCount: 0,
    supervisor: '李教授',
  },
  {
    id: '8',
    studentName: '吴十',
    studentId: '2021008',
    college: '软件学院',
    paperTitle: '微服务架构性能优化',
    publishStatus: '已发表',
    journalLevel: '普通',
    publishDate: '2023-02-18',
    citationCount: 18,
    supervisor: '王教授',
  },
  {
    id: '9',
    studentName: '郑十一',
    studentId: '2021009',
    college: '信息学院',
    paperTitle: '量子计算算法研究',
    publishStatus: '已录用',
    journalLevel: 'SCI',
    publishDate: '2023-10-05',
    citationCount: 2,
    supervisor: '赵教授',
  },
  {
    id: '10',
    studentName: '王十二',
    studentId: '2021010',
    college: '计算机学院',
    paperTitle: '自动驾驶感知系统研究',
    publishStatus: '待发表',
    journalLevel: 'EI',
    publishDate: '2023-11-20',
    citationCount: 0,
    supervisor: '李教授',
  },
];

const columns: ProColumns<AchievementItem>[] = [
  { title: '学生姓名', dataIndex: 'studentName', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 120 },
  { title: '学院', dataIndex: 'college', width: 120 },
  { title: '论文标题', dataIndex: 'paperTitle', width: 200 },
  {
    title: '发表状态',
    dataIndex: 'publishStatus',
    width: 100,
    render: (_, record) => {
      let color = '';
      switch (record.publishStatus) {
        case '已发表':
          color = 'green';
          break;
        case '待发表':
          color = 'orange';
          break;
        case '已录用':
          color = 'blue';
          break;
      }
      return <span style={{ color }}>{record.publishStatus}</span>;
    },
  },
  { title: '期刊级别', dataIndex: 'journalLevel', width: 100 },
  { title: '发表时间', dataIndex: 'publishDate', width: 120 },
  { title: '引用次数', dataIndex: 'citationCount', width: 100 },
  { title: '指导教师', dataIndex: 'supervisor', width: 120 },
];

const T9: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<AchievementItem[]>([]);
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
        指导成果汇总表
      </div>
      <ProTable<AchievementItem>
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
        <Form.Item name="studentName" label="学生姓名">
          <Input placeholder="请输入学生姓名" />
        </Form.Item>
        <Form.Item name="college" label="所属学院">
          <Input placeholder="请输入学院" />
        </Form.Item>
        <Form.Item name="publishStatus" label="发表状态">
          <Select placeholder="请选择状态">
            <Select.Option value="已发表">已发表</Select.Option>
            <Select.Option value="待发表">待发表</Select.Option>
            <Select.Option value="已录用">已录用</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T9;
