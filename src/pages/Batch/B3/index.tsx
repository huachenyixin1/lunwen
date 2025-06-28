import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Space, Upload, message } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import React, { useRef, useState } from 'react';

interface DraftItem {
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

const demoData: DraftItem[] = [
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
    draftFile: '初稿1.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-03-10',
    updateTime: '2025-03-10',
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
    draftFile: '初稿2.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '结构完整，建议补充实验数据',
    reviewTime: '2025-03-12',
    teacherSignature: '王教授',
    createTime: '2025-03-11',
    updateTime: '2025-03-12',
  },
  {
    id: '3',
    isActive: true,
    topic: '区块链技术在金融交易中的应用',
    division: '理工学部',
    college: '计算机学院',
    studyCenter: '分校',
    major: '计算机科学与技术',
    enrollmentDate: '2022-09-01',
    studentId: '20220003',
    studentName: '王五',
    instructor: '张教授',
    draftFile: '初稿3.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '需要补充相关案例研究',
    reviewTime: '2025-03-13',
    teacherSignature: '张教授',
    createTime: '2025-03-10',
    updateTime: '2025-03-13',
  },
  {
    id: '4',
    isActive: true,
    topic: '大数据分析在零售业的应用',
    division: '经济管理学部',
    college: '商学院',
    studyCenter: '分校',
    major: '工商管理',
    enrollmentDate: '2022-09-01',
    studentId: '20220004',
    studentName: '赵六',
    instructor: '钱教授',
    draftFile: '初稿4.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '数据分析方法新颖',
    reviewTime: '2025-03-14',
    teacherSignature: '钱教授',
    createTime: '2025-03-13',
    updateTime: '2025-03-14',
  },
  {
    id: '5',
    isActive: true,
    topic: '人工智能在医疗诊断中的应用',
    division: '医学部',
    college: '医学院',
    studyCenter: '校本部',
    major: '临床医学',
    enrollmentDate: '2022-09-01',
    studentId: '20220005',
    studentName: '孙七',
    instructor: '周教授',
    draftFile: '初稿5.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-03-14',
    updateTime: '2025-03-14',
  },
  {
    id: '6',
    isActive: true,
    topic: '5G通信技术发展研究',
    division: '理工学部',
    college: '通信工程学院',
    studyCenter: '分校',
    major: '通信工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220006',
    studentName: '郑八',
    instructor: '吴教授',
    draftFile: '初稿6.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '技术分析全面',
    reviewTime: '2025-03-15',
    teacherSignature: '吴教授',
    createTime: '2025-03-14',
    updateTime: '2025-03-15',
  },
  {
    id: '7',
    isActive: true,
    topic: '物联网智能家居系统设计',
    division: '理工学部',
    college: '物联网学院',
    studyCenter: '校本部',
    major: '物联网工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220007',
    studentName: '刘九',
    instructor: '郑教授',
    draftFile: '初稿7.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '系统设计需完善',
    reviewTime: '2025-03-16',
    teacherSignature: '郑教授',
    createTime: '2025-03-15',
    updateTime: '2025-03-16',
  },
  {
    id: '8',
    isActive: true,
    topic: '虚拟现实在教育中的应用',
    division: '教育学部',
    college: '教育学院',
    studyCenter: '分校',
    major: '教育技术学',
    enrollmentDate: '2022-09-01',
    studentId: '20220008',
    studentName: '陈十',
    instructor: '孙教授',
    draftFile: '初稿8.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '应用场景分析深入',
    reviewTime: '2025-03-17',
    teacherSignature: '孙教授',
    createTime: '2025-03-16',
    updateTime: '2025-03-17',
  },
  {
    id: '9',
    isActive: true,
    topic: '量子计算研究进展',
    division: '理工学部',
    college: '物理学院',
    studyCenter: '校本部',
    major: '物理学',
    enrollmentDate: '2022-09-01',
    studentId: '20220009',
    studentName: '周十一',
    instructor: '钱教授',
    draftFile: '初稿9.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-03-17',
    updateTime: '2025-03-17',
  },
  {
    id: '10',
    isActive: true,
    topic: '新能源汽车电池技术',
    division: '理工学部',
    college: '汽车工程学院',
    studyCenter: '分校',
    major: '车辆工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220010',
    studentName: '吴十二',
    instructor: '赵教授',
    draftFile: '初稿10.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '技术路线清晰',
    reviewTime: '2025-03-18',
    teacherSignature: '赵教授',
    createTime: '2025-03-17',
    updateTime: '2025-03-18',
  },
  {
    id: '11',
    isActive: true,
    topic: '智慧城市建设研究',
    division: '理工学部',
    college: '城市规划学院',
    studyCenter: '校本部',
    major: '城市规划',
    enrollmentDate: '2022-09-01',
    studentId: '20220011',
    studentName: '郑十三',
    instructor: '李教授',
    draftFile: '初稿11.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '需补充案例研究',
    reviewTime: '2025-03-19',
    teacherSignature: '李教授',
    createTime: '2025-03-18',
    updateTime: '2025-03-19',
  },
  {
    id: '12',
    isActive: true,
    topic: '生物信息学算法研究',
    division: '生命科学学部',
    college: '生命科学学院',
    studyCenter: '分校',
    major: '生物技术',
    enrollmentDate: '2022-09-01',
    studentId: '20220012',
    studentName: '王十四',
    instructor: '周教授',
    draftFile: '初稿12.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '算法创新性强',
    reviewTime: '2025-03-20',
    teacherSignature: '周教授',
    createTime: '2025-03-19',
    updateTime: '2025-03-20',
  },
  {
    id: '13',
    isActive: true,
    topic: '数字媒体艺术设计',
    division: '艺术学部',
    college: '艺术学院',
    studyCenter: '校本部',
    major: '数字媒体艺术',
    enrollmentDate: '2022-09-01',
    studentId: '20220013',
    studentName: '李十五',
    instructor: '吴教授',
    draftFile: '初稿13.docx',
    version: '1.0',
    status: 'pending',
    isAIReviewed: false,
    reviewSuggestion: '',
    reviewTime: '',
    teacherSignature: '',
    createTime: '2025-03-20',
    updateTime: '2025-03-20',
  },
  {
    id: '14',
    isActive: true,
    topic: '环境工程可持续发展',
    division: '环境学部',
    college: '环境学院',
    studyCenter: '分校',
    major: '环境工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220014',
    studentName: '张十六',
    instructor: '郑教授',
    draftFile: '初稿14.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '研究意义重大',
    reviewTime: '2025-03-21',
    teacherSignature: '郑教授',
    createTime: '2025-03-20',
    updateTime: '2025-03-21',
  },
  {
    id: '15',
    isActive: true,
    topic: '材料科学前沿研究',
    division: '理工学部',
    college: '材料学院',
    studyCenter: '校本部',
    major: '材料科学与工程',
    enrollmentDate: '2022-09-01',
    studentId: '20220015',
    studentName: '刘十七',
    instructor: '孙教授',
    draftFile: '初稿15.docx',
    version: '1.0',
    status: 'returned',
    isAIReviewed: true,
    reviewSuggestion: '需补充实验数据',
    reviewTime: '2025-03-22',
    teacherSignature: '孙教授',
    createTime: '2025-03-21',
    updateTime: '2025-03-22',
  },
  {
    id: '16',
    isActive: true,
    topic: '人工智能伦理研究',
    division: '人文社科部',
    college: '哲学学院',
    studyCenter: '分校',
    major: '哲学',
    enrollmentDate: '2022-09-01',
    studentId: '20220016',
    studentName: '陈十八',
    instructor: '钱教授',
    draftFile: '初稿16.docx',
    version: '1.0',
    status: 'approved',
    isAIReviewed: true,
    reviewSuggestion: '视角独特，论证充分',
    reviewTime: '2025-03-23',
    teacherSignature: '钱教授',
    createTime: '2025-03-22',
    updateTime: '2025-03-23',
  },
];

const columns: ProColumns<DraftItem>[] = [
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

const BatchB3Page: React.FC = () => {
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
      <ProTable<DraftItem>
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

export default BatchB3Page;
