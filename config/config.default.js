/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1604745419443_2648';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置 csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: ['http://localhost:8080'],
  };
  // 配置 JWT
  config.jwt = {
    // 自定义加密字符串
    srcret: 'cs-itcast',
    s_type: 'Bearer ',
  };

  // 配置全局中间件
  config.middleware = ['errorHandler', 'permisstion'];
  // 配置路由白名单
  config.permisstion = {
    ignore: ['/', '/api/v1/user/login', '/api/v1/user/register'],
  };
  // 配置cors
  config.cors = {
    origin: '*',
    allowMethod: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // 配置 swagger
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'BookShop', // 接口文档的标题。
      description: 'swagger-ui for egg.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: ['http', 'https'], // 配置支持的协议。
    consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: {
      // 配置接口安全授权方式。
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  };

  // 配置数据库
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: 'localhost', // 连接的数据库主机地址
    port: 3306, // mysql服务端口
    database: 'books_shop', // 数据库名
    username: 'root', // 数据库用户名
    password: 'root', // 数据库密码
    define: {
      // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: true, // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: {
      // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
