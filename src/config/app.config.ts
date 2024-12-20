export interface AppConfig {
  base_url: string;
  port: number;
  auth_secret: string;
  jwt_token_expires_in: string;
  // aws: {
  //   access_key_id: string;
  //   secret_access_key: string;
  //   region: string;
  //   bucket: string;
  // };
  database: {
    user: string;
    password: string;
    name: string;
    host: string;
    port: number;
  };
}

export const getConfig = (): AppConfig => {
  const env = process.env;

  return {
    base_url: env.BASE_URL,
    port: Number(env.PORT),
    auth_secret: env.AUTH_SECRET,
    jwt_token_expires_in: env.JWT_TOKEN_EXPIRES_IN,
    // aws: {
    //   access_key_id: env.AWS_ACCESS_KEY_ID,
    //   secret_access_key: env.AWS_SECRET_ACCESS_KEY,
    //   region: env.AWS_REGION,
    //   bucket: env.AWS_BUCKET,
    // },
    database: {
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
    },
  };
};
