import React from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button } from 'antd';

interface AILogItem {
  id: string;
  studentName: string;
  studentId: string;
  major: string;
  topic: string;
  topicType: string;
  topicSource: string;
  applyDate: string;
  aiSuggestion: string;
  status: 'pending' | 'approved' | 'returned';
}

const AILogPage: React.FC = () => {
  const columns: ProColumns<AILogItem>[] = [
    {
      title: '学生姓名',
      dataIndex: 'studentName',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
    },
    {
      title: '专业名称',
      dataIndex: 'major',
    },
    {
      title: '课题名称',
      dataIndex: 'topic',
    },
    {
      title: '课题类别',
      dataIndex: 'topicType',
    },
    {
      title: '课题来源',
      dataIndex: 'topicSource',
    },
    {
      title: '申报日期',
      dataIndex: 'applyDate',
      valueType: 'date',
    },
    {
      title: 'AI建议',
      dataIndex: 'aiSuggestion',
      ellipsis: true,
    },
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

  const fetchData = async () => {
    const mockData: AILogItem[] = [
      {
        id: '1',
        studentName: '张三',
        studentId: '20230001',
        major: '计算机科学与技术',
        topic: '基于深度学习的图像识别研究',
        topicType: '理论研究',
        topicSource: '自选课题',
        applyDate: '2025-01-10',
        aiSuggestion: '选题新颖，具有研究价值',
        status: 'pending'
      },
      {
        id: '2',
        studentName: '李四',
        studentId: '20230002',
        major: '软件工程',
        topic: '微服务架构在企业级应用中的实践',
        topicType: '应用研究',
        topicSource: '企业合作',
        applyDate: '2025-01-12',
        aiSuggestion: '选题实用性强，建议细化研究方案',
        status: 'approved'
      },
      {
        id: '3',
        studentName: '王五',
        studentId: '20230003',
        major: '人工智能',
        topic: '自然语言处理在智能客服中的应用',
        topicType: '应用研究',
        topicSource: '导师课题',
        applyDate: '2025-01-15',
        aiSuggestion: '研究范围过大，建议聚焦具体场景',
        status: 'returned'
      },
      {
        id: '4',
        studentName: '赵六',
        studentId: '20230004',
        major: '大数据技术',
        topic: '大数据在智慧城市中的应用',
        topicType: '理论研究',
        topicSource: '自选课题',
        applyDate: '2025-01-18',
        aiSuggestion: '建议补充数据采集方案',
        status: 'pending'
      },
      {
        id: '5',
        studentName: '孙七',
        studentId: '20230005',
        major: '网络安全',
        topic: '区块链技术在网络安全中的应用',
        topicType: '应用研究',
        topicSource: '企业合作',
        applyDate: '2025-01-20',
        aiSuggestion: '创新点突出，建议完善安全模型',
        status: 'approved'
      },
      {
        id: '6',
        studentName: '周八',
        studentId: '20230006',
        major: '信息管理',
        topic: '信息管理系统的智能化升级',
        topicType: '理论研究',
        topicSource: '自选课题',
        applyDate: '2025-01-22',
        aiSuggestion: '建议细化系统架构设计',
        status: 'pending'
      },
      {
        id: '7',
        studentName: '吴九',
        studentId: '20230007',
        major: '电子信息',
        topic: '物联网设备的数据安全',
        topicType: '应用研究',
        topicSource: '导师课题',
        applyDate: '2025-01-25',
        aiSuggestion: '建议补充安全协议分析',
        status: 'returned'
      },
      {
        id: '8',
        studentName: '郑十',
        studentId: '20230008',
        major: '通信工程',
        topic: '5G通信技术的应用前景',
        topicType: '理论研究',
        topicSource: '自选课题',
        applyDate: '2025-01-28',
        aiSuggestion: '建议补充实际应用案例',
        status: 'approved'
      }
    ];
    return { data: mockData, success: true };
  };

  return (
    <PageContainer title="AI审核记录">
      <ProTable<AILogItem>
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Button type="primary" key="edit">
            修改
          </Button>
        ]}
        request={fetchData}
        columns={columns}
      />
    </PageContainer>
  );
};

export default AILogPage;