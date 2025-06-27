import React, { useState } from 'react';
import {
  PageContainer,
  ProCard
} from '@ant-design/pro-components';
import {
  Button,
  Space,
  Input,
  message,
  Form,
  Typography,
  Select
} from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const defaultPrompt = `你是一位专业论文审核专家，请对学生提交的中期检查报告进行详细评估，关注研究进度、已完成工作和后续计划，严格参照国家开放大学的论文审核规范，具体指出问题并提供详细修改建议：
1. 研究进度评估：
   - 检查是否按照开题报告的计划进度执行，列出进度滞后或超前的部分及原因分析。
   - 评估已完成工作的质量，是否达到预期目标，具体指出未达标的部分及改进建议。
   - 检查研究过程中遇到的问题和解决方案是否合理，指出需要改进的方面。
2. 后续计划评估：
   - 检查后续研究计划是否合理可行，时间安排是否充足，指出不合理的部分及调整建议。
   - 评估研究方法的科学性，是否需要调整或优化，提出具体建议。
   - 检查预期成果是否与研究目标一致，指出不一致的部分及调整建议。
3. 输出格式要求：
   【中期检查评估】
   - 研究进度：
     - 评估程度：【高/中/低】
     - 具体评价：【对研究进度的整体评价】
     - 问题指出：【列出具体问题，包括进度滞后、工作未达标等】
     - 修改建议：【针对每个问题的具体改进方向】
   - 后续计划：
     - 评估程度：【高/中/低】
     - 具体评价：【对后续计划的整体评价】
     - 问题指出：【列出计划不合理、方法不科学等问题】
     - 修改建议：【针对每个问题的具体调整建议】
   - 总体评估：
     - 程度：【高/中/低】
     - 说明：【对中期检查报告整体质量的总结】
   - 综合改进建议：
     - 优先级高：【列出需立即解决的问题及建议】
     - 优先级中：【列出次要问题及建议】
     - 优先级低：【列出可选问题及建议】
     - 总结：【总体建议，确保后续研究顺利进行】`;

const majorOptions = [
  { value: '计算机科学', label: '计算机科学' },
  { value: '电子工程', label: '电子工程' },
  { value: '机械工程', label: '机械工程' },
  { value: '经济学', label: '经济学' },
  { value: '文学', label: '文学' }
];

const MidtermConfig: React.FC = () => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [selectedMajor, setSelectedMajor] = useState('计算机科学');
  const [form] = Form.useForm();

  const handleReset = () => {
    setPrompt(defaultPrompt);
    message.success('已重置为默认提示词');
  };

  const handleSave = () => {
    if (!prompt.trim()) {
      message.error('请输入审核提示词');
      return;
    }
    message.success(`配置已保存 - 专业: ${selectedMajor}`);
    // 这里添加保存逻辑，可以根据专业保存不同的配置
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    // 这里可以添加逻辑以加载对应专业的配置
    message.info(`已切换到专业: ${value}`);
  };

  return (
    <PageContainer title="中期检查配置">
      <ProCard title="专业选择" headerBordered>
        <Form form={form} layout="vertical">
          <Form.Item label="选择专业">
            <Select
              value={selectedMajor}
              onChange={handleMajorChange}
              options={majorOptions}
              style={{ width: 200 }}
            />
          </Form.Item>
        </Form>
      </ProCard>

      <ProCard title="提示词编辑" headerBordered style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Text strong>AI审核提示词</Text>
        </div>
        <TextArea
          className="prompt-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          autoSize={{ minRows: 10 }}
          style={{ borderRadius: 4 }}
        />

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          </Space>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default MidtermConfig;