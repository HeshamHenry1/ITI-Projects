// SQLite config file - local database
module.exports = {
  database: {
    // SQLite - single file database
    filename: './examination_system.db',
    
    // SQLite options
    options: {
      verbose: console.log, // show queries in console
      timeout: 30000,       // connection timeout
      mode: 0o666          // file permissions
    }
  },
  server: {
    port: 3001,
    environment: 'development'
  }
};
