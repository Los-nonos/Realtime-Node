export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET || 'lagkalkwjgalkwgawg',
  expirationTime: process.env.JWT_EXPIRATION_TIME || '1h',
}