import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Dropdown, message, Space } from 'antd';
import type { MenuProps } from 'antd';
import React, { useRef, useState } from 'react';

// 定义学生信息的数据类型
interface StudentItem {
  id: string;
  branchName: string;  // 分部名称
  branchCode: string;  // 分部代码
  collegeName: string;  // 学院名称
  collegeCode: string;  // 学院代码
  centerName: string;  // 学习中心名称
  centerCode: string;  // 学习中心代码
  studentId: string;  // 学号
  name: string;  // 姓名
  phone: string;  // 手机号
  majorName: string;  // 专业名称
  majorCode: string;  // 专业代码
  majorLevel: string;  // 专业层次
  enrollmentYear: number;  // 入学年份
  className: string;  // 班级名称
  classCode: string;  // 班级代码
  examBatch: string;  // 考试批次
}

const StudentList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<StudentItem[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [hasEdited, setHasEdited] = useState<boolean>(false);

  // 定义列配置
  const columns: ProColumns<StudentItem>[] = [
    { title: '分部名称', dataIndex: 'branchName', editable: false, fixed: 'left', width: 160 },
    { title: '分部代码', dataIndex: 'branchCode', editable: false, width: 120 },
    { title: '学院名称', dataIndex: 'collegeName', editable: false, width: 160 },
    { title: '学院代码', dataIndex: 'collegeCode', editable: false, width: 120 },
    { title: '学习中心名称', dataIndex: 'centerName', editable: false, width: 180 },
    { title: '学习中心代码', dataIndex: 'centerCode', editable: false, width: 120 },
    { title: '学号', dataIndex: 'studentId', editable: false, width: 140 },
    { title: '姓名', dataIndex: 'name', editable: false, width: 100 },
    { title: '手机号', dataIndex: 'phone', editable: false, width: 140 },
    { title: '专业名称', dataIndex: 'majorName', editable: false, width: 180 },
    { title: '专业代码', dataIndex: 'majorCode', editable: false, width: 120 },
    { title: '专业层次', dataIndex: 'majorLevel', editable: false, width: 100 },
    { title: '入学年份', dataIndex: 'enrollmentYear', editable: false, width: 100 },
    { title: '班级名称', dataIndex: 'className', editable: false, width: 140 },
    { title: '班级代码', dataIndex: 'classCode', editable: false, width: 120 },
    { title: '考试批次', dataIndex: 'examBatch', editable: false, width: 120 },
  ];

  const handleStatusChange = async (records: StudentItem[], isActive: boolean) => {
    message.success(`${isActive ? '启用' : '停用'}成功（mock）`);
    actionRef.current?.reload();
  };

  const statusMenuItems: MenuProps['items'] = [
    {
      key: 'enable',
      label: '启用',
      icon: <CheckOutlined />,
      onClick: () => handleStatusChange(selectedRowsState, true),
    },
    {
      key: 'disable',
      label: '停用',
      icon: <StopOutlined />,
      onClick: () => handleStatusChange(selectedRowsState, false),
    },
  ];

  const renderToolbarButtons = () => {
    if (hasEdited) {
      return (
        <Space>
          <Button
            type="primary"
            key="save"
            onClick={async () => {
              message.success('保存成功（mock）');
              setEditableKeys([]);
              setHasEdited(false);
              actionRef.current?.reload();
            }}
          >
            保存
          </Button>
          <Button
            key="cancel"
            onClick={() => {
              setEditableKeys([]);
              setHasEdited(false);
              actionRef.current?.reload();
            }}
          >
            取消
          </Button>
        </Space>
      );
    }
    return (
      <Space>
        <Button
          type="primary"
          key="add"
          onClick={() => {
            const newRecord = {
              id: `new_${Date.now()}`,
              branchName: '',
              branchCode: '',
              collegeName: '',
              collegeCode: '',
              centerName: '',
              centerCode: '',
              studentId: '',
              name: '',
              phone: '',
              majorName: '',
              majorCode: '',
              majorLevel: '',
              enrollmentYear: new Date().getFullYear(),
              className: '',
              classCode: '',
              examBatch: '',
            };
            actionRef.current?.addEditRecord?.(newRecord);
            setEditableKeys([...editableKeys, newRecord.id]);
            setHasEdited(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>
        <Button
          key="edit"
          onClick={() => {
            const keys = selectedRowsState.map(row => row.id);
            setEditableKeys(keys);
            setHasEdited(true);
            selectedRowsState.forEach(row => {
              actionRef.current?.startEditable?.(row.id);
            });
          }}
        >
          <EditOutlined /> 编辑
        </Button>
        <Dropdown 
          menu={{ items: statusMenuItems }} 
          disabled={selectedRowsState.length === 0}
        >
          <Button>
            状态操作
          </Button>
        </Dropdown>
        <Button
          key="delete"
          danger
          disabled={selectedRowsState.length === 0}
          onClick={async () => {
            message.success('删除成功（mock）');
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <DeleteOutlined /> 删除
        </Button>
      </Space>
    );
  };

  return (
    <PageContainer title={false}>
      <ProTable<StudentItem>
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 2200 }}
        toolBarRender={() => [renderToolbarButtons()]
        }
        request={async (params) => {
          // TODO: 调用实际的API
          return {
            data: [
              {
                id: 'stu001',
                branchName: '东部分部',
                branchCode: 'DB01',
                collegeName: '信息工程学院',
                collegeCode: 'XG01',
                centerName: '南京学习中心',
                centerCode: 'NJ01',
                studentId: '20240001',
                name: '张三',
                phone: '13800000001',
                majorName: '计算机科学与技术',
                majorCode: 'MAJ001',
                majorLevel: '本科',
                enrollmentYear: 2024,
                className: '2024春季班',
                classCode: 'CL001',
                examBatch: '2024春季',
              },
              {
                id: 'stu002',
                branchName: '西部分部',
                branchCode: 'XB01',
                collegeName: '经济管理学院',
                collegeCode: 'JG01',
                centerName: '成都学习中心',
                centerCode: 'CD01',
                studentId: '20240002',
                name: '李四',
                phone: '13800000002',
                majorName: '会计学',
                majorCode: 'MAJ002',
                majorLevel: '本科',
                enrollmentYear: 2024,
                className: '2024秋季班',
                classCode: 'CL002',
                examBatch: '2024秋季',
              },
              {
                id: 'stu003',
                branchName: '南部分部',
                branchCode: 'NB01',
                collegeName: '外国语学院',
                collegeCode: 'WY01',
                centerName: '广州学习中心',
                centerCode: 'GZ01',
                studentId: '20250001',
                name: '王五',
                phone: '13800000003',
                majorName: '英语',
                majorCode: 'MAJ003',
                majorLevel: '本科',
                enrollmentYear: 2025,
                className: '2025春季班',
                classCode: 'CL003',
                examBatch: '2025春季',
              },
              {
                id: 'stu004',
                branchName: '北部分部',
                branchCode: 'BB01',
                collegeName: '法学院',
                collegeCode: 'FX01',
                centerName: '北京学习中心',
                centerCode: 'BJ01',
                studentId: '20250002',
                name: '赵六',
                phone: '13800000004',
                majorName: '法学',
                majorCode: 'MAJ004',
                majorLevel: '本科',
                enrollmentYear: 2025,
                className: '2025秋季班',
                classCode: 'CL004',
                examBatch: '2025秋季',
              },
              {
                id: 'stu005',
                branchName: '东部分部',
                branchCode: 'DB01',
                collegeName: '护理学院',
                collegeCode: 'HL01',
                centerName: '上海学习中心',
                centerCode: 'SH01',
                studentId: '20240003',
                name: '孙七',
                phone: '13800000005',
                majorName: '护理学',
                majorCode: 'MAJ005',
                majorLevel: '本科',
                enrollmentYear: 2024,
                className: '2024春季班',
                classCode: 'CL001',
                examBatch: '2024春季',
              }
            ],
            success: true,
            total: 5,
          };
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableKeys,
          onValuesChange: () => {
            setHasEdited(true);
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columnsState={{
          persistenceKey: 'student-list-columns',
        }}
      />
    </PageContainer>
  );
};

export default StudentList;