module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  AWSKeyId: process.env.AWS_ACCESS_KEY,
  AWSSecretKey: process.env.AWS_SECRET_KEY,
  Bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};