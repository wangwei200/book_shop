'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      // 统一对返回的数据做处理
      console.log(ctx.response);
      if (ctx.response.status !== 200) ctx.throw(ctx.response.status, ctx.response.message);
      ctx.response.body = {
        status: 200,
        ...ctx.response.body,
      };
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      const error = status === 500 && ctx.app.config.env === 'prod' ? '网络错误' : err.message;
      ctx.body = {
        message: error,
        status,
      };
    }
  };
};
