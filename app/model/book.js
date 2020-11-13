'use strice';
module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;
  const Book = app.model.define('book', {
    name: {
      type: STRING(255),
      allowNull: false,
    },
    // 书籍简介
    des: {
      type: STRING(255),
      allowNull: false,
    },
    // 书籍作者
    auth: {
      type: STRING(255),
      allowNull: false,
    },
    // 是否完结
    isEnd: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    icon: STRING,
  });
  Book.associate = function () {
    // Book.hasMany(app.model.Chapter);
    app.model.Book.hasMany(app.model.Chapter, { foreignKey: 'bookId', targetKey: 'id' });
  };
  return Book;
};
