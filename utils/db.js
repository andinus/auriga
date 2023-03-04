import Database from 'better-sqlite3';

const db = (options = {}) => {
    const conn = new Database('auriga.db', options);
    // conn.pragma('journal_mode = WAL');
    return conn;
};

export default db;
