import path from 'path';
import dotEnv from "dotenv";
import Bootstrap from "./bootstrap"

let envFile = ".env";

const loadEnv = dotEnv.config({
  path: path.join(__dirname, '../../' + envFile)
});

if (loadEnv.error) {
  throw loadEnv.error;
};

const config = new Bootstrap()

module.exports = config
