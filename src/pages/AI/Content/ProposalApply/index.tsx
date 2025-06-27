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
  Typography 
} from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const fieldData = [
  {
    name: '课题名称',
    type: '文本',
    required: true,
    description: '学生填写的论文题目'
  },
  {
    name: '专业名称',
    type: '文本',
    required: true,
    description: '学生所属专业'
  },
  {
    name: '选题说明',
    type: '长文本',
    recommended: true,
    description: '课题背景和研究意义'
  },
  {
    name: '课题主要内容',
    type: '长文本',
    recommended: true,
    description: '详细研究内容和方法'
  },
  {
    name: '参考文献',
    type: '列表',
    optional: true,
    description: '相关研究文献'
  }
];

const defaultPrompt = `你是一位专业审核专家，请判断课题名称与专业的匹配程度：  

1. 基础匹配分析：  
   - 提取「{专业名称}」中的核心领域关键词  
   - 检查「{课题名称}」是否明显偏离专业方向  
   - 结合「{选题说明}」验证合理性  

2. 输出格式要求：  
   【匹配度评估】  
   - 专业领域：[关键词]  
   - 匹配程度：[高/中/低]  
   - 改进建议：[如不匹配，给出具体调整建议]`;

const ProposalApplyConfig: React.FC = () => {
  const [prompt, setPrompt] = useState(defaultPrompt);
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
    message.success('配置已保存');
    // 这里添加保存逻辑
  };

  return (
    <PageContainer title="开题申请配置">
      <ProCard title="字段选择" headerBordered>
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

export default ProposalApplyConfig;