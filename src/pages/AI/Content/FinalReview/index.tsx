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

const defaultPrompt = `你是一位专业论文终审专家，请对学生论文进行最终审核，严格参照国家开放大学的论文审核规范，重点关注以下方面：

1. 终审全面性检查：
   - 检查论文是否已完成所有修改要求
   - 评估修改质量是否符合标准
   - 确认所有前期问题是否已解决

2. 学术规范性：
   - 检查学术诚信问题（抄袭、剽窃等）
   - 评估引用和参考文献的准确性
   - 检查数据真实性和研究方法合理性

3. 答辩准备评估：
   - 评估论文是否达到答辩标准
   - 预测可能的答辩问题点
   - 提供答辩准备建议

4. 最终评定：
   - 给出最终评分建议（优/良/中/及格/不及格）
   - 明确是否推荐参加答辩
   - 提供最终改进建议（如有）

5. 输出格式要求：
   【论文终审报告】
   - 学术规范性：
     - 评估结果：【通过/不通过】
     - 问题指出：【列出所有学术规范问题】
   - 修改完成度：
     - 评估结果：【完全符合/基本符合/不符合】
     - 未解决问题：【列出未解决的修改点】
   - 答辩建议：
     - 答辩准备度：【高/中/低】
     - 重点问题预测：【列出3-5个可能被提问的点】
   - 最终评定：
     - 评分建议：【优/良/中/及格/不及格】
     - 答辩推荐：【推荐/有条件推荐/不推荐】`;

const majorOptions = [
  { value: '计算机科学', label: '计算机科学' },
  { value: '电子工程', label: '电子工程' },
  { value: '机械工程', label: '机械工程' },
  { value: '经济学', label: '经济学' },
  { value: '文学', label: '文学' }
];

const FinalReviewConfig: React.FC = () => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [selectedMajor, setSelectedMajor] = useState('计算机科学');
  const [form] = Form.useForm();

  const handleReset = () => {
    setPrompt(defaultPrompt);
    message.success('已重置为默认提示词');
  };

  const handleSave = () => {
    if (!prompt.trim()) {
      message.error('请输入终审提示词');
      return;
    }
    message.success(`终审配置已保存 - 专业: ${selectedMajor}`);
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    message.info(`已切换到专业: ${value}`);
  };

  return (
    <PageContainer title="终审配置">
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
          <Text strong>AI终审提示词</Text>
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

export default FinalReviewConfig;