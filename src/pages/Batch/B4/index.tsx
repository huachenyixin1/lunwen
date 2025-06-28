import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Space, Upload, message } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import React, { useRef, useState } from 'react';

interface MidtermItem {
  id: string;
  isActive: boolean;
  topic: string;
  division: string;
  college: string;
  studyCenter: string;
  major: string;
  enrollmentDate: string;
  studentId: string;
  studentName: string;
  instructor: string;
  draftFile: string;
  version: string;
  status: string;
  isAIReviewed: boolean;
  reviewSuggestion: string;
  reviewTime: string;
  teacherSignature: string;
  createTime: string;
  updateTime: string;
}

const demoData: MidtermItem[] = [
  {
    id: '1',
    isActive: true,
    topic: '基于深度学习的图像识别研究',
    division: '理工学部',
    college: '计算机学院',
    studyCenter: '校本部',
    major: '计算机科学与技术',
    enrollmentDate: '2022-09-01',
    studentId: '20220001',
    studentName: '张三',
    instructor: '李教授',
    draftFile: '中期检查1.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-05-10',
    updateTime: '2025-05-10',
  },
  {
    id: '2',
    isActive: true,
    topic: '微服务架构在企业级应用中的实践',
    division: '理工学部',
    college: '软件学院',
    studyCenter: '分校',
    major: '软件工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220002',
    studentName: '李四',
    instructor: '王教授',
    draftFile: '中期检查2.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '进度符合要求，继续推进',
    reviewTime: '2025-05-12',
    teacherSignature: '王教授',
    createTime: '2025-05-11',
    updateTime: '2025-05-12',
  },
  {
    id: '3',
    isActive: true,
    topic: '区块链技术在金融领域的应用研究',
    division: '经济管理学部',
    college: '金融学院',
    studyCenter: '分校',
    major: '金融学',
    enrollmentDate: '2022-09-01',
    studentId: '20220003',
    studentName: '王五',
    instructor: '赵教授',
    draftFile: '中期检查3.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '研究进度滞后，需加快实验进度',
    reviewTime: '2025-05-15',
    teacherSignature: '赵教授',
    createTime: '2025-05-13',
    updateTime: '2025-05-15',
  },
  {
    id: '4',
    isActive: true,
    topic: '大数据分析在电商推荐系统中的应用',
    division: '经济管理学部',
    college: '商学院',
    studyCenter: '校本部',
    major: '电子商务',
    enrollmentDate: '2022-09-01',
    studentId: '20220004',
    studentName: '赵六',
    instructor: '钱教授',
    draftFile: '中期检查4.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: false,
    reviewSuggestion: '数据分析方法合理，继续完善',
    reviewTime: '2025-05-14',
    teacherSignature: '钱教授',
    createTime: '2025-05-12',
    updateTime: '2025-05-14',
  },
  {
    id: '5',
    isActive: true,
    topic: '人工智能在医疗影像诊断中的应用',
    division: '医学部',
    college: '医学院',
    studyCenter: '校本部',
    major: '临床医学',
    enrollmentDate: '2022-09-01',
    studentId: '20220005',
    studentName: '孙七',
    instructor: '周教授',
    draftFile: '中期检查5.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-05-15',
    updateTime: '2025-05-15',
  },
  {
    id: '6',
    isActive: true,
    topic: '5G网络优化技术研究',
    division: '理工学部',
    college: '通信工程学院',
    studyCenter: '分校',
    major: '通信工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220006',
    studentName: '周八',
    instructor: '吴教授',
    draftFile: '中期检查6.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '实验数据充分，分析到位',
    reviewTime: '2025-05-16',
    teacherSignature: '吴教授',
    createTime: '2025-05-14',
    updateTime: '2025-05-16',
  },
  {
    id: '7',
    isActive: true,
    topic: '物联网智能家居系统设计',
    division: '理工学部',
    college: '电子工程学院',
    studyCenter: '校本部',
    major: '电子信息工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220007',
    studentName: '吴九',
    instructor: '郑教授',
    draftFile: '中期检查7.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '系统设计需更详细，补充架构图',
    reviewTime: '2025-05-17',
    teacherSignature: '郑教授',
    createTime: '2025-05-15',
    updateTime: '2025-05-17',
  },
  {
    id: '8',
    isActive: true,
    topic: '基于机器学习的股票预测模型',
    division: '经济管理学部',
    college: '金融学院',
    studyCenter: '分校',
    major: '金融工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220008',
    studentName: '郑十',
    instructor: '王教授',
    draftFile: '中期检查8.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '模型训练效果良好，继续优化参数',
    reviewTime: '2025-05-18',
    teacherSignature: '王教授',
    createTime: '2025-05-16',
    updateTime: '2025-05-18',
  },
  {
    id: '9',
    isActive: true,
    topic: '虚拟现实在教育中的应用研究',
    division: '教育学部',
    college: '教育学院',
    studyCenter: '校本部',
    major: '教育技术学',
    enrollmentDate: '2022-09-01',
    studentId: '20220009',
    studentName: '刘一',
    instructor: '孙教授',
    draftFile: '中期检查9.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-05-17',
    updateTime: '2025-05-17',
  },
  {
    id: '10',
    isActive: true,
    topic: '绿色建筑节能技术研究',
    division: '理工学部',
    college: '建筑学院',
    studyCenter: '分校',
    major: '建筑学',
    enrollmentDate: '2022-09-01',
    studentId: '20220010',
    studentName: '陈二',
    instructor: '李教授',
    draftFile: '中期检查10.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: false,
    reviewSuggestion: '研究数据充分，结论合理',
    reviewTime: '2025-05-19',
    teacherSignature: '李教授',
    createTime: '2025-05-18',
    updateTime: '2025-05-19',
  },
  {
    id: '11',
    isActive: true,
    topic: '新媒体环境下品牌传播策略研究',
    division: '文学部',
    college: '新闻传播学院',
    studyCenter: '校本部',
    major: '新闻学',
    enrollmentDate: '2022-09-01',
    studentId: '20220011',
    studentName: '林三',
    instructor: '张教授',
    draftFile: '中期检查11.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '案例研究需更深入，补充访谈数据',
    reviewTime: '2025-05-20',
    teacherSignature: '张教授',
    createTime: '2025-05-19',
    updateTime: '2025-05-20',
  },
  {
    id: '12',
    isActive: true,
    topic: '企业数字化转型路径研究',
    division: '经济管理学部',
    college: '管理学院',
    studyCenter: '分校',
    major: '工商管理',
    enrollmentDate: '2022-09-01',
    studentId: '20220012',
    studentName: '黄四',
    instructor: '刘教授',
    draftFile: '中期检查12.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '研究框架合理，继续完善案例分析',
    reviewTime: '2025-05-21',
    teacherSignature: '刘教授',
    createTime: '2025-05-20',
    updateTime: '2025-05-21',
  },
  {
    id: '13',
    isActive: true,
    topic: '基于深度学习的自然语言处理技术',
    division: '理工学部',
    college: '人工智能学院',
    studyCenter: '校本部',
    major: '人工智能',
    enrollmentDate: '2022-09-01',
    studentId: '20220013',
    studentName: '杨五',
    instructor: '陈教授',
    draftFile: '中期检查13.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-05-21',
    updateTime: '2025-05-21',
  },
  {
    id: '14',
    isActive: true,
    topic: '乡村振兴战略下农村电商发展研究',
    division: '经济管理学部',
    college: '商学院',
    studyCenter: '分校',
    major: '市场营销',
    enrollmentDate: '2022-09-01',
    studentId: '20220014',
    studentName: '朱六',
    instructor: '杨教授',
    draftFile: '中期检查14.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '调研数据充分，分析到位',
    reviewTime: '2025-05-22',
    teacherSignature: '杨教授',
    createTime: '2025-05-21',
    updateTime: '2025-05-22',
  },
  {
    id: '15',
    isActive: true,
    topic: '城市轨道交通客流预测模型研究',
    division: '理工学部',
    college: '交通工程学院',
    studyCenter: '校本部',
    major: '交通运输',
    enrollmentDate: '2022-09-01',
    studentId: '20220015',
    studentName: '徐七',
    instructor: '黄教授',
    draftFile: '中期检查15.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '模型需验证更多实际场景数据',
    reviewTime: '2025-05-23',
    teacherSignature: '黄教授',
    createTime: '2025-05-22',
    updateTime: '2025-05-23',
  },
  {
    id: '16',
    isActive: true,
    topic: '非物质文化遗产数字化保护研究',
    division: '文学部',
    college: '艺术学院',
    studyCenter: '分校',
    major: '艺术设计',
    enrollmentDate: '2022-09-01',
    studentId: '20220016',
    studentName: '高八',
    instructor: '徐教授',
    draftFile: '中期检查16.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: false,
    reviewSuggestion: '研究方法创新，继续推进',
    reviewTime: '2025-05-24',
    teacherSignature: '徐教授',
    createTime: '2025-05-23',
    updateTime: '2025-05-24',
  },
];

const columns: ProColumns<MidtermItem>[] = [
  { title: '题目', dataIndex: 'topic', ellipsis: true },
  { title: '分部', dataIndex: 'division' },
  { title: '学院', dataIndex: 'college' },
  { title: '学习中心', dataIndex: 'studyCenter' },
  { title: '专业', dataIndex: 'major' },
  { title: '学号', dataIndex: 'studentId' },
  { title: '姓名', dataIndex: 'studentName' },
  { title: '指导教师', dataIndex: 'instructor' },
  { title: '版本', dataIndex: 'version' },
  { title: '状态', dataIndex: 'status' },
  { title: '是否AI审核', dataIndex: 'isAIReviewed', valueType: 'checkbox' },
  { title: '创建时间', dataIndex: 'createTime', valueType: 'date' },
];

const BatchB4Page: React.FC = () => {
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
      <ProTable<MidtermItem>
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
                <Form.Item name="topic" label="论文题目">
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
        scroll={{ x: 2000 }}
        style={{ overflowX: 'auto' }}
      />
    </PageContainer>
  );
};

export default BatchB4Page;
