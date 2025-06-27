import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic } from 'antd';
import * as echarts from 'echarts/core';
import { PieChart, BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

echarts.use([PieChart, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer]);

const totalStudents = 600000;
const completed = 480000;
const uncompleted = 120000;
const collegeStats = [
  { name: '信息工程学院', value: 120000 },
  { name: '经济管理学院', value: 90000 },
  { name: '外国语学院', value: 80000 },
  { name: '法学院', value: 70000 },
  { name: '护理学院', value: 140000 },
];

const pieOption = {
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '论文完成情况',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: completed, name: '已完成', itemStyle: { color: '#52c41a' } },
        { value: uncompleted, name: '未完成', itemStyle: { color: '#f5222d' } },
      ],
    },
  ],
};
const barOption = {
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: collegeStats.map(i => i.name) },
  yAxis: { type: 'value' },
  series: [{
    data: collegeStats.map(i => i.value),
    type: 'bar',
    itemStyle: { color: '#5B8FF9' },
    barWidth: 32,
  }],
};

const LeaderPortal: React.FC = () => (
  <PageContainer>
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={8}><Card bordered={false}><Statistic title="总学生数" value={totalStudents} formatter={v => (v as number).toLocaleString() + ' 人'} /></Card></Col>
      <Col xs={24} sm={8}><Card bordered={false}><Statistic title="论文完成数" value={completed} valueStyle={{ color: '#52c41a' }} formatter={v => (v as number).toLocaleString() + ' 人'} /></Card></Col>
      <Col xs={24} sm={8}><Card bordered={false}><Statistic title="未完成数" value={uncompleted} valueStyle={{ color: '#f5222d' }} formatter={v => (v as number).toLocaleString() + ' 人'} /></Card></Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={12}><Card title="论文完成情况" bordered={false}><ReactECharts style={{ height: 300 }} option={pieOption} /></Card></Col>
      <Col xs={24} sm={12}><Card title="各学院论文完成统计" bordered={false}><ReactECharts style={{ height: 300 }} option={barOption} /></Card></Col>
    </Row>
  </PageContainer>
);

export default LeaderPortal;
