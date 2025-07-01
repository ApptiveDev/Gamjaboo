import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    env: process.env.ENV,
    apiBaseUrl: process.env.API_BASE_URL
  }
});