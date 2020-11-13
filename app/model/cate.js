'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Cate = app.model.define('cate', {
    name: {
      type: STRING(255),
      allowNull: false,
    },
    pid: {
      type: INTEGER,
    },
  });

  Cate.associate = function () {
    Cate.hasMany(app.model.Book);
  };
  return Cate;
};
