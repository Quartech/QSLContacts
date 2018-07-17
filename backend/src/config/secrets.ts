const build = () => {
  return ({
    app: {
      name: process.env.APP_NAME || 'api',
      version: process.env.APP_VERSION || '1.0.0',
      port: process.env.APP_PORT || 3000,
      environment: process.env.NODE_ENV || 'development',
      production: process.env.NODE_ENV === 'production',
    },
    logging: {
      file: `${process.env.LOG_PATH || './logs'}/app.log`,
      level: process.env.LOG_LEVEL || 'info',
      console: process.env.LOG_ENABLE_CONSOLE === 'true',
    }
  });
};

const secrets = build();
export default secrets;
