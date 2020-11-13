'use strict';

const Service = require('egg').Service;

const crypto = require('crypto');

class UserService extends Service {
  // 查询的方法
  async find({ username, password }) {
    const { dataValues } = await this.ctx.app.model.User.findOne({
      where: {
        username,
      },
    });
    // 判断查询是否成功
    if (!dataValues) this.ctx.throw(400, '用户名错误');

    // 把用户传递过来的数据与原数据库数据进行对比
    const pswd = crypto.createHash('md5').update(password).digest('hex');

    if (pswd !== dataValues.pswd) this.ctx.throw(400, '密码错误');
    // 登录成功，生成JWT字符串
    // params1: 生成的内容;params2: 密钥; params3: 生效时间
    const token = this.ctx.app.jwt.sign(
      {
        ...dataValues,
        pswd: '',
      },
      this.ctx.app.config.jwt.secret,
      {
        expiresIn: '60m',
      }
    );
    return {
      msg: '登录成功',
      data: {
        token,
      },
    };
  }
  // 插入user表
  async insert({ username, password, nickname, gender }) {
    // 对密码进行一层加密处理
    const pswd = crypto.createHash('md5').update(password).digest('hex');
    // user 是插入的输入， created 代表是否插入成功
    const [user, created] = await this.ctx.app.model.User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        pswd,
        nickname,
        gender,
        loginIp: this.ctx.request.ip,
      },
    });
    if (!created) this.ctx.throw(405, '用户名已经存在');
    // 更新 账户表，关联用户表
    const { dataValues } = user;
    const { dataValues: accountValues } = await this.ctx.model.Account.create({
      userId: dataValues.id,
    });
    if (!dataValues) this.ctx.throw(400, '账户信息出错');
    console.log('成功插入数据：', dataValues, dataValues);
    return {
      msg: '注册成功',
    };
  }

  async findUser(id) {
    const { dataValues } = await this.ctx.app.model.User.findOne({
      where: {
        id,
      },
    });
    if (!dataValues) this.ctx.throw(404, '查询用户名出错');
    return {
      msg: '查询用户信息成功',
      data: {
        ...dataValues,
        pswd: '',
      },
    };
  }
  // 修改信息
  async update({ id, nickname, pswd }) {
    // 判断nickname 和 pswd 是否为空
    const updateInfo = {};
    // 判断id是否为空，如果为空 提示前台
    if (!id) this.ctx.throw(400, '用户id为空');
    // 根据id先查询数据库，防止没有对应的用户
    const { dataValues } = await this.ctx.model.User.findByPk(id);
    if (!dataValues) this.ctx.throw(400, '查询不到用户信息');
    // 判断用户是否传递过来的别名
    if (nickname) updateInfo.nickname = nickname;
    // 判断密码是否为空，不为空的话需要判断一下数据库里面密码是否一致
    if (pswd) {
      const password = crypto.createHash('md5').update(pswd).digest('hex');
      if (password === dataValues.pswd) this.ctx.throw(400, '密码不能一致');
      updateInfo.pswd = password;
    }
    // 第一个参数修改的内容，第二个参数是条件
    const [result] = await this.ctx.model.User.update(
      {
        ...updateInfo,
      },
      {
        where: {
          id,
        },
      }
    );
    if (result === 0) this.ctx.throw(400, '修改失败');
    return {
      msg: '修改成功',
    };
  }
}

module.exports = UserService;
