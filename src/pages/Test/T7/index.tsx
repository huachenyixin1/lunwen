import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface StudentProgressItem {
  id: string;
  name: string;
  studentId: string;
  college: string;
  major: string;
  advisor: string;
  paperTitle: string;
  progress: string;
  lastUpdate: string;
  status: '未开始' | '进行中' | '已完成' | '延期';
}

const columns: ProColumns<StudentProgressItem>[] = [
  { title: '学号', dataIndex: 'studentId', width: 120 },
  { title: '姓名', dataIndex: 'name', width: 100 },
  { title: '学院', dataIndex: 'college' },
  { title: '专业', dataIndex: 'major' },
  { title: '导师', dataIndex: 'advisor' },
  { title: '论文题目', dataIndex: 'paperTitle', ellipsis: true },
  {
    title: '进度',
    dataIndex: 'progress',
    valueType: 'select',
    valueEnum: {
      '0%': { text: '未开始', status: 'Default' },
      '30%': { text: '30%', status: 'Processing' },
      '50%': { text: '50%', status: 'Processing' },
      '80%': { text: '80%', status: 'Warning' },
      '100%': { text: '已完成', status: 'Success' },
    },
  },
  { title: '最后更新', dataIndex: 'lastUpdate' },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      未开始: { text: '未开始', status: 'Default' },
      进行中: { text: '进行中', status: 'Processing' },
      已完成: { text: '已完成', status: 'Success' },
      延期: { text: '延期', status: 'Error' },
    },
  },
];

const mockData: StudentProgressItem[] = [
  {
    id: '1',
    studentId: '20230001',
    name: '张三',
    college: '计算机学院',
    major: '计算机科学与技术',
    advisor: '李教授',
    paperTitle: '深度学习在图像识别中的应用研究',
    progress: '80%',
    lastUpdate: '2024-05-15',
    status: '进行中',
  },
  {
    id: '2',
    studentId: '20230002',
    name: '李四',
    college: '软件学院',
    major: '软件工程',
    advisor: '王教授',
    paperTitle: '区块链技术在金融领域的应用',
    progress: '50%',
    lastUpdate: '2024-04-20',
    status: '进行中',
  },
  {
    id: '3',
    studentId: '20230003',
    name: '王五',
    college: '数据科学学院',
    major: '数据科学与大数据技术',
    advisor: '张教授',
    paperTitle: '大数据分析算法优化研究',
    progress: '30%',
    lastUpdate: '2024-03-10',
    status: '进行中',
  },
  {
    id: '4',
    studentId: '20230004',
    name: '赵六',
    college: '人工智能学院',
    major: '人工智能',
    advisor: '刘教授',
    paperTitle: '机器学习模型可解释性研究',
    progress: '100%',
    lastUpdate: '2024-06-01',
    status: '已完成',
  },
  {
    id: '5',
    studentId: '20230005',
    name: '钱七',
    college: '网络安全学院',
    major: '网络空间安全',
    advisor: '陈教授',
    paperTitle: '云计算安全架构研究',
    progress: '0%',
    lastUpdate: '2024-01-05',
    status: '未开始',
  },
  {
    id: '6',
    studentId: '20230006',
    name: '孙八',
    college: '计算机学院',
    major: '计算机科学与技术',
    advisor: '李教授',
    paperTitle: '物联网智能终端安全研究',
    progress: '80%',
    lastUpdate: '2024-05-20',
    status: '延期',
  },
  {
    id: '7',
    studentId: '20230007',
    name: '周九',
    college: '软件学院',
    major: '软件工程',
    advisor: '王教授',
    paperTitle: '微服务架构性能优化',
    progress: '50%',
    lastUpdate: '2024-04-15',
    status: '进行中',
  },
  {
    id: '8',
    studentId: '20230008',
    name: '吴十',
    college: '数据科学学院',
    major: '数据科学与大数据技术',
    advisor: '张教授',
    paperTitle: '实时流数据处理框架研究',
    progress: '100%',
    lastUpdate: '2024-05-30',
    status: '已完成',
  },
  {
    id: '9',
    studentId: '20230009',
    name: '郑十一',
    college: '人工智能学院',
    major: '人工智能',
    advisor: '刘教授',
    paperTitle: '深度强化学习在游戏AI中的应用',
    progress: '30%',
    lastUpdate: '2024-03-25',
    status: '进行中',
  },
  {
    id: '10',
    studentId: '20230010',
    name: '王十二',
    college: '网络安全学院',
    major: '网络空间安全',
    advisor: '陈教授',
    paperTitle: '区块链智能合约安全分析',
    progress: '80%',
    lastUpdate: '2024-05-10',
    status: '进行中',
  },
];

const T7: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<StudentProgressItem[]>([]);
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
        学生进度跟踪表
      </div>
      <ProTable<StudentProgressItem>
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
        <Form.Item name="name" label="学生姓名">
          <Input placeholder="请输入学生姓名" />
        </Form.Item>
        <Form.Item name="college" label="学院">
          <Input placeholder="请输入学院名称" />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态">
            <Select.Option value="未开始">未开始</Select.Option>
            <Select.Option value="进行中">进行中</Select.Option>
            <Select.Option value="已完成">已完成</Select.Option>
            <Select.Option value="延期">延期</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T7;
