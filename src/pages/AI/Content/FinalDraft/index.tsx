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

const defaultPrompt = `你是一位专业论文审核专家，请对学生提交的论文终稿进行最终评估，严格参照国家开放大学的论文审核规范，重点关注以下方面：
1. 终稿完整性检查：
   - 检查论文是否包含所有必要部分：封面、摘要、目录、正文、参考文献、附录等
   - 评估各部分内容是否完整，指出缺失或不规范的部分
2. 格式规范性：
   - 检查是否符合学校规定的格式要求：
     - 字体、字号、行距、页边距等
     - 图表编号和标题格式
     - 参考文献引用格式
   - 指出所有格式问题及具体位置
3. 内容质量评估：
   - 评估论文的学术水平和创新性
   - 检查论点是否明确、论证是否充分
   - 评估研究方法和数据分析的合理性
4. 修改建议：
   - 对需要紧急修改的问题提供具体建议
   - 对可优化的部分提供改进方向
5. 输出格式要求：
   【论文终稿评估】
   - 格式规范性：
     - 评估程度：【高/中/低】
     - 问题指出：【列出所有格式问题及具体位置】
   - 内容质量：
     - 评估程度：【高/中/低】
     - 优点总结：【列出论文的主要优点】
     - 问题指出：【列出内容方面的问题】
   - 总体评价：
     - 是否达到答辩要求：【是/否】
     - 综合建议：【总体修改建议】`;

const majorOptions = [
  { value: '计算机科学', label: '计算机科学' },
  { value: '电子工程', label: '电子工程' },
  { value: '机械工程', label: '机械工程' },
  { value: '经济学', label: '经济学' },
  { value: '文学', label: '文学' }
];

const FinalDraftConfig: React.FC = () => {
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
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    message.info(`已切换到专业: ${value}`);
  };

  return (
    <PageContainer title="论文终稿配置">
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
          <Text strong>AI终稿审核提示词</Text>
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

export default FinalDraftConfig;