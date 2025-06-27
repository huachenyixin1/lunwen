import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

interface MidItem {
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

const demoData: MidItem[] = [
  {
    id: '1',
    title: '基于AI的论文评审系统',
    branch: '001',
    college: '国家开放大学',
    center: 'B学习中心',
    major: '计算机科学',
    enrollDate: '2022-09',
    studentId: 'S001',
    studentName: '李四',
    guideTeacher: '王五',
    file: 'S0012024春.docx',
    version: '1',
    status: '保存',
    isAI: 'Y',
    review: '内容需进一步完善',
    reviewTime: '2025-05-16 15:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-16 10:00',
    updatedAt: '2025-05-16 10:00',
  },
];

const columns: ProColumns<MidItem>[] = [
  { title: '题目', dataIndex: 'title', width: 180 },
  { title: '分部', dataIndex: 'branch', width: 80 },
  { title: '学院', dataIndex: 'college', width: 120 },
  { title: '学习中心', dataIndex: 'center', width: 120 },
  { title: '专业', dataIndex: 'major', width: 120 },
  { title: '入学时间', dataIndex: 'enrollDate', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 100 },
  { title: '姓名', dataIndex: 'studentName', width: 100 },
  { title: '指导教师', dataIndex: 'guideTeacher', width: 100 },
  { title: '中期检查报告文件', dataIndex: 'file', width: 180, render: (text) => <a href="#" download>{text}</a> },
  { title: '版本', dataIndex: 'version', width: 60 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '是否AI审核', dataIndex: 'isAI', width: 80 },
  { title: '审批建议', dataIndex: 'review', width: 120 },
  { title: '审批时间', dataIndex: 'reviewTime', width: 140 },
  { title: '老师签名', dataIndex: 'teacherSign', width: 120 },
  { title: '创建时间', dataIndex: 'createdAt', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 140 },
];

const Mid: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<MidItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    message.success('演示：已保存中期检查记录');
    setModalVisible(false);
    setFileList([]);
    actionRef.current?.reload();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setFileList([]);
  };

  const handleSubmit = () => {
    message.success('演示：已提交中期检查');
    actionRef.current?.reload();
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      Modal.warning({ content: '请先选择要删除的数据' });
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的${selectedRows.length}条数据吗？`,
      onOk: () => {
        message.success('演示：已删除');
        actionRef.current?.reload();
      },
    });
  };

  return (
    <PageContainer>
      <ProTable<MidItem>
        actionRef={actionRef}
        columns={columns}
        dataSource={demoData}
        rowKey="id"
        scroll={{ x: 2000 }}
        search={false}
        toolBarRender={() => [
          <Space key="toolbar">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增</Button>
            <Button type="primary" onClick={handleSubmit} disabled={selectedRows.length === 0}>提交</Button>
            <Button danger onClick={handleDelete} disabled={selectedRows.length === 0}>删除</Button>
          </Space>
        ]}
        rowSelection={{
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        bordered
        size="middle"
      />
      <Modal
        title="新增中期检查"
        open={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        okText="保存"
        cancelText="取消"
      >
        <Upload
          accept=".doc,.docx"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <Button icon={<UploadOutlined />}>上传中期检查报告（.doc/.docx）</Button>
        </Upload>
      </Modal>
    </PageContainer>
  );
};

export default Mid;