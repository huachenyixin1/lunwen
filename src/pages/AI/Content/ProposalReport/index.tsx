import React, { useState } from 'react';
import { 
  PageContainer,
  ProCard,
  ProForm,
  ProFormTextArea
} from '@ant-design/pro-components';
import { 
  Button, 
  Space, 
  Tag, 
  Input, 
  message,
  Divider,
  Form,
  Switch,
  Row,
  Col,
  Typography,
  Select
} from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const fieldData = [
  {
    name: '课题名称',
    type: '文本',
    required: true,
    description: '学生确定的论文题目'
  },
  {
    name: '专业名称',
    type: '文本',
    required: true,
    description: '学生所属专业'
  },
  {
    name: '研究目的和意义',
    type: '长文本',
    recommended: true,
    description: '研究目的和意义'
  },
  {
    name: '国内外现状和发展趋势',
    type: '长文本',
    recommended: true,
    description: '国内外研究现状和发展趋势'
  },
  {
    name: '主要内容与关键问题',
    type: '长文本',
    recommended: true,
    description: '研究的主要内容与关键问题'
  },
  {
    name: '预计创新点',
    type: '长文本',
    recommended: true,
    description: '研究的预计创新点'
  },
  {
    name: '工作进度与时间安排',
    type: '长文本',
    recommended: true,
    description: '研究的工作进度与时间安排'
  },
  {
    name: '参考文献',
    type: '列表',
    optional: true,
    description: '相关研究文献，至少10条'
  }
];

const defaultPrompt = `你是一位专业审核专家，请基于已确定的课题名称和专业，综合评估开题报告的内容一致性和合理性：  
1. 内容一致性分析：  
   - 提取「{课题名称}」的核心主题和关键词  
   - 检查「{研究目的和意义}」是否与课题主题一致，目的是否明确，具有实际意义  
   - 检查「{国内外现状和发展趋势}」是否准确描述与课题相关的研究背景  
   - 检查「{主要内容与关键问题}」是否具体，关键问题是否与课题主题相关  
   - 检查「{预计创新点}」是否具有创新性，与课题主题是否匹配  
   - 检查「{工作进度与时间安排}」是否合理，计划是否可行  
   - 检查「{参考文献}」的数量和质量是否符合要求，与课题主题是否相关  
2. 输出格式要求：  
   【内容一致性评估】  
   - 课题主题：[核心关键词]  
   - 各部分评估：  
     - 研究目的和意义：[一致性程度：高/中/低，具体评价和建议]  
     - 国内外现状和发展趋势：[一致性程度：高/中/低，具体评价和建议]  
     - 主要内容与关键问题：[一致性程度：高/中/低，具体评价和建议]  
     - 预计创新点：[一致性程度：高/中/低，具体评价和建议]  
     - 工作进度与时间安排：[一致性程度：高/中/低，具体评价和建议]  
     - 参考文献：[质量程度：高/中/低，具体评价和建议]  
   - 总体一致性程度：[高/中/低]  
   - 总体合理性程度：[高/中/低]  
   - 综合改进建议：[总结各部分问题，提出整体调整建议]`;

const majorOptions = [
  { value: '计算机科学', label: '计算机科学' },
  { value: '电子工程', label: '电子工程' },
  { value: '机械工程', label: '机械工程' },
  { value: '经济学', label: '经济学' },
  { value: '文学', label: '文学' }
];

const ProposalReportConfig: React.FC = () => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [selectedMajor, setSelectedMajor] = useState('计算机科学');
  const [form] = Form.useForm();

  const handleInsertVariable = (variable: string) => {
    const textarea = document.querySelector('.prompt-textarea textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newPrompt = prompt.substring(0, start) + `{${variable}}` + prompt.substring(end);
      setPrompt(newPrompt);
    }
  };

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
    <PageContainer title="开题报告配置">
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

      <ProCard title="字段选择" headerBordered style={{ marginTop: 16 }}>
        <Form form={form} layout="vertical">
          {fieldData.map((field) => (
            <Form.Item key={field.name} label={null}>
              <Space size="middle" align="center">
                <Text strong>{field.name}</Text>
                <Space>
                  {field.required && <Tag color="red">必选</Tag>}
                  {field.recommended && <Tag color="green">推荐</Tag>}
                  {field.optional && <Tag color="blue">可选</Tag>}
                </Space>
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={field.required || field.recommended}
                  disabled={field.required}
                />
              </Space>
            </Form.Item>
          ))}
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
          autoSize={{ minRows: 6 }}
          style={{ borderRadius: 4 }}
        />

        <Divider orientation="left" plain>
          <Text type="secondary">可用变量（点击插入）</Text>
        </Divider>

        <Space wrap>
          {fieldData.map((field) => (
            <Button 
              key={field.name}
              size="small"
              onClick={() => handleInsertVariable(field.name)}
            >
              {`{${field.name}}`}
            </Button>
          ))}
        </Space>

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

export default ProposalReportConfig;