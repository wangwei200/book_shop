'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  // 根据分类id查找书籍
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    // 分页参数
    const { page, pagesize } = ctx.query;
    if (!id) ctx.throw(400, '参数id不能为空');
    const result = await ctx.service.book.findByCid({ id, page, pagesize });
    ctx.body = {
      ...result,
    };
  }
  /**
   * 查询书籍详情
   */
  async findBookDetail() {
    const { ctx } = this;
    const { id } = ctx.params;
    console.log(id);
    const result = await ctx.service.book.findBookDetail(id);
    ctx.body = {
      ...result,
    };
  }
  /**
   * 查询对应章节内容
   */
  async findChapterContent() {
    const { ctx } = this;
    // 获取章节id
    const { id } = ctx.params;
    const result = await ctx.service.book.findChapterContent(id);
    ctx.body = {
      ...result,
    };
  }
}

module.exports = BookController;
