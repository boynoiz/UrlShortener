class Bootstrap {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
    this.url = process.env.APP_URL || "localhost";
    this.port = process.env.APP_PORT || 8080;
    this.db_host = process.env.APP_DB_HOST || "localhost";
    this.db_user = process.env.APP_DB_USER || "root";
    this.db_password = process.env.APP_DB_PASSWORD || "secret";
  }
}
module.exports = Bootstrap;
