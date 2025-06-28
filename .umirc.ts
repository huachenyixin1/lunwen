import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '论文评审系统', // 改为你的项目标题
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '门户管理',
      path: '/portal',
      routes: [
        {
          name: '管理员门户',
          path: '/portal/admin',
          component: './Portal/Admin',
        },
        {
          name: '教师门户',
          path: '/portal/teacher',
          component: './Portal/Teacher',
        },
        {
          name: '学生门户',
          path: '/portal/student',
          component: './Portal/Student',
        },
        {
          name: '领导门户',
          path: '/portal/leader',
          component: './Portal/Leader',
        },
      ],
    },
    {
      name: '用户管理',
      path: '/user',
      routes: [
        { name: '用户列表', path: '/user/list', component: './User/List' },
        {
          name: '学生用户',
          path: '/user/student',
          component: './Base/StudentUser',
        },
        { name: '权限管理', path: '/user/perm', component: './User/Perm' },
        { name: '角色管理', path: '/user/role', component: './User/Role' },
      ],
    },
    {
      name: '基础数据管理',
      path: '/base',
      routes: [
        { name: '批次管理', path: '/base/batch', component: './Base/Batch' },
        { name: '中心管理', path: '/base/center', component: './Base/Center' },
        { name: '班级管理', path: '/base/class', component: './Base/Class' },
        { name: '专业管理', path: '/base/major', component: './Base/Major' },
        { name: '组织管理', path: '/base/org', component: './Base/Org' },
        {
          name: '学生管理',
          path: '/base/student',
          component: './Base/Student',
        },
      ],
    },
    {
      name: '学生分配管理',
      path: '/assign',
      routes: [
        {
          name: '学习中心老师关联学生',
          path: '/assign/center',
          component: './Assign/Center',
        },
        {
          name: '学院老师关联学生',
          path: '/assign/college',
          component: './Assign/TeacherStudent',
        },
      ],
    },
    {
      name: '论文过程管理',
      path: '/process',
      routes: [
        {
          name: '开题申请',
          path: '/process/apply',
          component: './process/apply',
        },
        {
          name: '开题报告',
          path: '/process/report',
          component: './process/Report',
        },
        {
          name: '论文初稿',
          path: '/process/draft',
          component: './process/Draft',
        },
        { name: '中期检查', path: '/process/mid', component: './process/Mid' },
        {
          name: '论文终稿',
          path: '/process/final',
          component: './process/Final',
        },
      ],
    },
    {
      name: '论文审核管理',
      path: '/review',
      routes: [
        {
          name: '开题申请审核',
          path: '/review/apply',
          component: './Review/Apply',
        },
        {
          name: '开题报告审核',
          path: '/review/report',
          component: './Review/Report',
        },
        {
          name: '论文初稿审核',
          path: '/review/draft',
          component: './Review/Draft',
        },
        {
          name: '中期检查审核',
          path: '/review/mid',
          component: './Review/Mid',
        },
        {
          name: '论文终稿审核',
          path: '/review/final',
          component: './Review/Final',
        },
        {
          name: '学院老师终审',
          path: '/review/college-final',
          component: './Review/CollegeFinal',
        },
      ],
    },
    {
      name: 'AI参数配置',
      path: '/ai',
      routes: [
        { name: '参数配置', path: '/ai/scope', component: './AI/Scope' },
        { name: 'AI模型管理', path: '/ai/model', component: './AI/Model' },
        {
          name: '内容参数配置',
          path: '/ai/content',
          routes: [
            {
              name: '开题申请配置',
              path: '/ai/content/proposal-apply',
              component: './AI/Content/ProposalApply',
            },
            {
              name: '开题报告配置',
              path: '/ai/content/proposal-report',
              component: './AI/Content/ProposalReport',
            },
            {
              name: '论文初稿配置',
              path: '/ai/content/first-draft',
              component: './AI/Content/FirstDraft',
            },
            {
              name: '中期检查配置',
              path: '/ai/content/midterm',
              component: './AI/Content/Midterm',
            },
            {
              name: '论文终稿配置',
              path: '/ai/content/final-draft',
              component: './AI/Content/FinalDraft',
            },
            {
              name: '终审配置',
              path: '/ai/content/final-review',
              component: './AI/Content/FinalReview',
            },
          ],
        },
        { name: 'AI审核记录', path: '/ai/log', component: './AI/Log' },
      ],
    },
    {
      name: '统计报表',
      path: '/test',
      routes: [
        {
          name: '教师指导学生统计表',
          path: '/test/t1',
          component: './Test/T1',
        },
        { name: '专业分布统计表', path: '/test/t2', component: './Test/T2' },
        { name: '审核进度总览表', path: '/test/t3', component: './Test/T3' },
        {
          name: '学院论文完成率统计表',
          path: '/test/t4',
          component: './Test/T4',
        },
        { name: '论文状态分布表', path: '/test/t5', component: './Test/T5' },
        { name: '年度进度对比表', path: '/test/t6', component: './Test/T6' },
        { name: '学生进度跟踪表', path: '/test/t7', component: './Test/T7' },
        { name: '待审批任务清单', path: '/test/t8', component: './Test/T8' },
        { name: '指导成果汇总表', path: '/test/t9', component: './Test/T9' },
        { name: '个人进度明细表', path: '/test/t10', component: './Test/T10' },
        { name: '提交记录表', path: '/test/t11', component: './Test/T11' },
        { name: '重要时间节点表', path: '/test/t12', component: './Test/T12' },
        {
          name: '论文提交率统计表',
          path: '/test/t13',
          component: './Test/T13',
        },
        {
          name: '复审未通过明细表',
          path: '/test/t14',
          component: './Test/T14',
        },
      ],
    },
    {
      name: '批量处理',
      path: '/batch',
      routes: [
        {
          name: '批量导入开题申请',
          path: '/batch/B1',
          component: './Batch/B1',
        },
        {
          name: '批量导入开题报告',
          path: '/batch/B2',
          component: './Batch/B2',
        },
        {
          name: '批量导入论文初稿',
          path: '/batch/B3',
          component: './Batch/B3',
        },
        {
          name: '批量导入中期检查',
          path: '/batch/B4',
          component: './Batch/B4',
        },
        {
          name: '批量导入论文终稿',
          path: '/batch/B5',
          component: './Batch/B5',
        },
      ],
    },
  ],
  npmClient: 'npm',
});
