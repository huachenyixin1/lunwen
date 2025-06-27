import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic } from 'antd';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

echarts.use([BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer]);

const totalStudents = 32000;
const totalTeachers = 120;
const assignedStudents = 28000;
const reviewProgress = 0.82;
const majorStats = [
  { name: '计算机科学', value: 8000 },
  { name: '会计学', value: 6000 },
  { name: '英语', value: 4000 },
  { name: '法学', value: 3000 },
  { name: '护理学', value: 11000 },
];
const teacherStats = [260, 240, 210, 300, 280, 220, 250, 230, 270, 260];

const pieOption = {
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '按专业分配',
      type: 'pie',
      radius: ['40%', '70%'],
      data: majorStats.map(i => ({ value: i.value, name: i.name })),
    },
  ],
};
const barOption = {
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: teacherStats.map((_, i) => `教师${i + 1}`) },
  yAxis: { type: 'value' },
  series: [{
    data: teacherStats,
    type: 'bar',
    itemStyle: { color: '#5B8FF9' },
    barWidth: 24,
  }],
};

const Admin: React.FC = () => (
  <PageContainer>
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={6}><Card bordered={false}><Statistic title="学生总数" value={totalStudents} formatter={v => (v as number).toLocaleString() + ' 人'} /></Card></Col>
      <Col xs={24} sm={6}><Card bordered={false}><Statistic title="已分配学生数" value={assignedStudents} formatter={v => (v as number).toLocaleString() + ' 人'} /></Card></Col>
      <Col xs={24} sm={6}><Card bordered={false}><Statistic title="教师总数" value={totalTeachers} formatter={v => (v as number).toLocaleString() + ' 人'} /></Card></Col>
      <Col xs={24} sm={6}><Card bordered={false}><Statistic title="审核进度" value={Math.round(reviewProgress * 100) + '%'} /> </Card></Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={12}><Card title="按专业分配情况" bordered={false}><ReactECharts style={{ height: 300 }} option={pieOption} /></Card></Col>
      <Col xs={24} sm={12}><Card title="每个教师分配学生数" bordered={false}><ReactECharts style={{ height: 300 }} option={barOption} /></Card></Col>
    </Row>
  </PageContainer>
);

export default Admin;