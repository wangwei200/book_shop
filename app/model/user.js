'use strict';

/**
 * 用户表
 */

module.exports = app => {
  // 数据类型
  const { STRING } = app.Sequelize;
  const User = app.model.define('user', {
    // 用户名
    username: {
      type: STRING(255),
      // 是否允许为空
      allowNull: false,
    },
    // 密码
    pswd: {
      type: STRING(255),
      allowNull: false,
    },
    // 昵称
    nickname: {
      type: STRING(255),
      allowNull: false,
    },
    // 性别
    gender: {
      type: STRING(4),
      allowNull: false,
    },
    loginIp: {
      type: STRING(255),
    },
  });

  // 定义表关系
  User.associate = function () {
    // 用户与账户属于是一对一的关系
    User.hasOne(app.model.Account);
  };
  return User;
};
