'use strict';

const Service = require('egg').Service;

class CateService extends Service {
  // 查询所有分类的service
  async findAll() {
    const { ctx } = this;
    // 查询所有的分类信息
    const catesResult = await ctx.model.Cate.findAll();
    // 过滤分类信息，得到前台需要的数据
    const cates = catesResult.map(item => {
      return item.dataValues;
    });
    console.log(cates);
    return {
      msg: '查询成功',
      data: [...cates],
    };
  }
  // 修改的service
  async edit({ id, name }) {
    const { ctx } = this;
    const editResult = await ctx.model.Cate.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );
    if (editResult.length === 0) ctx.throw(400, '修改失败');
    return {
      msg: '修改成功',
    };
  }
  // 添加的service
  async create({ name, pid }) {
    const { ctx } = this;
    const [cateResult, created] = await ctx.model.Cate.findOrCreate({
      where: {
        name,
      },
      defaults: {
        name,
        pid,
      },
    });
    if (!created) this.ctx.throw(405, '分类名已经存在');
    const { dataValues } = cateResult;
    if (!dataValues) this.ctx.throw(400, '插入失败');
    return {
      msg: '插入成功',
    };
  }
}

module.exports = CateService;
