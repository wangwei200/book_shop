'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  app.beforeStart(async function () {
    // 同步model
    await app.model.sync({ forcs: true });
  });
  router.redirect('/', '/swagger-ui.html', 302);
  router.resources('user', '/api/v1/user', controller.user);
  router.resources('cate', '/api/v1/cate', controller.cate);
  router.resources('book', '/api/v1/book', controller.book);
  router.post('/api/v1/user/login', controller.user.login);
  router.post('/api/v1/user/register', controller.user.register);
  router.get('/api/v1/book/detail/:id', controller.book.findBookDetail);
  router.get('/api/v1/book/content/:id', controller.book.findChapterContent);
};
