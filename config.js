var config = {
  APP_NAME: process.env["APP_NAME"] || "LaunchAndLearn",
  MONGO_URL: process.env["MONGO_URL"] || "mongodb://localhost:27017/launchandlearn",
  SECRET: process.env["SECRET"] || "notsosecret"
}
module.exports = config;
