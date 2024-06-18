/* eslint-disable prettier/prettier */
// export function EnvConfiguration() {
//   return {
//     environment: process.env.NODE_ENV || 'dev',
//     mongodb: process.env.DB_URI,
//     port: process.env.PORT || 8080,
//     defaultLimit: process.env.DEFAULT_LIMIT || 7,
//   };
// }

export const EnvConfiguration = (): {
  environment: string;
  mongodb: string;
  port: string | number;
  database: string;
  secret_key: string;
} => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.DB_URI,
  port: process.env.PORT || 8888,
  database: process.env.DB_NAME || 'ecommerce',
  secret_key: process.env.SECRET_KEY || 'sonlele',
});
