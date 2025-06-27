import React, { useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface DraftReviewItem {
  id: string;
  title: string;
  branch: string;
  college: string;
  center: string;
  major: string;
  enrollDate: string;
  studentId: string;
  studentName: string;
  guideTeacher: string;
  file: string;
  version: string;
  status: string;
  isAI: string;
  review: string;
  reviewTime: string;
  teacherSign: string;
  createdAt: string;
  updatedAt: string;
}

const demoData: DraftReviewItem[] = [
  {
    id: '1',
    title: '基于AI的论文评审系统',
    branch: '001',
    college: '信息工程学院',
    center: 'B学习中心',
    major: '计算机科学',
    enrollDate: '2022-09',
    studentId: 'S001',
    studentName: '李四',
    guideTeacher: '王五',
    file: 'S0012024春.docx',
    version: '1',
    status: '待审核',
    isAI: '通过',
    review: '内容需进一步完善',
    reviewTime: '2025-05-16 15:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-16 10:00',
    updatedAt: '2025-05-16 10:00',
  },
  {
    id: '2',
    title: '大数据分析在金融风控中的应用',
    branch: '002',
    college: '经济管理学院',
    center: 'A学习中心',
    major: '金融学',
    enrollDate: '2021-09',
    studentId: 'S002',
    studentName: '王小明',
    guideTeacher: '李老师',
    file: 'S0022024春.docx',
    version: '2',
    status: '已通过',
    isAI: '通过',
    review: '论文结构合理',
    reviewTime: '2025-05-18 09:30',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-17 10:00',
    updatedAt: '2025-05-18 10:00',
  },
  {
    id: '3',
    title: '智能制造中的物联网技术',
    branch: '003',
    college: '机械工程学院',
    center: 'C学习中心',
    major: '机械设计',
    enrollDate: '2020-09',
    studentId: 'S003',
    studentName: '赵六',
    guideTeacher: '钱老师',
    file: 'S0032024春.docx',
    version: '1',
    status: '已退回',
    isAI: '未通过',
    review: '需补充实验数据',
    reviewTime: '2025-05-20 14:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-19 10:00',
    updatedAt: '2025-05-20 10:00',
  },
  {
    id: '4',
    title: '区块链技术在供应链管理中的应用',
    branch: '004',
    college: '管理学院',
    center: 'D学习中心',
    major: '工商管理',
    enrollDate: '2023-09',
    studentId: 'S004',
    studentName: '孙七',
    guideTeacher: '周老师',
    file: 'S0042024春.docx',
    version: '1',
    status: '待审核',
    isAI: '通过',
    review: '创新点突出',
    reviewTime: '2025-05-22 11:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-21 10:00',
    updatedAt: '2025-05-22 10:00',
  },
  {
    id: '5',
    title: '人工智能在医疗影像分析中的应用',
    branch: '005',
    college: '医学院',
    center: 'E学习中心',
    major: '医学影像',
    enrollDate: '2022-09',
    studentId: 'S005',
    studentName: '周八',
    guideTeacher: '吴老师',
    file: 'S0052024春.docx',
    version: '1',
    status: '待审核',
    isAI: '通过',
    review: '建议补充AI算法细节',
    reviewTime: '2025-05-25 16:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-24 10:00',
    updatedAt: '2025-05-25 10:00',
  },
];

const columns: ProColumns<DraftReviewItem>[] = [
  { title: '题目', dataIndex: 'title', width: 180 },
  { title: '分部', dataIndex: 'branch', width: 80 },
  { title: '学院', dataIndex: 'college', width: 100 },
  { title: '学习中心', dataIndex: 'center', width: 120 },
  { title: '专业', dataIndex: 'major', width: 120 },
  { title: '入学时间', dataIndex: 'enrollDate', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 100 },
  { title: '姓名', dataIndex: 'studentName', width: 100 },
  { title: '指导教师', dataIndex: 'guideTeacher', width: 100 },
  { title: '论文初稿文件', dataIndex: 'file', width: 140 },
  { title: '版本', dataIndex: 'version', width: 60 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '是否AI审核', dataIndex: 'isAI', width: 100 },
  { title: '审批建议', dataIndex: 'review', width: 180 },
  { title: '审批时间', dataIndex: 'reviewTime', width: 140 },
  { title: '老师签名', dataIndex: 'teacherSign', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 140 },
];

const MidReview: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<DraftReviewItem[]>([]);

  const handleReview = async () => {
    actionRef.current?.reload();
  };
  const handleCancelReview = async () => {
    actionRef.current?.reload();
  };

  return (
    <PageContainer title={false}>
      <ProTable<DraftReviewItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Space>
            <Button type="primary" key="review" onClick={handleReview} disabled={selectedRows.length === 0}>审核</Button>
            <Button key="cancel-review" onClick={handleCancelReview} disabled={selectedRows.length === 0}>取消审核</Button>
          </Space>
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
        scroll={{ x: 2400 }}
        style={{ overflowX: 'auto' }}
      />
    </PageContainer>
  );
};

export default MidReview;