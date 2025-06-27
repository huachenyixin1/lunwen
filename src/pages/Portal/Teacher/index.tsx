import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic } from 'antd';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

// 注册 ECharts 所需的组件
echarts.use([BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer]);

// 模拟数据 - 20个学生在不同环节的状态
const processStats = [
  { name: '开题申请', completed: 12, pending: 3, notSubmitted: 5 },
  { name: '开题报告', completed: 11, pending: 2, notSubmitted: 7 },
  { name: '论文初稿', completed: 8, pending: 4, notSubmitted: 8 },
  { name: '中期检查', completed: 11, pending: 3, notSubmitted: 6 },
  { name: '论文终稿', completed: 8, pending: 2, notSubmitted: 10 },
];
const totalStudents = 20;
const totalCompleted = processStats.reduce((sum, p) => sum + p.completed, 0);
const totalPending = processStats.reduce((sum, p) => sum + p.pending, 0);
const totalNotSubmitted = processStats.reduce((sum, p) => sum + p.notSubmitted, 0);

// 柱状图配置
const barOption = {
  tooltip: { trigger: 'axis' },
  legend: { data: ['已完成', '待审核', '未提交'] },
  grid: { left: 40, right: 20, bottom: 40, top: 40 },
  xAxis: { type: 'category', data: processStats.map(i => i.name) },
  yAxis: { type: 'value' },
  series: [
    {
      name: '已完成',
      type: 'bar',
      data: processStats.map(i => i.completed),
      itemStyle: { color: '#5B8FF9' },
      barWidth: 24,
    },
    {
      name: '待审核',
      type: 'bar',
      data: processStats.map(i => i.pending),
      itemStyle: { color: '#F6BD16' },
      barWidth: 24,
    },
    {
      name: '未提交',
      type: 'bar',
      data: processStats.map(i => i.notSubmitted),
      itemStyle: { color: '#E86452' },
      barWidth: 24,
    },
  ],
};

const TeacherDashboard: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic title="本学期分配学生总数" value={totalStudents} valueStyle={{ fontSize: 28 }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic title="已审批学生数" value={totalCompleted} valueStyle={{ fontSize: 28, color: '#5B8FF9' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic title="待审批学生数" value={totalPending} valueStyle={{ fontSize: 28, color: '#F6BD16' }} />
          </Card>
        </Col>
      </Row>
      <Card title="各环节学生进度统计" bordered={false}>
        <ReactECharts style={{ height: 320 }} option={barOption} />
      </Card>
    </PageContainer>
  );
};

export default TeacherDashboard;