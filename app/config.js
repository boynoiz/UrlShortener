import path from 'path';
import dotEnv from "dotenv";
import Config from "./models/config"

let envFile = ".env";

const loadEnv = dotEnv.config({
  path: path.join(__dirname, '../' + envFile)
});

if (loadEnv.error) {
  throw loadEnv.error;
};

const config = new Config()

module.exports = config
