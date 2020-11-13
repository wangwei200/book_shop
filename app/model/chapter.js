'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Chapter = app.model.define('chapter', {
    name: {
      type: STRING,
      defaultValue: '默认章节',
    },
  });

  Chapter.associate = function () {
    Chapter.hasOne(app.model.ChapterContent);
  };

  Chapter.associate = function () {
    app.model.Chapter.belongsTo(app.model.Book, { foreignKey: 'bookId', targetKey: 'id' });
  };
  return Chapter;
};
