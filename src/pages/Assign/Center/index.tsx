import React, { useState, useRef } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Transfer, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-components';

// 字段：学号、姓名、学院、学习中心、专业、批次、指导教师

type CenterAssignStudent = {
  id: string;
  studentId: string;
  name: string;
  college: string;
  center: string;
  major: string;
  batch: string;
  guideTeacher?: string;
};

const CenterAssignPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<CenterAssignStudent[]>([]);
  const [assignVisible, setAssignVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  // 演示数据
  const students: CenterAssignStudent[] = [
    { id: '1', studentId: 'S001', name: '李四', college: 'A学院', center: 'B学习中心', major: '计算机科学', batch: '2024春', guideTeacher: '王五' },
    { id: '2', studentId: 'S002', name: '王小明', college: 'A学院', center: 'B学习中心', major: '软件工程', batch: '2024春' },
    { id: '3', studentId: 'S003', name: '赵六', college: 'C学院', center: 'D学习中心', major: '信息管理', batch: '2024春' },
  ];

  const teachers = [
    { id: '1', name: '王五', center: 'B学习中心' },
    { id: '2', name: '李老师', center: 'B学习中心' },
    { id: '3', name: '张老师', center: 'D学习中心' },
  ];

  const columns: ProColumns<CenterAssignStudent>[] = [
    { title: '学号', dataIndex: 'studentId', key: 'studentId' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '学院', dataIndex: 'college', key: 'college' },
    { title: '学习中心', dataIndex: 'center', key: 'center' },
    { title: '专业', dataIndex: 'major', key: 'major' },
    { title: '批次', dataIndex: 'batch', key: 'batch' },
    { title: '指导教师', dataIndex: 'guideTeacher', key: 'guideTeacher' },
  ];

  const handleAssign = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一名学生');
      return;
    }
    setAssignVisible(true);
    setTargetKeys([]);
  };

  const handleAssignSubmit = () => {
    if (targetKeys.length === 0) {
      message.warning('请至少选择一名教师');
      return;
    }
    message.success('分配成功');
    setAssignVisible(false);
    setSelectedRowKeys([]);
    actionRef.current?.reload();
  };

  const handleTransferChange = (newTargetKeys: React.Key[]) => {
    setTargetKeys(newTargetKeys as string[]);
  };

  return (
    <PageContainer>
      <ProTable<CenterAssignStudent>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        dataSource={students}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys, rows) => {
            setSelectedRowKeys(keys as string[]);
            setSelectedStudents(rows);
          },
        }}
        toolBarRender={() => [
          <Button key="assign" type="primary" onClick={handleAssign}>
            分配
          </Button>,
        ]}
      />
      <Modal
        title="分配指导教师"
        open={assignVisible}
        width={800}
        onCancel={() => setAssignVisible(false)}
        onOk={handleAssignSubmit}
        footer={[
          <Button key="cancel" onClick={() => setAssignVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleAssignSubmit}>
            确定
          </Button>,
        ]}
      >
        <Transfer
          dataSource={teachers.map(t => ({ key: t.id, title: `${t.name} (${t.center})` }))}
          targetKeys={targetKeys}
          onChange={handleTransferChange}
          render={item => item.title}
          titles={['待分配教师', '已选教师']}
          oneWay
          style={{ width: '100%', height: 400 }}
          listStyle={{ width: '48%', height: '100%' }}
          operations={['→', '←']}
        />
      </Modal>
    </PageContainer>
  );
};

export default CenterAssignPage;