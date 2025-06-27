import React, { useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface FinalReviewItem {
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
  finalTeacher: string;
  finalStatus: string;
  score: number;
  scoreLevel: string;
  createdAt: string;
  updatedAt: string;
}

const demoData: FinalReviewItem[] = [
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
    file: 'S0012024终稿.docx',
    version: '1',
    status: '待审核',
    isAI: '通过',
    review: '内容需进一步完善',
    reviewTime: '2025-06-16 15:00',
    teacherSign: '[签名图片]',
    finalTeacher: '终审老师A',
    finalStatus: '通过',
    score: 92,
    scoreLevel: '优秀',
    createdAt: '2025-06-16 10:00',
    updatedAt: '2025-06-16 10:00',
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
    file: 'S0022024终稿.docx',
    version: '2',
    status: '已通过',
    isAI: '通过',
    review: '论文结构合理',
    reviewTime: '2025-06-18 09:30',
    teacherSign: '[签名图片]',
    finalTeacher: '终审老师B',
    finalStatus: '通过',
    score: 85,
    scoreLevel: '良好',
    createdAt: '2025-06-17 10:00',
    updatedAt: '2025-06-18 10:00',
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
    file: 'S0032024终稿.docx',
    version: '1',
    status: '已退回',
    isAI: '未通过',
    review: '需补充实验数据',
    reviewTime: '2025-06-20 14:00',
    teacherSign: '[签名图片]',
    finalTeacher: '终审老师C',
    finalStatus: '退回',
    score: 68,
    scoreLevel: '及格',
    createdAt: '2025-06-19 10:00',
    updatedAt: '2025-06-20 10:00',
  },
];

const columns: ProColumns<FinalReviewItem>[] = [
  { title: '题目', dataIndex: 'title', width: 180 },
  { title: '分部', dataIndex: 'branch', width: 80 },
  { title: '学院', dataIndex: 'college', width: 100 },
  { title: '学习中心', dataIndex: 'center', width: 120 },
  { title: '专业', dataIndex: 'major', width: 120 },
  { title: '入学时间', dataIndex: 'enrollDate', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 100 },
  { title: '姓名', dataIndex: 'studentName', width: 100 },
  { title: '指导教师', dataIndex: 'guideTeacher', width: 100 },
  { title: '论文终稿文件', dataIndex: 'file', width: 140 },
  { title: '版本', dataIndex: 'version', width: 60 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '是否AI审核', dataIndex: 'isAI', width: 100 },
  { title: '审批建议', dataIndex: 'review', width: 180 },
  { title: '审批时间', dataIndex: 'reviewTime', width: 140 },
  { title: '老师签名', dataIndex: 'teacherSign', width: 100 },
  { title: '终审教师', dataIndex: 'finalTeacher', width: 100 },
  { title: '终审状态', dataIndex: 'finalStatus', width: 100 },
  { title: '论文成绩分数', dataIndex: 'score', width: 120 },
  { title: '论文成绩等级', dataIndex: 'scoreLevel', width: 120 },
  { title: '创建时间', dataIndex: 'createdAt', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 140 },
];

const Final: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<FinalReviewItem[]>([]);

  const handleReview = async () => { actionRef.current?.reload(); };
  const handleCancelReview = async () => { actionRef.current?.reload(); };

  return (
    <PageContainer title={false}>
      <ProTable<FinalReviewItem>
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

export default Final;