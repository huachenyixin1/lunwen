import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Space, Upload, message } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import React, { useRef, useState } from 'react';

interface ProposalItem {
  id: string;
  isActive: boolean;
  division: string;
  college: string;
  studyCenter: string;
  studentName: string;
  studentId: string;
  major: string;
  level: string;
  topic: string;
  researchPurpose: string;
  researchStatus: string;
  researchContent: string;
  innovationPoints: string;
  schedule: string;
  references: string;
  status: string;
  version: string;
  isAIReviewed: boolean;
  reviewSuggestion: string;
  reviewTime: string;
  teacherSignature: string;
  createTime: string;
  updateTime: string;
}

const demoData: ProposalItem[] = [
  {
    id: '1',
    isActive: true,
    division: '理工学部',
    college: '计算机学院',
    studyCenter: '校本部',
    studentName: '张三',
    studentId: '20230001',
    major: '计算机科学与技术',
    level: '本科',
    topic: '基于深度学习的图像识别研究',
    researchPurpose: '研究深度学习在图像识别领域的应用',
    researchStatus: '国内外研究现状分析',
    researchContent: '研究内容和关键问题',
    innovationPoints: '创新点描述',
    schedule: '研究进度安排',
    references: '参考文献列表',
    status: 'pending',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-01-10',
    updateTime: '2025-01-10',
  },
  {
    id: '2',
    isActive: true,
    division: '理工学部',
    college: '计算机学院',
    studyCenter: '分校',
    studentName: '李四',
    studentId: '20230002',
    major: '计算机科学与技术',
    level: '硕士',
    topic: '区块链技术在金融领域的应用',
    researchPurpose: '探索区块链在金融交易中的安全性提升',
    researchStatus: '国内外区块链应用现状',
    researchContent: '区块链技术实现和金融场景适配',
    innovationPoints: '新型共识算法设计',
    schedule: '分阶段研究计划',
    references: '区块链相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '选题新颖，建议细化实施方案',
    reviewTime: '2025-01-15',
    teacherSignature: '王教授',
    createTime: '2025-01-12',
    updateTime: '2025-01-15',
  },
  {
    id: '3',
    isActive: true,
    division: '理工学部',
    college: '软件学院',
    studyCenter: '校本部',
    studentName: '王五',
    studentId: '20230003',
    major: '软件工程',
    level: '本科',
    topic: '微服务架构在企业应用中的实践',
    researchPurpose: '研究微服务架构的设计与实现',
    researchStatus: '微服务架构发展现状',
    researchContent: '微服务拆分原则和通信机制',
    innovationPoints: '服务治理方案优化',
    schedule: '分阶段开发计划',
    references: '微服务相关文献',
    status: 'pending',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-01-14',
    updateTime: '2025-01-14',
  },
  {
    id: '4',
    isActive: true,
    division: '理工学部',
    college: '网络安全学院',
    studyCenter: '分校',
    studentName: '赵六',
    studentId: '20230004',
    major: '网络安全',
    level: '硕士',
    topic: '基于零信任的企业网络安全架构',
    researchPurpose: '研究零信任架构在企业网络中的应用',
    researchStatus: '零信任架构发展现状',
    researchContent: '零信任架构设计与实现',
    innovationPoints: '动态访问控制策略',
    schedule: '分阶段研究计划',
    references: '网络安全相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '研究目标明确，建议补充实验方案',
    reviewTime: '2025-01-16',
    teacherSignature: '张教授',
    createTime: '2025-01-15',
    updateTime: '2025-01-16',
  },
  {
    id: '5',
    isActive: true,
    division: '经济管理学部',
    college: '金融学院',
    studyCenter: '校本部',
    studentName: '钱七',
    studentId: '20230005',
    major: '金融学',
    level: '本科',
    topic: '互联网金融风险控制研究',
    researchPurpose: '研究互联网金融风险控制模型',
    researchStatus: '国内外研究现状',
    researchContent: '风险识别与评估方法',
    innovationPoints: '新型风险评估模型',
    schedule: '分阶段研究计划',
    references: '金融风险相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '研究框架合理，建议补充实证分析',
    reviewTime: '2025-01-17',
    teacherSignature: '刘教授',
    createTime: '2025-01-16',
    updateTime: '2025-01-17',
  },
  {
    id: '6',
    isActive: true,
    division: '经济管理学部',
    college: '商学院',
    studyCenter: '分校',
    studentName: '孙八',
    studentId: '20230006',
    major: '工商管理',
    level: '硕士',
    topic: '企业数字化转型路径研究',
    researchPurpose: '研究企业数字化转型的关键路径',
    researchStatus: '国内外研究现状',
    researchContent: '转型路径与实施策略',
    innovationPoints: '数字化转型评估框架',
    schedule: '分阶段研究计划',
    references: '数字化转型相关文献',
    status: 'returned',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '研究范围需聚焦，建议选择特定行业',
    reviewTime: '2025-01-18',
    teacherSignature: '陈教授',
    createTime: '2025-01-17',
    updateTime: '2025-01-18',
  },
  {
    id: '7',
    isActive: true,
    division: '医学部',
    college: '医学院',
    studyCenter: '校本部',
    studentName: '周九',
    studentId: '20230007',
    major: '临床医学',
    level: '硕士',
    topic: '人工智能在医学影像诊断中的应用',
    researchPurpose: '研究AI在医学影像诊断中的准确率提升',
    researchStatus: '国内外研究现状',
    researchContent: '深度学习模型设计与验证',
    innovationPoints: '新型医学影像分析算法',
    schedule: '分阶段研究计划',
    references: '医学AI相关文献',
    status: 'pending',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-01-18',
    updateTime: '2025-01-18',
  },
  {
    id: '8',
    isActive: true,
    division: '理工学部',
    college: '通信工程学院',
    studyCenter: '分校',
    studentName: '吴十',
    studentId: '20230008',
    major: '通信工程',
    level: '本科',
    topic: '5G网络优化技术研究',
    researchPurpose: '研究5G网络性能优化方法',
    researchStatus: '国内外研究现状',
    researchContent: '网络优化算法与实现',
    innovationPoints: '新型网络优化方案',
    schedule: '分阶段研究计划',
    references: '通信技术相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '研究方案可行，建议补充实验设计',
    reviewTime: '2025-01-19',
    teacherSignature: '杨教授',
    createTime: '2025-01-18',
    updateTime: '2025-01-19',
  },
  {
    id: '9',
    isActive: true,
    division: '理工学部',
    college: '电子工程学院',
    studyCenter: '校本部',
    studentName: '郑十一',
    studentId: '20230009',
    major: '电子信息工程',
    level: '本科',
    topic: '物联网智能家居系统设计',
    researchPurpose: '研究智能家居系统的设计与实现',
    researchStatus: '国内外研究现状',
    researchContent: '系统架构与关键技术',
    innovationPoints: '新型设备互联协议',
    schedule: '分阶段开发计划',
    references: '物联网相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '设计方案合理，建议细化安全机制',
    reviewTime: '2025-01-20',
    teacherSignature: '黄教授',
    createTime: '2025-01-19',
    updateTime: '2025-01-20',
  },
  {
    id: '10',
    isActive: true,
    division: '经济管理学部',
    college: '金融学院',
    studyCenter: '分校',
    studentName: '王十二',
    studentId: '20230010',
    major: '金融工程',
    level: '硕士',
    topic: '基于机器学习的股票预测模型',
    researchPurpose: '研究机器学习在股票预测中的应用',
    researchStatus: '国内外研究现状',
    researchContent: '预测模型设计与验证',
    innovationPoints: '新型特征工程方法',
    schedule: '分阶段研究计划',
    references: '金融科技相关文献',
    status: 'returned',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '需补充更多历史数据验证',
    reviewTime: '2025-01-21',
    teacherSignature: '徐教授',
    createTime: '2025-01-20',
    updateTime: '2025-01-21',
  },
  {
    id: '11',
    isActive: true,
    division: '教育学部',
    college: '教育学院',
    studyCenter: '校本部',
    studentName: '李十三',
    studentId: '20230011',
    major: '教育技术学',
    level: '本科',
    topic: '虚拟现实在教育中的应用研究',
    researchPurpose: '研究VR技术在教育场景的应用效果',
    researchStatus: '国内外研究现状',
    researchContent: '应用场景设计与评估',
    innovationPoints: '新型VR教学交互模式',
    schedule: '分阶段研究计划',
    references: '教育技术相关文献',
    status: 'pending',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-01-21',
    updateTime: '2025-01-21',
  },
  {
    id: '12',
    isActive: true,
    division: '理工学部',
    college: '建筑学院',
    studyCenter: '分校',
    studentName: '赵十四',
    studentId: '20230012',
    major: '建筑学',
    level: '硕士',
    topic: '绿色建筑节能技术研究',
    researchPurpose: '研究绿色建筑的节能设计与实现',
    researchStatus: '国内外研究现状',
    researchContent: '节能技术分析与评估',
    innovationPoints: '新型节能材料应用',
    schedule: '分阶段研究计划',
    references: '建筑节能相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '研究内容全面，建议补充案例研究',
    reviewTime: '2025-01-22',
    teacherSignature: '林教授',
    createTime: '2025-01-21',
    updateTime: '2025-01-22',
  },
  {
    id: '13',
    isActive: true,
    division: '文学部',
    college: '文学院',
    studyCenter: '校本部',
    studentName: '钱十五',
    studentId: '20230013',
    major: '汉语言文学',
    level: '本科',
    topic: '网络文学创作特征研究',
    researchPurpose: '研究网络文学与传统文学的差异',
    researchStatus: '国内外研究现状',
    researchContent: '创作特征分析与比较',
    innovationPoints: '新型文学评价体系',
    schedule: '分阶段研究计划',
    references: '文学理论相关文献',
    status: 'pending',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-01-22',
    updateTime: '2025-01-22',
  },
  {
    id: '14',
    isActive: true,
    division: '理工学部',
    college: '材料学院',
    studyCenter: '分校',
    studentName: '孙十六',
    studentId: '20230014',
    major: '材料科学与工程',
    level: '硕士',
    topic: '新型纳米材料制备研究',
    researchPurpose: '研究纳米材料的制备方法与性能',
    researchStatus: '国内外研究现状',
    researchContent: '制备工艺与性能测试',
    innovationPoints: '新型制备工艺',
    schedule: '分阶段研究计划',
    references: '材料科学相关文献',
    status: 'approved',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '实验方案可行，建议补充表征数据',
    reviewTime: '2025-01-23',
    teacherSignature: '马教授',
    createTime: '2025-01-22',
    updateTime: '2025-01-23',
  },
  {
    id: '15',
    isActive: true,
    division: '医学部',
    college: '药学院',
    studyCenter: '校本部',
    studentName: '周十七',
    studentId: '20230015',
    major: '药学',
    level: '硕士',
    topic: '天然药物活性成分研究',
    researchPurpose: '研究天然药物中活性成分的提取与鉴定',
    researchStatus: '国内外研究现状',
    researchContent: '提取方法与活性测试',
    innovationPoints: '新型提取工艺',
    schedule: '分阶段研究计划',
    references: '药物化学相关文献',
    status: 'returned',
    version: '1.0',
    isAIReviewed: true,
    reviewSuggestion: '需补充更详细的药理实验方案',
    reviewTime: '2025-01-24',
    teacherSignature: '韩教授',
    createTime: '2025-01-23',
    updateTime: '2025-01-24',
  },
  {
    id: '16',
    isActive: true,
    division: '理工学部',
    college: '人工智能学院',
    studyCenter: '校本部',
    studentName: '吴十八',
    studentId: '20230016',
    major: '人工智能',
    level: '博士',
    topic: '多模态大语言模型研究',
    researchPurpose: '研究多模态大语言模型的训练与应用',
    researchStatus: '国内外研究现状',
    researchContent: '模型架构与训练方法',
    innovationPoints: '新型多模态融合方法',
    schedule: '分阶段研究计划',
    references: 'AI相关文献',
    status: 'pending',
    version: '1.0',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-01-24',
    updateTime: '2025-01-24',
  },
];

const columns: ProColumns<ProposalItem>[] = [
  { title: '分部', dataIndex: 'division' },
  { title: '学院', dataIndex: 'college' },
  { title: '学习中心', dataIndex: 'studyCenter' },
  { title: '学生姓名', dataIndex: 'studentName' },
  { title: '学号', dataIndex: 'studentId' },
  { title: '专业名称', dataIndex: 'major' },
  { title: '层次', dataIndex: 'level' },
  { title: '课题名称', dataIndex: 'topic', ellipsis: true },
  { title: '状态', dataIndex: 'status' },
  { title: '版本', dataIndex: 'version' },
  { title: '是否AI审核', dataIndex: 'isAIReviewed', valueType: 'checkbox' },
  { title: '创建时间', dataIndex: 'createTime', valueType: 'date' },
];

const BatchB2Page: React.FC = () => {
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
    queryForm.resetFields();
    actionRef.current?.reload();
    setQueryVisible(false);
  };

  return (
    <PageContainer title={false}>
      <ProTable<ProposalItem>
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
        scroll={{ x: 2400 }}
        style={{ overflowX: 'auto' }}
      />
    </PageContainer>
  );
};

export default BatchB2Page;
