// 基础数据管理Mock API
export default {
  // 中心管理
  'GET /api/base/center/list': (req: any, res: any) => {
    res.json({
      success: true,
      data: [
        { id: 1, name: '中心1', description: '中心描述1' },
        { id: 2, name: '中心2', description: '中心描述2' },
      ],
    });
  },

  // 组织管理
  'GET /api/base/org/list': (req: any, res: any) => {
    res.json({
      success: true,
      data: [
        { id: 1, name: '组织1', code: 'ORG001' },
        { id: 2, name: '组织2', code: 'ORG002' },
      ],
    });
  },

  // 批次管理
  'GET /api/base/batch/list': (req: any, res: any) => {
    res.json({
      success: true,
      data: [
        { id: 1, name: '批次1', year: '2023' },
        { id: 2, name: '批次2', year: '2024' },
      ],
    });
  },

  // 其他基础数据API可以继续添加...
};