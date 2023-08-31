const node_env = process.env.NODE_ENV;

class Config {
  isDev: boolean;
  corsOptions: any;
  accessSecret: string;
  refreshSecret: string;

  constructor() {
    this.isDev = !node_env || node_env === 'development';
    this.corsOptions = {
      credentials: true,
      origin: ['http://localhost:3000', 'https://sushi-380521.web.app'],
    };
    this.accessSecret = 'accessSecret';
    this.refreshSecret = 'refreshSecret';
  }
}

export default new Config();
