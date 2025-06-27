import React, { useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface ReportReviewItem {
  id: string;
  branch: string;
  college: string;
  center: string;
  studentName: string;
  studentId: string;
  major: string;
  level: string;
  topic: string;
  purpose: string;
  status: string;
  version: string;
  isAI: string;
  review: string;
  reviewTime: string;
  teacherSign: string;
  createdAt: string;
  updatedAt: string;
  trend: string;
  content: string;
  innovation: string;
  schedule: string;
  reference: string;
}

const demoData: ReportReviewItem[] = [
  {
    id: '1',
    branch: '001',
    college: '国家开放大学',
    center: 'B学习中心',
    studentName: '李四',
    studentId: 'S001',
    major: '计算机科学',
    level: '本科',
    topic: '基于AI的论文评审系统',
    purpose: '本研究旨在提升论文评审效率。',
    trend: '目前国内外AI辅助评审逐步普及。',
    content: '主要内容包括系统设计、算法实现等。',
    innovation: '本课题创新点为智能分配与自动审核。',
    schedule: '第一阶段：需求分析，第二阶段：开发实现。',
    reference: '[1]张三著作...[2]李四论文...（共10条）',
    status: '待审核',
    version: '1',
    isAI: 'Y',
    review: '内容需进一步完善',
    reviewTime: '2025-05-16 15:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-16 10:00',
    updatedAt: '2025-05-16 10:00',
  },
  {
    id: '2',
    branch: '002',
    college: '国家开放大学',
    center: 'A学习中心',
    studentName: '王五',
    studentId: 'S002',
    major: '软件工程',
    level: '本科',
    topic: '智能问答系统设计',
    purpose: '提升智能问答准确率。',
    trend: 'AI问答系统快速发展。',
    content: '内容包括语义理解、知识图谱等。',
    innovation: '创新点为多轮对话优化。',
    schedule: '阶段一：调研，阶段二：开发。',
    reference: '[1]AI综述...[2]问答系统...',
    status: '待审核',
    version: '1',
    isAI: 'N',
    review: '建议补充相关文献',
    reviewTime: '2025-05-17 14:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-17 10:00',
    updatedAt: '2025-05-17 10:00',
  },
  {
    id: '3',
    branch: '003',
    college: '国家开放大学',
    center: 'C学习中心',
    studentName: '赵六',
    studentId: 'S003',
    major: '人工智能',
    level: '本科',
    topic: '图像识别算法优化',
    purpose: '提升图像识别速度和精度。',
    trend: '深度学习在图像识别领域广泛应用。',
    content: '内容包括卷积神经网络优化。',
    innovation: '创新点为轻量化模型。',
    schedule: '阶段一：算法设计，阶段二：实验。',
    reference: '[1]CNN论文...[2]AI应用...',
    status: '已通过',
    version: '2',
    isAI: 'Y',
    review: '通过',
    reviewTime: '2025-05-18 13:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-18 10:00',
    updatedAt: '2025-05-18 10:00',
  },
  {
    id: '4',
    branch: '004',
    college: '国家开放大学',
    center: 'D学习中心',
    studentName: '钱七',
    studentId: 'S004',
    major: '数据科学',
    level: '本科',
    topic: '大数据分析平台设计',
    purpose: '提升大数据处理效率。',
    trend: '大数据平台持续创新。',
    content: '内容包括分布式存储与计算。',
    innovation: '创新点为高并发处理。',
    schedule: '阶段一：平台搭建，阶段二：测试。',
    reference: '[1]Hadoop文档...[2]Spark论文...',
    status: '已退回',
    version: '1',
    isAI: 'N',
    review: '请补充测试数据',
    reviewTime: '2025-05-19 12:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-19 10:00',
    updatedAt: '2025-05-19 10:00',
  },
];

const columns: ProColumns<ReportReviewItem>[] = [
  { title: '分部', dataIndex: 'branch', width: 80 },
  { title: '学院', dataIndex: 'college', width: 120 },
  { title: '学习中心', dataIndex: 'center', width: 120 },
  { title: '学生姓名', dataIndex: 'studentName', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 100 },
  { title: '专业名称', dataIndex: 'major', width: 120 },
  { title: '层次', dataIndex: 'level', width: 80 },
  { title: '课题名称', dataIndex: 'topic', width: 180 },
  { title: '研究目的和意义', dataIndex: 'purpose', width: 180 },
  { title: '国内外现状和发展趋势', dataIndex: 'trend', width: 180 },
  { title: '主要内容与关键问题', dataIndex: 'content', width: 180 },
  { title: '预计创新点', dataIndex: 'innovation', width: 180 },
  { title: '工作进度与时间安排', dataIndex: 'schedule', width: 180 },
  { title: '参考文献', dataIndex: 'reference', width: 180 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '版本', dataIndex: 'version', width: 60 },
  { title: '是否AI审核', dataIndex: 'isAI', width: 80 },
  { title: '审批建议', dataIndex: 'review', width: 120 },
  { title: '审批时间', dataIndex: 'reviewTime', width: 140 },
  { title: '老师签名', dataIndex: 'teacherSign', width: 120 },
  { title: '创建时间', dataIndex: 'createdAt', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 140 },
];

const ReportReview: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<ReportReviewItem[]>([]);

  const handleReview = async () => {
    // TODO: 审核逻辑
    actionRef.current?.reload();
  };
  const handleCancelReview = async () => {
    // TODO: 取消审核逻辑
    actionRef.current?.reload();
  };

  return (
    <PageContainer title={false}>
      <ProTable<ReportReviewItem>
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

export default ReportReview;