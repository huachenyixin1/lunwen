import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// PDF导出兼容CDN方式
const handleExportPDF = async () => {
  // @ts-ignore
  const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
  // @ts-ignore
  const html2canvas = window.html2canvas;
  if (!jsPDF || !html2canvas) {
    alert('请先在 public/index.html 中引入 jsPDF 和 html2canvas 的 CDN 脚本');
    return;
  }
  const table = document.getElementById('report-table-pdf');
  if (!table) return;
  const canvas = await html2canvas(table, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('l', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
  pdf.save('开题报告.pdf');
};

// 开题报告数据类型
interface ReportItem {
  id: string;
  branch: string;
  college: string;
  center: string;
  studentName: string;
  studentId: string;
  major: string;
  level: string;
  topic: string;
  purpose: string;
  status: string;
  version: string;
  isAI: string;
  review: string;
  reviewTime: string;
  teacherSign: string;
  createdAt: string;
  updatedAt: string;
  trend: string;
  content: string;
  innovation: string;
  schedule: string;
  reference: string;
}

const demoData: ReportItem[] = [
  {
    id: '1',
    branch: '001',
    college: '国家开放大学',
    center: 'B学习中心',
    studentName: '李四',
    studentId: 'S001',
    major: '计算机科学',
    level: '本科',
    topic: '基于AI的论文评审系统',
    purpose: '本研究旨在提升论文评审效率。',
    trend: '目前国内外AI辅助评审逐步普及。',
    content: '主要内容包括系统设计、算法实现等。',
    innovation: '本课题创新点为智能分配与自动审核。',
    schedule: '第一阶段：需求分析，第二阶段：开发实现。',
    reference: '[1]张三著作...[2]李四论文...（共10条）',
    status: '待审批',
    version: '1',
    isAI: 'Y',
    review: '内容需进一步完善',
    reviewTime: '2025-05-16 15:00',
    teacherSign: '[签名图片]',
    createdAt: '2025-05-16 10:00',
    updatedAt: '2025-05-16 10:00',
  },
];

const columns: ProColumns<ReportItem>[] = [
  { title: '分部', dataIndex: 'branch', width: 80 },
  { title: '学院', dataIndex: 'college', width: 120 },
  { title: '学习中心', dataIndex: 'center', width: 120 },
  { title: '学生姓名', dataIndex: 'studentName', width: 100 },
  { title: '学号', dataIndex: 'studentId', width: 100 },
  { title: '专业名称', dataIndex: 'major', width: 120 },
  { title: '层次', dataIndex: 'level', width: 80 },
  { title: '课题名称', dataIndex: 'topic', width: 180 },
  { title: '研究目的和意义', dataIndex: 'purpose', width: 180 },
  { title: '国内外现状和发展趋势', dataIndex: 'trend', width: 180 },
  { title: '主要内容与关键问题', dataIndex: 'content', width: 180 },
  { title: '预计创新点', dataIndex: 'innovation', width: 180 },
  { title: '工作进度与时间安排', dataIndex: 'schedule', width: 180 },
  { title: '参考文献', dataIndex: 'reference', width: 180 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '版本', dataIndex: 'version', width: 60 },
  { title: '是否AI审核', dataIndex: 'isAI', width: 80 },
  { title: '审批建议', dataIndex: 'review', width: 120 },
  { title: '审批时间', dataIndex: 'reviewTime', width: 140 },
  { title: '老师签名', dataIndex: 'teacherSign', width: 120 },
  { title: '创建时间', dataIndex: 'createdAt', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 140 },
];

const Report: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<ReportItem[]>([]);
  const handleSubmit = async () => {
    // TODO: 实现提交逻辑
    actionRef.current?.reload();
  };
  const handleCancelSubmit = async () => {
    // TODO: 实现取消提交逻辑
    actionRef.current?.reload();
  };
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      Modal.warning({ content: '请先选择要删除的数据' });
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的${selectedRows.length}条数据吗？`,
      onOk: () => {
        // TODO: 实现删除逻辑
        actionRef.current?.reload();
      },
    });
  };
  return (
    <PageContainer>
      <ProTable<ReportItem>
        id="report-table-pdf"
        actionRef={actionRef}
        columns={columns}
        dataSource={demoData}
        rowKey="id"
        scroll={{ x: 2400 }}
        search={false}
        toolBarRender={() => [
          <Space key="toolbar">
            <Button type="primary" icon={<PlusOutlined />}>新增</Button>
            <Button type="primary" onClick={handleSubmit} disabled={selectedRows.length === 0}>提交</Button>
            <Button onClick={handleCancelSubmit} disabled={selectedRows.length === 0}>取消提交</Button>
            <Button danger onClick={handleDelete} disabled={selectedRows.length === 0}>删除</Button>
            <Button type="primary" onClick={handleExportPDF}>导出PDF</Button>
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
    </PageContainer>
  );
};

export default Report;