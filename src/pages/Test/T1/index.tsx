import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

interface TeacherStudentItem {
  id: string;
  studentName: string;
  studentId: string;
  college: string;
  major: string;
  grade: string;
  teacherName: string;
  status: '未开始' | '指导中' | '已完成';
  progress: number;
  lastMeeting: string;
  nextMeeting: string;
}

const demoData: TeacherStudentItem[] = [
  {
    id: '1',
    studentName: '张三',
    studentId: '20230101',
    college: '计算机学院',
    major: '计算机科学与技术',
    grade: '2023级',
    teacherName: '李教授',
    status: '指导中',
    progress: 60,
    lastMeeting: '2025-06-20',
    nextMeeting: '2025-07-05',
  },
  {
    id: '2',
    studentName: '李四',
    studentId: '20230102',
    college: '软件学院',
    major: '软件工程',
    grade: '2023级',
    teacherName: '王教授',
    status: '已完成',
    progress: 100,
    lastMeeting: '2025-06-25',
    nextMeeting: '-',
  },
  {
    id: '3',
    studentName: '王五',
    studentId: '20230103',
    college: '信息学院',
    major: '信息安全',
    grade: '2023级',
    teacherName: '赵教授',
    status: '指导中',
    progress: 30,
    lastMeeting: '2025-06-18',
    nextMeeting: '2025-07-02',
  },
  {
    id: '4',
    studentName: '赵六',
    studentId: '20230104',
    college: '计算机学院',
    major: '人工智能',
    grade: '2023级',
    teacherName: '李教授',
    status: '未开始',
    progress: 0,
    lastMeeting: '-',
    nextMeeting: '2025-07-10',
  },
  {
    id: '5',
    studentName: '钱七',
    studentId: '20230105',
    college: '软件学院',
    major: '软件工程',
    grade: '2023级',
    teacherName: '王教授',
    status: '指导中',
    progress: 75,
    lastMeeting: '2025-06-22',
    nextMeeting: '2025-07-06',
  },
  {
    id: '6',
    studentName: '孙八',
    studentId: '20230106',
    college: '信息学院',
    major: '数据科学',
    grade: '2023级',
    teacherName: '赵教授',
    status: '已完成',
    progress: 100,
    lastMeeting: '2025-06-28',
    nextMeeting: '-',
  },
  {
    id: '7',
    studentName: '周九',
    studentId: '20230107',
    college: '计算机学院',
    major: '计算机科学与技术',
    grade: '2023级',
    teacherName: '李教授',
    status: '指导中',
    progress: 45,
    lastMeeting: '2025-06-15',
    nextMeeting: '2025-06-30',
  },
  {
    id: '8',
    studentName: '吴十',
    studentId: '20230108',
    college: '软件学院',
    major: '软件工程',
    grade: '2023级',
    teacherName: '王教授',
    status: '未开始',
    progress: 0,
    lastMeeting: '-',
    nextMeeting: '2025-07-15',
  },
  {
    id: '9',
    studentName: '郑十一',
    studentId: '20230109',
    college: '信息学院',
    major: '信息安全',
    grade: '2023级',
    teacherName: '赵教授',
    status: '指导中',
    progress: 80,
    lastMeeting: '2025-06-24',
    nextMeeting: '2025-07-08',
  },
  {
    id: '10',
    studentName: '王十二',
    studentId: '20230110',
    college: '计算机学院',
    major: '人工智能',
    grade: '2023级',
    teacherName: '李教授',
    status: '已完成',
    progress: 100,
    lastMeeting: '2025-06-27',
    nextMeeting: '-',
  },
];

const columns: ProColumns<TeacherStudentItem>[] = [
  { title: '学生姓名', dataIndex: 'studentName', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 120 },
  { title: '学院', dataIndex: 'college', width: 150 },
  { title: '专业', dataIndex: 'major', width: 150 },
  { title: '年级', dataIndex: 'grade', width: 80 },
  { title: '指导教师', dataIndex: 'teacherName', width: 100 },
  {
    title: '指导状态',
    dataIndex: 'status',
    width: 100,
    valueEnum: {
      未开始: { text: '未开始', status: 'Default' },
      指导中: { text: '指导中', status: 'Processing' },
      已完成: { text: '已完成', status: 'Success' },
    },
  },
  {
    title: '进度',
    dataIndex: 'progress',
    width: 120,
    render: (_, record) => `${record.progress}%`,
  },
  { title: '上次指导时间', dataIndex: 'lastMeeting', width: 120 },
  { title: '下次指导时间', dataIndex: 'nextMeeting', width: 120 },
];

const T1: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [, setSelectedRows] = useState<TeacherStudentItem[]>([]);
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
        教师指导学生统计表
      </div>
      <ProTable<TeacherStudentItem>
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
        <Form.Item name="studentId" label="学号">
          <Input placeholder="请输入学号" />
        </Form.Item>
        <Form.Item name="college" label="学院">
          <Input placeholder="请输入学院" />
        </Form.Item>
        <Form.Item name="status" label="指导状态">
          <Select placeholder="请选择指导状态">
            <Select.Option value="未开始">未开始</Select.Option>
            <Select.Option value="指导中">指导中</Select.Option>
            <Select.Option value="已完成">已完成</Select.Option>
          </Select>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default T1;
