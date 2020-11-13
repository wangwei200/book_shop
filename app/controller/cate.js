const Controller = require('egg').Controller;

class CateController extends Controller {
  // 查询所有分类
  async index() {
    const { ctx } = this;
    const result = await ctx.service.cate.findAll();
    ctx.body = {
      ...result,
    };
  }
  // 编辑分类数据
  async edit() {
    const { ctx } = this;
    // 获取请求的id
    const { id } = ctx.params;
    const { name } = ctx.query;
    // 判断请求数据是否为空
    if (!id) ctx.throw(400, 'id不能为空');
    if (!name) ctx.throw(400, 'name不能为空');
    const result = await ctx.service.cate.edit({
      id,
      name,
    });
    ctx.body = {
      ...result,
    };
  }
  // 添加分类信息
  async create() {
    const { ctx } = this;
    // 获取post请求参数
    const { name, cid } = ctx.request.body;
    if (!name) ctx.throw(400, '分类名称不能为空');
    const result = await ctx.service.cate.create({
      name,
      pid: cid ? cid : 0,
    });
    ctx.body = {
      ...result,
    };
  }
}

module.exports = CateController;
