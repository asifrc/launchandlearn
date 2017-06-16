var config = {
  APP_NAME: process.env["APP_NAME"] || "LaunchAndLearn",
  MONGO_URL: process.env["MONGO_URL"] || "mongodb://localhost:27017/launchandlearn",
  SECRET: process.env["SECRET"] || "notsosecret",
  ADMIN_PASSWORD: process.env["ADMIN_PASSWORD"] || "admin",
  AWS_DEFAULT_REGION: process.env["AWS_DEFAULT_REGION"] || "ap-southeast-1"
}
module.exports = config;
