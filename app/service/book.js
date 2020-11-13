'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class BookService extends Service {
  // 根据id获取书籍信息
  async findByCid({ id, page, pagesize }) {
    const { ctx } = this;
    const result = await ctx.model.Book.findAll({
      where: {
        cateId: id,
      },
      offset: (page - 1) * pagesize,
      limit: Number(pagesize),
    });
    if (result.length === 0) ctx.throw(405, '找不到书籍');
    const books = result.map(book => {
      return book.dataValues;
    });
    return {
      msg: '查询成功',
      data: [...books],
    };
  }
  /**
   * 查询书籍详情
   * @param {*} id
   */
  async findBookDetail(id) {
    const { ctx } = this;
    const { dataValues } = await ctx.model.Book.findOne({
      where: {
        id,
      },
      include: {
        model: ctx.app.model.Chapter,
      },
    });
    if (!dataValues) ctx.throw(405, '查询不到对应书籍信息');
    return {
      msg: '查询成功',
      data: {
        ...dataValues,
      },
    };
  }
  /**
   * 查询对应章节内容
   * @param {*} id
   */
  async findChapterContent(id) {
    const { ctx } = this;
    const { dataValues } = await ctx.model.ChapterContent.findOne({
      where: {
        id,
      },
    });
    if (!dataValues) ctx.throw(405, '查询不到对应书籍内容');
    let content = '';
    try {
      content = fs.readFileSync(path.join(__dirname, `../assets/file/${dataValues.content_url}`), 'utf8');
    } catch (error) {
      ctx.throw(500, error);
    }
    console.log(content);
    return {
      msg: '查询成功',
      data: {
        content,
      },
    };
  }
}

module.exports = BookService;
