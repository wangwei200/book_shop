'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Account = app.model.define('account', {
    money: {
      type: STRING(255),
      allowNull: false,
      defaultValue: 100.0,
    },
  });
  Account.associate = function () {
    // 与用户表是一对一的关系，主键在用户表，外键在账户表
    Account.belongsTo(app.model.User);
  };
  return Account;
};
