import type { ApplyItem } from '@/components/ReviewApplyTable/types';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Space, Upload, message } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import React, { useRef, useState } from 'react';

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
  {
    id: '4',
    isActive: true,
    studentName: '赵六',
    studentId: '20230004',
    major: '数据科学',
    topic: '大数据分析在金融风控中的应用',
    topicType: '应用研究',
    topicSource: '企业合作',
    applyDate: '2025-01-16',
    aiSuggestion: '研究方案可行，建议增加数据源',
    instructorComment: '同意开题',
    status: 'approved',
  },
  {
    id: '5',
    isActive: true,
    studentName: '钱七',
    studentId: '20230005',
    major: '网络安全',
    topic: '区块链技术在数据安全中的应用',
    topicType: '理论研究',
    topicSource: '自选课题',
    applyDate: '2025-01-17',
    aiSuggestion: '选题前沿，建议明确研究目标',
    instructorComment: '已通过',
    status: 'approved',
  },
  {
    id: '6',
    isActive: true,
    studentName: '孙八',
    studentId: '20230006',
    major: '物联网工程',
    topic: '智能家居系统的设计与实现',
    topicType: '应用研究',
    topicSource: '导师课题',
    applyDate: '2025-01-18',
    aiSuggestion: '选题实用性强，建议细化实施方案',
    instructorComment: '请补充实验设计',
    status: 'returned',
  },
  {
    id: '7',
    isActive: true,
    studentName: '周九',
    studentId: '20230007',
    major: '计算机科学与技术',
    topic: '量子计算算法研究',
    topicType: '理论研究',
    topicSource: '自选课题',
    applyDate: '2025-01-19',
    aiSuggestion: '选题难度较高，建议寻求导师指导',
    instructorComment: '同意开题',
    status: 'pending',
  },
  {
    id: '8',
    isActive: true,
    studentName: '吴十',
    studentId: '20230008',
    major: '软件工程',
    topic: 'DevOps在持续集成中的应用',
    topicType: '应用研究',
    topicSource: '企业合作',
    applyDate: '2025-01-20',
    aiSuggestion: '选题实用性强，建议明确评估指标',
    instructorComment: '已通过',
    status: 'approved',
  },
  {
    id: '9',
    isActive: true,
    studentName: '郑十一',
    studentId: '20230009',
    major: '人工智能',
    topic: '强化学习在游戏AI中的应用',
    topicType: '应用研究',
    topicSource: '导师课题',
    applyDate: '2025-01-21',
    aiSuggestion: '研究方案可行，建议增加对比实验',
    instructorComment: '同意开题',
    status: 'pending',
  },
  {
    id: '10',
    isActive: true,
    studentName: '王十二',
    studentId: '20230010',
    major: '数据科学',
    topic: '推荐系统算法优化研究',
    topicType: '理论研究',
    topicSource: '自选课题',
    applyDate: '2025-01-22',
    aiSuggestion: '选题有价值，建议明确创新点',
    instructorComment: '已通过',
    status: 'approved',
  },
  {
    id: '11',
    isActive: true,
    studentName: '李十三',
    studentId: '20230011',
    major: '网络安全',
    topic: '基于机器学习的入侵检测系统',
    topicType: '应用研究',
    topicSource: '企业合作',
    applyDate: '2025-01-23',
    aiSuggestion: '选题实用性强，建议增加数据集',
    instructorComment: '请补充实验数据',
    status: 'returned',
  },
  {
    id: '12',
    isActive: true,
    studentName: '张十四',
    studentId: '20230012',
    major: '物联网工程',
    topic: '农业物联网监测系统设计',
    topicType: '应用研究',
    topicSource: '导师课题',
    applyDate: '2025-01-24',
    aiSuggestion: '选题有实际应用价值，建议细化方案',
    instructorComment: '同意开题',
    status: 'pending',
  },
  {
    id: '13',
    isActive: true,
    studentName: '刘十五',
    studentId: '20230013',
    major: '计算机科学与技术',
    topic: '分布式系统一致性算法研究',
    topicType: '理论研究',
    topicSource: '自选课题',
    applyDate: '2025-01-25',
    aiSuggestion: '选题难度较高，建议分阶段研究',
    instructorComment: '已通过',
    status: 'approved',
  },
  {
    id: '14',
    isActive: true,
    studentName: '陈十六',
    studentId: '20230014',
    major: '软件工程',
    topic: '微前端架构实践研究',
    topicType: '应用研究',
    topicSource: '企业合作',
    applyDate: '2025-01-26',
    aiSuggestion: '选题前沿，建议明确评估标准',
    instructorComment: '请补充性能测试方案',
    status: 'returned',
  },
  {
    id: '15',
    isActive: true,
    studentName: '杨十七',
    studentId: '20230015',
    major: '人工智能',
    topic: '多模态学习在医疗影像中的应用',
    topicType: '应用研究',
    topicSource: '导师课题',
    applyDate: '2025-01-27',
    aiSuggestion: '选题有社会价值，建议明确数据来源',
    instructorComment: '同意开题',
    status: 'pending',
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

const BatchB1Page: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [queryVisible, setQueryVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [queryForm] = Form.useForm();

  const handleImport = async () => {
    setImportVisible(true);
  };

  const uploadProps = {
    name: 'file',
    accept: '.doc,.docx',
    beforeUpload: (file: File) => {
      const isDoc =
        file.type === 'application/msword' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isDoc) {
        message.error('只能上传Word文档格式!');
      }
      return isDoc;
    },
    action: '/api/upload',
    onChange(info: UploadChangeParam<UploadFile>) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
        setImportVisible(false);
        actionRef.current?.reload();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };
  const handleQuery = async () => {
    setQueryVisible(true);
  };

  const handleQuerySubmit = async () => {
    await queryForm.validateFields();
    // 重置查询表单并重新加载数据
    queryForm.resetFields();
    actionRef.current?.reload();
    setQueryVisible(false);
  };

  return (
    <PageContainer title={false}>
      <ProTable<ApplyItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Space key="buttons">
            <Button type="primary" key="import" onClick={handleImport}>
              导入
            </Button>
            <Modal
              title="导入文件"
              open={importVisible}
              onCancel={() => setImportVisible(false)}
              footer={null}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>选择Word文件上传</Button>
                <div style={{ marginTop: 8 }}>仅支持.doc和.docx格式</div>
              </Upload>
            </Modal>
            <Button key="query" onClick={handleQuery}>
              查询
            </Button>
            <Modal
              title="查询条件"
              open={queryVisible}
              onOk={handleQuerySubmit}
              onCancel={() => setQueryVisible(false)}
            >
              <Form form={queryForm} layout="vertical">
                <Form.Item name="studentName" label="学生姓名">
                  <Input />
                </Form.Item>
                <Form.Item name="studentId" label="学号">
                  <Input />
                </Form.Item>
                <Form.Item name="topic" label="课题名称">
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </Space>,
        ]}
        columns={columns}
        dataSource={demoData}
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

export default BatchB1Page;
