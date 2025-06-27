import React, { useState, useRef } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Transfer, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-components';

type Student = {
  id: string;
  studentId: string;
  name: string;
  college: string;
  center: string;
  major: string;
  batch: string;
  reviewTeacher?: string;
};

const TeacherStudentPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [assignVisible, setAssignVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [quickAssignVisible, setQuickAssignVisible] = useState(false);

  // 模拟数据
  const students: Student[] = [
    { id: '1', studentId: '2023001', name: '张三', college: '计算机学院', center: '北京中心', major: '计算机科学与技术', batch: '2023春' },
    { id: '2', studentId: '2023002', name: '李四', college: '数学学院', center: '上海中心', major: '应用数学', batch: '2023春' },
    { id: '3', studentId: '2023003', name: '王五', college: '物理学院', center: '广州中心', major: '理论物理', batch: '2023春', reviewTeacher: '张教授' },
  ];

  // 模拟教师数据
  const teachers = [
    { id: '1', name: '张教授', college: '计算机学院' },
    { id: '2', name: '李教授', college: '数学学院' },
    { id: '3', name: '王教授', college: '物理学院' },
  ];

  // 字段：学号、姓名、学院、学习中心、专业、批次、复审教师
  const columns: ProColumns<Student>[] = [
    { title: '学号', dataIndex: 'studentId', key: 'studentId' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '学院', dataIndex: 'college', key: 'college' },
    { title: '学习中心', dataIndex: 'center', key: 'center' },
    { title: '专业', dataIndex: 'major', key: 'major' },
    { title: '批次', dataIndex: 'batch', key: 'batch' },
    { title: '复审教师', dataIndex: 'reviewTeacher', key: 'reviewTeacher' },
  ];

  const handleAssign = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一名学生');
      return;
    }
    setAssignVisible(true);
    setTargetKeys([]);
  };

  const handleUnassign = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一名学生');
      return;
    }
    Modal.confirm({
      title: '确认取消分配',
      content: '确定要取消选中学生的导师分配吗？',
      onOk: () => {
        // 调用API取消分配
        message.success('取消分配成功');
        setSelectedRowKeys([]);
        actionRef.current?.reload();
      },
    });
  };

  const handleTransferChange = (newTargetKeys: React.Key[], direction: 'left' | 'right', moveKeys: React.Key[]) => {
    setTargetKeys(newTargetKeys as string[]);
  };

  const handleAssignSubmit = () => {
    if (targetKeys.length === 0) {
      message.warning('请至少选择一名教师');
      return;
    }
    // 调用API进行分配
    message.success('分配成功');
    setAssignVisible(false);
    setSelectedRowKeys([]);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<Student>
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
          <Button key="quickAssign" onClick={() => setQuickAssignVisible(true)}>
            快速分配
          </Button>,
          <Button key="unassign" onClick={handleUnassign}>
            取消分配
          </Button>,
        ]}
      />

      <Modal
        title="分配导师"
        visible={assignVisible}
        width={900}
        bodyStyle={{ padding: '24px 32px' }}
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
          dataSource={teachers.map(t => ({
            key: t.id,
            title: `${t.name} (${t.college})`,
          }))}
          targetKeys={targetKeys}
          onChange={handleTransferChange}
          render={item => item.title}
          titles={['待分配教师', '已选教师']}
          oneWay
          style={{ width: '100%', height: '400px' }}
          listStyle={{
            width: '48%',
            height: '100%',
          }}
          operations={['→', '←']}
        />
      </Modal>

      <Modal
        title="快速分配"
        visible={quickAssignVisible}
        width={600}
        onCancel={() => setQuickAssignVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setQuickAssignVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            message.success('分配规则已应用');
            setQuickAssignVisible(false);
          }}>
            确定
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button block onClick={() => message.info('将按学习中心分配教师')}>
            按学习中心分配
          </Button>
          <Button block onClick={() => message.info('将按专业分配教师')}>
            按专业分配
          </Button>
          <Button block onClick={() => message.info('将按学生数量均衡分配教师')}>
            按学生数量分配
          </Button>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default TeacherStudentPage;