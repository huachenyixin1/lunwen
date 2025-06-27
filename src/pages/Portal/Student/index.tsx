import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

echarts.use([BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer]);

const processStatus = [
  { name: '开题申请', status: '通过' },
  { name: '开题报告', status: '通过' },
  { name: '论文初稿', status: '待审批' },
  { name: '中期检查', status: '未提交' },
  { name: '论文终稿', status: '未提交' },
];
const statusColor: Record<string, string> = {
  '通过': '#52c41a',
  '未通过': '#f5222d',
  '待审批': '#faad14',
  '未提交': '#d9d9d9',
};
const historyData = [2, 1, 3, 1, 2];

const barOption = {
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: processStatus.map(i => i.name) },
  yAxis: { type: 'value' },
  series: [{
    data: historyData,
    type: 'bar',
    itemStyle: { color: '#5B8FF9' },
    barWidth: 32,
  }],
};

const StudentPortal: React.FC = () => (
  <PageContainer>
    <Row gutter={24}>
      <Col span={12}>
        <Card title="论文过程提交状态" bordered={false}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {processStatus.map(item => (
              <div key={item.name} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, color: statusColor[item.status as keyof typeof statusColor] }}>{item.status === '通过' ? '✔' : item.status === '未通过' ? '✖' : item.status === '待审批' ? '⏳' : '—'}</div>
                <div style={{ marginTop: 8 }}>{item.name}</div>
                <div style={{ color: statusColor[item.status as keyof typeof statusColor], fontWeight: 'bold' }}>{item.status}</div>
              </div>
            ))}
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="历史提交统计" bordered={false}>
          <ReactECharts style={{ height: 260 }} option={barOption} />
        </Card>
      </Col>
    </Row>
  </PageContainer>
);

export default StudentPortal;
