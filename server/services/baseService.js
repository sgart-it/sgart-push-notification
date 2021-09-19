const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); //https://www.npmjs.com/package/sqlite
const path = require('path');
const settings = require('../../settings.json');

sqlite3.verbose();

const DB_PATH = path.join(path.resolve('./'), settings.database.filename);
console.log(`DB_PATH: ${DB_PATH}`);

const getResponse = (success) => { return { success: success, message: null, data: null } };

const dbExecute = async (sql, params) => {
    const result = getResponse(false);

    let db = null;
    try {
        db = await open({ filename: DB_PATH, driver: sqlite3.Database });

        const r = await db.run(sql, params);
        result.data = {
            id: r.lastID
        };
        result.success = true;
    } catch (ex) {
        console.error(ex);
        result.message = ex;
    } finally {
        await db.close();
    }
    return result;
};

const dbGetSingle = async (sql, params) => {
    const result = getResponse(false);

    let db = null;
    try {
        db = await open({ filename: DB_PATH, driver: sqlite3.Database });

        result.data = await db.get(sql, params);
        if (result.data === undefined) {
            result.data = null;
        }

        result.success = true;
    } catch (ex) {
        console.error(ex);
        result.message = ex;
    } finally {
        await db.close();
    }
    return result;
};

const dbGetMany = async (sql, params) => {
    const result = getResponse(false);

    let db = null;
    try {
        db = await open({ filename: DB_PATH, driver: sqlite3.Database });

        result.data = await db.all(sql, params);
        if (result.data === undefined) {
            result.data = null;
        }
        result.success = true;
    } catch (ex) {
        console.error(ex);
        result.message = ex;
    } finally {
        await db.close();
    }
    return result;
};

module.exports = {
    getResponse: getResponse,
    dbExecute: dbExecute,
    dbGetSingle: dbGetSingle,
    dbGetMany: dbGetMany
};