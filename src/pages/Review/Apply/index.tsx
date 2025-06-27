import React, { useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import type { ApplyItem } from '@/components/ReviewApplyTable/types';

const demoData: ApplyItem[] = [
  {
    id: '1',
    isActive: true,
    studentName: '张三',
    studentId: '20230001',
    major: '计算机科学与技术',
    topic: '基于深度学习的图像识别研究',
    topicType: '理论研究',
    topicSource: '自选课题',
    applyDate: '2025-01-10',
    aiSuggestion: '选题新颖，具有研究价值',
    instructorComment: '同意开题',
    status: 'pending',
  },
  {
    id: '2',
    isActive: true,
    studentName: '李四',
    studentId: '20230002',
    major: '软件工程',
    topic: '微服务架构在企业级应用中的实践',
    topicType: '应用研究',
    topicSource: '企业合作',
    applyDate: '2025-01-12',
    aiSuggestion: '选题实用性强，建议细化研究方案',
    instructorComment: '已通过',
    status: 'approved',
  },
  {
    id: '3',
    isActive: true,
    studentName: '王五',
    studentId: '20230003',
    major: '人工智能',
    topic: '自然语言处理在智能客服中的应用',
    topicType: '应用研究',
    topicSource: '导师课题',
    applyDate: '2025-01-15',
    aiSuggestion: '研究范围过大，建议聚焦具体场景',
    instructorComment: '请修改研究方案',
    status: 'returned',
  },
];

const columns: ProColumns<ApplyItem>[] = [
  { title: '学生姓名', dataIndex: 'studentName' },
  { title: '学号', dataIndex: 'studentId' },
  { title: '专业名称', dataIndex: 'major' },
  { title: '课题名称', dataIndex: 'topic' },
  { title: '课题类别', dataIndex: 'topicType' },
  { title: '课题来源', dataIndex: 'topicSource' },
  { title: '申报日期', dataIndex: 'applyDate', valueType: 'date' },
  { title: 'AI建议', dataIndex: 'aiSuggestion', ellipsis: true },
  { title: '指导教师意见', dataIndex: 'instructorComment', ellipsis: true },
  {
    title: '审核状态',
    dataIndex: 'status',
    valueEnum: {
      pending: { text: '待审核', status: 'Processing' },
      approved: { text: '已通过', status: 'Success' },
      returned: { text: '已退回', status: 'Error' },
    },
  },
];

const ReviewApplyPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<ApplyItem[]>([]);

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
      <ProTable<ApplyItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Space key="buttons">
            <Button
              type="primary"
              key="review"
              onClick={handleReview}
              disabled={selectedRows.length === 0}
            >
              审核
            </Button>
            <Button
              key="cancel-review"
              onClick={handleCancelReview}
              disabled={selectedRows.length === 0}
            >
              取消审核
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
        scroll={{ x: 1800 }}
        style={{ overflowX: 'auto' }}
      />
    </PageContainer>
  );
};

export default ReviewApplyPage;