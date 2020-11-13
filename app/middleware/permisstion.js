'use strict';

module.exports = () => {
  return async function jwt(ctx, next) {
    let token = ctx.request.headers.authorization;
    // 校验token是否非空
    if (!token) ctx.throw(401, '没有权限,请携带 Authoriczation 请求头');
    if (!token.startsWith(ctx.app.config.jwt.s_type)) ctx.throw(401, 'token 令牌不合法');

    token = token.substr(ctx.app.config.jwt.s_type.length);
    // 校验token是否合法,如果token过期或者不合法 会抛出异常，这里捕获一下
    let user = {};
    try {
      user = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    } catch (error) {
      const fail = error.name === 'TokenExpiredError' ? 'token 已过期，请重新获取令牌' : 'token 令牌不合法';
      ctx.throw(401, fail);
    }
    console.log('jwt验证通过：', user);
    ctx.request.user = user;
    await next();
  };
};
