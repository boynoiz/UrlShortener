class Bootstrap {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
    this.url = process.env.APP_URL || "localhost";
    this.port = process.env.APP_PORT || 8080;
    this.db_host = process.env.APP_DB_HOST || "localhost";
  }
}
module.exports = Bootstrap;