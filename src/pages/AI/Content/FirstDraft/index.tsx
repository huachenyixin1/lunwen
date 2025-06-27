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
  Input, 
  message,
  Divider,
  Form,
  Row,
  Col,
  Typography,
  Select
} from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const defaultPrompt = `你是一位专业论文审核专家，请对学生提交的论文初稿PDF文档进行详细评估，关注内容完整性、结构规范性和学术性，严格参照国家开放大学的论文审核规范，具体指出问题并提供详细修改建议：
1. 内容分析：
   - 检查论文是否包含完整的摘要、引言、文献综述、研究方法、研究结果、讨论和结论等部分，列出缺失或不完整的部分。
   - 评估内容是否围绕课题主题展开，逻辑是否清晰，论点是否充分论证，具体指出逻辑混乱或论证不足的章节或段落，并提出改进方向。
   - 检查是否存在明显的学术不端行为（如抄袭或数据造假迹象），确保原创性，若发现疑似问题，指出具体位置和原因。
2. 结构规范性：
   - 检查论文格式是否符合国家开放大学论文规范，逐项评估并指出具体问题：
     - 字体：正文应使用宋体，小四号；标题应使用黑体，根据层级大小调整字号（如一级标题三号，二级标题四号），若不符合，指出具体不符合的页面或章节。
     - 段落：首行缩进应为2字符，行间距应为1.5倍或固定值22磅，若不符合，指出具体不符合的页面或段落。
     - 图表标注：图表需编号并有标题，图表内容清晰，数据来源注明，若不符合，指出具体图表编号或位置及问题。
     - 参考文献格式：应遵循国家开放大学指定的格式（如GB/T 7714标准），按作者、标题、出版物、年份等顺序排列，若不符合，指出具体参考文献条目及格式错误。
     - 页眉页脚：应包含页码及论文标题或章节信息，格式统一，若不符合，指出具体页面及不统一之处。
     - 字数要求：本科论文正文字数不少于8000字，专科不少于5000字，若可能未达标，估算字数并说明。
   - 评估章节安排是否合理，层次是否分明，目录是否与正文一致，若不合理，指出具体章节或目录问题及改进建议。
3. 学术性：
   - 评估论文是否具有一定的学术深度，引用文献不少于10篇，且与研究主题相关，引用规范，若不足，指出具体问题（如引用数量不足或与主题无关的文献）及改进建议。
   - 检查研究方法是否科学合理，数据分析是否严谨，结论是否基于充分证据，若不合理，指出具体章节或方法问题，并提出改进方向。
4. 输出格式要求：
   【论文初稿评估】
   - 内容完整性：
     - 评估程度：【高/中/低】
     - 具体评价：【对内容的整体评价】
     - 问题指出：【列出具体问题，包括缺失部分、逻辑混乱或论证不足的章节或段落】
     - 修改建议：【针对每个问题的具体改进方向】
   - 结构规范性：
     - 评估程度：【高/中/低】
     - 具体评价：【对结构和格式的整体评价】
     - 问题指出：【逐项列出格式问题，具体到页面、章节或行号，如字体、段落、图表标注等】
     - 修改建议：【针对每个问题的具体调整建议】
   - 学术性：
     - 评估程度：【高/中/低】
     - 具体评价：【对学术深度的整体评价】
     - 问题指出：【列出学术性问题，如文献分析不足、方法不严谨，具体到页面或章节】
     - 修改建议：【针对每个问题的具体改进方向】
   - 总体评估：
     - 程度：【高/中/低】
     - 说明：【对论文整体质量的总结】
   - 综合改进建议：
     - 优先级高：【列出需立即解决的问题及建议，如结构规范性调整，包含具体位置和预计时间】
     - 优先级中：【列出次要问题及建议，如学术性或内容完善，包含具体位置和预计时间】
     - 优先级低：【列出可选问题及建议，如字数核查，包含具体位置和预计时间】
     - 总结：【总体建议，确保符合国家开放大学论文规范】`;

const majorOptions = [
  { value: '计算机科学', label: '计算机科学' },
  { value: '电子工程', label: '电子工程' },
  { value: '机械工程', label: '机械工程' },
  { value: '经济学', label: '经济学' },
  { value: '文学', label: '文学' }
];

const FirstDraftConfig: React.FC = () => {
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
    <PageContainer title="论文初稿配置">
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

export default FirstDraftConfig;