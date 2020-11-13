'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller user
 */
class UserController extends Controller {
  /**
   * @Summary 登录接口
   * @Router POST /api/v1/user/login
   * @Request body string *username  login username
   * @Request body string *password  login password
   * @Response 200
   */
  async login() {
    const { ctx } = this;
    // 获取请求体数据
    const { username, password } = ctx.request.body;
    // 服务器需要校验一下用户名和密码是否为空
    if (!(username && password)) return (ctx.body = '用户名或密码不能为空');
    // 不为空，查询数据库是否有数据
    const result = await ctx.service.user.find({ username, password });

    // 返回数据
    ctx.body = {
      ...result,
    };
  }

  /**
   * @Summary 个人信息
   * @Router get /api/v1/user
   * @Request header string *Authorization
   * @Response 200
   */
  async index() {
    const { ctx } = this;
    const result = await ctx.service.user.findUser(ctx.request.user.id);
    console.log(result);
    // 返回数据
    ctx.body = {
      ...result,
    };
  }
  /**
   * @Summary 注册
   * @Router post /api/v1/user/register
   * @Request body string *username  login username
   * @Request body string *password  login password
   * @Response 200
   */
  async register() {
    const { ctx } = this;
    const user = ctx.request.body;
    const result = await ctx.service.user.insert(user);
    ctx.body = {
      ...result,
    };
  }
  /**
   * @Summary 更新
   * @Router put /api/v1/user/register
   * @Request query string nickname  login username
   * @Request query string password  login password
   * @Request params string *id  login id
   * @Response 200
   */
  async update() {
    const { ctx } = this;
    const result = await ctx.service.user.update({
      ...ctx.params,
      ...ctx.query,
    });
    ctx.body = {
      ...result,
    };
  }
}

module.exports = UserController;
