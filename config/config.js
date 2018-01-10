const config = {
    env: process.env.NODE_ENV || 'local',
    PORT: 3001,
    secret:'someScrect',
    dbName:'babyRecord'

};
module.exports = config;