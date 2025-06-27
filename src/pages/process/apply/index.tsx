import React, { useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Input, DatePicker, Radio, InputNumber, Select } from 'antd';
import { StepsForm } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ApplyItem {
  id: string;
  studentName: string;
  studentId: string;
  major: string;
  topic: string;
  topicType: string;
  topicSource: string;
  applyDate: string;
  status: 'draft' | 'submitted' | 'returned';
}

const ProposalApplyPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<ApplyItem[]>([]);

  const columns: ProColumns<ApplyItem>[] = [
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
      title: '申请日期',
      dataIndex: 'applyDate',
      valueType: 'date',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        draft: { text: '草稿', status: 'Default' },
        submitted: { text: '已提交', status: 'Processing' },
        returned: { text: '已退回', status: 'Error' },
      },
    },
  ];

  const fetchData = async (params: any) => {
    console.log('请求参数:', params);
    try {
      const mockData: ApplyItem[] = [
        {
          id: '1',
          studentName: '张三',
          studentId: '20230001',
          major: '计算机科学与技术',
          topic: '基于深度学习的图像识别研究',
          topicType: '理论研究',
          topicSource: '自选课题',
          applyDate: '2025-01-10',
          status: 'submitted',
        },
      ];

      return {
        data: mockData,
        success: true,
        total: 1,
      };
    } catch (error) {
      console.error('获取数据失败:', error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  const handleSubmit = async () => {
    console.log('提交申请:', selectedRows);
    // TODO: 实现提交逻辑
    actionRef.current?.reload();
  };

  const handleCancelSubmit = async () => {
    console.log('取消提交:', selectedRows);
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

  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    const values = form.getFieldsValue();
    console.log('表单数据:', values);
    // TODO: 提交表单数据
    setModalVisible(false);
    form.resetFields();
    actionRef.current?.reload();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

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
    const table = document.getElementById('apply-table-pdf');
    if (!table) return;
    const canvas = await html2canvas(table, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save('开题申请.pdf');
  };

  return (
    <>
      <PageContainer>
        <ProTable<ApplyItem>
          id="apply-table-pdf"
          actionRef={actionRef}
          rowKey="id"
          search={false}
          options={{
            density: false,
            fullScreen: true,
            reload: true,
            setting: true,
          }}
          toolBarRender={() => [
            <Space key="toolbar">
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                新增
              </Button>
              <Button type="primary" onClick={handleSubmit} disabled={selectedRows.length === 0}>
                提交
              </Button>
              <Button onClick={handleCancelSubmit} disabled={selectedRows.length === 0}>
                取消提交
              </Button>
              <Button danger onClick={handleDelete} disabled={selectedRows.length === 0}>
                删除
              </Button>
              <Button type="primary" onClick={handleExportPDF}>导出PDF</Button>
            </Space>,
          ]}
          request={fetchData}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          dateFormatter="string"
          bordered
          size="middle"
        />
      </PageContainer>
      <Modal
        width={1000}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        style={{ top: '5%' }}
        bodyStyle={{ height: '80vh', overflowY: 'auto' }}
      >
        <StepsForm
          current={currentStep}
          onFinish={handleModalOk}
          formProps={{
            form,
            layout: 'vertical',
          }}
          onCurrentChange={setCurrentStep}
          stepsProps={{
            size: 'small',
            className: 'custom-steps',
          }}
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return [
                  <Button
                    key="next"
                    type="primary"
                    onClick={async () => {
                      const canProceed = await props.form?.submit();
                      if (canProceed) {
                        setCurrentStep(1);
                      }
                    }}
                  >
                    下一步
                  </Button>,
                ];
              }
              if (props.step === 1) {
                return [
                  <Button
                    key="prev"
                    onClick={() => {
                      setCurrentStep(0);
                    }}
                  >
                    上一步
                  </Button>,
                  <Button
                    key="next"
                    type="primary"
                    onClick={async () => {
                      const canProceed = await props.form?.submit();
                      if (canProceed) {
                        setCurrentStep(2);
                      }
                    }}
                  >
                    下一步
                  </Button>,
                ];
              }
              return [
                <Button
                  key="prev"
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                >
                  上一步
                </Button>,
                <Button key="submit" type="primary" onClick={() => props.onSubmit?.()}>
                  提交
                </Button>,
              ];
            },
          }}
        >
          <StepsForm.StepForm
            title="基本信息"
            onFinish={async () => {
              return true;
            }}
          >
            <Form.Item style={{ marginBottom: 16 }}>
              <Form.Item label="姓名" style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}>
                <Input disabled value="张三" />
              </Form.Item>
              <Form.Item label="学号" style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}>
                <Input disabled value="20230001" />
              </Form.Item>
              <Form.Item label="专业" style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}>
                <Input disabled value="计算机科学与技术" />
              </Form.Item>
              <Form.Item label="申报日期" style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Form.Item>

            <Form.Item label="课题名称" name="topic">
              <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Form.Item label="指导老师" style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}>
                <Input disabled value="李教授" />
              </Form.Item>
              <Form.Item label="课题类别" name="topicType" style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}>
                <Select>
                  <Select.Option value="毕业论文">毕业论文</Select.Option>
                  <Select.Option value="毕业设计">毕业设计</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="课题来源" name="topicSource" style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}>
                <Select>
                  <Select.Option value="老师科研项目">老师科研项目</Select.Option>
                  <Select.Option value="社会生产实践">社会生产实践</Select.Option>
                  <Select.Option value="学生自拟题目">学生自拟题目</Select.Option>
                </Select>
              </Form.Item>
            </Form.Item>
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="课题内容"
            onFinish={async () => {
              return true;
            }}
          >
            <Form.Item label="选题说明" name="topicDescription">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="课题主要内容" name="topicContent">
              <Input.TextArea rows={4} />
            </Form.Item>
          </StepsForm.StepForm>

          <StepsForm.StepForm title="参考文献" onFinish={handleModalOk}>
            <Form.Item label="应收集资料及主要参考文献" name="references">
              <Input.TextArea rows={4} placeholder="每项参考文献请换行输入" />
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <Input.TextArea rows={2} />
            </Form.Item>
          </StepsForm.StepForm>
        </StepsForm>
      </Modal>
    </>
  );
};

export default ProposalApplyPage;