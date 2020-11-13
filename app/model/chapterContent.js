'use strict';

// 章节内容的model
module.exports = app => {
  const { STRING } = app.Sequelize;
  const ChapterContent = app.model.define('chapter_content', {
    content_url: {
      type: STRING,
    },
  });
  return ChapterContent;
};
